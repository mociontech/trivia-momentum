export const questions: Question[] = [
  {
    question: "¿Cuál es la principal diferencia entre los rayos UVA y UVB?",
    options: [
      "Los rayos UVA causan quemaduras solares, mientras que los UVB solo broncean la piel.",
      "Los rayos UVA son menos dañinos que los UVB y no afectan la piel.",
      "Los rayos UVA pueden penetrar más profundamente en la piel, mientras que los UVB tienen más energía y pueden causar quemaduras solares.",
      "No hay diferencia, ambos afectan la piel de la misma manera.",
    ],
    correct_answer: 2,
  },
  {
    question: "¿Qué significa SPF en un protector solar?",
    options: [
      "Sistema de Protección Facial",
      "Super Protección de Fotones",
      "Factor de Protección Solar",
      "Filtro Protector Fijo",
    ],
    correct_answer: 2,
  },
  {
    question:
      "¿Por qué es importante aplicar protector solar incluso en invierno?",
    options: [
      "Porque los rayos solares solo afectan en climas fríos.",
      "Porque los rayos UV pueden atravesar nubes y ventanas, dañando la piel incluso en días nublados.",
      "Porque el frío hace que la piel se vuelva más sensible.",
      "Porque solo protege contra el viento y la resequedad.",
    ],
    correct_answer: 1,
  },
  {
    question: "¿Cada cuánto tiempo se recomienda reaplicar el protector solar?",
    options: [
      "Solo una vez al día es suficiente.",
      "Cada 2 horas o después de sudar, nadar o secarse con una toalla.",
      "Solo si la piel empieza a enrojecerse.",
      "Cada 6 horas sin importar la actividad.",
    ],
    correct_answer: 1,
  },
  {
    question:
      "¿Qué tipo de protector solar se recomienda para piel grasa o con acné?",
    options: [
      "Un protector solar denso y oleoso para mayor hidratación.",
      "Cualquier protector solar, no importa el tipo de piel.",
      "Un protector solar matificante y no comedogénico para evitar obstrucción de poros.",
      "No se recomienda el uso de protector solar en piel grasa.",
    ],
    correct_answer: 2,
  },
  {
    question:
      "¿Cuál de estas NO es una de las presentaciones de la línea Total Block de Yanbal?",
    options: [
      "Dermafusión, con protección y tratamiento facial.",
      "Mineral, ideal para pieles sensibles y amigable con el medio ambiente.",
      "Ultraprotección, con protección de amplio espectro para toda la familia.",
      "Hidratante Extremo, con efecto bronceador progresivo.",
    ],
    correct_answer: 3,
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}
