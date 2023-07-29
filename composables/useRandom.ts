import { nanoid } from 'nanoid';

export default function useRandom(limit: number, round: boolean = false): number {
    const num = Math.random() * limit;

    if (round) return Math.floor(num);

    return num;
}

export function pickRandom<T>(arr: T[]): T | null {
    if (!arr.length) return null;

    return arr[useRandom(arr.length, true)];
}

export function getRandomId() {
    return nanoid();
}
