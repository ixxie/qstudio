import { customAlphabet } from 'nanoid';

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = lower.toUpperCase();
const numbers = '0123456789';

export const genId = customAlphabet(lower + upper + numbers, 16);
