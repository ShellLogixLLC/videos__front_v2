import {EnIcon, RuIcon} from '~/assets';
import {LocaleType} from '~/types';

import {ILangData} from './types';

const langData: ILangData[] = [
  {
    Icon: EnIcon,
    locale: LocaleType.En,
  },
  {
    Icon: RuIcon,
    locale: LocaleType.Ru,
  },
];

export default langData;
