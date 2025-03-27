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
  const [ciudaPaisInput, setCiudadPaisInput] = useState("");
  const [generoInput, setGeneroInput] = useState("");
  const [terminosInput, setTerminosInput] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCedula, setLogged } = useUser();

  async function submitForm() {
    try {
      // Checkea que ningun campo este vacio
      if (
        !nameInput ||
        !cedulaInput ||
        !telefonoInput ||
        !ciudaPaisInput ||
        !generoInput
        
      )
        return alert("Por favor, completa todos los campos");
      setLoading(true);

      setCedula(cedulaInput); // Guarda la cedula
      setLogged(true);
      register(nameInput, cedulaInput, telefonoInput, ciudaPaisInput, generoInput);

      router.push("/trivia");
    } catch (error) {
      console.log({ error: error });
    }
  }

  return (
    <div className="login h-screen w-screen flex flex-col justify-center items-center relative">
      {loading && <Loader />}

      <div className="flex flex-col w-[600px] gap-8 ">
        <img className="mb-5" src="/label_login.png" alt="registrate" />
        <input
          type="text"
          id="name"
          value={nameInput}
          placeholder="Tu nombre"
          className={`placeholder:text-center text-center oracle-regular font-normal text-[40px] h-[80px]
              text-[#34244D] border-[1.5px] border-[#EBDB14]`}
          autoComplete="off"
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
        <input
          type="text"
          id="ciudadPais"
          value={ciudaPaisInput}
          placeholder="Tu ciudad/pais"
          className={`placeholder:text-center text-center oracle-regular font-normal text-[40px] h-[80px]
              text-[#34244D] border-[1.5px] border-[#EBDB14]`}
          autoComplete="off"
          onChange={(e) => {
            setCiudadPaisInput(e.target.value);
          }}
        />
        <input
          type="text"
          id="genero"
          value={generoInput}
          placeholder="Tu genero"
          className={`placeholder:text-center text-center oracle-regular font-normal text-[40px] h-[80px]
              text-[#34244D] border-[1.5px] border-[#EBDB14]`}
          autoComplete="off"
          onChange={(e) => {
            setGeneroInput(e.target.value);
          }}
        />
        <input
          type="text"
          id="cedula"
          value={cedulaInput}
          placeholder="TU CÉDULA"
          className={`placeholder:text-center text-center oracle-regular font-normal text-[40px] h-[80px]
              text-[#34244D] border-[1.5px] border-[#EBDB14]`}
          autoComplete="off"
          onChange={(e) => {
            setCedulaInput(e.target.value);
          }}
        />

        <input
          type="number"
          id="telefono"
          value={telefonoInput}
          className={`placeholder:text-center text-center oracle-regular text-[40px] h-[80px]
              text-[#34244D] border-[1.5px] border-[#EBDB14]`}
          placeholder="Tu numero celular"
          autoComplete="off"
          onChange={(e) => {
            setTelefonoInput(e.target.value);
          }}
        />
        <div className="flex justify-center oracle-regular text-[#EBDB14]">
          <input
            value={terminosInput}
            onChange={(e) => setTerminosInput(e.target.value)}
            className="w-[2em] "
            type="checkbox"
          />
          <a href="" className="ml-5">
            Politica de tratamiento de datos
          </a>
        </div>
        <button
          className={`bg-[url('/btn_init.png')] oracle-regular relative z-50 flex justify-center items-center text-3xl px-10
         h-[90px] bg-cover text-center text-[50px] mt-[40px]`}
          onClick={submitForm}
        ></button>
      </div>

      {registered && (
        <p className="relative oracle-regular text-[#EBDB14] z-50 text-[48px]">
          ¡Ya has participado!
        </p>
      )}
    </div>
  );
}
