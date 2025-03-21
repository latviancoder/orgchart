import { atom } from 'jotai';

export const initialOffsetAtom = atom({ x: 0, y: 0 });

export const offsetAtom = atom<{ x: number; y: number }>({ x: 0, y: 0 });

export const zoomAtom = atom(1);

export const hoveredAtom = atom<string | undefined>();
