"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useGlobal } from "@/context/global";

type RegistroData = {
  userId: string;
  nombre: string;
  score: number;
  createdAt: string;
};

const STORAGE_KEY = "registrosParticipantes";

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

export default function ByePage() {
  const router = useRouter();
  const { score, setScore, userName, userId } = useGlobal();

  const hasSavedRef = useRef(false);
  const initialScoreRef = useRef<number>(score);

  useEffect(() => {
    if (hasSavedRef.current) return;
    hasSavedRef.current = true;

    const registros = cargarRegistros();

    // Buscar si ya existe un registro con ese userId
    const idx = registros.findIndex((r) => r.userId === String(userId));

    if (idx >= 0) {
      // Si ya existe, actualizamos solo el score
      registros[idx] = {
        ...registros[idx],
        score: initialScoreRef.current,
      };
    } else {
      // Si no existe, lo creamos
      registros.push({
        userId: String(userId),
        nombre: userName || "Anónimo",
        score: initialScoreRef.current,
        createdAt: new Date().toISOString(),
      });
    }

    guardarRegistros(registros);
  }, [userId, userName]);

  function nextPage() {
    setScore(0);
    router.push("/");
  }

  return (
    <div
      className="bg-blue-800 relative h-screen w-screen flex flex-col justify-center items-center"
      onClick={nextPage}
    >
      <p className="text-white text-6xl font-gilroy  font-normal text-[68px]">Gracias por participar</p>
      <div className="font-gilroy  font-normal flex items-center text-gray-200 text-[62px] gap-3 mb-10 mt-[20px]">
        <input
          type="text"
          value={`${score}/10`}
          disabled
          className="w-[230px] bg-transparent rounded-[16px] text-center pt-3"
          readOnly
        />
      </div>
    </div>
  );
}
