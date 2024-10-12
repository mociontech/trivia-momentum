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
          router.push("/login");
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
    <div className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden text-black px-20">
      <video className="absolute top-0 left-0 -z-10" autoPlay loop muted>
        <source src="/assets/Pantallas.mp4" />
      </video>
      <img
        src="/assets/logo-oracle.svg"
        alt="Logo de humano"
        className="absolute top-[100px] left-[120px]"
      />
      {selectedQuestions && !isFinished && (
        <div className="flex flex-col">
          <p className="relative z-50 oracle-regular text-[60px] leading-[68px] text-center mb-[81px]">
            {selectedQuestions[currentQuestion].question}
          </p>
          <div className="flex flex-col gap-8">
            {selectedQuestions[currentQuestion].options.map((answer, i) => (
              <button
                key={i}
                className={`oracle-light flex font p-10 text-[40px] leading-[48px] items-center justify-center h-[155px] rounded-3xl ${
                  isAnswered
                    ? i + 1 === correctAnswer
                      ? "bg-[#D6544E] text-white" // Respuesta correcta en verde
                      : i === selectedAnswer
                      ? "bg-[#D6544E] text-white" // Respuesta incorrecta seleccionada en rojo
                      : "bg-[#D4E6E5]"
                    : "bg-[#D4E6E5]"
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
      {isFinished &&
        (score >= 4 ? (
          <div className="flex flex-col justify-center items-center">
            <p className="oracle-regular text-[100px] text-center text-[#5B6B6B] leading-[90px] mb-[40px]">
              ¡Felicidades!
            </p>
            <p className="oracle-light text-[45px] text-center text-[#36312D] leading-[48px] mb-[110px]">
              Contestaste correctamente:
            </p>
            <div className="oracle-regular flex flex-col w-full rounded-3xl text-[#FCFCFC] py-4 bg-[#D6544E] text-center justify-center text-[80px]">
              {score}/5<p className="text-[40px]">En {totalTime} segundos</p>
            </div>
            <p className="oracle-light mt-6 text-[45px]">
              ¡Gracias por participar!
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="oracle-regular text-[100px] text-center text-[#5B6B6B] leading-[90px] mb-[40px]">
              Puedes <br />
              hacerlo mejor
            </p>
            <p className="oracle-light text-[45px] text-center text-[#36312D] leading-[48px] mb-[110px]">
              Contestaste correctamente:
            </p>
            <div className="oracle-regular flex flex-col w-full rounded-3xl text-[#FCFCFC] py-4 bg-[#D6544E] text-center justify-center text-[80px]">
              {score}/5<p className="text-[40px]">En {totalTime} segundos</p>
            </div>
            <p className="oracle-light mt-6 text-[45px]">
              ¡Gracias por participar!
            </p>
          </div>
        ))}
    </div>
  );
}
