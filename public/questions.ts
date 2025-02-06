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
    correct_answer: 0,
  },
  {
    question:
      "¿En qué año se celebró la primera edición de la Copa de Campeones de la Concacaf?",
    options: ["1959", "1962", "1965"],
    correct_answer: 1,
  },
  {
    question:
      "¿Cuál es el club con más títulos en la historia de la Copa de Campeones de la Concacaf?",
    options: ["Cruz Azul", "Club América", "CF Monterrey"],
    correct_answer: 1,
  },
  {
    question:
      "¿Qué jugador mexicano ostenta el récord de más títulos ganados en la Copa de Campeones de la Concacaf?",
    options: ["Carlos Hermosillo", "Paul Aguilar", "Miguel Calero"],
    correct_answer: 1,
  },
  {
    question:
      "¿Cuál fue el primer club caribeño en ganar la Copa de Campeones de la Concacaf?",
    options: ["Racing Club Haitien", "Defence Force FC", "SV Transvaal"],
    correct_answer: 0,
  },
  {
    question:
      "¿Qué equipo estableció la racha de victorias más larga en la historia de la Liga de Campeones de la Concacaf?",
    options: ["Club América", "CF Monterrey", "Deportivo Saprissa"],
    correct_answer: 1,
  },
  {
    question:
      "¿Qué jugador es el máximo goleador histórico de la Copa de Campeones de la Concacaf?",
    options: ["Oribe Peralta", "Javier Orozco", "Darwin Quintero"],
    correct_answer: 1,
  },
  {
    question:
      "¿Cuál fue el primer equipo de Estados Unidos en ganar la Copa de Campeones de la Concacaf?",
    options: ["Los Angeles Galaxy", "D.C. United", "Seattle Sounders"],
    correct_answer: 1,
  },
  {
    question:
      "¿Qué club centroamericano ha ganado más títulos en la Copa de Campeones de la Concacaf?",
    options: ["LD Alajuelense", "Deportivo Saprissa", "CD Olimpia"],
    correct_answer: 1,
  },
  {
    question:
      "¿Qué equipo mexicano logró la mayor goleada en la historia del torneo, con un marcador de 11-0?",
    options: ["Cruz Azul", "Pachuca", "América"],
    correct_answer: 1,
  },
  {
    question:
      "¿Qué jugador anotó un hat-trick en la final de la Copa de Campeones de la Concacaf 2015, contribuyendo significativamente al título de su equipo?",
    options: ["Oribe Peralta", "Darío Benedetto", "André-Pierre Gignac"],
    correct_answer: 1,
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}
