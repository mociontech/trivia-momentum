export const questions: Question[] = [
  {
    question: "¿En cualquier vuelo, sea largo o corto, Copa Airlines te ofrece refrigerio y bebida?",
    options: ["Sí", "No"],
    correct_answer: 0,
    imagen: "img/answers/respuesta1.jpg",
  },
  {
    question: "¿En Copa Airlines, puedes llevar una maleta de mano sin costo adicional?",
    options: ["SI", "NO", "Únicamente en vuelos largos"],
    correct_answer: 0,
    imagen: "img/answers/respuesta2.jpg",
  },
  {
    question: "¿Los vuelos con Copa Airlines siempre salen a tiempo?",
    options: ["Sí", "No", "Algunas veces"],
    correct_answer: 0,
    imagen: "img/answers/respuesta3.jpg",
  },
    {
    question: "¿En cuántos destinos del continente opera Copa Airlines?",
    options: ["60 destinos", "89 destinos","52 destinos"],
    correct_answer: 1,
    imagen: "img/answers/respuesta4.jpg",
  },
  {
    question: "¿Cuáles son los nuevos destinos que Copa Airlines inaugura en 2025?",
    options: [
      "Raleigh-Durham, Florianópolis y Cancún",
      "Las Vegas, Lima y Punta Cana",
      "San Diego en EE. UU., Salta y Tucumán en Argentina, y Los Cabos en México",
    ],
    correct_answer: 2,
    imagen: "img/answers/respuesta5.jpg",
  },
  {
    question: "¿Cuáles son los nuevos destinos de Copa Airlines en República Dominicana que se inauguran en enero 2026?",
    options: [
      "Santiago de los Caballeros y Puerto Plata",
      "Punta Cana y Puerto Plata",
      "La Romana y San Pedro de Macorís",
    ],
    correct_answer: 0,
    imagen: "img/answers/respuesta6.jpg",
  },
  {
    question: "¿A cuáles de estos destinos vuela Copa Airlines a Estados Unidos?",
    options: [
      "San Francisco, Springfield y Houston",
      "Denver, Washington y Austin",
      "Tampa, Miami y Filadelfia",
    ],
    correct_answer: 1,
    imagen: "img/answers/respuesta7.jpg",
  },
  {
    question: "¿A cuántos destinos de Estados Unidos vuela Copa Airlines?",
    options: ["32", "8", "17"],
    correct_answer: 2,
    imagen: "img/answers/respuesta8.jpg",
  },
  {
    question: "¿A cuántos destinos vuela Copa Airlines en el Caribe?",
    options: ["Más de 20", "3", "17"],
    correct_answer: 0,
    imagen: "img/answers/respuesta9.jpg",
  },
  {
    question: "¿A cuáles de estos destinos vuela Copa Airlines en el Caribe?",
    options: [
      "Nassau, Punta Cana y Puerto Morelos",
      "La Habana, San Juan y Montego Bay",
      "Mayagüez, Santa Clara y St. Maarten",
    ],
    correct_answer: 1,
    imagen: "img/answers/respuesta10.jpg",
  },
  {
    question: "¿Dónde se encuentra el Hub de las Américas®?",
    options: ["Panamá", "México", "Bogotá"],
    correct_answer: 0,
    imagen: "img/answers/respuesta11.jpg",
  },
  {
    question: "¿Cuál es el tiempo de conexión promedio en el Hub de las Américas®?",
    options: ["2 horas", "50 minutos", "5 horas"],
    correct_answer: 1,
    imagen: "img/answers/respuesta12.jpg",
  },
  {
    question: "¿En cuántas ciudades de Colombia opera Copa Airlines?",
    options: ["Hasta 72 horas antes", "12 horas antes", "24 horas antes"],
    correct_answer: 2,
    imagen: "img/answers/respuesta13.jpg",
  },
  {
    question: "¿En cuántas ciudades de Colombia opera Copa Airlines?",
    options: ["En 5 ciudades", "En 16 ciudades", "En 10 ciudades"],
    correct_answer: 2,
    imagen: "img/answers/respuesta14.jpg",
  },
  {
    question: "¿Puedo acumular millas si viajo en cualquier tarifa de Copa Airlines?",
    options: [ "SI","NO"],
    correct_answer: 0,
    imagen: "img/answers/respuesta15.jpg",
  },
  {
    question: "¿A cuántos destinos vuela Copa Airlines en México?",
    options: ["10", "2", "5"],
    correct_answer: 2,
    imagen: "img/answers/respuesta16.jpg",
  },
  {
    question: "¿Cuántas noches puedes estar en Panamá con el programa Stopover?",
    options: ["1 y 5 noches", "2 noches","1 y 6 noches"],
    correct_answer: 2,
    imagen: "img/answers/respuesta17.jpg",
  },
  {
    question: "¿En cuántos destinos  Argentina opera Copa Airlines?",
    options: ["8", "1", "6"],
    correct_answer: 2,
    imagen: "img/answers/respuesta18.jpg",
  },
  {
    question: "¿Con qué programa de Copa Airlines puedes conocer dos destinos por el precio de uno?",
    options: ["Panamá Stopover", "México Stopover", "Copa Stopover"],
    correct_answer: 0,
    imagen: "img/answers/respuesta19.jpg",
  },
  {
    question: "Además de poder hacer una parada gratis con Panamá Stopover, ¿Qué otros beneficios obtienes?",
    options: ["Descuentos en restaurantes", "Descuentos en la entrada a los museos y teatros", "Descuentos en hoteles","Todas las anteriores"],
    correct_answer: 3,
    imagen: "img/answers/respuesta20.jpg",
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  imagen: string;
}


export const questions2: Question[] = [
  {
    question: "¿Cuántos años de operación tiene Copa Airlines en Colombia?",
    options: ["77 años", "40 años","56 años"],
    correct_answer: 2,
    imagen: "img/answers/respuesta21.jpg",
  },
  {
    question: "¿Cuántos Copa Club (sala VIP) tiene Copa Airlines en el continente?",
    options: ["1", "6", "5"],
    correct_answer: 2,
    imagen: "img/answers/respuesta22.jpg",
  },
  {
    question: "¿Cómo se llama el programa de viajero frecuente de Copa Airlines?",
    options: ["ConnectMiles", "Gold Traveler", "Flying Blue"],
    correct_answer: 0,
    imagen: "img/answers/respuesta23.jpg",
  },

  {
    question: "¿En todos los vuelos de Copa Airlines puedes encontrar Clase Ejecutiva?",
    options: ["SI","NO"],
    correct_answer: 0,
    imagen: "img/answers/respuesta24.jpg",
  },
  {
    question: "¿Qué tiene una aerolínea de servicio completo?",
    options: [
      "Servicio a bordo (refrigerio y bebida)",
      "Puntualidad, ya que llegas a tiempo a tu destino",
      "Todas las anteriores",
    ],
    correct_answer: 2,
    imagen: "img/answers/respuesta25.jpg",
  },
  {
    question: "¿En cuantas ciudades del Caribe colombiano opera Copa Airlines?",
    options: [
      "1",
      "7",
      "4",
    ],
    correct_answer: 0,
    imagen: "img/answers/respuesta26.jpg",
  },
  {
    question: "¿Cuántos vuelos opera Copa Airlines desde el Hub de las Américas® diariamente?",
    options: [
      "Más de 375 vuelos diarios",
      "Más de 100 vuelos diarios",
      "Más de 200 vuelos diarios",
    ],
    correct_answer: 1,
    imagen: "img/answers/respuesta27.jpg",
  },
  {
    question: "¿Cuál es el nuevo destino que Copa Airlines inaugura en México en 2025?",
    options: ["Cancún", "Guanajuato", "Aguascalientes","Los Cabos"],
    correct_answer: 3,
    imagen: "img/answers/respuesta28.jpg",
  },
  {
    question: "¿Qué caracteriza a las conexiones en el Hub de las Américas®?",
    options: ["Conexiones rápidas", "Sin trámites de migración ni aduana", "Con el equipaje registrado hasta el destino final","Todas las anteriores"],
    correct_answer: 3,
    imagen: "img/answers/respuesta29.jpg",
  },
  {
    question: "Si eres miembro ConnectMiles, ¿Puedes acumular millas al volar con otras aerolíneas miembros de Star Alliance?",
    options: [
      "SI",
      "NO",
      "Algunas veces",
    ],
    correct_answer: 1,
    imagen: "img/answers/respuesta30.jpg",
  },

  {
    question: "¿Cuáles son los beneficios de ser miembro Prefer con ConnectMiles en Copa Airlines?",
    options: ["Selección ilimitada de asientos sin costo", "Equipaje incluido en todas las tarifas", "Acceso ilimitado a salas VIP","Todas las anteriores"],
    correct_answer: 1,
    imagen: "img/answers/respuesta31.jpg",
  },

    {
    question: "¿Cuántas noches puedes estar en Panamá con el programa Stopover?",
    options: ["1 y 5 noches", "2 noches","1 y 6 noches"],
    correct_answer: 2,
    imagen: "img/answers/respuesta32.jpg",
  },
  {
    question: "¿En cuántos destinos en Argentina opera Copa Airlines?",
    options: ["8", "1", "6"],
    correct_answer: 2,
    imagen: "img/answers/respuesta33.jpg",
  },
  {
    question: "¿Con qué programa de Copa Airlines puedes conocer dos destinos por el precio de uno?",
    options: ["Panamá Stopover", "México Stopover", "Copa Stopover"],
    correct_answer: 0,
    imagen: "img/answers/respuesta34.jpg",
  },
  {
    question: "Además de poder hacer una parada gratis con Panamá Stopover, ¿Qué otros beneficios obtienes?",
    options: ["Descuentos en restaurantes", "Descuentos en la entrada a los museos y teatros", "Descuentos en hoteles","Todas las anteriores"],
    correct_answer: 3,
    imagen: "img/answers/respuesta35.jpg",
  },

];