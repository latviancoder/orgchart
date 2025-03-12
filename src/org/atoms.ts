import { atom } from 'jotai';

export const initialOffsetAtom = atom({ x: 0, y: 0 });

export const offsetAtom = atom<{ x: number; y: number }>({ x: 0, y: 0 });
