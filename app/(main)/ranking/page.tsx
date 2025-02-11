"use client";

import Loader from "@/components/loader";
import { useUser } from "@/hooks/useUser";
import { getRanking } from "@/utils/db";
import { UserKavak } from "@/utils/types";
import { formatTime } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { logged } = useUser();
  const [records, setRecords] = useState<UserKavak[] | null>(null);
  const [top5, setTop5] = useState<UserKavak[] | null>(null);

  useEffect(() => {
    async function getAllRecords() {
      const ranking = await getRanking();
      const filteredData = ranking.filter((item) => item.score && item.time);

      const sortedData = filteredData.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        } else {
          return a.time - b.time;
        }
      });

      setRecords(ranking);
      setTop5(sortedData);
    }

    getAllRecords();
  }, []);

  function nextPage() {
    router.push("/bye");
  }

  function capitalizeWords(str: string) {
    if (str) {
      return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return "";
  }

  return (
    <div
      className={`ranking h-screen w-screen flex flex-col justify-center items-center`}
    >
      {!records && <Loader />}
      <div className="flex flex-col justify-center items-center sm:min-w-[820px] sm:pb-[200px] ">
        {top5 && (
          <div className="flex flex-col sm:mt-[100px] mt-10 z-50 gap-1 text-3xl sm:min-w-[820px] text-white w-[80%] ">
            <p className="telegraf-bold sm:text-[60px] font-bold text-sm flex justify-center sm:mb-[80px] mb-[10px]">
              Mejores Resultados
            </p>
            <div className="telegraf-bold flex justify-end sm:text-[48px] text-base">
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
                    <p className="telegraf-regular mr-2">
                      {capitalizeWords(record.name)}
                    </p>
                  </div>
                  <div className="telegraf-regular flex sm:gap-[70px] gap-[20px] text-center">
                    <p className="sm:mr-[10px]">{record.score}</p>
                    <p>{formatTime(record.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {logged && (
          <button
            className="telegraf-regular text-[48px] rounded-3xl absolute bottom-[350px] z-50 text-black py-2 px-8 bg-[#DEF44B]"
            onClick={nextPage}
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
