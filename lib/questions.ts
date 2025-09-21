export const questions: Question[] = [
  {
    question: "¿En cualquier vuelo, sea largo o corto, Copa Airlines te ofrece refrigerio y bebida?",
    options: ["Sí", "No"],
    correct_answer: 0,
    imagen: "img/answers/respuesta1.png",
  },
  {
    question: "¿En Copa Airlines puedes llevar una maleta de mano?",
    options: ["Sí", "No", "Únicamente en vuelos largos"],
    correct_answer: 0,
    imagen: "img/answers/respuesta2.png",
  },
  {
    question: "¿Los vuelos con Copa Airlines siempre salen a tiempo?",
    options: ["Sí", "No", "Algunas veces"],
    correct_answer: 0,
    imagen: "img/answers/respuesta3.png",
  },
  {
    question: "¿Cuál de las siguientes imágenes representa un asiento cómodo de un vuelo?",
    options: ["Pasajero 1", "Pasajero 2"],
    correct_answer: 1,
    imagen: "img/answers/respuesta4.png",
  },
  {
    question: "¿Cuáles son los nuevos destinos que Copa Airlines inaugura en 2025?",
    options: [
      "Raleigh-Durham, Florianópolis y Cancún",
      "Las Vegas, Lima y Punta Cana",
      "San Diego en EE. UU., Salta y Tucumán en Argentina, y Los Cabos en México",
    ],
    correct_answer: 2,
    imagen: "img/answers/respuesta5.png",
  },
  {
    question: "¿Cuáles son los nuevos destinos de Copa Airlines en República Dominicana que se inauguran en enero de 2026?",
    options: [
      "Santiago de los Caballeros y Puerto Plata",
      "Punta Cana y Puerto Plata",
      "La Romana y San Pedro",
    ],
    correct_answer: 0,
    imagen: "img/answers/respuesta6.png",
  },
  {
    question: "¿A cuáles de estos destinos vuela Copa Airlines en Estados Unidos?",
    options: [
      "San Francisco, Springfield y Houston",
      "Denver, Washington y Austin",
      "Tampa, Miami y Filadelfia",
    ],
    correct_answer: 1,
    imagen: "img/answers/respuesta7.png",
  },
  {
    question: "¿A cuántos destinos de Estados Unidos vuela Copa Airlines?",
    options: ["32", "8", "17"],
    correct_answer: 2,
    imagen: "img/answers/respuesta8.png",
  },
  {
    question: "¿A cuántos destinos vuela Copa Airlines en el Caribe?",
    options: ["Más de 20", "3", "17"],
    correct_answer: 0,
    imagen: "img/answers/respuesta9.png",
  },
  {
    question: "¿A cuáles de estos destinos vuela Copa Airlines en el Caribe?",
    options: [
      "Nassau, Punta Cana y Puerto Morelos",
      "La Habana, San Juan y Montego Bay",
      "Mayagüez, Santa Clara y St. Maarten",
    ],
    correct_answer: 1,
    imagen: "img/answers/respuesta10.png",
  },
  {
    question: "¿Dónde se encuentra el Hub de las Américas?",
    options: ["Ciudad de Panamá", "Ciudad de México", "Bogotá"],
    correct_answer: 0,
    imagen: "img/answers/respuesta11.png",
  },
  {
    question: "¿Cuál es el tiempo de conexión promedio en el Hub de las Américas?",
    options: ["2 horas", "50 minutos", "5 horas"],
    correct_answer: 1,
    imagen: "img/answers/respuesta12.png",
  },
  {
    question: "¿Con cuánta anticipación se realiza el check-in de un vuelo con Copa Airlines?",
    options: ["Hasta 72 horas antes", "12 horas antes", "24 horas antes"],
    correct_answer: 2,
    imagen: "img/answers/respuesta13.png",
  },
  {
    question: "¿En cuántas ciudades de Colombia opera Copa Airlines?",
    options: ["En 5 ciudades", "En 16 ciudades", "En 10 ciudades"],
    correct_answer: 2,
    imagen: "img/answers/respuesta14.png",
  },
  {
    question: "¿Puedo acumular millas si viajo en cualquier tarifa de Copa Airlines?",
    options: ["Sí", "No", "ConnectMiles"],
    correct_answer: 2,
    imagen: "img/answers/respuesta15.png",
  },
  {
    question: "¿A cuántos destinos vuela Copa Airlines en México?",
    options: ["10", "2", "5"],
    correct_answer: 2,
    imagen: "img/answers/respuesta16.png",
  },
  {
    question: "¿Cuál de estas imágenes representa la experiencia de clase ejecutiva en Copa Airlines?",
    options: ["Foto 1", "Foto 2"],
    correct_answer: 0,
    imagen: "img/answers/respuesta17.png",
  },
  {
    question: "¿En cuántos destinos en Argentina opera Copa Airlines?",
    options: ["8", "1", "6"],
    correct_answer: 0,
    imagen: "img/answers/respuesta18.png",
  },
  {
    question: "¿Con qué programa de Copa Airlines puedes conocer dos destinos por el precio de uno?",
    options: ["Panamá Stopover", "México Stopover", "Copa Stopover"],
    correct_answer: 0,
    imagen: "img/answers/respuesta19.png",
  },
  {
    question: "¿En cuantos destinos del continente opera Copa Airlines?",
    options: ["60 Destinatios", "89 Destinos", "52 Destinos"],
    correct_answer: 1,
    imagen: "img/answers/respuesta20.png",
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  imagen: string;
}
