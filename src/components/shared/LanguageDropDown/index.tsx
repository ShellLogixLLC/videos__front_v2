import React, {useState, useRef} from 'react';

import {useOnClickOutside} from '~/hooks';
// import {LanguageArrowBottom} from '~/assets';

import Button from '../Button';

import styles from './LanguageDropDown.module.scss';

const LanguageDropDown: React.FC = () => {
  const filterRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<string>('');

  const handleOpener = () => {
    setExpanded(true);
  };

  useOnClickOutside(filterRef, () => {
    setExpanded(false);
  });

  const changeEng = () => {
    if (activeLanguage !== 'Eng') {
      setActiveLanguage('Eng');
    }
    setExpanded(false);
  };

  const changeRu = () => {
    if (activeLanguage !== 'Ru') {
      setActiveLanguage('Ru');
    }
    setExpanded(false);
  };

  return (
    <div ref={filterRef} className={styles.wrapper}>
      <Button onClick={handleOpener} className={styles.wrapper__header}>
        <span className={styles.wrapper__header__language}>
          {activeLanguage}
        </span>
        {/* <LanguageArrowBottom className={styles.wrapper__header_arrow} /> */}
      </Button>
      {expanded && (
        <div className={styles.wrapper__language}>
          <Button
            onClick={changeEng}
            className={styles.wrapper__language__item_en}>
            {/* Eng */}
          </Button>
          <Button
            onClick={changeRu}
            className={styles.wrapper__language__item_ru}>
            {/* Ru */}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropDown;
