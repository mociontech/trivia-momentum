"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  function nextPage() {
    router.push("/login");
  }

  useEffect(() => {
    nextPage();
  }, []);

  return (
    <div
      className="relative gradient-bg h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
    </div>
  );
}
