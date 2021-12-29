import {createContext} from 'react';

import {I18Context} from './types';

export const I18nContext = createContext<I18Context | null>(null);
