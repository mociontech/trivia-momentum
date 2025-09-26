"use client";

import Loader from "@/components/loader";
import { useUser } from "@/hooks/useUser";
import { getRecords } from "@/utils/db";
import { formatTime } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Record {
  id: string;
  nombre: string;
  puntaje: number;
  tiempo: number;
}

export default function LoginPage() {
  const router = useRouter();
  const { logged, mail } = useUser();
  const [records, setRecords] = useState<Record[] | null>(null);
  const [top5, setTop5] = useState<Record[] | null>(null);
  const [userScore, setUserScore] = useState<number>(0);

  useEffect(() => {
    async function getAllRecords() {
      const records: Record[] = await getRecords();
      console.log('DATA: ', records)
      const filteredData = records.filter(
        (item) => item.puntaje && item.tiempo
      );

      const sortedData = filteredData.sort((a, b) => {
        if (b.puntaje !== a.puntaje) {
          return b.puntaje - a.puntaje;
        } else {
          return a.tiempo - b.tiempo;
        }
      });

      setRecords(records);
      setTop5(sortedData.slice(0, 3));
      
      // Encontrar el puntaje del usuario actual
      const currentUserRecord = records.find(record => record.id === mail);
      if (currentUserRecord) {
        // Convertir puntaje de puntos a número de preguntas correctas (dividir por 20)
        setUserScore(Math.floor(currentUserRecord.puntaje / 20));
      }
    }

    getAllRecords();
  }, [mail]);

  function nextPage() {
    router.push("/login");
  }

  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center cursor-pointer`}
      onClick={nextPage}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(/assets/preguntas/final.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Puntaje del Usuario */}
      <div className="relative flex justify-center items-center mb-8 z-50 mt-48">
        <div 
          className="w-[800px] h-[180px] rounded-3xl flex items-center justify-center"
          style={{
            backgroundImage: 'url(/assets/background-id-section.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="text-center">
            <h2 className="text-white text-6xl font-bold mb-4">¡FELICIDADES!</h2>
            <p className="text-white text-4xl font-bold">
              Calificación: {userScore}/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
