"use client";

import Loader from "@/components/loader";
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
      {!records && <Loader />}
      {top5 && (
        <div className="flex flex-col z-50 gap-3 text-3xl text-black w-[80%]">
          <p className="oracle-regular text-[80px] flex justify-center mb-[80px]">
            Top 5
          </p>
          <div className="oracle-regular flex justify-end text-[48px]">
            <div className="flex gap-10 mb-5 mr-5">
              <p>Puntaje</p>
              <p>Tiempo</p>
            </div>
          </div>
          {top5.map((record, i) => (
            <div
              key={i}
              className={`flex gap-5 justify-between items-center text-[45px] px-5 py-5 rounded-xl ${
                i === 0
                  ? "bg-yellow-400"
                  : i === 1
                  ? "bg-slate-400"
                  : i === 2
                  ? "bg-orange-500"
                  : "bg-transparent"
              }`}
            >
              <div className="flex gap-5">
                <p>{i + 1}</p>
                <p className="oracle-regular">{record.nombre}</p>
              </div>
              <div className="flex gap-[70px] text-center">
                <p className="oracle-regular mr-[10px]">{record.puntaje}</p>
                <p>{formatTime(record.tiempo)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {records && (
        <div className="flex flex-col z-50 text-3xl text-black w-[80%] pt-3 mt-20 ">
          <div className="flex justify-center">
            <p className="oracle-regular text-[45px] mb-10 flex justify-center">
              Todos los participantes
            </p>
          </div>
          <div className="overflow-y-auto max-h-[700px]">
            {records.map((record, i) => (
              <div
                key={i}
                className={`flex gap-5 justify-between items-center text-[45px] px-5 py-5 rounded-xl`}
              >
                <div className="flex gap-5">
                  <p className="oracle-regular">{record.nombre}</p>
                </div>
                <div className="flex gap-[70px] text-center">
                  <p className="oracle-regular mr-[10px]">{record.puntaje}</p>
                  <p>{formatTime(record.tiempo)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
