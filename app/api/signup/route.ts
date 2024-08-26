import { NextResponse , NextRequest } from "next/server";
import { signup } from "@/utils/supabase-crud-operations/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();
    const result = await signup(email, password, firstName, lastName);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: 'Signup failed', details: errorMessage }, { status: 500 });
  }
}