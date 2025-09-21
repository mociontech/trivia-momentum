"use client";

import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  function nextPage() {
    router.push("/login");
  }

  return (
    <div className="bg-blue-800 relative h-screen w-screen flex justify-center items-center">
      <button
        onClick={nextPage}
        className="
          w-[60%] max-w-md h-[5vh] min-h-[30px] 
          bg-gray-400 text-white rounded 
          hover:bg-blue-600
          text-[clamp(14px,2vw,22px)] 
          px-4 py-2
        "
      >
        !Despeguemos!
      </button>


    </div>
  );
}
