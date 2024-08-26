import SignupForm from "@/components/auth/SignupForm";
import { Toaster } from "sonner";
export default function Signup() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <SignupForm />
      <Toaster richColors position="top-center" />
    </div>
  );
}
