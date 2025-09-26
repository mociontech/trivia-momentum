"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/img/screens/Inicio1.jpg",
    "/img/screens/Inicio2.jpg",
    "/img/screens/Inicio3.jpg",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(0);
    }, 60000); // 1 minuto

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleImageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const nextPage = () => {
    router.push("/login");
  };

  return (
    <div
      onClick={handleImageClick}
      className="relative h-screen w-screen cursor-pointer"
    >
      {/* Imagen a pantalla completa */}
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-600"
      />

      {/* Botón solo visible en la última imagen */}
      {currentIndex === images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic en el botón avance la imagen
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

