import React, {FC, useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import {isEqual} from 'lodash';
import {useToggle} from 'react-use';
import {useRouter} from 'next/router';
import {RangePicker} from 'react-trip-date';
import {RangePickerSelectedDays} from 'react-trip-date/dist/rangePicker/rangePicker.type';

import {useOnClickOutside} from '~/hooks';
import {CalendarOneIcon, LeftArrowIcon, RightArrowIcon} from '~/assets';

import Typography from '../Typography';

import styles from './DatePicker.module.scss';

const DatePicker: FC = () => {
  const router = useRouter();
  const {query} = router;
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

  useEffect(() => {
    if (
      query?.startDate ||
      query?.endDate ||
      isEqual(query.activeCategory, query.activeCategory)
    ) {
      setRangeValues({
        from: query.startDate ? String(query.startDate) : '',
        to: query.endDate ? String(query.endDate) : '',
      });
    }
  }, [query.startDate, query.endDate, query.activeCategory]);

  useEffect(() => {
    if (rangeValues?.from && rangeValues.to)
      router.push({
        query: {
          ...router.query,
          startDate: rangeValues.from,
          endDate: rangeValues.to,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValues]);

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
