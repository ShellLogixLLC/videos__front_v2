import React from 'react';

import styles from './FilmCard.module.scss';
import {ISkeletonFilmCard} from './types';

const FilmCardSkeleton: React.FC<ISkeletonFilmCard> = ({cardClasses = ''}) => (
  <div className={`${styles.wrapper}  ${cardClasses}`}>
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
