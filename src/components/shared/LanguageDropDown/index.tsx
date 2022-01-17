import React, {useState, useRef, ReactElement} from 'react';
import {useRouter} from 'next/router';
import classNames from 'classnames';

import {langData} from '~/utils';
import {EnIcon, RuIcon} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Link from '../Link';
import Button from '../Button';
import Typography from '../Typography';

import styles from './LanguageDropDown.module.scss';

const LanguageDropDown: React.FC = () => {
  const {asPath, locale} = useRouter();

  const filterRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const activelang = locale === 'en' ? <EnIcon /> : <RuIcon />;
  const [activeLanguage, setActiveLanguage] =
    useState<ReactElement>(activelang);
  const [activeIndex, setActiveIndex] = useState(locale === 'en' ? 0 : 1);

  const handleOpener = () => {
    setExpanded(true);
  };

  useOnClickOutside(filterRef, () => {
    setExpanded(false);
  });

  const changeLang = (name: string, idx: number) => {
    if (name === 'en') {
      setActiveLanguage(<EnIcon />);
    } else {
      setActiveLanguage(<RuIcon />);
    }

    setExpanded(false);
    setActiveIndex(idx);
  };

  const renderLangData = langData.map(({name, locale}, idx) => (
    <Link
      key={name}
      onClick={() => changeLang(locale, idx)}
      className={styles.wrapper__language__item}
      to={asPath}
      locale={locale}>
      {idx === 0 ? <EnIcon /> : <RuIcon />}
      <Typography
        className={classNames(styles.wrapper__language__item__text, {
          [styles.wrapper__language__item__text_active]: activeIndex === idx,
        })}>
        {name}
      </Typography>
    </Link>
  ));

  return (
    <div ref={filterRef} className={styles.wrapper}>
      <Button onClick={handleOpener} className={styles.wrapper__header}>
        <span className={styles.wrapper__header__language}>
          {activeLanguage}
        </span>
      </Button>
      {expanded && (
        <div className={styles.wrapper__language}>{renderLangData}</div>
      )}
    </div>
  );
};

export default LanguageDropDown;
