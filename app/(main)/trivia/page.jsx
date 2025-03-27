"use client";

import { useRouter } from "next/navigation";
import { questions } from "@/public/questions";
import { useEffect, useState } from "react";
import { registerRecord } from "@/utils/db";
import { useUser } from "@/hooks/useUser";
import { formatTime } from "@/utils/utils";

export default function TriviaPage() {
  const router = useRouter();
  const { mail } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState();

  const [score, setScore] = useState(0);

  const [correctAnswer, setCorrectAnswer] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Guardar la respuesta seleccionada
  const [isAnswered, setIsAnswered] = useState(false); // Saber si la pregunta ya fue respondida

  const [isFinished, setIsFinished] = useState(false);
  const [isFinishedTimer, setIsFinishedTimer] = useState(false);

  const [startTime, setStartTime] = useState(null); // Para registrar el tiempo de inicio
  const [totalTime, setTotalTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    function getRandomQuestions(questionsArray, count) {
      const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    const selectedQuestions = getRandomQuestions(questions.questions, 7);
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

  async function selectAnswer(answerPos) {
    if (isAnswered) return; // Evitar que se seleccione más de una vez
    setSelectedAnswer(answerPos);
    setCorrectAnswer(selectedQuestions[currentQuestion].correct_answer);
    setIsAnswered(true);

    if (answerPos + 1 === selectedQuestions[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion > 5) {
      setIsFinishedTimer(true);
      const endTime = Date.now();
      const timeTaken = Math.floor(endTime - startTime); // Tiempo en milisegundos

      // Calcula el puntaje final en una variable local
      const finalScore =
        answerPos + 1 === selectedQuestions[currentQuestion].correct_answer
          ? score + 1
          : score;

      setTotalTime(formatTime(timeTaken));
      console.log(finalScore);

      // subir a base de datos
      // registerRecord(mail, timeTaken, finalScore * 20);
    }

    setTimeout(() => {
      if (currentQuestion > 5) {
        // mostrar puntaje
        setIsFinished(true);

        setTimeout(() => {
          router.push("/");
        }, 3000);
        return;
      } else {
        nextQuestion();
      }
    }, 1000);
  }

  function nextQuestion() {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }

  return (
    <div className="login h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden text-black px-20">
      <div className="absolute flex justify-center px-4 rounded-md items-center mill-regular top-[15px] right-[15px] z-50 text-[40px] text-white font-bold">
        {!isFinishedTimer ? (
          <div>{formatTime(elapsedTime)}</div>
        ) : (
          !isFinished && <div>{totalTime}</div>
        )}
      </div>

      {selectedQuestions && !isFinished && (
        <div className="flex flex-col">
          <p className="relative w-screen p-[20px] pt-[35px] z-40 mill-regular text-[60px] text-center text-white">
            {selectedQuestions[currentQuestion].question}
          </p>
          <div className="flex flex-col p-[20px] gap-3">
            {selectedQuestions[currentQuestion].options.map((answer, i) => (
              <button
                key={i}
                className={`mill-regular flex gap-2 text-[25px] items-start justify-center text-center border bg-white text-[#231F20] p-2 rounded-lg ${
                  isAnswered
                    ? i === selectedAnswer
                      ? "bg-white/70" // Respuesta correcta en verde
                      : "bg-white"
                    : "bg-white"
                }`}
                onClick={() => selectAnswer(i)}
                disabled={isAnswered} // Deshabilitar los botones después de seleccionar
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
      {isFinished && (
        <div className="login w-screen h-screen flex flex-col justify-center items-center text-white bg-gradient-to-b from-[#e91f1f] to-[#4D4D4D] px-3">
          {score > 5 ? (
            <p className="mill-regular text-[40px] text-center">
              ¡FELICIDADES!
            </p>
          ) : (
            <p className="mill-regular text-[40px] text-center">
              ¡CASI LO LOGRAS!
            </p>
          )}
          <p className="mill-regular text-[35px] text-center">
            Contestaste correctamente:
          </p>
          <div className="mill-regular flex flex-col w-full bg-[#231F20] text-white rounded-3xl py-4 text-center justify-center text-[62px] font-bold mt-6">
            {score}/{selectedQuestions.length}
            <p className="text-[30px] font-normal">En {totalTime} segundos</p>
          </div>
          <p className="mill-regular mt-6 text-[35px] text-white text-center">
            ¡Gracias por participar!
          </p>
        </div>
      )}
    </div>
  );
}
