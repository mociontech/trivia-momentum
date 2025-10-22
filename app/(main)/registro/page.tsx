"use client";

import { useState } from "react";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { register } from "@/utils/db";
import Loader from "@/components/loader";
import { useAttendee } from '@/context/AttendeeContext';

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
    const [numberInput, setNumberInput] = useState("");
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setMail, setLogged } = useUser();
    const { setAttendeeId } = useAttendee();

    async function submitForm() {
        try {
            // Checkea que ningun campo este vacio
            if (!nameInput || !emailInput || !numberInput)
                return alert("Por favor, completa todos los campos");
            setLoading(true);

            setMail(emailInput); // Guarda el correo
            setLogged(true);
            const data = await register(nameInput, emailInput);
          // 🔹 Guarda el ID en el contexto
        if (data?.attendee) {
        setAttendeeId(data.attendee.id);
        }
        router.push(`/codigo_id?code=${data.attendee.code}`);
        } catch (error) {
            console.log({ error: error });
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center relative">
            <img
                src={"/assets/DEEL_FONDO.png"}
                alt="Fondo"
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            />
            <img
                src="/assets/DEEL_LOGO.png"
                alt="DEEL LOGO"
                className="absolute top-[150px] left-[380px] font"
            />
            <img
                src="/assets/REGISTRO.png"
                alt="DEELHR"
                className="absolute top-[450px] left-[300px] font"
            />
            {loading && <Loader />}

            {/* Formulario */}
            <div className="flex flex-col items-center gap-10 w-full max-w-[600px]">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nameInput}
                    className="oracle-regular font-normal text-[60px] h-[100px] w-full px-6 text-black bg-white/15 rounded-3xl border-[2px] border-black mt-[150px]"
                    autoComplete="off"
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={emailInput}
                    className="oracle-regular font-normal text-[60px] h-[100px] w-full px-6 text-black bg-white/15 rounded-3xl border-[2px] border-black"
                    autoComplete="off"
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Número"
                    value={numberInput}
                    className="oracle-regular font-normal text-[60px] h-[100px] w-full px-6 text-black bg-white/15 rounded-3xl border-[2px] border-black"
                    autoComplete="off"
                    onChange={(e) => setNumberInput(e.target.value)}
                />

                {/* Botón */}
                <button
                    className={`${montserrat.className} relative z-50 flex justify-center items-center 
                    w-[800px] h-[160px] px-10 py-6 text-center text-[50px] mt-[200px]`}
                    onClick={() => { submitForm(); }}
                >
                    <img src="/assets/Registrarme.png" alt="Registrarme" className="h-full w-auto" />
                </button>

            </div>
        </div>
    );
}
