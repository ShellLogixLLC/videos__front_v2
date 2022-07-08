import React from 'react';

import {useWindowSize} from '~/hooks/index';

import Link from '../Link';
import Checkbox from '../Checkbox';
import Typography from '../Typography';

import {ICheckboxRowProps} from './types';
import styles from './CheckboxRow.module.scss';

const CheckboxRow: React.FC<ICheckboxRowProps> = ({
  inputProps,
  labelOptions: {firstLink, secondLink, firstLinkText, secondLinkText},
}) => {
  const {isMobile} = useWindowSize();

  return (
    <Checkbox useCustomOnChange {...inputProps}>
      <div className={styles.container}>
        <Typography tagName="span">{inputProps.label}</Typography>
        <Link blank to={firstLink} className={styles.container__link}>
          <Typography className={styles.container__first} tagName="span">
            {firstLinkText}
          </Typography>
        </Link>

        <Typography tagName="span">and</Typography>
        {isMobile && <br />}
        <Link blank className={styles.container__link} to={secondLink}>
          <Typography className={styles.container__second} tagName="span">
            {secondLinkText}
          </Typography>
        </Link>
      </div>
    </Checkbox>
  );
};

export default CheckboxRow;
