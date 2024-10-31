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
      const response = await register(nameInput, emailInput);

      if (response === "existing") {
        setRegistered(true);
        setLoading(false);
        return;
      }

      router.push("/trivia");
    } catch (error) {
      console.log({ error: error });
    }
  }

  return (
    <div className="h-screen w-screen gradient-bg flex flex-col justify-center items-center">
      <p className="bg-[#E1251B] w-screen flex justify-center py-5 border-y border-white">
        <img
          src="/assets/logo.png"
          alt="Logo de wwtbam"
          className="w-[220px] h-auto"
        />
      </p>
      {loading && <Loader />}

      <div className="flex flex-col justify-center gap-3">
        <p className="mill-regular flex justify-center font-bold text-[38px] text-white">
          Regístrate
        </p>
        <div className="relative flex">
          <label htmlFor="name">
            <img
              src="/assets/name.svg"
              alt="Icono de una persona"
              className="absolute z-50 h-[25px] left-[25px] top-[22px]"
            />
          </label>
          <input
            type="text"
            id="name"
            value={nameInput}
            placeholder="Escribe tu nombre"
            className={`mill-regular bg-[#4D4D4D] border border-black text-[20px] pl-[60px] p-4 rounded-lg`}
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
              className="absolute z-50 h-[25px] left-[15px] top-[22px]"
            />
          </label>
          <input
            type="email"
            id="email"
            value={emailInput}
            placeholder="Escribe tu correo"
            className={`mill-regular bg-[#4D4D4D] border border-black text-[20px] pl-[60px] p-4 rounded-lg`}
            autoComplete="off"
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
          />
        </div>
        {registered && (
          <p className="flex justify-center oracle-regular text-white z-50 text-[20px]">
            ¡Ya has participado!
          </p>
        )}
        <button
          className="mill-regular font-bold flex items-center justify-center bg-[#E1251B] text-[35px] rounded-lg"
          onClick={submitForm}
        >
          Jugar
        </button>
      </div>
    </div>
  );
}
