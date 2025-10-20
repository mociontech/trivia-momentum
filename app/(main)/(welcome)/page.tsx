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
      className="relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
      <img
        src={"/assets/DEEL_FONDO.png"}
        alt="Fondo"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      Bienvenido
    </div>
  );
}
