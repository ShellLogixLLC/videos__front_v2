import React, {createContext} from 'react';
import {useToggle} from 'react-use';

import {IToggleContext} from './types';

export const ToggleContext = createContext<IToggleContext>(
  {} as IToggleContext,
);

export const ToggleContextProvider: React.FC = ({children}) => {
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <ToggleContext.Provider
      value={{
        expanded,
        toggleExpanded,
      }}>
      {children}
    </ToggleContext.Provider>
  );
};
