import {useEffect, useState} from 'react';

import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

import {UseLockedBodyReturn} from './types';

const useLockBodyScroll = (initialLocked = false): UseLockedBodyReturn => {
  const [locked, setLocked] = useState(initialLocked);

  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);

  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
  }, [initialLocked, locked]);

  return [locked, setLocked];
};

export default useLockBodyScroll;
