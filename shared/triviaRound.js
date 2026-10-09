import { APP_CONFIG } from './config.js';
import { QUESTIONS } from './questions.js';

export const ROUND_SIZE = Math.min(APP_CONFIG.totalQuestions, QUESTIONS.length);

export function createQuestionOrder() {
  const order = QUESTIONS.map((_, index) => index);

  for (let index = order.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[randomIndex]] = [order[randomIndex], order[index]];
  }

  return order.slice(0, ROUND_SIZE);
}

export function normalizeQuestionOrder(questionOrder) {
  const normalized = [];

  if (Array.isArray(questionOrder)) {
    questionOrder.forEach((value) => {
      const index = Number(value);
      const isValid = Number.isInteger(index) && index >= 0 && index < QUESTIONS.length;
      if (isValid && !normalized.includes(index)) normalized.push(index);
    });
  }

  for (let index = 0; normalized.length < ROUND_SIZE && index < QUESTIONS.length; index += 1) {
    if (!normalized.includes(index)) normalized.push(index);
  }

  return normalized.slice(0, ROUND_SIZE);
}

export function getRoundTotal(state) {
  return normalizeQuestionOrder(state?.questionOrder).length;
}

export function getRoundQuestion(state) {
  const order = normalizeQuestionOrder(state?.questionOrder);
  const position = Math.max(0, Math.min(order.length - 1, Number(state?.currentQuestion || 0)));
  return QUESTIONS[order[position]] || QUESTIONS[0];
}
