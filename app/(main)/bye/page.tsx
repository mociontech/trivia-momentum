"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { saveUserData } from "@/utils/db";
import { useEffect } from "react";

export default function ByePage() {
  const router = useRouter();
  const { score, data, code } = useUser();

  function nextPage() {
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
      className="score relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
      <div className="telegraf-bold flex items-center text-[#DEF44B] text-[80px] gap-3 mb-10 mt-[600px]">
        <input
          type="text"
          id="id1"
          name="id1"
          autoComplete="off"
          value={score}
          disabled
          className="w-[230px] bg-white/30 border-[3px] rounded-[16px] text-center pt-3"
          onChange={() => {}}
          maxLength={3}
        />
      </div>
    </div>
  );
}
