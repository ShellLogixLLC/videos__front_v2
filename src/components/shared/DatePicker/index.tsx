import React, {FC, useState, useRef, useCallback, useMemo} from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import {RangePicker} from 'react-trip-date';
import {RangePickerSelectedDays} from 'react-trip-date/dist/rangePicker/rangePicker.type';

import {AlarmIcon} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import styles from './DatePicker.module.scss';

const DatePicker: FC = () => {
  const calendarRef = useRef<HTMLHeadingElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rangeValues, setRangeValues] = useState<RangePickerSelectedDays>();

  const togglerClasses = classNames(styles.header, {
    [styles.header__active]: isOpen,
  });

  const datePickerToggler = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useOnClickOutside(calendarRef, () => setIsOpen(false));

  const rangePickerProps = useMemo(
    () => ({
      numberOfMonths: 2,
      autoResponsive: false,
      disabledBeforeToday: true,
      selectedDays: rangeValues,
      disabledBeforeDate: dayjs().add(1, 'day'),
      components: {
        titleOfWeek: {
          titles: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        },
      },
    }),
    [rangeValues],
  );

  const selectedDateRange = useMemo(() => {
    const fromDate = rangeValues?.from || 'DD.MM.YY - DD.MM.YY';
    const toDate = rangeValues?.to
      ? `- ${rangeValues?.to}`
      : rangeValues?.from
      ? '- DD.MM.YY'
      : '';

    return `${fromDate}  ${toDate}`;
  }, [rangeValues?.from, rangeValues?.to]);

  return (
    <div ref={calendarRef} className={styles.wrapper}>
      <div role="button" onClick={datePickerToggler} className={togglerClasses}>
        <p className={styles.header__text}>{selectedDateRange}</p>
        <AlarmIcon />
      </div>
      {isOpen && (
        <div className={`${styles.content} calendar__trip`}>
          <RangePicker {...rangePickerProps} onChange={setRangeValues} />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
