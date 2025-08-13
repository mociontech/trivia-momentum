"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { saveUserData } from "@/utils/db";
import { useEffect } from "react";
import { useGlobal } from "@/context/global";

export default function ByePage( { children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, code } = useUser();
  const { score, setScore, time, setTime } = useGlobal();
  function nextPage() {
    setScore(0);
    router.push("/");

  }

  useEffect(() => {
    async function saveData() {
      await saveUserData(code, data);
    }

    saveData();
  }, []);

  return (
    <div
      className="bye relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
      <div className="font-supermolot font-bold  flex items-center text-gray-200 text-[99px] gap-3 mb-10 mt-[400px]">
        <input
          type="text"
          id="id1"
          name="id1"
          autoComplete="off"
          value={`${score}/7`}
          disabled
          className="w-[230px] bg-transparent rounded-[16px] text-center pt-3"
          onChange={() => {}}
          maxLength={3}
        />
      </div>

 
    </div>
  );
}
