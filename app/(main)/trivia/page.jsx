"use client";

import { useRouter } from "next/navigation";
import { questions } from "@/public/questions";
import { useEffect, useState } from "react";
import { registerRecord } from "@/utils/db";
import { useUser } from "@/hooks/useUser";
import { formatTime } from "@/utils/utils";
const options = {
  0: "A: ",
  1: "B: ",
  2: "C: ",
  3: "D: ",
};

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

    const selectedQuestions = getRandomQuestions(questions.questions, 5);
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

    if (currentQuestion > 3) {
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
      registerRecord(mail, timeTaken, finalScore * 20);
    }

    setTimeout(() => {
      if (currentQuestion > 3) {
        // mostrar puntaje
        setIsFinished(true);

        setTimeout(() => {
          router.push("/ranking");
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
    <div className="gradient-bg h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden text-black px-20">
      <div className="relative flex justify-center px-4 rounded-md items-center mill-regular top-[15px] z-50 text-[20px] bg-gradient-to-r from-[#c37900] via-[#fbe86a] to-[#c37900] text-[#33200f] font-bold">
        {!isFinishedTimer ? (
          <div>{formatTime(elapsedTime)}</div>
        ) : (
          !isFinished && <div>{totalTime}</div>
        )}
      </div>

      {selectedQuestions && !isFinished && (
        <div className="flex flex-col">
          <p className="relative w-screen p-[20px] pt-[35px] bg-gradient-to-b from-[#035680] via-[#020a34] to-[#035680] z-40 mill-regular text-[25px] text-center border-y border-white text-white">
            {selectedQuestions[currentQuestion].question}
          </p>
          <div className="flex flex-col p-[20px] gap-3">
            {selectedQuestions[currentQuestion].options.map((answer, i) => (
              <button
                key={i}
                className={`mill-regular flex gap-2 text-[25px] items-start justify-start text-start border border-white text-white p-2 rounded-lg ${
                  isAnswered
                    ? i + 1 === correctAnswer
                      ? "bg-gradient-to-b from-[#93e91f] via-[#2c9405] to-[#93e91f]" // Respuesta correcta en verde
                      : i === selectedAnswer
                      ? "bg-gradient-to-b from-[#e91f1f] via-[#940505] to-[#e91f1f]" // Respuesta incorrecta seleccionada en rojo
                      : "bg-gradient-to-b from-[#035680] via-[#020a34] to-[#035680]"
                    : "bg-gradient-to-b from-[#035680] via-[#020a34] to-[#035680]"
                }`}
                onClick={() => selectAnswer(i)}
                disabled={isAnswered} // Deshabilitar los botones después de seleccionar
              >
                <p className="text-[#f1b341]">{options[i]}</p>
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
      {isFinished && (
        <div className="w-screen h-screen flex flex-col justify-center items-center text-white bg-gradient-to-b from-[#035680] via-[#020a34] to-[#035680] px-3">
          <p className="mill-regular text-[40px] text-center">
            ¡Felicidades!
          </p>
          <p className="mill-regular text-[35px] text-center">
            Contestaste correctamente:
          </p>
          <div className="mill-regular flex flex-col w-full rounded-3xl text-[#33200f] py-4 bg-gradient-to-r from-[#c37900] via-[#fbe86a] to-[#c37900] text-center justify-center text-[40px] font-bold mt-6">
            {score}/5<p className="text-[20px] font-normal">En {totalTime} segundos</p>
          </div>
          <p className="mill-regular mt-6 text-[35px] text-white text-center">
            ¡Gracias por participar!
          </p>
        </div>
      )}
    </div>
  );
}
