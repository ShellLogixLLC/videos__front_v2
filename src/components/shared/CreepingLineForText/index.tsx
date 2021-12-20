import React from 'react';

import Typography from '../Typography';

import styles from './CreepingLineForText.module.scss';

const CreepingLineForText: React.FC = ({children}) => {
  return (
    <div className={styles.slider}>
      <Typography className={styles.slider__track}>{children}</Typography>
    </div>
  );
};

export default CreepingLineForText;
