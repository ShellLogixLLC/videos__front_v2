import React, {useState, useEffect} from 'react';

import {Burn} from './types';
//
import styles from './Fire.module.scss';

const FireAnimation: React.FC<Burn> = ({children, count = 50, width}) => {
  const [maximumFireCount, setMaximumFireCount] = useState<number>(count);

  useEffect(() => {
    if (count > 100) {
      setMaximumFireCount(100);
    }
  }, [count, maximumFireCount]);

  return (
    <div style={{width: width}} className={styles.fire}>
      {Array.from(Array(maximumFireCount), (idx: number) => (
        <div key={idx * 2.3} className={styles.particle} />
      ))}
      <span className={styles.fire__title}>{children}</span>
    </div>
  );
};

export default FireAnimation;
