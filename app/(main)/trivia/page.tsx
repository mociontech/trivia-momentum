"use client";

import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useUser } from "@/hooks/useUser";
import { formatTime } from "@/utils/utils";
import { useGlobal } from "@/context/global";

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  imagen: string; // nueva propiedad
}

// Función para seleccionar preguntas aleatorias
const getRandomQuestions = (questionsArray: Question[], count: number) => {
  const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function TriviaPage() {
  const { score, setScore, time, setTime } = useGlobal();
  const router = useRouter();
  const user = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<object>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSrc, setFeedbackSrc] = useState<string | null>(null);


  useEffect(() => {
    const selected = getRandomQuestions(questions, 10);
    setSelectedQuestions(selected);
    console.log(selected);
    setStartTime(Date.now());
  }, []);


  useEffect(() => {
    if (!startTime || isFinished) return;

    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(timer);
  }, [startTime, isFinished]);
  
  useEffect(() => {
    const q = selectedQuestions[currentQuestion];
    if (!q?.imagen) return;
    const img = new Image();
    img.src = q.imagen;
  }, [currentQuestion, selectedQuestions]);


  const formattedTime = useMemo(() => formatTime(elapsedTime), [elapsedTime]);


  const selectAnswer = useCallback(
    async (answerPos: number) => {
      if (isAnswered || showFeedback) return;

      setAnsweredQuestions({
        ...answeredQuestions,
        [`pregunta${currentQuestion}`]:
          `${selectedQuestions[currentQuestion].question},${selectedQuestions[currentQuestion].options[answerPos]}`,
      });

      setSelectedAnswer(answerPos);
      setIsAnswered(true);

      // Mostrar imagen de la pregunta actual
      const img = selectedQuestions[currentQuestion].imagen;
      setFeedbackSrc(img);
      setShowFeedback(true);

      const isCorrect =
        answerPos === selectedQuestions[currentQuestion].correct_answer;
      if (isCorrect) setScore((prev) => prev + 1);

      const ADVANCE_DELAY = 3000; // ms

      if (currentQuestion >= 9) {
        setIsFinished(true);
        const finalScore = isCorrect ? score + 1 : score;
        const timeTaken = Date.now() - (startTime || 0);
        setTime(timeTaken);
        user.setScore(finalScore);
        user.setData(answeredQuestions);

        setTimeout(() => {
          router.push("/bye");
        }, ADVANCE_DELAY);
      } else {
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
          setShowFeedback(false);
          setFeedbackSrc(null);
        }, ADVANCE_DELAY);
      }
    },
    [
      currentQuestion,
      isAnswered,
      showFeedback,
      selectedQuestions,
      score,
      startTime,
      user,
      router,
      answeredQuestions,
      setScore,
      setTime,
    ]
  );

  const renderOptions = useCallback(
    (options: string[]) => {
      return options.map((answer, i) => {
        const isCorrect =
          i === selectedQuestions[currentQuestion].correct_answer;
        const isSelected = i === selectedAnswer;
        return (
          <button
            key={i}
            className={`font-supermolot flex p-10 rounded-2xl text-[34px] bo  items-center justify-center h-[100px]   ${
              isAnswered
                ? isCorrect
                  ? "bg-green-500 bg-cover bg-center  text-white font-gilroy font-bold" // Respuesta correcta
                  : isSelected
                  ? "bg-red-500 bg-cover bg-center  text-white font-gilroy font-bold" // incorreta
                  : "bg-[#c0d0eb] bg-cover bg-center  text-[#0032A0] font-gilroy font-bold"
                : "bg-[#c0d0eb] bg-cover bg-center  text-[#0032A0] font-gilroy font-bold"  //seleccion
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

  return (
    <div className="bg h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden px-20 ">

      {!isFinished && selectedQuestions[currentQuestion] && (
        
        <div className="flex flex-col w-[824px] ">
          <div className="font-gilroy font-normal  absolute top-4 left-1/2 transform -translate-x-1/2 bg-opacity-80 text-white p-4 rounded-lg text-[48px] z-50">
              {formattedTime}
            </div>

          <p className="relative z-50 font-gilroy font-normal text-white text-[62px] leading-[68px] text-center mb-[81px]">
            {selectedQuestions[currentQuestion].question.split(/(Copa Airlines)/g).map((part, index) =>
              part === "Copa Airlines" ? (
                <strong key={index}>{part}</strong>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </p>

          <div className="flex flex-col gap-8 mt">
            {renderOptions(selectedQuestions[currentQuestion].options)}
          </div>
        </div>
      )}

      {showFeedback && feedbackSrc && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60">
          <img
            src={feedbackSrc}
            alt="Feedback de la pregunta"
            className="w-screen h-screen rounded-2xl shadow-2xl"
          />
        </div>
      )}

    </div>
  );
}
