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
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setMail, setLogged } = useUser();

  async function submitForm() {
    try {
      // Checkea que ningun campo este vacio
      if (!nameInput || !emailInput)
        return alert("Por favor, completa todos los campos");
      setLoading(true);

      setMail(emailInput); // Guarda el correo
      setLogged(true);
      register(nameInput, emailInput);

      router.push("/trivia");
    } catch (error) {
      console.log({ error: error });
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <video className="absolute top-0 left-0" autoPlay loop muted>
        <source src="/assets/Pantallas.mp4" />
      </video>
      <img
        src="/assets/logo-oracle.svg"
        alt="Logo de humano"
        className="absolute top-[100px] left-[120px] font"
      />
      {loading && <Loader />}

      <div className="flex flex-col w-auto">
        <section className="flex flex-col gap-7">
          <img
            src="/assets/registrate.svg"
            alt="Registrate text"
            className="relative z-50 mb-12 h-[100px]"
          />

          <div className="relative flex">
            <label htmlFor="name">
              <img
                src="/assets/name.svg"
                alt="Icono de una persona"
                className="absolute z-50 text-black/40 top-[30px] left-[68px]"
              />
            </label>
            <input
              type="text"
              id="name"
              value={nameInput}
              placeholder="Escribe tu nombre"
              className={`oracle-regular font-normal text-[40px] flex flex-1 h-[110px] w-[855px] pl-[138px] 
              text-black bg-white/15 rounded-3xl border-[1.5px] border-[#D6544E]`}
              autoComplete="off"
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
          </div>
          <div className="relative flex">
            <label htmlFor="email">
              <img
                src="/assets/email.svg"
                alt="Icono de una persona"
                className="absolute z-50 text-black/40 top-[30px] left-[56px]"
              />
            </label>
            <input
              type="email"
              id="email"
              value={emailInput}
              className={`oracle-regular font-normal text-[40px] flex flex-1 h-[110px] w-[855px] pl-[138px]
              text-black bg-white/15 rounded-3xl border-[1.5px] border-[#D6544E]`}
              placeholder="Escribe tu correo"
              autoComplete="off"
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
            />
          </div>
          {registered && (
            <p className="relative oracle-regular text-[#D6544E] z-50 text-[48px]">
              ¡Ya has participado!
            </p>
          )}
        </section>
        <button
          className={`${montserrat.className} relative z-50 flex justify-center items-center text-3xl px-10 py-16 
        bg-[#D6544E] text-white h-[48px] text-center text-[50px] rounded-3xl mt-[40px]`}
          onClick={submitForm}
        >
          <img src="/assets/juega-ahora.svg" alt="juega ahora text" />
        </button>
      </div>
    </div>
  );
}
