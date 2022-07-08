import React from 'react';

import styles from './VideDescription.module.scss';

const VideDescriptionSkeleton: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.wrapper__settings}>
      <div className={styles.wrapper__settings_left}>
        <div className={styles.wrapper__settings_item} />
        <div className={styles.wrapper__settings_item} />
      </div>
      <div className={styles.wrapper__settings_shape} />
    </div>
    <div className={styles.wrapper__title} />
    <div className={styles.wrapper__date} />
    <div>
      <div className={styles.wrapper__text} />
      <div className={styles.wrapper__text} />
      <div className={styles.wrapper__text} />
    </div>
  </div>
);

export default VideDescriptionSkeleton;
