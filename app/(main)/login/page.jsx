"use client";

import { useState } from "react";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { register } from "@/utils/db";
import Loader from "@/components/loader";
import RegistroDinamico from "@/components/RegisterComp";

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

  const dataList = {
    nombre: {
      type: "text",
      value: "",
      imageRef: "",
      placeholder: "NOMBRE",
    },
    correo: {
      type: "text",
      value: "",
      imageRef: "",
      placeholder: "CORREO",
    },
    group1: {
      cc: {
        type: "number",
        value: "",
        imageRef: "",
        placeholder: "CC",
      },
      celular: {
        type: "number",
        value: "",
        imageRef: "",
        placeholder: "CELULAR",
      },
    },
  };

  async function submitForm(form) {
    try {
      setLoading(true);

      setMail(emailInput); // Guarda el correo
      setLogged(true);
      const response = await register(
        form.nombre.value,
        form.correo.value,
        form.group1.cc.value,
        form.group1.celular.value
      );

      console.log(response);

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
    <div className="login h-screen w-screen gradient-bg flex flex-col justify-center items-center">
      {loading && <Loader />}

      <div className="flex flex-col justify-center gap-3">
        <p className="mill-regular flex justify-center font-bold text-[70px] text-white">
          REGISTRO
        </p>
        <RegistroDinamico fields={dataList} onSubmit={submitForm} />
        {registered && (
          <p className="flex justify-center oracle-regular text-white z-50 text-[42px]">
            ¡Ya has participado!
          </p>
        )}
      </div>
    </div>
  );
}
