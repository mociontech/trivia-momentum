"use client";

import { getRecords } from "@/utils/db";
import { formatTime } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [records, setRecords] = useState();
  const [top5, setTop5] = useState();

  useEffect(() => {
    async function getAllRecords() {
      const records = await getRecords();
      const filteredData = records.filter(
        (item) => item.puntaje !== "" && item.tiempo !== ""
      );

      // Ordenamos primero por puntaje descendente y luego por tiempo ascendente
      const sortedData = filteredData.sort((a, b) => {
        if (b.puntaje !== a.puntaje) {
          return b.puntaje - a.puntaje; // Orden descendente por puntaje
        } else {
          return a.tiempo - b.tiempo; // Orden ascendente por tiempo si los puntajes son iguales
        }
      });

      console.log(sortedData);

      setRecords(records);
      setTop5(sortedData.slice(0, 5));
    }

    getAllRecords();
  }, []);

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/assets/Pantallas.mp4" />
      </video>
      {top5 && (
        <div className="flex flex-col z-50 text-3xl text-black w-[80%]">
          <div className="flex justify-between">
            <p>Top 5</p>
            <div className="flex gap-16">
              <p>Puntaje</p>
              <p>Tiempo</p>
            </div>
          </div>
          {top5.map((record, i) => (
            <div key={i} className="flex gap-5 justify-between">
              <div className="flex gap-5">
                <p>{i + 1}</p>
                <p>{record.nombre}</p>
              </div>
              <div className="flex gap-[70px] text-center">
                <p>{record.puntaje}</p>
                <p>{formatTime(record.tiempo)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {records && (
        <div className="flex flex-col z-50 text-3xl text-black w-[80%] mt-20 overflow-y-auto max-h-[700px]">
          <div className="flex justify-between">
            <p>Todos los participantes</p>
          </div>
          {records.map((record, i) => (
            <div key={i} className="flex gap-5 justify-between">
              <div className="flex gap-5">
                <p>{record.nombre}</p>
              </div>
              <div className="flex gap-[70px] text-center">
                <p>{record.puntaje}</p>
                <p>{formatTime(record.tiempo)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
