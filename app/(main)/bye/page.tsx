"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "@/context/global";

type RegistroData = {
  userId: string;
  nombre: string;
  attempts: number[]; // Array con todos los scores
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

  const [showImage, setShowImage] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [mensajeEspecial, setMensajeEspecial] = useState("");

  useEffect(() => {
    if (hasSavedRef.current) return;
    hasSavedRef.current = true;

    const registros = cargarRegistros();
    const idx = registros.findIndex((r) => r.userId === String(userId));
    const currentScore = initialScoreRef.current;

    let updatedAttempts: number[] = [];

    if (idx >= 0) {
      const user = registros[idx];
      updatedAttempts = [...(user.attempts || []), currentScore];

      registros[idx] = {
        ...user,
        attempts: updatedAttempts,
      };
    } else {
      updatedAttempts = [currentScore];

      registros.push({
        userId: String(userId),
        nombre: userName || "Anónimo",
        attempts: updatedAttempts,
        createdAt: new Date().toISOString(),
      });
    }

    guardarRegistros(registros);
    if (updatedAttempts.length === 1 && currentScore > 7) {
      setMensajeEspecial("¡Prepárate para la segunda ronda!");
    } else if (updatedAttempts.length === 2 && currentScore >= 7) {
      setMensajeEspecial("¡Lo lograste!");
    }
  }, [userId, userName]);

  function handleClick() {
    if (clicked) return;

    setClicked(true);
    setShowImage(true);

    const registros = cargarRegistros();
    const userData = registros.find((r) => r.userId === String(userId));
    const currentScore = initialScoreRef.current;
    const numAttempts = userData?.attempts?.length || 1;

    setTimeout(() => {
      setScore(0);
      if (currentScore >= 7 && numAttempts < 2) {
        router.push("/trivia");
      } else {
        router.push("/");
      }
    }, 2000);
  }

  return (
    <div
      className="bg relative h-screen w-screen flex flex-col justify-center items-center"
      onClick={handleClick}
    >
      {showImage && (
        <img
          src="/img/screens/Final.jpg"
          alt="Gracias"
          className="absolute inset-0 w-full h-full object-cover z-50"
        />
      )}

      {!showImage && (
        <>
          <p className="text-white text-6xl font-gilroy font-bold text-[68px] mb-10">
            Gracias por participar
          </p>
          <p className="text-white text-6xl font-gilroy font-normal text-[42px]">
            Tu puntaje fue:
          </p>
          <div className="font-gilroy font-normal flex items-center text-gray-200 text-[62px] gap-3 mb-10 mt-[20px]">
            <input
              type="text"
              value={`${score}/10`}
              disabled
              className="w-[230px] bg-transparent font-gilroy font-bold rounded-[16px] text-center pt-3"
              readOnly
            />
          </div>

          {mensajeEspecial && (
            <p className="text-white text-4xl font-gilroy font-semibold mt-4">
              {mensajeEspecial}
            </p>
          )}
        </>
      )}
    </div>
  );
}
