"use client";


import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// ✅ Vista lista para pegar en: app/registro/page.tsx (Next.js + TS)
// Registra múltiples personas en localStorage (array) y evita duplicados por cédula.

type RegistroData = {
  nombre: string;
  cedula: string; // solo dígitos
  createdAt: string; // ISO
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
    () => (ced: string) => registros.some((r) => r.cedula === ced.trim()),
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

    const nuevo: RegistroData = {
      nombre: nombre.trim(),
      cedula: ced,
      createdAt: new Date().toISOString(),
    };

    const updated = [...registros, nuevo];
    setRegistros(updated);
    try {
      guardarRegistros(updated);
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
    <main className="bg-blue-800 min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-2">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Cédula</label>
            <input
              inputMode="numeric"
              value={cedula}
              onChange={(e) => setCedula(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="123456"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        <button
          type="submit"
          className="w-full rounded-lg px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 text-[clamp(14px,2.2vw,18px)]"
        >
          Participar 
        </button>
        </form>

{/* 
        {registros.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700">Últimos registros</h2>
            <ul className="mt-2 max-h-40 overflow-auto divide-y">
              {[...registros].slice(-5).reverse().map((r, idx) => (
                <li key={idx} className="py-2 text-sm text-gray-700 flex items-center justify-between">
                  <span className="truncate mr-2">{r.nombre}</span>
                  <span className="font-mono text-gray-500">{r.cedula}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={resetearParaPruebas}
              className="mt-4 w-full rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Resetear (solo pruebas)
            </button>
          </div>
        )} */}

      </div>
    </main>
  );
}
