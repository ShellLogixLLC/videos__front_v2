import React, {FC, useState, useRef} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {RangePicker} from 'react-trip-date';
import {RangePickerSelectedDays} from 'react-trip-date/dist/rangePicker/rangePicker.type';

import {CalendarOne, LeftArrow, RightArrow} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Typography from '../Typography';

import styles from './DatePicker.module.scss';

const DatePicker: FC = () => {
  const calendarRef = useRef<HTMLHeadingElement>(null);

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [rangeValues, setRangeValues] = useState<RangePickerSelectedDays>();
  const togglerClasses = classNames(styles.wrapper, {
    [styles.wrapper__active]: isOpen,
  });

  useOnClickOutside(calendarRef, toggleIsOpen);

  const rangePickerProps = {
    numberOfMonths: 1,
    autoResponsive: false,
    disabledBeforeToday: false,
    selectedDays: rangeValues,
    components: {
      header: {
        monthIcons: {
          right: <RightArrow />,
          left: <LeftArrow />,
        },
      },
    },
  };

  return (
    <div ref={calendarRef} className={togglerClasses}>
      <div role="button" onClick={toggleIsOpen} className={styles.header}>
        <Typography className={styles.header__text}>Calendar</Typography>
        <CalendarOne />
      </div>
      <div className={`${styles.content} calendar__trip`}>
        <RangePicker {...rangePickerProps} onChange={setRangeValues} />
      </div>
    </div>
  );
};

export default DatePicker;
