"use client";
import { useRouter } from "next/navigation";

export default function ByePage() {
  const router = useRouter();

  function nextPage() {
    router.push("/");
  }
  return (
    <div
      className="score relative h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    ></div>
  );
}
