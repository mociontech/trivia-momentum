export const questions: Question[] = [
  {
    question: "¿Qué villano de DC es conocido por usar acertijos para cometer sus crímenes?",
    options: [
      "Two-Face",
       "Riddler",
        "Scarecrow",
        "Bane",
      ],
    correct_answer: 1,
  },
  {
    question: "¿Qué villano fue una vez el fiscal del distrito de Gotham antes de convertirse en criminal?",
    options: [
      "Penguin",
       "Scarecrow", 
       "Two-Face",
       "Clayface",],
    correct_answer: 0,
  },
  {
    question: "¿Cuál es el máximo de meses que te damos para PAGAR tu auto?",
    options: ["36 meses", "18 meses", "Hasta 60 meses","Clayface"],
    correct_answer: 2,
  },
  {
    question: "¿Cuál de estos villanos es un androide creado para destruir a la Liga de la Justicia?",
    options: [
      "Brainiac",
      "Darkseid",
      "Lex Luthor",
      "Amazo",
    ],
    correct_answer: 3,
  },
  {
    question: "¿Qué villano de DC es el regente tirano del planeta Apokolips?",
    options: [
       "Mongul",
       "Brainiac", 
       "Darkseid",
       "Doomsday",
      ],
    correct_answer: 2,
  },
  {
    question: "Qué villano de DC controla a sus víctimas mediante el miedo?",
    options: [
      "Scarecrow",
       "Deadshot",
        "Mr. Freeze",
        "Mad Hatter"],
    correct_answer: 0,
  },
  {
    question: "¿Cuál de estos villanos es conocido por manipular realidades y fue parte de la historia “Crisis en Tierras Infinitas”?",
    options: [
      "Monitor",
       "Parallax",
        "Anti-Monitor",
        "Nekron",
      ],
    correct_answer: 2,
  },

    {
    question: "¿Qué villano de DC es una inteligencia artificial alienígena obsesionada con recolectar conocimiento?",
    options: [
      "Brainiac",
       "Despero",
        "Metallo",
        "Luthor AI",
      ],
    correct_answer: 0,
  },
  


];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}
