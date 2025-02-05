"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  function nextPage() {
    router.push("/login");
  }

  // useEffect(() => {
  //   nextPage();
  // }, []);

  return (
    <div
      className="welcome relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
      {/* <video className="absolute top-0 left-0" autoPlay loop muted>
        <source src="/assets/Pantallas.mp4" />
      </video> */}
    </div>
  );
}
