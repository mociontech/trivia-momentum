"use client";

import { useState } from "react";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { register, searchBycode } from "@/utils/db";
import Loader from "@/components/loader";
import { useAttendee } from "@/context/AttendeeContext";

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
            if (!nameInput)
                return alert("Por favor, completa todos los campos");
            setLoading(true);

            setMail(emailInput); // Guarda el correo
            setLogged(true);
           const data = await searchBycode(nameInput);
         if (data?.attendee) {
        setAttendeeId(data.attendee.id);
        router.push("/trivia");
        }
        setLoading(false)
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
                src="/assets/IngresaCodigo.png"
                alt="DEELHR"
                className="absolute top-[450px] left-[200px] font"
            />
            {loading && <Loader />}

            {/* Formulario */}
            <div className="flex flex-col items-center gap-10 w-full max-w-[600px]">
                {/* Botón */}
                <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={nameInput}
                    onChange={(e) => {
                        let value = e.target.value;
                        if (value.length <= 6) {
                            setNameInput(value);
                        } else {
                            setNameInput(value.slice(0, 6));
                        }
                    }}
                    placeholder="TU ID"
                    className="oracle-regular font-normal text-[60px] h-[100px] w-full px-6 text-black
                                bg-[url('/assets/CampoVacio.png')] bg-no-repeat bg-center bg-cover 
                                rounded-3xl border-[2px] border-black mt-[10px] flex items-center text-center"
                />
                <button
                    className={`${montserrat.className} relative z-50 flex justify-center items-center 
                    w-[800px] h-[160px] px-10 py-6 text-center text-[50px] mt-[20px]`}
                    onClick={() => { submitForm(); }}
                >
                    <img src="/assets/Iniciar.png" alt="Registrarme" className="h-full w-auto" />
                </button>

            </div>
        </div>
    );
}
