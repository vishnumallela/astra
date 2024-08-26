import { NextResponse, NextRequest } from "next/server";   
import { login } from "@/utils/supabase-crud-operations/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const result = await login(email, password);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: 'Login failed', details: errorMessage }, { status: 500 });
  }
}