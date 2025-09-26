"use client";


import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/global";

type RegistroData = {
  userId: string;
  nombre: string;
  score: number;
  createdAt: string;
};

const STORAGE_KEY = "registrosParticipantes"; // ahora es un ARRAY en localStorage
function cargarRegistros(): RegistroData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function guardarRegistros(registros: RegistroData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
}

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [registros, setRegistros] = useState<RegistroData[]>([]);
  const { setUserId,setUserName } = useGlobal();

  const router = useRouter();
  useEffect(() => {
    setRegistros(cargarRegistros());
  }, []);

  const total = registros.length;

      function nextPage() {
      router.push("/trivia");
    }

  const validar = (): string | null => {
    if (!nombre.trim()) return "El nombre es obligatorio.";
    if (!cedula.trim()) return "La cédula es obligatoria.";
    const soloDigitos = /^\d{5,15}$/;
    if (!soloDigitos.test(cedula.trim()))
      return "La cédula debe contener solo números (5 a 15 dígitos).";
    return null;
  };

  const existeCedula = useMemo(
    () => (ced: string) => registros.some((r) => r.userId === ced.trim()),
    [registros]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const err = validar();
    if (err) {
      setError(err);
      return;
    }

    const ced = cedula.trim();
    if (existeCedula(ced)) {
      setError("Usuario ya participó (cédula duplicada).");
      return;
    }

    // const nuevo: RegistroData = {
    //   nombre: nombre.trim(),
    //   cedula: ced,
    //   createdAt: new Date().toISOString(),
    //   score: 0,
    // };

    // const updated = [...registros, nuevo];
    // setRegistros(updated);
    setUserId(ced);
    setUserName(nombre.trim());
    try {
      // guardarRegistros(updated);
      setSuccess("¡Registro completado!");
      setNombre("");
      setCedula("");
      nextPage();

    } catch (e) {
      setError("No se pudo guardar el registro en este navegador.");
    }
  };

  const resetearParaPruebas = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRegistros([]);
    setNombre("");
    setCedula("");
    setError(null);
    setSuccess(null);
  };

  return (
    <main className="bg min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-[730px] bg-transparent rounded-2xl shadow p-6">
        <h1 className=" font-gilroy font-bold text-5xl text-[48px]  text-white text-center mb-12">
          Registrate Para Participar
        </h1>


        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4"> {/* Aquí agrupamos solo los campos con separación uniforme */}
            <div>
              <label className="block text-white text-[clamp(18px,3vw,24px)] mb-2 font-gilroy font-normal">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre completo"
                className="
                  w-full 
                  text-[clamp(18px,3vw,28px)] 
                  rounded-2xl 
                  border border-gray-300 
                  px-6 py-6 
                  min-h-[70px]
                  outline-none 
                  text-slate-700
                  font-semibold
                  
                  placeholder-slate-700
                  focus:ring-2 focus:ring-blue-500
                  bg-[#c0d0eb]
                "
              />
            </div>

            <div>
              <label className="block text-white text-[clamp(18px,3vw,24px)] mb-2">
                Cédula
              </label>
              <input
                inputMode="numeric"
                value={cedula}
                onChange={(e) => setCedula(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="123456"
                className="
                  w-full 
                  text-[clamp(18px,3vw,28px)] 
                  rounded-2xl 
                  border border-gray-300 
                  px-6 py-6 
                  min-h-[70px]
                  outline-none 
                  placeholder-slate-700
                  text-slate-700
                  font-semibold
                  focus:ring-2 focus:ring-blue-500
                  bg-[#c0d0eb]
                "
              />
            </div>
          </div>

          <button
            type="submit"
            className="
              w-full 
              rounded-2xl 
              mt-20  /* ¡Ahora sí funciona! */
              px-6 py-6 
              bg-[#c0d0eb] 
              text-[clamp(24px,4vw,48px)]
              text-[#0032A0] 
              transition-all
              font-gilroy font-bold
            "
          >
            Participar
          </button>
        </form>



      </div>
    </main>
  );
}
