"use client";
import Link from "next/link";
import { Toaster } from "sonner";
import PulsatingButton from "@/components/ui/pulsating-button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className="w-screen h-screen bg-white flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-10">
        <Header />
      </div>
      <GetStartedButton router={router} />
      <Toaster richColors position="top-center" />
    </main>
  );
}

function Header() {
  return (
    <h1 className="text-[#007bff] font-bold  text-center text-8xl">
      astra
    </h1>
  );
}

function GetStartedButton({ router }: { router: any }) {
  return (
    <PulsatingButton
      className="bg-white text-black flex items-center justify-center"
      onClick={() => {
        router.push("/login");
      }}
    >
      <span className="flex items-center">
        Get Started <ChevronRight className="ml-2" />
      </span>
    </PulsatingButton>
  );
}
