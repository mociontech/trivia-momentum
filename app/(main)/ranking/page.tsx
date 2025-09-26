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
  const { logged } = useUser();
  const [records, setRecords] = useState<Record[] | null>(null);
  const [top5, setTop5] = useState<Record[] | null>(null);

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
    }

    getAllRecords();
  }, []);

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
    </div>
  );
}
