"use client";

import Loader from "@/components/loader";
import { useUser } from "@/hooks/useUser";
import { getRecords } from "@/utils/db";
import { formatTime } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { logged } = useUser();
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

      // setRecords(records);
      setTop5(sortedData);
    }

    getAllRecords();
  }, []);

  function nextPage() {
    router.push("/login");
  }

  return (
    <div
      className={`mill-regular h-screen w-screen flex flex-col justify-center gradient-bg text-white`}
    >
      {!top5 && <Loader />}
      <div className="flex flex-col">
        {top5 && (
          <div className="flex flex-col sm:mt-[100px] z-50 gap-1 text-3xl bg-gradient-to-b from-[#e91f1f] to-[#000000] max-h-screen overflow-y-auto overflow-x-hidden px-4 py-2">
            <p className="text-[30px] font-bold flex justify-center">
              Mejores Resultados
            </p>
            <div className="flex justify-end text-[25px] text-base">
              <div className="flex gap-3 mr-[23px]">
                <p className="mr-[10px]">Puntaje</p>
                <p>Tiempo</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2">
              {top5.map((record, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center text-base rounded-xl sm:rounded-3xl px-3 py-1 ${
                    i === 0
                      ? "bg-gradient-to-r from-[#c37900] via-[#fbe86a] to-[#c37900] text-[#33200f]"
                      : i === 1
                      ? "bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 text-[#33200f]"
                      : i === 2
                      ? "bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 text-[#33200f]"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex gap-2 items-center text-[22px]">
                    <p>{i + 1}</p>
                    <div className="flex flex-col gap-0">
                      <p className="line-clamp-1 mr-2">{record.nombre}</p>
                      <p className="text-[10px] -mt-2">{record.correo}</p>
                    </div>
                  </div>
                  <div className="flex gap-[20px] text-center text-[20px]">
                    <p>{record.puntaje}</p>
                    <p>{formatTime(record.tiempo)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {records && (
          <div className="flex flex-col z-50 text-3xl text-black pt-2 sm:mt-20 mt-[10px]">
            <div className="flex justify-center">
              <p className="oracle-regular font-bold text-lg flex justify-center mb-[20px]">
                Todos los participantes
              </p>
            </div>
            <div className="overflow-y-auto sm:max-h-[500px] max-h-[300px]">
              {records.map((record, i) => (
                <div
                  key={i}
                  className={`flex gap-5 justify-between items-center text-base sm:text-[45px] sm:p-5  rounded-xl p-1 px-3`}
                >
                  <div className="flex gap-2">
                    <p className="oracle-regular line-clamp-1 sm:leading-[1] mr-2 sm:h-[35px]">
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
            className="mill-regular text-[20px] rounded-lg mx-2 z-50 text-white py-2 px-8 bg-gradient-to-r from-[#080d3d] via-[#084774] to-[#080d3d]"
            onClick={nextPage}
          >
            Regresar
          </button>
        )} */}
      </div>
    </div>
  );
}
