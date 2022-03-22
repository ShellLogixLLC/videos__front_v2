// Todo, let this stay here and make sure if our new hook works, when we test video component we can delete ex hook for event listeners

// import {useRef, useEffect} from 'react';

// import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

// import {EventName, HandleType, ElementType} from './types';

// const useEventListener: (
//   eventName: EventName,
//   handler: HandleType,
//   element?: ElementType | HTMLElement | null,
// ) => void = (eventName, handler, element = global) => {
//   const savedHandler: any = useRef(null);

//   useEffect(() => {
//     savedHandler.current = handler;
//   }, [handler]);

//   useIsomorphicLayoutEffect(() => {
//     const isSupported = element && element.addEventListener;
//     if (!isSupported) return;

//     const eventListener = (event: any) => savedHandler.current(event);

//     element?.addEventListener(eventName, eventListener);

//     return () => {
//       element?.removeEventListener(eventName, eventListener);
//     };
//   }, [eventName, element]);
// };

// export default useEventListener;

import {RefObject, useEffect, useRef} from 'react';

import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
): void;
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T>,
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event,
  ) => void,
  element?: RefObject<T> | null,
): void {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) =>
      savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
