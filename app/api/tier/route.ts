import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function GET(req: NextRequest): Promise<NextResponse> {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ tier: "watcher" }, { status: 200 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("tier")
      .eq("email", email.toLowerCase())
      .single();

    if (error || !data) {
      return NextResponse.json({ tier: "watcher" }, { status: 200 });
    }

    return NextResponse.json({ tier: data.tier ?? "watcher" }, { status: 200 });
  } catch {
    return NextResponse.json({ tier: "watcher" }, { status: 200 });
  }
}