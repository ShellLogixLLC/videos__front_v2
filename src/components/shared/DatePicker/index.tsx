import React, {FC, useState, useRef, useCallback, useMemo} from 'react';
// import dayjs from 'dayjs';
import classNames from 'classnames';
import {RangePicker} from 'react-trip-date';
import {RangePickerSelectedDays} from 'react-trip-date/dist/rangePicker/rangePicker.type';

import {CalendarOne, LeftArrow, RightArrow} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Typography from '../Typography';

import styles from './DatePicker.module.scss';

const DatePicker: FC = () => {
  const calendarRef = useRef<HTMLHeadingElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rangeValues, setRangeValues] = useState<RangePickerSelectedDays>();
  const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const togglerClasses = classNames(styles.wrapper, {
    [styles.wrapper__active]: isOpen,
  });

  const datePickerToggler = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useOnClickOutside(calendarRef, () => setIsOpen(false));

  const rangePickerProps = useMemo(
    () => ({
      numberOfMonths: 1,
      autoResponsive: false,
      disabledBeforeToday: false,
      selectedDays: rangeValues,
      components: {
        titleOfWeek: {
          titles: weekDay,
        },
        header: {
          monthIcons: {
            right: <RightArrow />,
            left: <LeftArrow />,
          },
        },
      },
    }),
    [rangeValues, weekDay],
  );

  // const selectedDateRange = useMemo(() => {
  //   const fromDate = rangeValues?.from || 'DD.MM.YY - DD.MM.YY';
  //   const toDate = rangeValues?.to
  //     ? `- ${rangeValues?.to}`
  //     : rangeValues?.from
  //     ? '- DD.MM.YY'
  //     : '';

  //   return `${fromDate}  ${toDate}`;
  // }, [rangeValues?.from, rangeValues?.to]);

  return (
    <div ref={calendarRef} className={togglerClasses}>
      <div role="button" onClick={datePickerToggler} className={styles.header}>
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
