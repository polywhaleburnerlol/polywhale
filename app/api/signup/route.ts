import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Basic server-side guard (client already validated, this is the safety net)
  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const message =
      error.message.includes("already registered") ||
      error.message.includes("already been registered")
        ? "An account with this email already exists. Try signing in."
        : error.message.includes("rate limit")
        ? "Too many attempts. Please wait a moment and try again."
        : "Something went wrong. Please try again.";

    return NextResponse.json({ message }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}