"use client";

import { useRouter } from "next/navigation";
import { questions } from "@/public/questions";
import { useEffect, useState } from "react";
import { registerRecord } from "@/utils/db";
import { useUser } from "@/hooks/useUser";
import { formatTime } from "@/utils/utils";

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}

export default function TriviaPage() {
  const router = useRouter();
  const { mail } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const [score, setScore] = useState(0);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Guardar la respuesta seleccionada
  const [isAnswered, setIsAnswered] = useState(false); // Saber si la pregunta ya fue respondida

  const [isFinished, setIsFinished] = useState(false);
  const [isFinishedTimer, setIsFinishedTimer] = useState(false);

  const [startTime, setStartTime] = useState(null); // Para registrar el tiempo de inicio
  const [totalTime, setTotalTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    function getRandomQuestions(questionsArray: Question[], count: number) {
      const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    const selectedQuestions = getRandomQuestions(questions, 7);
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
    if (isAnswered) return; // Evitar que se seleccione más de una vez
    setSelectedAnswer(answerPos);
    setCorrectAnswer(selectedQuestions[currentQuestion].correct_answer);
    setIsAnswered(true);

    if (answerPos === selectedQuestions[currentQuestion].correct_answer) {
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
      // subir a base de datos
      registerRecord(mail, timeTaken, finalScore * 20);
    }

    setTimeout(() => {
      if (currentQuestion > 5) {
        // ir directamente al ranking
        router.push("/ranking");
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
    <div className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden text-black px-20">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(/assets/preguntas/trivia-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <img
        src="/assets/preguntas/encabezado-logo.png"
        alt="Logo encabezado"
        className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 w-72 h-auto"
      />

      {selectedQuestions &&
        !isFinished &&
        selectedQuestions[currentQuestion] && (
          <div className="flex flex-col">
            <div className="relative mx-auto mb-2 z-50">
              <img
                src="/assets/preguntas/pregunta-numero.png"
                alt="Pregunta número"
                className="w-32 h-auto object-contain"
              />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                {currentQuestion + 1}
              </span>
            </div>
            <img
              src="/assets/preguntas/PREGUNTA.png"
              alt="Pregunta"
              className="mx-auto mb-4 z-50"
            />
            <p className="relative z-50 oracle-regular text-[60px] leading-[68px] text-center mb-[81px] text-white">
              {selectedQuestions[currentQuestion].question}
            </p>
            <div className="flex flex-col gap-8">
              {selectedQuestions[currentQuestion].options.map((answer, i) => {
                // Determinar qué imagen usar
                const isCorrectAnswer = i === correctAnswer;
                const isSelectedAnswer = i === selectedAnswer;
                const shouldUseWinBox = isAnswered && (isCorrectAnswer || (isSelectedAnswer && isCorrectAnswer));
                
                return (
                  <button
                    key={i}
                    className={`oracle-light flex font p-10 text-[40px] leading-[48px] items-center justify-center h-[155px] rounded-3xl relative text-white hover:scale-110 transition-transform duration-200`}
                    onClick={() => selectAnswer(i)}
                    disabled={isAnswered} // Deshabilitar los botones después de seleccionar
                    style={{
                      backgroundImage: shouldUseWinBox 
                        ? 'url(/assets/preguntas/text-box-win.png)'
                        : 'url(/assets/preguntas/text-box-normal.png)',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}
