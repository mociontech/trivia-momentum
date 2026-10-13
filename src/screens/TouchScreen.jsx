import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { APP_CONFIG } from '../../shared/config.js';
import { getRoundQuestion, getRoundTotal } from '../../shared/triviaRound.js';
import ConnectionBadge from '../components/ConnectionBadge.jsx';
import ReferenceScreen from '../components/ReferenceScreen.jsx';
import BrandScreen from '../components/BrandScreen.jsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const PRIVACY_PDF_URL = '/assets/Autorizacion_Tratamiento_Datos_EnRuta_Cartagena.pdf';
const optionLetter = (index) => ['A', 'B', 'C'][index] ?? '?';

function PrivacyPdf({ onAccept }) {
  const [pageImages, setPageImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const loadingTask = pdfjsLib.getDocument(PRIVACY_PDF_URL);

    async function renderPdf() {
      try {
        const pdf = await loadingTask.promise;
        const images = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 1.65 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const outputScale = Math.min(window.devicePixelRatio || 1, 2);

          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          context.setTransform(outputScale, 0, 0, outputScale, 0, 0);

          await page.render({ canvasContext: context, viewport }).promise;
          images.push(canvas.toDataURL('image/png'));
        }

        if (!cancelled) setPageImages(images);
      } catch (renderError) {
        console.error('No fue posible previsualizar el PDF:', renderError);
        if (!cancelled) setError('No fue posible cargar el documento.');
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
      loadingTask.destroy();
    };
  }, []);

  return (
    <div className="portrait-stage privacy-pdf-stage">
      <h1>Política de privacidad</h1>
      <div className="privacy-pdf-frame">
        {pageImages.length > 0 ? (
          <div className="privacy-pdf-pages">
            {pageImages.map((pageSrc, index) => (
              <img key={pageSrc} src={pageSrc} alt={`Pagina ${index + 1} del documento`} />
            ))}
          </div>
        ) : (
          <div className="privacy-pdf-loading">
            <div className="spinner" />
            <p>{error || 'Cargando documento...'}</p>
          </div>
        )}
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
      setError('Ingresa una cédula para continuar.');
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

  if (isRegister) {
    return (
      <div className="portrait-stage register-stage">
        <img className="register-stage-logo" src="/assets/enruta-logo-combo.png" alt="EnRuta" draggable="false" />
        <h1>REGÍSTRATE</h1>

        <form className="register-form" onSubmit={submit}>
          <label className="register-field">
            <span aria-hidden="true" />
            <input
              inputMode="numeric"
              autoComplete="off"
              value={cedula}
              placeholder="Cédula"
              onChange={(event) => {
                setCedula(event.target.value);
                setError('');
              }}
              aria-label="Cédula"
            />
          </label>

          <label className="register-field">
            <span aria-hidden="true" />
            <input
              autoComplete="name"
              value={name}
              placeholder="Nombre completo"
              onChange={(event) => {
                setName(event.target.value);
                setError('');
              }}
              aria-label="Nombre completo"
            />
          </label>

          <div className="register-consent-row">
            <button
              type="button"
              className={`register-check ${accepted ? 'is-checked' : ''}`}
              onClick={openPrivacy}
              aria-label="Leer y aceptar política de privacidad"
            >
              <span />
            </button>
            <p>
              Autorizo el tratamiento de mis datos personales (cédula y nombre) para participar en las experiencias del evento y asociar mi puntaje.
              {' '}
              <button type="button" onClick={openPrivacy}>Política de Privacidad.</button>
            </p>
          </div>

          <button className="register-submit" type="submit">Continuar</button>
          {error && <p className="register-error">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <ReferenceScreen src="/reference/22.png" alt="Validacion">
      <form className="validation-overlay" onSubmit={submit}>
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
          aria-label="Cédula"
        />

        <button
          type="button"
          className={`privacy-check ${accepted ? 'is-checked' : ''}`}
          onClick={openPrivacy}
          aria-label="Leer y aceptar política de privacidad"
        >
          <span />
        </button>
        <button
          type="button"
          className="privacy-link-hotspot"
          onClick={openPrivacy}
          aria-label="Abrir política de privacidad"
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
