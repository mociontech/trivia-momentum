"use client";

import { useState } from "react";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { register } from "@/utils/db";
import Loader from "@/components/loader";

const Vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function LoginPage() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardType, setKeyboardType] = useState<'numbers' | 'letters'>('numbers');
  const { setMail, setLogged } = useUser();

  // Funciones del teclado
  const handleKeyPress = (key: string) => {
    if (key === 'DELETE') {
      setEmailInput(prev => prev.slice(0, -1));
    } else {
      setEmailInput(prev => prev + key);
    }
  };

  // Función para renderizar teclas con imágenes
  const renderKey = (key: string, isImage: boolean = false) => {
    if (isImage && key === 'Q') {
      return (
        <img 
          src="/assets/letras/q.png" 
          alt="Q" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'W') {
      return (
        <img 
          src="/assets/letras/w.png" 
          alt="W" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'E') {
      return (
        <img 
          src="/assets/letras/e.png" 
          alt="E" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'R') {
      return (
        <img 
          src="/assets/letras/r.png" 
          alt="R" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'T') {
      return (
        <img 
          src="/assets/letras/t.png" 
          alt="T" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'Y') {
      return (
        <img 
          src="/assets/letras/y.png" 
          alt="Y" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'F') {
      return (
        <img 
          src="/assets/letras/f.png" 
          alt="F" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'G') {
      return (
        <img 
          src="/assets/letras/g.png" 
          alt="G" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'J') {
      return (
        <img 
          src="/assets/letras/j.png" 
          alt="J" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'B') {
      return (
        <img 
          src="/assets/letras/b.png" 
          alt="B" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'N') {
      return (
        <img 
          src="/assets/letras/n.png" 
          alt="N" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'A') {
      return (
        <img 
          src="/assets/letras/a.png" 
          alt="A" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'C') {
      return (
        <img 
          src="/assets/letras/c.png" 
          alt="C" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'D') {
      return (
        <img 
          src="/assets/letras/d.png" 
          alt="D" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'H') {
      return (
        <img 
          src="/assets/letras/h.png" 
          alt="H" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'I') {
      return (
        <img 
          src="/assets/letras/I.png" 
          alt="I" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'K') {
      return (
        <img 
          src="/assets/letras/k.png" 
          alt="K" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'L') {
      return (
        <img 
          src="/assets/letras/l.png" 
          alt="L" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'M') {
      return (
        <img 
          src="/assets/letras/m.png" 
          alt="M" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'Ñ') {
      return (
        <img 
          src="/assets/letras/ñ.png" 
          alt="Ñ" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'O') {
      return (
        <img 
          src="/assets/letras/o.png" 
          alt="O" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'P') {
      return (
        <img 
          src="/assets/letras/p.png" 
          alt="P" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'S') {
      return (
        <img 
          src="/assets/letras/s.png" 
          alt="S" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'U') {
      return (
        <img 
          src="/assets/letras/u.png" 
          alt="U" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'V') {
      return (
        <img 
          src="/assets/letras/v.png" 
          alt="V" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'X') {
      return (
        <img 
          src="/assets/letras/x.png" 
          alt="X" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    if (isImage && key === 'Z') {
      return (
        <img 
          src="/assets/letras/z.png" 
          alt="Z" 
          className="w-16 h-16 object-contain"
        />
      );
    }
    return key;
  };

  const toggleKeyboard = () => {
    setShowKeyboard(!showKeyboard);
  };

  const switchKeyboardType = () => {
    setKeyboardType(prev => prev === 'numbers' ? 'letters' : 'numbers');
  };

  async function submitForm() {
    try {
     
      if (!emailInput)
        return alert("Por favor, ingresa tu ID");
      setLoading(true);

      setMail(emailInput || "test@example.com");
      setLogged(true);
      register(emailInput || "test@example.com", emailInput || "test@example.com");

      router.push("/instrucciones");
    } catch (error) {
      console.log({ error: error });
    }
  }

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
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/Login-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {loading && <Loader />}

        <div className="flex flex-col w-auto mt-[300px]">
          <section className="flex flex-col gap-7">

            <div className="relative flex">
              <div 
                className="absolute w-[1000px] h-[140px] rounded-3xl z-10"
                style={{
                  backgroundImage: 'url(/assets/background-id-section.png)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              <div
                className="flex flex-1 h-[140px] w-[1000px] text-center items-center justify-center
                bg-transparent rounded-3xl border-none outline-none relative z-40 cursor-pointer"
                onClick={toggleKeyboard}
              >
                {emailInput ? (
                  <div className="flex items-center justify-center -gap-2 flex-wrap">
                    {emailInput.split('').map((char, index) => {
                      // Verificar si es un número
                      const isNumber = /[0-9]/.test(char);
                      const imagePath = isNumber 
                        ? `/assets/numeroTexto/${char}.png`
                        : `/assets/letrasTexto/${char.toUpperCase()}.png`;
                      
                      return (
                        <img
                          key={index}
                          src={imagePath}
                          alt={char}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            // Si no existe la imagen, mostrar el carácter como texto
                            e.currentTarget.style.display = 'none';
                            const textSpan = document.createElement('span');
                            textSpan.textContent = char;
                            textSpan.className = 'text-black text-4xl font-bold';
                            e.currentTarget.parentNode?.appendChild(textSpan);
                          }}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
              {!emailInput && (
                <img
                  src="/assets/Agrega ID.png"
                  alt="Agrega ID"
                  className="absolute z-30 w-auto h-[105px] top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                />
              )}
            </div>
          </section>
          <div className="mb-[40px]"></div>
          <button
            className="absolute z-50 flex justify-center items-center"
            style={{
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            onClick={submitForm}
          >
            <img 
              src="/assets/enter.png" 
              alt="Enter" 
              className="w-56 h-auto object-contain"
            />
          </button>
        </div>

        {/* Teclado Virtual */}
        {showKeyboard && (
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 p-14 z-50"
            style={{
              bottom: '180px',
              width: '100%',
              backgroundImage: 'url(/assets/background-keyboard.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="max-w-4xl mx-auto">
              {/* Botones de control */}
              <div className="flex justify-between mb-4">
                <button
                  onClick={switchKeyboardType}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg text-xl font-bold"
                >
                  {keyboardType === 'numbers' ? 'LETRAS' : 'NÚMEROS'}
                </button>
                <button
                  onClick={() => handleKeyPress('DELETE')}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg text-xl font-bold"
                  style={{
                    backgroundColor: '#AE3BF5',
                  }}
                >
                  DELETE
                </button>
              </div>

              {/* Teclado de números */}
              {keyboardType === 'numbers' && (
                <div>
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleKeyPress(num)}
                        className="bg-transparent hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                      >
                        <img 
                          src={`/assets/numeros/${num}.png`}
                          alt={num}
                          className="w-28 h-28"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Teclado de letras */}
              {keyboardType === 'letters' && (
                <div className="relative">
                  {/* Background fijo del teclado */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  
                  {/* Contenedor de letras con posición absoluta */}
                  <div className="relative z-10 p-4">
                    <div className="space-y-0">
                      <div className="grid grid-cols-10 gap-0">
                        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
                          <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={`${letter === 'Q' || letter === 'W' || letter === 'E' || letter === 'R' || letter === 'T' || letter === 'Y' || letter === 'U' || letter === 'I' || letter === 'O' || letter === 'P' ? 'bg-transparent hover:scale-110 transition-transform duration-200' : 'bg-purple-600 text-white hover:bg-purple-700'} text-2xl font-bold py-1 rounded-lg flex items-center justify-center`}
                          >
                            {renderKey(letter, true)}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-10 gap-0">
                        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'].map((letter) => (
                          <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={`${letter === 'A' || letter === 'S' || letter === 'D' || letter === 'F' || letter === 'G' || letter === 'H' || letter === 'J' || letter === 'K' || letter === 'L' || letter === 'Ñ' ? 'bg-transparent hover:scale-110 transition-transform duration-200' : 'bg-purple-600 text-white hover:bg-purple-700'} text-2xl font-bold py-1 rounded-lg flex items-center justify-center`}
                          >
                            {renderKey(letter, true)}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-0">
                        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
                          <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={`${letter === 'Z' || letter === 'X' || letter === 'C' || letter === 'V' || letter === 'B' || letter === 'N' || letter === 'M' ? 'bg-transparent hover:scale-110 transition-transform duration-200' : 'bg-purple-600 text-white hover:bg-purple-700'} text-2xl font-bold py-1 rounded-lg flex items-center justify-center`}
                          >
                            {renderKey(letter, true)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}