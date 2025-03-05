"use client";

import { useRouter } from "next/navigation";
import { questions } from "@/public/questions";
import { useEffect, useState, useMemo, useCallback } from "react";
import { saveScore } from "@/utils/db";
import { useUser } from "@/hooks/useUser";
import { formatTime } from "@/utils/utils";

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}

// Función para seleccionar preguntas aleatorias
const getRandomQuestions = (questionsArray: Question[], count: number) => {
  const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function TriviaPage() {
  const router = useRouter();
  const user = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Seleccionar preguntas aleatorias al inicio
  useEffect(() => {
    const selected = getRandomQuestions(questions, 5);
    setSelectedQuestions(selected);
    setStartTime(Date.now());
  }, []);

  // Temporizador
  useEffect(() => {
    if (!startTime || isFinished) return;

    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(timer);
  }, [startTime, isFinished]);

  // Formatear el tiempo transcurrido
  const formattedTime = useMemo(() => formatTime(elapsedTime), [elapsedTime]);

  // Manejar la selección de respuestas
  const selectAnswer = useCallback(
    async (answerPos: number) => {
      if (isAnswered) return;

      const dataUser = {
        [`pregunta${currentQuestion}`]: `${selectedQuestions[currentQuestion].question},${selectedQuestions[currentQuestion].options[answerPos]}`,
      };

      setAnsweredQuestions([...answeredQuestions, dataUser]);

      setSelectedAnswer(answerPos);
      setIsAnswered(true);

      const isCorrect =
        answerPos === selectedQuestions[currentQuestion].correct_answer;
      if (isCorrect) setScore((prev) => prev + 1);

      // Verificar si es la última pregunta
      if (currentQuestion >= 4) {
        setIsFinished(true);
        const finalScore = isCorrect ? score + 1 : score;
        const timeTaken = Date.now() - (startTime || 0);

        // Guardar puntaje en la base de datos
        user.setScore(finalScore * 20);
        await saveScore(user.code, finalScore * 20, timeTaken);
        user.setData(answeredQuestions);

        // Redirigir al ranking después de 3 segundos
        setTimeout(() => router.push("/ranking"), 3000);
      } else {
        // Pasar a la siguiente pregunta después de 1 segundo
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        }, 1000);
      }
    },
    [
      currentQuestion,
      isAnswered,
      selectedQuestions,
      score,
      startTime,
      user,
      router,
    ]
  );

  // Renderizar las opciones de respuesta
  const renderOptions = useCallback(
    (options: string[]) => {
      return options.map((answer, i) => {
        const isCorrect =
          i === selectedQuestions[currentQuestion].correct_answer;
        const isSelected = i === selectedAnswer;

        return (
          <button
            key={i}
            className={`telegraf-regular flex p-10 text-[40px] leading-[48px] items-center justify-center h-[155px] rounded-3xl ${
              isAnswered
                ? isCorrect
                  ? "bg-[#DEF44B] text-black" // Respuesta correcta
                  : isSelected
                  ? "bg-[#D6544E] text-white" // Respuesta incorrecta seleccionada
                  : "bg-[#ffffff]"
                : "bg-[#ffffff]"
            }`}
            onClick={() => selectAnswer(i)}
            disabled={isAnswered}
          >
            {answer}
          </button>
        );
      });
    },
    [
      currentQuestion,
      selectedAnswer,
      isAnswered,
      selectAnswer,
      selectedQuestions,
    ]
  );

  // Renderizar la pantalla de resultados
  const renderResults = useCallback(() => {
    const isWinner = score >= 4;
    const resultText = isWinner ? "¡Felicidades!" : "Puedes hacerlo mejor";

    return (
      <div className="flex flex-col justify-center items-center">
        <p className="telegraf-bold text-[100px] text-center text-white leading-[90px] mb-[40px]">
          {resultText}
        </p>
        <p className="telegraf-regular text-[45px] text-center text-white leading-[48px] mb-[110px]">
          Contestaste correctamente:
        </p>
        <div className="telegraf-bold flex flex-col w-full rounded-3xl text-black py-4 bg-[#DEF44B] text-center justify-center text-[80px]">
          {score}/5
          <p className="text-[40px]">En {formattedTime} segundos</p>
        </div>
        <p className="telegraf-regular mt-6 text-[45px] text-white">
          ¡Gracias por participar!
        </p>
      </div>
    );
  }, [score, formattedTime]);

  return (
    <div className="trivia h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden px-20">
      {/* Temporizador */}
      {!isFinished && (
        <div className="telegraf-regular absolute top-[75px] right-[70px] bg-opacity-80 text-white p-4 rounded-lg text-[48px] font-bold z-50">
          {formattedTime}
        </div>
      )}

      {/* Preguntas y respuestas */}
      {!isFinished && selectedQuestions[currentQuestion] && (
        <div className="flex flex-col">
          <p className="relative z-50 oracle-regular text-white text-[60px] leading-[68px] text-center mb-[81px]">
            {selectedQuestions[currentQuestion].question}
          </p>
          <div className="flex flex-col gap-8">
            {renderOptions(selectedQuestions[currentQuestion].options)}
          </div>
        </div>
      )}

      {/* Resultados finales */}
      {isFinished && renderResults()}
    </div>
  );
}
