export const questions: Question[] = [
  {
    question: "¿Quién es considerado el enemigo clásico de Scorpion?",
    options: [
      "Shang Tsung",
      "Sub-Zero",
      "Liu Kang",
      "Raiden"
    ],
    correct_answer: 1,
  },
  {
    question: "¿Qué frase icónica se escucha al ejecutar un movimiento final?",
    options: [
      "You're finished!",
      "Brutality!",
      "Finish Him!",
      "Final Round!"
    ],
    correct_answer: 2,
  },
  {
    question: "¿Quién fue el primer campeón del torneo Mortal Kombat?",
    options: [
      "Kung Lao",
      "Liu Kang",
      "Raiden",
      "Goro"
    ],
    correct_answer: 1,
  },
  {
    question: "¿Qué villano es conocido como el emperador del Outworld?",
    options: [
      "Shang Tsung",
      "Shao Kahn",
      "Quan Chi",
      "Shinnok"
    ],
    correct_answer: 1,
  },
  {
    question: "¿Qué personaje es un ninja cibernético?",
    options: [
      "Smoke",
      "Noob Saibot",
      "Sektor",
      "Reptile"
    ],
    correct_answer: 2,
  },
  {
    question: "¿Qué personaje femenino es hija de Shao Kahn?",
    options: [
      "Mileena",
      "Kitana",
      "Sindel",
      "Skarlet"
    ],
    correct_answer: 1,
  },
  {
    question: "¿Qué villano es un hechicero que roba almas?",
    options: [
      "Quan Chi",
      "Shang Tsung",
      "Shinnok",
      "Onaga"
    ],
    correct_answer: 1,
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}
