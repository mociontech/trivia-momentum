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
    question: "¿En qué nube se puede tener Oracle AI Vector Search?",
    options: ["OCI y GCP", "Azure y AWS", "OCI AWS Azure y GCP", "OCI y AWS"],
    correct_answer: 3,
    type: "text",
  },
  {
    question: "¿Qué es una estrategia multicloud?",
    options: [
      "El uso de una única nube para todas las aplicaciones de una empresa",
      "La integración de servicios locales y en la nube",
      "La combinación de múltiples servicios en la nube de distintos proveedores para optimizar el rendimiento y la flexibilidad",
      "El almacenamiento exclusivo en servidores físicos dentro de la empresa",
    ],
    correct_answer: 3,
    type: "text",
  },
  {
    question:
      "¿Cuál de los siguientes servicios permite Oracle para mejorar la experiencia multicloud?",
    options: [
      "Oracle Interconnect for Azure",
      "Oracle Cloud Constrictor",
      "Oracle Virtual Gateway",
      "Oracle Cloud Partner Lock",
    ],
    correct_answer: 1,
    type: "text",
  },
  {
    question:
      "¿Qué ventaja ofrece el enfoque multicloud de Oracle para las empresas?",
    options: ["/image1.png", "/image2.png"],
    correct_answer: 0,
    type: "image",
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  type: string;
}
