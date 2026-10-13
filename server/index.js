import express from 'express';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';
import { APP_CONFIG } from '../shared/config.js';
import { createQuestionOrder, getRoundQuestion, getRoundTotal } from '../shared/triviaRound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const RESULTS_FILE = path.join(ROOT, 'data', 'results.json');
const PORT = Number(process.env.PORT || 3001);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(express.json());

function freshState() {
  return {
    phase: 'welcome',
    participant: { cedula: '', name: '' },
    avatar: 'avatar-1',
    questionOrder: createQuestionOrder(),
    currentQuestion: 0,
    selectedAnswer: null,
    lastAnswerCorrect: null,
    score: 0,
    startedAt: null,
    finishedAt: null,
    responseNonce: 0,
    videoCue: null,
    qrUrl: APP_CONFIG.qrUrl,
  };
}

let state = freshState();

function broadcast() {
  io.emit('state:update', state);
}

function setState(patch) {
  state = { ...state, ...patch };
  broadcast();
}

function appendResult(result) {
  try {
    fs.mkdirSync(path.dirname(RESULTS_FILE), { recursive: true });
    const current = fs.existsSync(RESULTS_FILE)
      ? JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8') || '[]')
      : [];
    current.push(result);
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(current, null, 2));
  } catch (error) {
    console.error('No fue posible guardar el resultado:', error);
  }
}

function finishSession() {
  const finishedAt = Date.now();
  const durationMs = state.startedAt ? finishedAt - state.startedAt : 0;
  setState({ phase: 'finish', finishedAt });
  appendResult({
    participant: state.participant,
    score: state.score,
    total: getRoundTotal(state),
    durationMs,
    finishedAt: new Date(finishedAt).toISOString(),
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, phase: state.phase, clients: io.engine.clientsCount });
});

app.get('/api/state', (_req, res) => {
  res.json(state);
});

app.get('/api/results', (_req, res) => {
  try {
    const results = fs.existsSync(RESULTS_FILE)
      ? JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8') || '[]')
      : [];
    res.json(results);
  } catch {
    res.json([]);
  }
});

io.on('connection', (socket) => {
  socket.emit('state:update', state);

  socket.on('touch:welcome', () => {
    setState({ phase: 'validation' });
  });

  socket.on('touch:participant', ({ cedula = '', name = '' } = {}) => {
    const cleanCedula = String(cedula).trim();
    if (!cleanCedula) return;
    setState({
      participant: { cedula: cleanCedula, name: String(name || '').trim() },
      phase: 'instructions',
    });
  });

  socket.on('touch:instructions', () => {
    setState({ phase: 'avatar' });
  });

  socket.on('touch:avatar', (avatar = 'avatar-1') => {
    setState({ avatar, phase: 'loading' });
    setTimeout(() => {
      if (state.phase !== 'loading') return;
      setState({ phase: APP_CONFIG.showPreQuizQr ? 'pre_qr' : 'question' });
      if (!APP_CONFIG.showPreQuizQr) {
        state.startedAt = Date.now();
        broadcast();
      }
    }, 1400);
  });

  socket.on('touch:preQrContinue', () => {
    setState({ phase: 'question', startedAt: Date.now() });
  });

  socket.on('touch:answer', (answerIndex) => {
    if (state.phase !== 'question') return;
    const question = getRoundQuestion(state);
    if (!question) return;

    const normalized = Number(answerIndex);
    const correct = normalized === question.correctIndex;
    state = {
      ...state,
      selectedAnswer: normalized,
      lastAnswerCorrect: correct,
      score: state.score + (correct ? 1 : 0),
      phase: 'feedback',
      responseNonce: state.responseNonce + 1,
    };
    broadcast();

    if (APP_CONFIG.feedbackAutoAdvanceMs > 0) {
      setTimeout(() => {
        if (state.phase === 'feedback') advanceQuestion();
      }, APP_CONFIG.feedbackAutoAdvanceMs);
    }
  });

  function advanceQuestion() {
    if (state.phase !== 'feedback') return;
    const isLast = state.currentQuestion >= getRoundTotal(state) - 1;
    if (isLast) {
      finishSession();
      return;
    }
    state = {
      ...state,
      phase: 'question',
      currentQuestion: state.currentQuestion + 1,
      selectedAnswer: null,
      lastAnswerCorrect: null,
    };
    broadcast();
  }

  socket.on('touch:next', advanceQuestion);

  socket.on('touch:reset', () => {
    state = freshState();
    broadcast();
  });
});

const distPath = path.join(ROOT, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    setHeaders(res, filePath) {
      if (/\.(mp4|webm|mov)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Accept-Ranges', 'bytes');
      }
    },
  }));
  app.use((_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`EnRuta Trivia server: http://localhost:${PORT}`);
  console.log(`Pantalla táctil:        http://localhost:${PORT}/touch`);
  console.log(`Pantalla de video:      http://localhost:${PORT}/video`);
  console.log(`Pantalla de contenido:  http://localhost:${PORT}/content`);
});
