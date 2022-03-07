import React from 'react';

import {Burn} from './types';
import styles from './Fire.module.scss';

const FireAnimation: React.FC<Burn> = ({children, count, width}) => (
  <div style={{width: width}} className={styles.fire}>
    {Array.from([count], (idx: number) => (
      <div key={idx * 3} className={styles.particle} />
    ))}
    <span className={styles.fire__title}>{children}</span>
  </div>
);

export default FireAnimation;
