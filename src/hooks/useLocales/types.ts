import {LocaleType} from '~/types';

export type UseLocalesReturn = {
  translatedTypo: string | null;
  locale: string | LocaleType;
};
