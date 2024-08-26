import LoginForm from "@/components/auth/LoginForm";
import { Toaster } from "sonner";
export default function Login() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <LoginForm />
      <Toaster richColors position="top-center" />
    </div>
  );
}