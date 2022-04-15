import React from 'react';

import styles from './FilmCard.module.scss';

const FilmCardSkeleton: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.wrapper__film}>
      <div className={styles.wrapper__film__time}>
        <p />
      </div>
    </div>
    <div className={styles.wrapper__other}>
      <div className={styles.wrapper__other_name}>
        <p />
      </div>
      <div className={styles.wrapper__other__dw_date}>
        <p />
      </div>
    </div>
    <div className={styles.wrapper__pr_description}>
      <p />
    </div>
    <div className={styles.wrapper__card_footer}>
      <div className={styles.wrapper__card_footer_item}>
        <p />
      </div>
    </div>
  </div>
);

export default FilmCardSkeleton;
