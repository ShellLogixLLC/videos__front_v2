import React from 'react';

import Typography from '../../shared/Typography';

import {CreepingLineProps} from './types';
import styles from './CreepingLineForText.module.scss';

const CreepingLineForText: React.FC<CreepingLineProps> = ({text}) => (
  <div className={styles.slider}>
    <Typography className={styles.slider__track}>{text}</Typography>
  </div>
);

export default CreepingLineForText;
