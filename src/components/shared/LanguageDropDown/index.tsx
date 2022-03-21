import React, {useState, useRef, ReactElement, useEffect} from 'react';
import {i18n} from 'next-i18next';
import {useRouter} from 'next/router';

import {langData} from '~/utils';
import {EnIcon, RuIcon} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Link from '../Link';
import Button from '../Button';

import styles from './LanguageDropDown.module.scss';

const LanguageDropDown: React.FC = () => {
  const {asPath, locale} = useRouter();
  const initialIcon = locale === 'en' ? <EnIcon /> : <RuIcon />;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [activeIcon, setActiveIcon] = useState<ReactElement>(initialIcon);
  const [activeLang, setActiveLang] = useState<string | undefined>(locale);

  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleOpener = () => setExpanded(true);

  const handleClose = () => setExpanded(false);

  useOnClickOutside(filterRef, handleClose);

  const changeLang = (name: string) => {
    const icon = name === 'en' ? <EnIcon /> : <RuIcon />;

    setActiveIcon(icon);
    setActiveLang(name);
    handleClose();
  };

  useEffect(() => {
    i18n.addResourceBundle(activeLang, 'Lang-name', {key: activeLang});
  }, [activeLang]);

  const renderLangData = langData.map(({locale}, idx) => (
    <Link
      key={locale}
      onClick={() => changeLang(locale)}
      className={styles.wrapper__languages__item}
      to={asPath}
      locale={locale}>
      {idx === 0 ? <EnIcon /> : <RuIcon />}
    </Link>
  ));

  const expandedData = expanded && (
    <div className={styles.wrapper__languages}>{renderLangData}</div>
  );

  return (
    <div ref={filterRef} className={styles.wrapper}>
      <Button onClick={handleOpener} className={styles.wrapper__header}>
        <span className={styles.wrapper__header__icon}>{activeIcon}</span>
      </Button>
      {expandedData}
    </div>
  );
};

export default LanguageDropDown;
