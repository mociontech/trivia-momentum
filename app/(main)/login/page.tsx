"use client";

import { useState } from "react";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { register } from "@/utils/db";
import Loader from "@/components/loader";

const Vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <img
        src={"/assets/DEEL_FONDO.png"}
        alt="Fondo"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <img
        src="/assets/DEEL_HR.png"
        alt="DEELHR"
        className="absolute top-[250px] left-[120px] font"
      />
      {loading && <Loader />}

      <div className="flex flex-col w-auto">
        <section className="flex flex-col gap-">
          <img
            src="/assets/Bienvenida.png"
            alt="Bienvenida"
            className="relative z-50 mb-2 h-[480px]"
          />

        </section>
        <button
          className={`${montserrat.className} relative z-50 flex justify-center items-center text-3xl px-10 py-16 text-center text-[50px]`}
          onClick={() => router.push("/registro")}
        >

          <img src="/assets/Iniciar.png" alt="juega ahora text" />
        </button>
        <button
          className={`${montserrat.className} relative z-50 flex justify-center items-center text-3xl px-10 py-0 text-center text-[50px]`}
          onClick={() => router.push("/codigo_teclado")}
        >

          <img src="/assets/YaTengoID.png" alt="juega ahora text" />
        </button>

        <img
          src="/assets/DEEL_LOGO.png"
          alt="DEEL LOGO"
          className="absolute top-[1550px] left-[600px] font"
        />

      </div>
    </div>
  );
}
