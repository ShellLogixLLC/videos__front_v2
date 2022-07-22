import React, {useState, useRef, useEffect} from 'react';
import {i18n} from 'next-i18next';
import {useToggle} from 'react-use';
import {useRouter} from 'next/router';

import {langData} from '~/utils';
import {setCookie} from '~/libraries';
import {LocaleType} from '~/types';
import {useOnClickOutside} from '~/hooks';

import Link from '../Link';
import Button from '../Button';

import styles from './LanguageDropDown.module.scss';

const LanguageDropDown: React.FC = () => {
  const {asPath, locale} = useRouter();
  const {Icon} = locale === LocaleType.En ? langData[0] : langData[1];

  const [expanded, toggleExpanded] = useToggle(false);
  const [activeLang, setActiveLang] = useState<string>(locale as string);

  const filterRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(filterRef, () => toggleExpanded(false));

  const changeLang = (name: string) => {
    setActiveLang(name);
    toggleExpanded();
  };

  useEffect(() => {
    setCookie('activeLang', activeLang);
    i18n?.addResourceBundle(activeLang, 'Lang-name', {key: activeLang});
  }, [activeLang]);

  const renderLangData = langData.map(({locale, Icon: LangIcon}) => (
    <Link
      key={locale}
      onClick={() => changeLang(locale)}
      className={styles.wrapper__languages__item}
      to={asPath}
      locale={locale}>
      <LangIcon />
    </Link>
  ));

  const expandedData = expanded && (
    <div className={styles.wrapper__languages}>{renderLangData}</div>
  );

  return (
    <div ref={filterRef} className={styles.wrapper}>
      <Button onClick={toggleExpanded} className={styles.wrapper__header}>
        <span className={styles.wrapper__header__icon}>
          <Icon />
        </span>
      </Button>
      {expandedData}
    </div>
  );
};

export default LanguageDropDown;
