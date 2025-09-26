"use client";

import { useRouter } from "next/navigation";
import { Be_Vietnam_Pro } from "next/font/google";

const Vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export default function InstruccionesPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/trivia");
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-900 p-4">
      <div 
        className="flex flex-col justify-center items-center relative mx-auto"
        style={{
          width: '100%',
          height: '100vh',
          maxWidth: '1080px',
          maxHeight: '1920px',
          aspectRatio: '9/16',
          border: '3px solid #666',
          borderRadius: '10px',
          boxShadow: '0 0 30px rgba(0,0,0,0.8)',
          overflow: 'hidden'
        }}
      >
        {/* Background de instrucciones */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/Instrucciones.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Área clickeable para el botón Comenzar del background */}
        <button
          className="absolute z-50 w-full h-full bg-transparent"
          onClick={handleContinue}
          style={{
            top: 0,
            left: 0
          }}
        />
      </div>
    </div>
  );
}
