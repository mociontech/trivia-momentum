import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { APP_CONFIG } from '../../shared/config.js';
import { getRoundQuestion, getRoundTotal } from '../../shared/triviaRound.js';
import ConnectionBadge from '../components/ConnectionBadge.jsx';
import ReferenceScreen from '../components/ReferenceScreen.jsx';
import BrandScreen from '../components/BrandScreen.jsx';

const PRIVACY_PDF_URL = '/assets/Autorizacion_Tratamiento_Datos_EnRuta_Cartagena.pdf';
const optionLetter = (index) => ['A', 'B', 'C'][index] ?? '?';

function PrivacyPdf({ onAccept }) {
  return (
    <div className="portrait-stage privacy-pdf-stage">
      <h1>Politica de privacidad</h1>
      <div className="privacy-pdf-frame">
        <iframe
          title="Autorizacion tratamiento de datos"
          src={`${PRIVACY_PDF_URL}#toolbar=0&navpanes=0`}
        />
      </div>
      <button className="privacy-accept-button" type="button" onClick={onAccept}>
        Aceptar
      </button>
    </div>
  );
}

function Validation({ socket }) {
  const [cedula, setCedula] = useState('');
  const [name, setName] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [mode, setMode] = useState('validation');
  const isRegister = mode === 'register';

  const openPrivacy = () => {
    setError('');
    setPrivacyOpen(true);
  };

  const acceptPrivacy = () => {
    setAccepted(true);
    setPrivacyOpen(false);
    setError('');
  };

  const submit = (event) => {
    event.preventDefault();

    if (isRegister && !name.trim()) {
      setError('Ingresa tu nombre para continuar.');
      return;
    }

    if (!cedula.trim()) {
      setError('Ingresa una cedula para continuar.');
      return;
    }

    if (!accepted) {
      setError('Autoriza el tratamiento de datos para continuar.');
      return;
    }

    socket.emit('touch:participant', { cedula, name: isRegister ? name : '' });
  };

  if (privacyOpen) {
    return <PrivacyPdf onAccept={acceptPrivacy} />;
  }

  return (
    <ReferenceScreen src="/reference/22.png" alt={isRegister ? 'Registro' : 'Validacion'}>
      <form className={`validation-overlay ${isRegister ? 'is-register' : ''}`} onSubmit={submit}>
        {isRegister && (
          <>
            <span className="register-name-shell" aria-hidden="true" />
            <input
              className="name-input"
              autoComplete="name"
              value={name}
              placeholder="Nombre"
              onChange={(event) => {
                setName(event.target.value);
                setError('');
              }}
              aria-label="Nombre"
            />
          </>
        )}

        {cedula && <span className="cedula-mask" aria-hidden="true" />}
        <input
          className="cedula-input"
          inputMode="numeric"
          autoComplete="off"
          value={cedula}
          onChange={(event) => {
            setCedula(event.target.value);
            setError('');
          }}
          aria-label="Cedula"
        />

        <button
          type="button"
          className={`privacy-check ${accepted ? 'is-checked' : ''}`}
          onClick={openPrivacy}
          aria-label="Leer y aceptar politica de privacidad"
        >
          <span />
        </button>
        <button
          type="button"
          className="privacy-link-hotspot"
          onClick={openPrivacy}
          aria-label="Abrir politica de privacidad"
        />
        <button className="validation-submit" type="submit" aria-label="Comenzar">Comenzar</button>

        {!isRegister && (
          <button
            type="button"
            className="register-hotspot"
            onClick={() => {
              setMode('register');
              setAccepted(false);
              setError('');
            }}
            aria-label="Registrate"
          />
        )}

        {error && <p className="touch-error">{error}</p>}
      </form>
    </ReferenceScreen>
  );
}

function Loading() {
  return (
    <BrandScreen>
      <div className="center-copy">
        <div className="spinner" />
        <h1>Preparando tu experiencia</h1>
        <p>Un momento...</p>
      </div>
    </BrandScreen>
  );
}

function VideoWait() {
  return (
    <ReferenceScreen src="/Contenido/espera.png" alt="Reproduciendo respuesta" className="video-wait-reference">
      <img className="video-wait-loader" src="/Contenido/leader.gif" alt="" aria-hidden="true" draggable="false" />
    </ReferenceScreen>
  );
}

function PreQr({ socket, state }) {
  return (
    <BrandScreen>
      <div className="center-copy qr-copy">
        <p className="eyebrow">QR</p>
        <h1>Escanea para continuar</h1>
        <div className="qr-card"><QRCodeSVG value={state.qrUrl || APP_CONFIG.qrUrl} size={250} /></div>
        <button className="primary-button" onClick={() => socket.emit('touch:preQrContinue')}>Continuar</button>
      </div>
    </BrandScreen>
  );
}

function Question({ socket, state }) {
  const question = getRoundQuestion(state);
  const totalQuestions = getRoundTotal(state);
  const [now, setNow] = useState(Date.now());
  const remainingSeconds = Math.max(0, Math.ceil(((state.quizEndsAt || now) - now) / 1000));
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <ReferenceScreen src="/reference/question-clean.png" alt="Pregunta">
      <div className="question-overlay question-reference-overlay">
        <div className="question-count">{state.currentQuestion + 1} / {totalQuestions}</div>
        <h1>Pregunta</h1>
        <p className="question-copy">{question.question}</p>
        <div className="answers">
          {question.options.map((option, index) => (
            <button key={option} onClick={() => socket.emit('touch:answer', index)}>
              <strong>{optionLetter(index)})</strong> {option}
            </button>
          ))}
        </div>
        <div className="question-timer">{minutes}:{seconds}</div>
      </div>
    </ReferenceScreen>
  );
}

function Finish({ socket, state }) {
  const totalQuestions = getRoundTotal(state);
  const passed = state.score >= APP_CONFIG.passingScore;

  return (
    <ReferenceScreen src={passed ? '/Contenido/ganador.png' : '/Contenido/perdiste.png'} alt={passed ? 'Ganaste' : 'Perdiste'}>
      <div className="result-score">{state.score}/{totalQuestions}</div>
      <button className="finish-hotspot" onClick={() => socket.emit('touch:reset')} aria-label="Finalizar" />
    </ReferenceScreen>
  );
}

export default function TouchScreen({ socket, state, connected }) {
  const phase = state?.phase || 'loading_state';

  useEffect(() => {
    if (phase === 'feedback') {
      socket.emit('touch:next');
    }
  }, [phase, socket]);

  const content = useMemo(() => {
    if (!state) return <Loading />;

    switch (phase) {
      case 'welcome':
        return (
          <ReferenceScreen src="/reference/1.png" alt="Reta tu conocimiento" className="welcome-reference-stage">
            <button className="welcome-hotspot" aria-label="Iniciar" onClick={() => socket.emit('touch:welcome')} />
          </ReferenceScreen>
        );
      case 'validation':
        return <Validation socket={socket} />;
      case 'instructions':
        return (
          <ReferenceScreen src="/reference/3.png" alt="Instructivo">
            <button className="instructions-hotspot" aria-label="Iniciar trivia" onClick={() => socket.emit('touch:instructions')} />
          </ReferenceScreen>
        );
      case 'loading':
      case 'avatar':
      case 'feedback':
        return <Loading />;
      case 'pre_qr':
        return <PreQr socket={socket} state={state} />;
      case 'question':
        return <Question socket={socket} state={state} />;
      case 'video':
        return <VideoWait />;
      case 'finish':
        return <Finish socket={socket} state={state} />;
      default:
        return <Loading />;
    }
  }, [phase, socket, state]);

  return (
    <main className="display-root touch-root">
      <ConnectionBadge connected={connected} />
      {content}
    </main>
  );
}
