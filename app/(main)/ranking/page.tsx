"use client";

import Loader from "@/components/loader";
import { useUser } from "@/hooks/useUser";
import { getRecords, getRanking, saveScore } from "@/utils/db";
import { UserKavak } from "@/utils/types";
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
  const { logged, code, score } = useUser();
  const [records, setRecords] = useState<UserKavak[] | null>(null);
  const [top5, setTop5] = useState<UserKavak[] | null>(null);

  useEffect(() => {
    async function getAllRecords() {
      const records: Record[] = await getRecords();
      const ranking = await getRanking();
      // const valid = ranking.map((item) => {});
      console.log("RESULT: ", ranking);
      const filteredData = ranking.filter((item) => item.score && item.time);

      const sortedData = filteredData.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        } else {
          return a.time - b.time;
        }
      });

      setRecords(ranking);
      setTop5(sortedData.slice(0, 3));
    }

    getAllRecords();
  }, []);

  function nextPage() {
    router.push("/bye");
  }

  function capitalizeWords(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div
      className={`ranking h-screen w-screen flex flex-col justify-center items-center`}
    >
      {!records && <Loader />}
      <div className="flex flex-col justify-center items-center sm:min-w-[820px] sm:pb-[200px] ">
        {top5 && (
          <div className="flex flex-col sm:mt-[100px] mt-10 z-50 gap-1 text-3xl sm:min-w-[820px] text-white w-[80%] ">
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
                  className={`flex sm:gap-5 justify-between items-center sm:min-w-[820px] text-base text-black sm:text-[45px] rounded-xl sm:p-5 sm:rounded-3xl px-3 bg-white`}
                >
                  <div className="flex sm:gap-5 gap-2 items-center ">
                    <p className="font-bold mb-[5px]">{i + 1}</p>
                    <p className="oracle-regular mr-2">
                      {capitalizeWords(record.name)}
                    </p>
                  </div>
                  <div className="flex sm:gap-[70px] gap-[20px] text-center">
                    <p className="oracle-regular sm:mr-[10px]">
                      {record.score}
                    </p>
                    <p>{formatTime(record.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {records && (
          <div className="flex flex-col z-50 text-3xl sm:min-w-[820px] text-white w-[80%] pt-3 sm:mt-20 mt-[10px]">
            <div className="flex justify-center">
              <p className="oracle-regular sm:text-[60px] font-bold text-sm flex justify-center sm:mb-[80px] mb-[20px]">
                Todos los participantes
              </p>
            </div>
            <div className="overflow-y-auto sm:max-h-[300px] max-h-[250px]">
              {records.map((record, i) => (
                <div
                  key={i}
                  className={`flex gap-5 justify-between items-center text-base sm:text-[45px] sm:p-5  rounded-xl p-1 px-3`}
                >
                  <div className="flex sm:gap-5 gap-2">
                    <p className="oracle-regular sm:leading-[1] mr-2 sm:h-[35px]">
                      {record.name}
                    </p>
                  </div>
                  <div className="flex sm:gap-[70px] gap-[20px] text-center">
                    <p className="oracle-regular sm:mr-[10px]">
                      {record.score}
                    </p>
                    <p>{formatTime(record.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {logged && (
          <button
            className="oracle-regular text-[48px] rounded-3xl absolute bottom-[350px] z-50 text-black py-2 px-8 bg-[#DEF44B]"
            onClick={nextPage}
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
