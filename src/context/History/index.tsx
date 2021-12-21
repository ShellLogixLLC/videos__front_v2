import {useRouter} from 'next/router';
import React, {createContext, useState, useEffect, useContext} from 'react';

import {HistoryValidation, HistoryProps} from './types';

const HistoryContext = createContext<HistoryValidation>(
  {} as HistoryValidation,
);

export const HistoryProvider: React.FC<HistoryProps> = ({children}) => {
  const {asPath, push, pathname} = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  const back = () => {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i];
      if (!route.includes('#') && route !== pathname) {
        push(route);

        const newHistory = history.slice(0, i);
        setHistory(newHistory);

        break;
      }
    }
  };

  useEffect(() => {
    setHistory((previous) => [...previous, asPath]);
  }, [asPath]);

  return (
    <HistoryContext.Provider
      value={{
        back,
        history,
        setHistory,
      }}>
      {children}
    </HistoryContext.Provider>
  );
};

export function useHistory(): HistoryValidation {
  const context = useContext(HistoryContext);
  return context;
}
