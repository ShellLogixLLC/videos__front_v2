import {useRef, useEffect} from 'react';

import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

import {EventName, HandleType, ElementType} from './types';

const useEventListener: (
  eventName: EventName,
  handler: HandleType,
  element?: ElementType,
) => void = (eventName, handler, element = global) => {
  const savedHandler: any = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useIsomorphicLayoutEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: any) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
