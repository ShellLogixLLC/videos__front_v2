import React from 'react';

import Typography from '../Typography';

import {CreepingLineForTextProp} from './types';
import styles from './CreepingLineForText.module.scss';

const CreepingLineForText: React.FC<CreepingLineForTextProp> = ({text}) => {
  return (
    <div className={styles.slider}>
      <Typography className={styles.slider__track}>{text}</Typography>
    </div>
  );
};

export default CreepingLineForText;
