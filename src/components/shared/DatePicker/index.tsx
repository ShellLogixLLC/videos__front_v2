import React, {FC, useState, useRef} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {RangePicker} from 'react-trip-date';
import {RangePickerSelectedDays} from 'react-trip-date/dist/rangePicker/rangePicker.type';

import {useOnClickOutside} from '~/hooks';
import {CalendarOneIcon, LeftArrowIcon, RightArrowIcon} from '~/assets';

import Typography from '../Typography';

import styles from './DatePicker.module.scss';

const DatePicker: FC = () => {
  const calendarRef = useRef<HTMLHeadingElement | null>(null);

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [rangeValues, setRangeValues] = useState<RangePickerSelectedDays>();

  const togglerClasses = classNames(styles.wrapper, {
    [styles.wrapper__active]: isOpen,
  });

  const contentClasses = classNames(styles.content, {
    content_start: rangeValues?.from,
    content_end: rangeValues?.to,
  });

  useOnClickOutside(calendarRef, () => toggleIsOpen(false));

  const rangePickerProps = {
    numberOfMonths: 1,
    autoResponsive: false,
    disabledBeforeToday: false,
    selectedDays: rangeValues,
    components: {
      header: {
        monthIcons: {
          right: <RightArrowIcon />,
          left: <LeftArrowIcon />,
        },
      },
    },
  };

  return (
    <div ref={calendarRef} className={togglerClasses}>
      <div role="button" onClick={toggleIsOpen} className={styles.header}>
        <Typography className={styles.header__text}>Calendar</Typography>
        <CalendarOneIcon className={styles.header__icon} />
      </div>
      <div className={`${contentClasses} calendar__trip`}>
        <RangePicker {...rangePickerProps} onChange={setRangeValues} />
      </div>
    </div>
  );
};

export default DatePicker;
