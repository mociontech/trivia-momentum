"use client";

import { useRouter } from "next/navigation";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { questions } from "@/public/questions";
import { useEffect, useState } from "react";
import { registerRecord } from "@/utils/db";
import { useUser } from "@/hooks/useUser";
import { formatTime } from "@/utils/utils";
import { useAttendee } from "@/context/AttendeeContext";

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  hintImage?: string;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function TriviaPage() {
  const router = useRouter();
  const { mail } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const [score, setScore] = useState(0);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Guardar la respuesta seleccionada
  const [isAnswered, setIsAnswered] = useState(false); // Saber si la pregunta ya fue respondida

  // Nuevo: permitir 2 intentos y mostrar hint en primer fallo
  const [currentAttempt, setCurrentAttempt] = useState(1); // 1 o 2
  const [showHint, setShowHint] = useState(false);

  const [isFinished, setIsFinished] = useState(false);
  const [isFinishedTimer, setIsFinishedTimer] = useState(false);

  const [startTime, setStartTime] = useState(null); // Para registrar el tiempo de inicio
  const [totalTime, setTotalTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { attendeeId } = useAttendee();
  // CONFIGURACIÓN: cambia estas constantes para modificar fondo, logo y número de preguntas
  // Rutas de imagen de fondo por pregunta (coloca los archivos en public/assets)
  const TRIVIA_PREG_IMAGE = [
    "/assets/bg_q1.png",
    "/assets/bg_q2.png",
    "/assets/bg_q3.png",
    "/assets/bg_q4.png",
    "/assets/bg_q5.png",
  ];
  const TRIVIA_LOGO = "/assets/DEEL_LOGO.png"; // logo en la esquina
  const TRIVIA_BACK_IMAGE = "/assets/DEEL_FONDO.png"; // imagen que se mostrará centrada bajo el logo
  const QUESTION_COUNT = 5; // cuántas preguntas tomar (ahora se usan las primeras N preguntas)

  useEffect(() => {
    // Antes se usaba aleatorio; ahora se toman las primeras QUESTION_COUNT preguntas
    const selectedQuestions = questions.slice(0, QUESTION_COUNT);
    setSelectedQuestions(selectedQuestions);
    const start = Date.now();
    setStartTime(start);

    // Actualizar el temporizador cada segundo
    if (!isFinishedTimer) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor(Date.now() - start));
      }, 100);
      return () => clearInterval(timer);
    }
  }, []);

  async function selectAnswer(answerPos: number) {
    if (isAnswered) return; // si la pregunta ya quedó resuelta, bloquear
    setSelectedAnswer(answerPos);

    const correct = selectedQuestions[currentQuestion].correct_answer;
    const isCorrectNow = answerPos === correct;

    // Si acierta ahora (primer o segundo intento)
    if (isCorrectNow) {
      // calcular finalScore local antes de setScore (setState es asíncrono)
      const finalScoreForRecord = score + 1;
      setScore((prev) => prev + 1);
      setCorrectAnswer(correct);
      setIsAnswered(true);
      setShowHint(false);

      if (currentQuestion >= QUESTION_COUNT - 1) {
        setIsFinishedTimer(true);
        const endTime = Date.now();
        const timeTaken = Math.floor(endTime - startTime as number);
        setTotalTime(formatTime(timeTaken));
       
      }

      setTimeout(() => {
        if (currentQuestion >= QUESTION_COUNT - 1) {
          setIsFinished(true);
          //setTimeout(() => router.push("/final"), 3000);
          return;
        } else {
          nextQuestion();
        }
      }, 1000);

      return;
    }

    // Si falla ahora
    if (currentAttempt === 1) {
      // mostrar hint, permitir segundo intento
      setShowHint(true);
      setCurrentAttempt(2);
      // ocultar el overlay automáticamente en 3 segundos
      setTimeout(() => {
        setShowHint(false);
      }, 3000);
      // mantener la pregunta activa (no marcar como respondida)
      // se muestra la selección en rojo (ver render)
      return;
    } else {
      // segundo intento fallido: marcar como respondida y avanzar
      setCorrectAnswer(correct);
      setIsAnswered(true);
      setShowHint(false);

      if (currentQuestion >= QUESTION_COUNT - 1) {
        setIsFinishedTimer(true);
        const endTime = Date.now();
        const timeTaken = Math.floor(endTime - startTime as number);
        setTotalTime(formatTime(timeTaken));
        // finalScore = score (no cambio)
        registerRecord(attendeeId, score * 20);
      }

      setTimeout(() => {
        if (currentQuestion >= QUESTION_COUNT - 1) {
          setIsFinished(true);
          //setTimeout(() => router.push("/final"), 3000);
          return;
        } else {
          nextQuestion();
        }
      }, 1000);
      return;
    }
  }

  function nextQuestion() {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentAttempt(1);
    setShowHint(false);
    setCorrectAnswer(0);
  }

  async function calcularPuntaje(score: number) {
    let puntosCalculados = 0;
    if (score === 5) {
      puntosCalculados = 15;
    } else if (score >= 3 && score <= 4) {
      puntosCalculados = 10;
    } else if (score >= 1 && score <= 2) {
      puntosCalculados = 5;
    } else {
      puntosCalculados = 0;
    }

    setPuntos(puntosCalculados);
    await registerRecord(attendeeId, puntosCalculados);
    console.log(`Puntaje obtenido: ${puntosCalculados}`);
    
    return puntosCalculados;
  }

  useEffect(() => {
    if (isFinished) {
      calcularPuntaje(score);
    }
  }, [isFinished]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden text-black px-20">
      {/* Fondo dinámico por pregunta */}
      <img
        src={TRIVIA_BACK_IMAGE}
        alt="Fondo"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {!isFinished && (
        <img
          src={TRIVIA_LOGO}
          alt="Logo"
          className="absolute top-[100px]"
        />
      )}

      {!isFinished && (
        <img
          src={TRIVIA_PREG_IMAGE[currentQuestion] ?? TRIVIA_PREG_IMAGE[0]}
          alt={`Imagen central pregunta ${currentQuestion + 1}`}
          className="absolute top-[290px] left-1/2 -translate-x-1/2 z-50 w-[520px] object-contain"
        />
      )}



      {/* Timer de esquina eliminado conforme solicitado */}

      {/* Overlay de pista: por encima de todo, fondo oscuro, visible 3s */}
      {showHint && selectedQuestions[currentQuestion]?.hintImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-50 pointer-events-none">
            <img
              src={selectedQuestions[currentQuestion].hintImage}
              alt="Pista"
              className="max-w-[80vw] max-h-[80vh] rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}

      {selectedQuestions &&
        !isFinished &&
        selectedQuestions[currentQuestion] && (
          <div className="flex flex-col">
            <p className="relative z-50 oracle-bold text-[50px] leading-[56px] text-center mb-[50px] font-bold">
              {selectedQuestions[currentQuestion].question}
            </p>

            <div className="flex flex-col gap-8">
              {selectedQuestions[currentQuestion].options.map((answer, i) => {
                // Lógica de clases:
                // - Si isAnswered: marcar correcta en verde, seleccionada incorrecta en rojo.
                // - Si no isAnswered pero el usuario ya seleccionó una vez y estamos en intento 2: marcar la selección como rojo.
                const correct = selectedQuestions[currentQuestion].correct_answer;
                const isCorrectShown = isAnswered && i === correct;
                const isSelectedWrong =
                  (isAnswered && selectedAnswer === i && selectedAnswer !== correct) ||
                  (!isAnswered && selectedAnswer === i && currentAttempt === 2 && selectedAnswer !== correct);

                const btnClass = `oracle-bold flex font p-10 text-[40px] leading-[48px] items-center justify-center h-[155px] rounded-3xl ${isCorrectShown
                  ? "bg-[#628B48] text-white"
                  : isSelectedWrong
                    ? "bg-[#D6544E] text-white"
                    : "bg-[#D4E6E5]"
                  }`;

                return (
                  <button
                    key={i}
                    className={btnClass}
                    onClick={() => selectAnswer(i)}
                    disabled={isAnswered} // bloquear solo si la pregunta quedó resuelta
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      {isFinished && (
        <>
          {score === 5 ? (
            <div className="flex flex-col justify-center items-center gap-10">
              {/* Imagen 1 */}
              <img
                src="/assets/LoLograste.png"
                alt="Imagen 1"
                className="w-[800px] h-auto"
              />
              {/* Imagen 2: CampoVacio con puntaje */}
              <div
                className="relative w-[600px] h-[150px] bg-[url('/assets/CampoVacio.png')] bg-no-repeat bg-center bg-cover flex items-center justify-center text-[140px] font-bold text-black"
              >
                {score}/{QUESTION_COUNT}
              </div>
              {/* Imagen 3 */}
              <img
                src="/assets/Exito.png"
                alt="Imagen 3"
                className="w-[800px] h-auto"
              />
              <div
                className="relative w-[600px] h-[150px] bg-[url('/assets/CampoVacio.png')] bg-no-repeat bg-center bg-cover flex items-center justify-center text-[120px] font-bold text-black"
              >
                {puntos} puntos
              </div>
              {/* Imagen 4 */}
              <img
                src="/assets/DLOGO.png"
                alt="Imagen 4"
                className="absolute top-[1650px] left-[800px] font"
              />
              {/* Botón */}
              <button
                className={`${montserrat.className} relative z-50 flex justify-center items-center 
                    w-[800px] h-[160px] px-10 py-6 text-center text-[50px] mt-[50px]`}
                onClick={() => router.push("/login")}
              >
                <img src="/assets/Volver.png" alt="Registrarme" className="h-full w-auto" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-10">
              {/* Imagen 1 */}
              <img
                src="/assets/Advertencia.png"
                alt="Imagen 1"
                className="w-[800px] h-auto"
              />
              {/* Imagen 2: CampoVacio con puntaje */}
              <div
                className="relative w-[600px] h-[150px] bg-[url('/assets/CampoVacio.png')] bg-no-repeat bg-center bg-cover flex items-center justify-center text-[140px] font-bold text-black"
              >
                {score}/{QUESTION_COUNT}
              </div>
              {/* Imagen 3 */}
              <img
                src="/assets/Exito2.png"
                alt="Imagen 3"
                className="w-[800px] h-auto"
              />
              <div
                className="relative w-[600px] h-[150px] bg-[url('/assets/CampoVacio.png')] bg-no-repeat bg-center bg-cover flex items-center justify-center text-[120px] font-bold text-black"
              >
                {puntos} puntos
              </div>
              {/* Imagen 4 */}
              <img
                src="/assets/DLOGO.png"
                alt="Imagen 4"
                className="absolute top-[1650px] left-[800px] font"
              />
              {/* Botón */}
              <button
                className={`${montserrat.className} relative z-50 flex justify-center items-center 
                    w-[800px] h-[160px] px-10 py-6 text-center text-[50px] mt-[50px]`}
                onClick={() => router.push("/login")}
              >
                <img src="/assets/Volver.png" alt="Registrarme" className="h-full w-auto" />
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
}
