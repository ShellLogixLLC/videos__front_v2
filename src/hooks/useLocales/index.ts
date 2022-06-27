import {has} from 'lodash';
import {useRouter} from 'next/router';

import {DefaultLocale} from '~/constants';
import {LocaleType} from '~/types/common';

import locales from '../../../public/static/locales';

import {UseLocalesReturn} from './types';

const useLocales = (typoKey?: string): UseLocalesReturn => {
  const {locale} = useRouter();
  const detectedLocale =
    locale !== 'en' ? (locale as LocaleType) : DefaultLocale;

  const detectedLocales = locales[detectedLocale];
  const translatedTypo =
    typoKey && has(detectedLocales, typoKey)
      ? detectedLocales[typoKey as keyof typeof detectedLocales]
      : null;

  return {
    translatedTypo,
    locale: detectedLocale,
  };
};

export default useLocales;
