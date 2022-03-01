import React from 'react';
import classNames from 'classnames';

import {LoaderTypes} from './types';
import styles from './Loader.module.scss';

const VerticalLoader: React.FC<LoaderTypes> = (isSection) => {
  const loaderClasses = classNames(styles.wrapper, {
    [styles.wrapper__section]: isSection,
  });

  return (
    <div className={loaderClasses}>
      <div className={styles.spinner}>
        <div className={styles.rect1} />
        <div className={styles.rect2} />
        <div className={styles.rect3} />
        <div className={styles.rect4} />
        <div className={styles.rect5} />
      </div>
    </div>
  );
};

export default VerticalLoader;
