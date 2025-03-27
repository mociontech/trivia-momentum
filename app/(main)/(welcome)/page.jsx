"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function nextPage() {
    router.push("/trivia");
  }

  return (
    <div
      className="welcome relative gradient-bg h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    ></div>
  );
}
