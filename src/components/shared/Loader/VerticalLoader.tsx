import React from 'react';
import classNames from 'classnames';

import {LoaderTypes} from './types';
//
import styles from './Loader.module.scss';

const VerticalLoader: React.FC<LoaderTypes> = (isSection) => {
  const loaderClasses = classNames(styles.wrapper, {
    [styles.wrapper__section]: isSection,
  });

  const renderLoaderItems = Array.from(Array(5), (item: any, index: number) => (
    <div key={`${item}${index}`} className={`${styles.rect}${index + 1}`} />
  ));

  return (
    <div className={loaderClasses}>
      <div className={styles.spinner}>{renderLoaderItems}</div>
    </div>
  );
};

export default VerticalLoader;
