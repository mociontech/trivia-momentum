"use client";

import { useRouter } from "next/navigation";
import { questions } from "@/public/questions";
import { useEffect, useState } from "react";
import { registerRecord } from "@/utils/db";
import { useMail } from "@/hooks/useUser";
import { formatTime } from "@/utils/utils";

export default function TriviaPage() {
  const router = useRouter();
  const { mail } = useMail();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState();

  const [score, setScore] = useState(0);

  const [correctAnswer, setCorrectAnswer] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Guardar la respuesta seleccionada
  const [isAnswered, setIsAnswered] = useState(false); // Saber si la pregunta ya fue respondida

  const [isFinished, setIsFinished] = useState(false);

  const [startTime, setStartTime] = useState(null); // Para registrar el tiempo de inicio
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    function getRandomQuestions(questionsArray, count) {
      const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    const selectedQuestions = getRandomQuestions(questions.questions, 5);
    setSelectedQuestions(selectedQuestions);
    setStartTime(Date.now());
  }, []);

  function selectAnswer(answerPos) {
    if (isAnswered) return; // Evitar que se seleccione más de una vez
    setSelectedAnswer(answerPos);
    setCorrectAnswer(selectedQuestions[currentQuestion].correct_answer);
    setIsAnswered(true);

    if (answerPos + 1 === selectedQuestions[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion > 3) {
        // mostrar puntaje
        setIsFinished(true);
        const endTime = Date.now();
        const timeTaken = Math.floor(endTime - startTime); // Tiempo en segundos

        // Calcula el puntaje final en una variable local
        const finalScore =
          answerPos + 1 === selectedQuestions[currentQuestion].correct_answer
            ? score + 1
            : score;

        setTotalTime(formatTime(timeTaken));
        console.log(finalScore);

        // subir a base de datos
        registerRecord(mail, timeTaken, finalScore * 20);

        setTimeout(() => {
          router.push("/bye");
        }, 3000);
        return;
      } else {
        nextQuestion();
      }
    }, 1000);
  }

  console.log(score);

  function nextQuestion() {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }

  return (
    <div className="relative h-screen w-screen flex justify-center items-center text-black text-3xl">
      <video className="absolute top-0 left-0 -z-10" autoPlay loop muted>
        <source src="/assets/Pantallas.mp4" />
      </video>
      {selectedQuestions && !isFinished && (
        <div className="flex flex-col">
          <p>{selectedQuestions[currentQuestion].question}</p>
          <div className="flex flex-col gap-7">
            {selectedQuestions[currentQuestion].options.map((answer, i) => (
              <button
                key={i}
                className={`p-5 ${
                  isAnswered
                    ? i + 1 === correctAnswer
                      ? "bg-green-500" // Respuesta correcta en verde
                      : i === selectedAnswer
                      ? "bg-red-500" // Respuesta incorrecta seleccionada en rojo
                      : "bg-slate-500"
                    : "bg-slate-500"
                }`}
                onClick={() => selectAnswer(i)}
                disabled={isAnswered} // Deshabilitar los botones después de seleccionar
              >
                <p>{answer}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {isFinished && (
        <div>
          Felicitaciones lograste {score * 20} puntos en {totalTime} segundos
        </div>
      )}
    </div>
  );
}
