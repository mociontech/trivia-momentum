export const questions: Question[] = [
  {
    question:
      "¿Qué bebidas tradicionales se pueden disfrutar en las calles del centro de la ciudad?",
    options: [
      "Chocolate santafereño, chicha, canelazo",
      "Jugo de lulo y naranja",
      "Chicha morada y champús",
      "Masato y viche",
    ],
    correct_answer: 0,
    type: "text",
  },
  {
    question:
      "¿Qué museo alberga la mayor colección de oro prehispánico en el mundo?​",
    options: [
      "Museo Botero",
      "Museo del Oro",
      "Museo Banco de la República",
      "Museo de la Independencia",
    ],
    correct_answer: 1,
    type: "text",
  },
  {
    question: "¿A qué altitud se encuentra Bogotá?",
    options: [
      "2.700 metros más cerca de las estrellas",
      "2.500 metros más cerca de las estrellas",
      "2.600 metros más cerca de las estrellas​",
      "2.400 metros más cerca de las estrellas",
    ],
    correct_answer: 2,
    type: "text",
  },
  {
    question: "¿Cuál es el cerro más emblemático de Bogotá?",
    options: [
      "Cerro de Guadalupe",
      "Cerro La Calera",
      "Cerro Alto de Los Tunjos",
      "Cerro de Monserrate",
    ],
    correct_answer: 3,
    type: "text",
  },
  {
    question: "¿Cómo se llama el sistema de transporte masivo de Bogotá?",
    options: ["SITP", "Recaudo Bogotá S.A.S.", "MIO", "TransMilenio​"],
    correct_answer: 3,
    type: "text",
  },
  {
    question:
      "¿En qué lugar de la ciudad se consigue todo a buen precio y su nombre está inspirado en una de las islas más visitadas de Colombia?",
    options: ["Rosario Plaza", "San Victorino", "Only", "San Andresito"],
    correct_answer: 3,
    type: "text",
  },
  {
    question: "Nombre dos platos típicos de Bogotá",
    options: [
      "Tamal con chocolate",
      "Ajiaco y changua",
      "Bandeja paisa",
      "Lechona y longaniza",
    ],
    correct_answer: 1,
    type: "text",
  },
  {
    question: "¿Cuántas plazas de mercado tiene BOGOTÁ?",
    options: ["28", "40", "35", "50"],
    correct_answer: 1,
    type: "text",
  },
  {
    question:
      "¿En qué localidad de Bogotá se encuentra el famoso “Mercado de las pulgas”?",
    options: ["La Candelaria", "Usaquén", "Teusaquillo", "Chapinero"],
    correct_answer: 1,
    type: "text",
  },
  {
    question: "¿Cuál es el barrio más turístico y colonial de Bogotá?​",
    options: [
      "La Candelaria",
      "La Soledad - Park Way",
      "Quinta Camacho",
      "Belén",
    ],
    correct_answer: 0,
    type: "text",
  },
  {
    question: "¿Qué lugar reconoces?",
    options: [
      "Monserrate, Maloka, Plaza de Bolívar, Plaza de Toros ​",
      "La Catedral Primada, La Candelaria, Torres del Parque, Monserrate",
      "Plaza Cultural La Santamaría​, Cerro de Monserrate, Corferias y La Catedral Primada de Colombia",
      "Corferias, Monserrate, Plaza de Bolívar, Maloka",
    ],
    correct_answer: 0,
    type: "image",
    image: "/img_question.png",
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  type: string;
  image?: string;
}
