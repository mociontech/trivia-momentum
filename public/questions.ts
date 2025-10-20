// EDITA AQUÍ: Este archivo contiene el banco de preguntas.
// - Modifica los objetos en el array `questions` para cambiar pregunta, opciones y correct_answer.
// - `correct_answer` usa el índice (0-based) de la opción correcta.
// Ejemplo de una entrada:
// {
//   question: "Texto de la pregunta",
//   options: ["op1","op2","op3","op4"],
//   correct_answer: 0, // índice de la opción correcta
// }

export const questions: Question[] = [
  {
    question:
      "En promedio, cuántas herramientas diferentes utilizan hoy los equipos de RRHH globales para cubrir nómina, desempeño, compensaciones, aprendizaje y planeación de plantilla?",
    options: [
      "A) 1-2",
      "B) 3-5",
      "C) 6-8",
      "D) Más de 8",
    ],
    correct_answer: 3,
    hintImage: "/assets/advertencia1.png",
  },
  {
    question:
      "El ciclo de vida del trabajador va desde la planeación hasta la terminación. ¿Cuál de estos procesos NO forma parte de ese ciclo?",
    options: [
      "A) Planeacion de plantilla",
      "B) Onboarding y capacitación",
      "C) Revisiones de desempeño",
      "D) Marketing de productos al cliente final",
    ],
    correct_answer: 3,
    hintImage: "/assets/advertencia2.png",
  },
  {
    question:
      "En la etapa de salida u offboarding, ¿qué aspecto es clave para reducir riesgos legales y mantener una buena reputación de marca empleadora?",
    options: [
      "A) Procesos claros de terminación, compilance y documentación",
      "B) Dejar que cada área lo maneje a su manera",
      "C) Evitar dar retroalimentación al empleado",
      "D) Ignorar el bienestar del empleado saliente",
    ],
    correct_answer: 0,
    hintImage: "/assets/advertencia3.png",
  },
  {
    question:
      "¿En cuántos países opera Deel ayudando a empresas a contratar, pagar y cumplir regulaciones laborales?",
    options: [
      "A) Menos de 50",
      "B) Entre 50 y 100",
      "C) Entre 100 y 150",
      "D) Más de 150",
    ],
    correct_answer: 3,
    hintImage: "/assets/advertencia4.png",
  },
  {
    question: 
      "¿Qué módulo de Deel permite planear headcount, simular escenarios de contratación y alinear presupuesto de personas con finanzas?",
    options: [
      "A) Deel Engage", 
      "B) Deel Workforce Planning", 
      "C) Deel Compensation", 
      "D) Deel Talent"
    ],
    correct_answer: 1,
    hintImage: "/assets/advertencia5.png",
  },
];

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  hintImage?: string;
}
