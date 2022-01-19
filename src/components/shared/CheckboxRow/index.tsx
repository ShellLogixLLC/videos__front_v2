import Link from '../Link';
import Checkbox from '../Checkbox';
import Typography from '../Typography';

import {ICheckboxRowProps} from './types';
import styles from './CheckboxRow.module.scss';

const CheckboxRow: React.FC<ICheckboxRowProps> = ({
  inputProps,
  labelOptions: {firstLink, secondLink, firstLinkText, secondLinkText},
}) => (
  <Checkbox useCustomOnChange {...inputProps}>
    <div className={styles.container}>
      <Typography tagName="span" className={styles.container__label}>
        <Typography tagName="span">{inputProps.label}</Typography>

        <Link blank to={firstLink} className={styles.container__link}>
          <Typography className={styles.container__first} tagName="span">
            {firstLinkText}
          </Typography>
        </Link>

        <Typography tagName="span">and</Typography>

        <Link blank className={styles.container__link} to={secondLink}>
          <Typography className={styles.container__second} tagName="span">
            {secondLinkText}
          </Typography>
        </Link>
      </Typography>
    </div>
  </Checkbox>
);

export default CheckboxRow;
