import React from 'react';
import shortid from 'shortid';

import {Burn} from './types';
import styles from './Fire.module.scss';

const FireAnimation: React.FC<Burn> = ({children, count, width}) => {
  return (
    <div style={{width: width}} className={styles.fire}>
      {Array.from(Array(count), () => (
        <div key={shortid.generate()} className={styles.particle} />
      ))}
      <span className={styles.fire__title}>{children}</span>
    </div>
  );
};

export default FireAnimation;
