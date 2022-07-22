import React, {useState, useRef, useEffect} from 'react';
import {i18n} from 'next-i18next';
import {useRouter} from 'next/router';

import {langData} from '~/utils';

import Link from '../Link';

import styles from './LanguageDropDown.module.scss';

const LanguageDropDown: React.FC = () => {
  const {asPath, locale} = useRouter();
  const [activeLang, setActiveLang] = useState<string>(locale as string);

  const filterRef = useRef<HTMLDivElement | null>(null);

  const changeLang = (name: string) => {
    setActiveLang(name);
  };

  useEffect(() => {
    i18n?.addResourceBundle(activeLang, 'Lang-name', {key: activeLang});
  }, [activeLang]);

  const renderLangData = langData.map(({locale, Icon: LangIcon}) => (
    <Link
      key={locale}
      onClick={() => changeLang(locale)}
      className={styles.wrapper__languages__item}
      activeClassName={
        locale === activeLang
          ? styles.wrapper__languages__item__active
          : undefined
      }
      to={asPath}
      locale={locale}>
      <LangIcon />
    </Link>
  ));

  const expandedData = (
    <div className={styles.wrapper__languages}>{renderLangData}</div>
  );

  return (
    <div ref={filterRef} className={styles.wrapper}>
      {expandedData}
    </div>
  );
};

export default LanguageDropDown;
