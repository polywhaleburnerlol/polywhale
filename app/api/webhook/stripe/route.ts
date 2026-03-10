import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

/* ─────────────────────────────────────────────────────────────
   Clients — initialised once at module level (not per-request)
───────────────────────────────────────────────────────────── */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// Service-role client bypasses RLS — never expose this key to the browser
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

/* ─────────────────────────────────────────────────────────────
   Tier mapping  (amount_total is in cents)
───────────────────────────────────────────────────────────── */
const TIER_MAP: Record<number, string> = {
  9900:  "whale_hunter",
  49900: "market_maker",
};

/* ─────────────────────────────────────────────────────────────
   IMPORTANT — disable Next.js body parsing so we can verify
   the raw Stripe signature. Without this, constructEvent() fails.
───────────────────────────────────────────────────────────── */
export const runtime = "nodejs"; // required for raw body access

/* ─────────────────────────────────────────────────────────────
   POST /api/webhook/stripe
───────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── 1. Read raw body & signature header ──────────────────
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("[stripe-webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // ── 2. Verify signature ───────────────────────────────────
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[stripe-webhook] Signature verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  console.log(`[stripe-webhook] Received event: ${event.type} | id: ${event.id}`);

  // ── 3. Only handle checkout.session.completed ─────────────
  if (event.type !== "checkout.session.completed") {
    console.log(`[stripe-webhook] Ignoring event type: ${event.type}`);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log(`[stripe-webhook] Processing session: ${session.id}`);

  // ── 4. Extract email ──────────────────────────────────────
  const email = session.customer_details?.email;
  if (!email) {
    console.error(`[stripe-webhook] No email on session ${session.id}`);
    // Return 200 so Stripe doesn't retry — this is a data issue, not a server error
    return NextResponse.json({ error: "No email found" }, { status: 200 });
  }

  // ── 5. Resolve tier from amount paid ─────────────────────
  const amountTotal = session.amount_total ?? 0;
  const tier = TIER_MAP[amountTotal];

  if (!tier) {
    console.error(
      `[stripe-webhook] Unrecognised amount_total: ${amountTotal} on session ${session.id}`
    );
    // Return 200 — don't let Stripe retry an amount we don't recognise
    return NextResponse.json({ error: "Unrecognised amount" }, { status: 200 });
  }

  console.log(`[stripe-webhook] Mapping ${email} → tier: ${tier} (${amountTotal} cents)`);

  // ── 6. Update Supabase ────────────────────────────────────
  //
  // OPTION A (recommended): update via auth.admin so it works even if the
  // user signed up via OAuth and their email isn't stored in `profiles` yet.
  //
  // Flow:
  //   a) Look up the auth.users row by email  →  get the user's UUID
  //   b) Upsert into `profiles` using that UUID as the primary key
  //
  // This means your `profiles` table should have:
  //   id    uuid  PRIMARY KEY  REFERENCES auth.users(id)
  //   email text
  //   tier  text
  //
  // OPTION B (simpler, also shown below): if you're certain every subscriber
  // has a `profiles` row with their email already stored, just update directly.

  try {
    // ── OPTION A: auth.admin lookup + upsert (recommended) ──
    const { data: { users }, error: lookupError } = await supabaseAdmin.auth.admin.listUsers();

    if (lookupError) {
      throw new Error(`auth.admin.listUsers failed: ${lookupError.message}`);
    }

    const user = users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      console.error(`[stripe-webhook] No auth user found for email: ${email}`);
      // Still return 200 — retrying won't help if they haven't signed up yet.
      // Consider storing a "pending" record and resolving it on first login instead.
      return NextResponse.json({ error: "User not found" }, { status: 200 });
    }

    const { error: upsertError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        { id: user.id, email: email.toLowerCase(), tier },
        { onConflict: "id" }
      );

    if (upsertError) {
      throw new Error(`profiles upsert failed: ${upsertError.message}`);
    }

    console.log(
      `[stripe-webhook] ✓ Updated profiles for user ${user.id} (${email}) → ${tier}`
    );

    /* ── OPTION B: direct email-based update (simpler alternative) ──────
     *
     * Use this instead of OPTION A if your `profiles` table has a unique
     * constraint on the `email` column and you don't need the auth UUID.
     *
     * const { error: updateError } = await supabaseAdmin
     *   .from("profiles")
     *   .update({ tier })
     *   .eq("email", email.toLowerCase());
     *
     * if (updateError) throw new Error(`profiles update failed: ${updateError.message}`);
     *
     * ─────────────────────────────────────────────────────────────────── */

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[stripe-webhook] Database error: ${message}`);
    // Return 500 so Stripe WILL retry — this is a recoverable server error
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}