import { useEffect, useMemo, useRef, useState } from 'react';
import { child, get, onValue, push, ref, set } from 'firebase/database';
import { database } from '../lib/firebase.js';
import { APP_CONFIG } from '../../shared/config.js';
import { createQuestionOrder, getRoundQuestion, getRoundTotal } from '../../shared/triviaRound.js';

const STATE_PATH = 'enrutaTrivia/currentState';
const RESULTS_PATH = 'enrutaTrivia/results';

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
    quizEndsAt: null,
    pausedRemainingMs: null,
    finishedAt: null,
    responseNonce: 0,
    videoCue: null,
    qrUrl: APP_CONFIG.qrUrl,
  };
}

async function writeState(nextState) {
  await set(ref(database, STATE_PATH), nextState);
}

async function appendResult(result) {
  await push(ref(database, RESULTS_PATH), result);
}

export function useTriviaSocket() {
  const [state, setState] = useState(null);
  const [connected, setConnected] = useState(false);
  const stateRef = useRef(null);
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const connectedRef = ref(database, '.info/connected');
    const unsubscribeConnected = onValue(connectedRef, (snapshot) => {
      setConnected(snapshot.val() === true);
    });

    const stateRefDb = ref(database, STATE_PATH);
    const unsubscribeState = onValue(
      stateRefDb,
      (snapshot) => {
        const nextState = snapshot.val();
        if (nextState) {
          setState(nextState);
          return;
        }

        writeState(freshState()).catch((error) => {
          console.error('No fue posible inicializar Firebase:', error);
        });
      },
      (error) => {
        console.error('No fue posible leer el estado de Firebase:', error);
        setConnected(false);
      },
    );

    return () => {
      unsubscribeConnected();
      unsubscribeState();
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const socket = useMemo(() => {
    const beginRound = async (latestState, startedAt) => {
      await writeState({
        ...latestState,
        phase: 'question',
        questionOrder: createQuestionOrder(),
        currentQuestion: 0,
        selectedAnswer: null,
        lastAnswerCorrect: null,
        score: 0,
        startedAt,
        finishedAt: null,
        responseNonce: 0,
        videoCue: null,
        quizEndsAt: startedAt + 60000,
        pausedRemainingMs: null,
      });
    };

    const finishSession = async (currentState) => {
      if (currentState.phase === 'finish') return;

      const finishedAt = Date.now();
      const durationMs = currentState.startedAt ? finishedAt - currentState.startedAt : 0;
      const nextState = { ...currentState, phase: 'finish', finishedAt };

      await writeState(nextState);
      await appendResult({
        participant: currentState.participant,
        score: currentState.score,
        total: getRoundTotal(currentState),
        questionOrder: currentState.questionOrder || [],
        durationMs,
        finishedAt: new Date(finishedAt).toISOString(),
      });
    };

    const advanceAfterVideo = async (currentState) => {
      if (!currentState || currentState.phase !== 'video') return;

      const isLast = currentState.currentQuestion >= getRoundTotal(currentState) - 1;
      if (isLast) {
        await finishSession(currentState);
        return;
      }

      const remainingMs = Math.max(0, Number(currentState.pausedRemainingMs || 0));
      if (remainingMs <= 0) {
        await finishSession(currentState);
        return;
      }

      await writeState({
        ...currentState,
        phase: 'question',
        currentQuestion: currentState.currentQuestion + 1,
        selectedAnswer: null,
        lastAnswerCorrect: null,
        quizEndsAt: Date.now() + remainingMs,
        pausedRemainingMs: null,
      });
    };

    const handlers = {
      'touch:welcome': async () => {
        await writeState({ ...(stateRef.current || freshState()), phase: 'validation' });
      },
      'touch:participant': async ({ cedula = '', name = '' } = {}) => {
        const cleanCedula = String(cedula).trim();
        if (!cleanCedula) return;

        await writeState({
          ...(stateRef.current || freshState()),
          participant: { cedula: cleanCedula, name: String(name || '').trim() },
          phase: 'instructions',
        });
      },
      'touch:instructions': async () => {
        const currentState = stateRef.current || freshState();
        await writeState({ ...currentState, phase: 'loading' });

        window.setTimeout(async () => {
          const latestSnapshot = await get(child(ref(database), STATE_PATH));
          const latestState = latestSnapshot.val();
          if (!latestState || latestState.phase !== 'loading') return;

          const startedAt = APP_CONFIG.showPreQuizQr ? latestState.startedAt : Date.now();
          if (APP_CONFIG.showPreQuizQr) {
            await writeState({
              ...latestState,
              phase: 'pre_qr',
              startedAt,
              quizEndsAt: latestState.quizEndsAt,
            });
            return;
          }

          await beginRound(latestState, startedAt);
        }, 900);
      },
      'touch:avatar': async (avatar = 'avatar-1') => {
        const currentState = stateRef.current || freshState();
        await writeState({ ...currentState, avatar, phase: 'loading' });

        window.setTimeout(async () => {
          const latestSnapshot = await get(child(ref(database), STATE_PATH));
          const latestState = latestSnapshot.val();
          if (!latestState || latestState.phase !== 'loading') return;

          const startedAt = APP_CONFIG.showPreQuizQr ? latestState.startedAt : Date.now();
          if (APP_CONFIG.showPreQuizQr) {
            await writeState({
              ...latestState,
              phase: 'pre_qr',
              startedAt,
              quizEndsAt: latestState.quizEndsAt,
            });
            return;
          }

          await beginRound(latestState, startedAt);
        }, 1400);
      },
      'touch:preQrContinue': async () => {
        const startedAt = Date.now();
        await beginRound(stateRef.current || freshState(), startedAt);
      },
      'touch:answer': async (answerIndex) => {
        const currentState = stateRef.current;
        if (!currentState || currentState.phase !== 'question') return;
        if (currentState.quizEndsAt && Date.now() >= currentState.quizEndsAt) {
          await finishSession(currentState);
          return;
        }

        const question = getRoundQuestion(currentState);
        if (!question) return;

        const normalized = Number(answerIndex);
        const correct = normalized === question.correctIndex;
        const responseNonce = currentState.responseNonce + 1;
        const pausedRemainingMs = Math.max(0, Number(currentState.quizEndsAt || Date.now()) - Date.now());
        const answeredState = {
          ...currentState,
          selectedAnswer: normalized,
          lastAnswerCorrect: correct,
          score: currentState.score + (correct ? 1 : 0),
          responseNonce,
          phase: 'video',
          quizEndsAt: null,
          pausedRemainingMs,
          videoCue: {
            nonce: responseNonce,
            correct,
            questionNumber: question.id,
            roundQuestion: currentState.currentQuestion + 1,
          },
        };

        await writeState(answeredState);
      },
      'touch:next': async () => {
        await advanceAfterVideo(stateRef.current);
      },
      'touch:timeout': async () => {
        const currentState = stateRef.current;
        if (!currentState || currentState.phase !== 'question') return;
        await finishSession(currentState);
      },
      'video:ended': async ({ nonce } = {}) => {
        const currentState = stateRef.current;
        if (!currentState || currentState.phase !== 'video') return;
        if (nonce && currentState.videoCue?.nonce !== nonce) return;
        await advanceAfterVideo(currentState);
      },
      'touch:reset': async () => {
        await writeState(freshState());
      },
    };

    return {
      emit(eventName, payload) {
        const handler = handlers[eventName];
        if (!handler) return;

        handler(payload).catch((error) => {
          console.error(`No fue posible ejecutar ${eventName}:`, error);
        });
      },
    };
  }, []);

  useEffect(() => {
    if (!state?.quizEndsAt || state.phase !== 'question') return undefined;

    const remainingMs = state.quizEndsAt - Date.now();
    if (remainingMs <= 0) {
      socket.emit('touch:timeout');
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      socket.emit('touch:timeout');
    }, remainingMs);

    return () => window.clearTimeout(timeoutId);
  }, [socket, state?.phase, state?.quizEndsAt]);

  useEffect(() => {
    if (!state || state.phase !== 'question' || state.quizEndsAt) return;

    const startedAt = state.startedAt || Date.now();
    writeState({
      ...state,
      startedAt,
      quizEndsAt: Date.now() + 60000,
    }).catch((error) => {
      console.error('No fue posible reparar el cronÃ³metro:', error);
    });
  }, [state]);

  return { socket, state, connected };
}
