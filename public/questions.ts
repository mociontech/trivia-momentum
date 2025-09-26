export const questions: Question[] = [
  {
    question: "¿En qué siglo se ambienta la historia de Hogwarts Legacy?",
    options: [
      "Siglo XVII",
      "Siglo XVIII",
      "Siglo XIX",
      "Siglo XX"
    ],
    correct_answer: 2,
  },
  {
    question: "¿Qué criatura mágica aparece al inicio del juego en un carruaje volador?",
    options: [
      "Hipogrifo",
      "Thestral",
      "Dragón",
      "Grifo"
    ],
    correct_answer: 1,
  },
  {
    question: "¿Quién es el principal antagonista goblin del juego?",
    options: [
      "Griphook",
      "Ragnok",
      "Ranrok",
      "Urg"
    ],
    correct_answer: 2,
  },
  {
    question: "¿Qué encantamiento se utiliza para hacer levitar objetos?",
    options: [
      "Incendio",
      "Levioso",
      "Expelliarmus",
      "Accio"
    ],
    correct_answer: 1,
  },
  {
    question: "¿Cuál de estas aldeas es clave en la historia principal?",
    options: [
      "Hogsmeade",
      "Godric's Hollow",
      "Little Hangleton",
      "Ottery St. Catchpole"
    ],
    correct_answer: 0,
  },
  {
    question: "¿Qué familia de magos aparece como un cameo en Hogwarts Legacy?",
    options: [
      "Malfoy",
      "Potter",
      "Weasley",
      "Black"
    ],
    correct_answer: 2,
  },
  {
    question: "¿Qué director está a cargo de Hogwarts en esta época?",
    options: [
      "Phineas Nigellus Black",
      "Armando Dippet",
      "Albus Dumbledore",
      "Everard"
    ],
    correct_answer: 0,
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}
