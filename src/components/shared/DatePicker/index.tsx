import React, {FC, useState, useEffect} from 'react';
import {isEqual} from 'lodash';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useRouter} from 'next/router';
import {RangePicker} from 'react-trip-date';
import {RangePickerSelectedDays} from 'react-trip-date/dist/rangePicker/rangePicker.type';

import {WEEKDAYS_SHORT} from '~/utils';
import {getCookieFromBrowser} from '~/libraries';
import {CalendarOneIcon, LeftArrowIcon, RightArrowIcon} from '~/assets';

import Typography from '../Typography';

import styles from './DatePicker.module.scss';

const DatePicker: FC = () => {
  const lng = getCookieFromBrowser('activeLang') || 'en';

  const router = useRouter();
  const {query} = router;

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [rangeValues, setRangeValues] = useState<RangePickerSelectedDays>();

  const togglerClasses = classNames(styles.wrapper, {
    [styles.wrapper__active]: isOpen,
  });

  const contentClasses = classNames(styles.content, {
    content_start: rangeValues?.from,
    content_end: rangeValues?.to,
  });

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
          page: 0,
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
      titleOfWeek: {titles: WEEKDAYS_SHORT[lng]},
      header: {
        monthIcons: {
          right: <RightArrowIcon />,
          left: <LeftArrowIcon />,
        },
      },
    },
  };

  return (
    <div className={togglerClasses}>
      <div role="button" onClick={toggleIsOpen} className={styles.header}>
        <Typography className={styles.header__text}>calendar</Typography>
        <CalendarOneIcon className={styles.header__icon} />
      </div>
      <div className={`${contentClasses} calendar__trip`}>
        <RangePicker {...rangePickerProps} onChange={setRangeValues} />
      </div>
    </div>
  );
};

export default DatePicker;
