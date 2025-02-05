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
    router.push("/bye");
  }

  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center`}
    >
      {/* <video
        className="absolute h-screen w-screen top-0 left-0 -z-10 object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/assets/Pantallas.mp4" />
      </video> */}
      {!records && <Loader />}
      <div className="flex flex-col justify-center items-center sm:min-w-[820px] sm:pb-[200px] ">
        {top5 && (
          <div className="flex flex-col sm:mt-[100px] mt-10 z-50 gap-1 text-3xl sm:min-w-[820px] text-black w-[80%] ">
            <p className="oracle-regular sm:text-[60px] font-bold text-sm flex justify-center sm:mb-[80px] mb-[10px]">
              Mejores Resultados
            </p>
            <div className="oracle-regular flex justify-end sm:text-[48px] text-base">
              <div className="flex sm:gap-10 gap-3 sm:mb-5 sm:mr-5 mr-2">
                <p>Puntaje</p>
                <p>Tiempo</p>
              </div>
            </div>

            <div className="flex flex-col justify-center sm:min-w-[820px] gap-3">
              {top5.map((record, i) => (
                <div
                  key={i}
                  className={`flex sm:gap-5 justify-between items-center sm:min-w-[820px] text-base sm:text-[45px] rounded-xl sm:p-5 sm:rounded-3xl px-3 ${
                    i === 0
                      ? "bg-yellow-400"
                      : i === 1
                      ? "bg-slate-400"
                      : i === 2
                      ? "bg-orange-500"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex sm:gap-5 gap-2 items-center ">
                    <p className="mb-[5px]">{i + 1}</p>
                    <p className="oracle-regular line-clamp-1 leading-[1.2] mr-2">
                      {record.nombre}
                    </p>
                  </div>
                  <div className="flex sm:gap-[70px] gap-[20px] text-center">
                    <p className="oracle-regular sm:mr-[10px]">
                      {record.puntaje}
                    </p>
                    <p>{formatTime(record.tiempo)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {records && (
          <div className="flex flex-col z-50 text-3xl sm:min-w-[820px] text-black w-[80%] pt-3 sm:mt-20 mt-[10px]">
            <div className="flex justify-center">
              <p className="oracle-regular sm:text-[60px] font-bold text-sm flex justify-center sm:mb-[80px] mb-[20px]">
                Todos los participantes
              </p>
            </div>
            <div className="overflow-y-auto sm:max-h-[500px] max-h-[300px]">
              {records.map((record, i) => (
                <div
                  key={i}
                  className={`flex gap-5 justify-between items-center text-base sm:text-[45px] sm:p-5  rounded-xl p-1 px-3`}
                >
                  <div className="flex sm:gap-5 gap-2">
                    <p className="oracle-regular line-clamp-1 sm:leading-[1] mr-2 sm:h-[40px]">
                      {record.nombre}
                    </p>
                  </div>
                  <div className="flex sm:gap-[70px] gap-[20px] text-center">
                    <p className="oracle-regular sm:mr-[10px]">
                      {record.puntaje}
                    </p>
                    <p>{formatTime(record.tiempo)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {logged && (
          <button
            className="oracle-regular text-[48px] rounded-3xl absolute bottom-[170px] z-50 text-white py-2 px-8 bg-[#D6544E]"
            onClick={nextPage}
          >
            Finalizar
          </button>
        )}
      </div>
      {/* <img
        src="/assets/logo-oracle.svg"
        alt="Logo de oracle"
        className="absolute top-[10px] h-[20px] sm:h-[48px] sm:top-[100px] sm:left-[120px]"
      /> */}
    </div>
  );
}
