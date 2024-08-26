//creating supabase server client
import { createClient } from "@/utils/supabase/server";

//login
export async function login(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return { data };
}

//signup
export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName,
      },
      
    },
  });
  if (error) throw error;
  return { data };
}

//forgot-password
export async function forgotPassword(email: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "/reset-password-confirmation",
  });
  if (error) throw error;
  return { data };
}

