import ReferenceScreen from '../components/ReferenceScreen.jsx';
import { QUESTIONS } from '../../shared/questions.js';

const IDLE_CONTENT_IMAGE = '/Contenido/sin%20hacer.png';

const CONTENT_EXPLANATIONS = [
  '¡Muy bien! Enruta te ayuda a conectar las necesidades de tu empresa con oportunidades para crecer.',
  '¡Correcto! El perfil y el diagnóstico permiten orientar una ruta acorde con la realidad de cada empresa.',
  '¡Muy bien! La caracterización permite conocer tu empresa y tener un punto de partida para orientar su ruta.',
  '¡Correcto! El diagnóstico ayuda a reconocer qué necesita fortalecer tu empresa y dónde tiene oportunidades de mejora.',
  '¡La respuesta es correcta! Cada empresa tiene necesidades distintas, por eso su ruta debe responder a ellas.',
  '¡Muy bien! Después de conocer el perfil de tu empresa, el diagnóstico permite profundizar en sus necesidades y capacidades.',
  '¡Correcto! Lo ideal es que los servicios asignados atiendan las necesidades identificadas en tu empresa.',
  '¡La respuesta es correcta! Avanzar significa participar en acciones que aporten a los objetivos y al crecimiento de tu empresa.',
  '¡Muy bien! La Cámara de Comercio de Cartagena impulsa Enruta para acompañar a empresarios y emprendedores en su crecimiento.',
  '¡Correcto! Puedes encontrar programas y servicios que se relacionen con lo que tu empresa necesita fortalecer.',
  '¡La respuesta es correcta! Tu opinión ayuda a conocer cómo fue la experiencia y qué podemos mejorar.',
  '¡Muy bien! Una ruta conecta los servicios con tus necesidades y les da un propósito dentro del crecimiento empresarial.',
  '¡Correcto! Cada empresa debe recibir orientación hacia los servicios que mejor respondan a su situación.',
  '¡La respuesta es correcta! El seguimiento ayuda a reconocer los avances y lo que todavía necesita atención.',
  '¡Muy bien! Enruta busca conectar a tu empresa con oportunidades que aporten a su desarrollo. ¡Tu ruta completa para hacer crecer tu empresa!',
];

function clampQuestionNumber(value, fallback) {
  const number = Number(value || fallback || 1);
  return Math.max(1, Math.min(QUESTIONS.length, number));
}

function IdleContent() {
  return (
    <main className="display-root content-display">
      <ReferenceScreen src={IDLE_CONTENT_IMAGE} alt="EnRuta Empresarial" />
    </main>
  );
}

function ContentResult({ state }) {
  const cue = state.videoCue || {};
  const questionNumber = clampQuestionNumber(cue.questionNumber, state.currentQuestion + 1);
  const isCorrect = (cue.correct ?? state.lastAnswerCorrect) !== false;

  return (
    <main className="display-root content-display">
      <ReferenceScreen src={IDLE_CONTENT_IMAGE} alt={isCorrect ? 'Correcto' : 'Incorrecto'}>
        <div className={`content-result-layout ${isCorrect ? 'is-correct' : 'is-incorrect'}`}>
          {isCorrect ? (
            <img
              className="content-result-icon"
              src={`/Contenido/pregunta${questionNumber}.png`}
              alt=""
              draggable="false"
            />
          ) : (
            <div className="content-result-x" aria-hidden="true">×</div>
          )}
          <h1>{isCorrect ? 'Correcto' : 'Incorrecto'}</h1>
          {isCorrect && <p>{CONTENT_EXPLANATIONS[questionNumber - 1]}</p>}
        </div>
      </ReferenceScreen>
    </main>
  );
}

export default function ContentScreen({ state }) {
  if (state?.phase === 'feedback' || state?.phase === 'video') {
    return <ContentResult state={state} />;
  }

  return <IdleContent />;
}
