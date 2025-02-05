"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function nextPage() {
    router.push("/login");
    const data = localStorage.getItem("data-local");
    if (data === null) {
      localStorage.setItem("data-local", "[]");
    } else {
    }
  }

  return (
    <div
      className="welcome relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    ></div>
  );
}
