"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/img/screens/Inicio1.jpg",
    "/img/screens/Inicio2.jpg",
    "/img/screens/Inicio3.jpg",
  ];

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);


  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      setCurrentIndex(0); 
    }, 45000); 
  };

  // Manejar clics en la imagen
  const handleImageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetInactivityTimer(); // reiniciar el contador
  };


  useEffect(() => {
    resetInactivityTimer();

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  const nextPage = () => {
    router.push("/login");
  };

  return (
    <div
      onClick={handleImageClick}
      className="relative h-screen w-screen cursor-pointer"
    >
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-600"
      />

      {currentIndex === images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            nextPage();
          }}
          className="
            absolute top-1/2 left-1/2 transform -translate-x-1/2
            bg-[#c0d0eb] rounded-2xl
            w-[610px]
            h-[110px]
            text-[clamp(24px,4vw,48px)]
            text-[#0032A0] font-bold
            px-6 py-3
            font-gilroy font-norma
            flex items-center justify-center
          "
        >
          ¡Despeguemos!
        </button>
      )}
    </div>
  );
}

