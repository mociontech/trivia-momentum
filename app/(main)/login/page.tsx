"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { register } from "@/utils/db";
import Loader from "@/components/loader";

export default function LoginPage() {
  const router = useRouter();
  const [nameInput, setNameInput] = useState("");
  const [cedulaInput, setCedulaInput] = useState("");
  const [telefonoInput, setTelefonoInput] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCedula, setLogged } = useUser();

  async function submitForm() {
    try {
      // Checkea que ningun campo este vacio
      if (!nameInput || !cedulaInput || !telefonoInput)
        return alert("Por favor, completa todos los campos");
      setLoading(true);

      setCedula(cedulaInput); // Guarda la cedula
      setLogged(true);
      register(nameInput, cedulaInput, telefonoInput);

      router.push("/trivia");
    } catch (error) {
      console.log({ error: error });
    }
  }

  return (
    <div className="login h-screen w-screen flex flex-col justify-center items-center relative">
      {loading && <Loader />}

      <div className="flex flex-col w-[600px] gap-8 ">
        <img src="/label_login.png" alt="registrate" />
        <input
          type="text"
          id="name"
          value={nameInput}
          placeholder="Tu nombre"
          className={`oracle-regular font-normal text-[40px] h-[100px] pl-[1em]
              text-black border-[1.5px] border-[#EBDB14]`}
          autoComplete="off"
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
        <input
          type="text"
          id="cedula"
          value={cedulaInput}
          placeholder="Tu numero de cedula"
          className={`oracle-regular font-normal text-[40px] h-[100px] pl-[1em]
              text-black border-[1.5px] border-[#EBDB14]`}
          autoComplete="off"
          onChange={(e) => {
            setCedulaInput(e.target.value);
          }}
        />

        <input
          type="number"
          id="telefono"
          value={telefonoInput}
          className={`oracle-regular font-normal text-[40px] h-[100px] pl-[1em]
              text-black border-[1.5px] border-[#EBDB14]`}
          placeholder="Tu celular"
          autoComplete="off"
          onChange={(e) => {
            setTelefonoInput(e.target.value);
          }}
        />
        <button
          className={`oracle-regular relative z-50 flex justify-center items-center text-3xl px-10
         h-[50px] text-center text-[50px] rounded-3xl mt-[40px]`}
          onClick={submitForm}
        >
          <img
            src="/btn_init.png"
            className="w-screen h-[2em]"
            alt="comenzar"
          />
        </button>
      </div>

      {registered && (
        <p className="relative oracle-regular text-[#D6544E] z-50 text-[48px]">
          ¡Ya has participado!
        </p>
      )}
    </div>
  );
}
