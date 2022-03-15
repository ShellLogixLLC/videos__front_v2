export type EventName = keyof HTMLElementEventMap;
export type HandleType = (event: Event) => void;
export type ElementType = typeof globalThis;
