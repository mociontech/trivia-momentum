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
      <img
        src="/assets/logo.png"
        alt="Logo de wwtbam"
        className="w-[220px] h-auto"
      />
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
            placeholder="Escribe tu correo"
            className={`mill-regular bg-[#1c1665]/50 text-[25px] pl-[60px] p-4 rounded-lg`}
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
            placeholder="Escribe tu nombre"
            className={`mill-regular bg-[#1c1665]/50 text-[25px] pl-[60px] p-4 rounded-lg`}
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
          className="mill-regular font-bold flex items-center justify-center bg-gradient-to-r from-[#080d3d] via-[#084774] to-[#080d3d] text-[35px] rounded-lg"
          onClick={submitForm}
        >
          Jugar
        </button>
      </div>

      {/* <div className="flex flex-col">
        <section className="flex flex-col gap-7">
          <p className="text-white">Regístrate</p>

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
              className={`oracle-regular font-normal flex flex-1
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
              className={`oracle-regular font-normal text-[40px] flex flex-1 pl-[138px]
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
          className={`${montserrat.className} relative z-50 flex justify-center items-center text-3xl px-10 py-16 bg-[#D6544E] text-white h-[48px] text-center rounded-3xl mt-[40px]`}
          onClick={submitForm}
        ></button>
      </div> */}
    </div>
  );
}
