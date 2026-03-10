import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.auth.admin.generateLink({
    type:       "recovery",
    email:      email.toLowerCase(),
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    },
  });

  if (error) {
    console.error("[reset-password] Supabase error:", error.message);
    // Return 200 regardless — don't reveal whether the email exists
  }

  // Always return success so we don't leak which emails are registered
  return NextResponse.json({ ok: true }, { status: 200 });
}