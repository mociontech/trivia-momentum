"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  function nextPage() {
    router.push("/trivia");
  }

  return (
    <div className="welcome relative h-screen w-screen flex justify-center items-center">
      <button
        onClick={nextPage}
        className=" bg-[#ddf44b00] w-[800px] h-[100px] rounded-3xl mt-[780px]"
      ></button>
    </div>
  );
}
