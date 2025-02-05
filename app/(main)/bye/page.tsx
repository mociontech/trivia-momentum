"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ByePage() {
  const router = useRouter();

  function nextPage() {
    router.push("/");
  }

  useEffect(() => {
    setTimeout(() => {
      nextPage();
    }, 3000);
  }, []);
  return (
    <div
      className="final relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
      {/* <video className="absolute top-0 left-0" autoPlay loop muted>
        <source src="/assets/Pantallas.mp4" />
      </video> */}
    </div>
  );
}
