export const questions: Question[] = [
  {
    question: "¿En cuánto tiempo te pagamos tu auto?",
    options: ["En 4 meses", "Hasta en 24 horas", "En dos años"],
    correct_answer: 1,
  },
  {
    question: "¿Cuánto tiempo tardamos en darte una oferta por tu auto?",
    options: ["2 Minutos", "1 año", "30 días"],
    correct_answer: 0,
  },
  {
    question: "¿Cuál es el máximo de meses que te damos para PAGAR tu auto?",
    options: ["36 meses", "18 meses", "Hasta 60 meses"],
    correct_answer: 2,
  },
  {
    question: "¿Qué te ofrece KAVAK al comprar o vender un auto?",
    options: [
      "SEGURIDAD en todo el proceso",
      "Un paquete de CALCOMANÍAS",
      "TAPETES para tu auto",
    ],
    correct_answer: 0,
  },
  {
    question: "¿Cuántos autos tiene KAVAK en su catálogo?",
    options: ["Entre 100 y 400", "Entre 4 mil y 6 mil", "Entre 20 y 30"],
    correct_answer: 1,
  },
  {
    question: "¿Kavak es patrocinador OFICIAL de la CONCACAF CHAMPIONS CUP?",
    options: ["No", "Nunca", "Sí"],
    correct_answer: 2,
  },
  {
    question: "¿Quién ganó la copa CCC en 2024?",
    options: ["Monterrey", "Pachuca", "Guadalajara"],
    correct_answer: 1,
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}
