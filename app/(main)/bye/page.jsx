"use client";
import { useRouter } from "next/navigation";

export default function ByePage() {
  const router = useRouter();

  function nextPage() {
    router.push("/");
  }
  return (
    <div
      className="relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
      <video className="absolute top-0 left-0" autoPlay loop muted>
        <source src="/assets/Pantallas.mp4" />
      </video>
    </div>
  );
}
