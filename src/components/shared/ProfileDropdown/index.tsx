import React, {useRef} from 'react';
import {useToggle} from 'react-use';

import {Alla} from '~/assets';

import {useOnClickOutside} from '~/hooks';

import Button from '../Button';

import styles from './ProfileDropdown.module.scss';

const ProfileDropDown: React.FC = () => {
  const [expanded, toggleExpanded] = useToggle(false);

  const filterRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(filterRef, () => toggleExpanded(false));

  const expandedData = expanded && (
    <div className={styles.wrapper__languages}>hello</div>
  );

  return (
    <div ref={filterRef} className={styles.wrapper}>
      <Button onClick={toggleExpanded} className={styles.wrapper__header}>
        <span className={styles.wrapper__header__icon}>
          <Alla />
        </span>
      </Button>
      {expandedData}
    </div>
  );
};

export default ProfileDropDown;
