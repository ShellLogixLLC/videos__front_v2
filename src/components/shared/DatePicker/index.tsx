import React, {FC, useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {isEqual} from 'lodash';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useRouter} from 'next/router';
import {RangePicker} from 'react-trip-date';
import {RangePickerSelectedDays} from 'react-trip-date/dist/rangePicker/rangePicker.type';

import {getCookieFromBrowser} from '~/libraries';
import {MONTHS, WEEKDAYS_SHORT} from '~/utils';
import {CalendarOneIcon, LeftArrowIcon, RightArrowIcon} from '~/assets';

import Typography from '../Typography';

import styles from './DatePicker.module.scss';

const DatePicker: FC = () => {
  const lng = (getCookieFromBrowser('activeLang') as string) || 'en';
  const router = useRouter();
  const {query} = router;

  const rangePickerRef = useRef<HTMLDivElement | null>(null);
  const currentElem = rangePickerRef?.current;

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [rangeValues, setRangeValues] = useState<RangePickerSelectedDays>();

  const today = moment().format('L');
  const queryName = query?.name;
  const queryEndDate = query?.endDate;
  const queryStartDate = query?.startDate;
  const qurryActiveCategory = query?.activeCategory;

  const togglerClasses = classNames(styles.wrapper, {
    [styles.wrapper__active]: isOpen,
  });

  const contentClasses = classNames(styles.content, {
    content_start: rangeValues?.from,
    content_end: rangeValues?.to,
  });

  useEffect(() => {
    if (
      !isEqual(queryEndDate, rangeValues?.to) &&
      !isEqual(queryStartDate, rangeValues?.from)
    ) {
      setRangeValues({
        from: queryStartDate ? String(queryStartDate) : '',
        to: queryEndDate ? String(queryEndDate) : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStartDate, queryEndDate, queryName, qurryActiveCategory]);

  const rangePickerProps = {
    numberOfMonths: 1,
    autoResponsive: false,
    disabledBeforeToday: false,
    selectedDays: rangeValues,
    components: {
      titleOfWeek: {titles: WEEKDAYS_SHORT[lng]},
      header: {
        format: 'MM-YYYY',
        yearIcons: {
          right: <RightArrowIcon />,
          left: <LeftArrowIcon />,
        },
        monthIcons: {
          right: <RightArrowIcon />,
          left: <LeftArrowIcon />,
        },
      },
    },
  };

  useEffect(() => {
    if (currentElem) {
      const elem = currentElem.childNodes[0]?.lastChild?.childNodes;

      if (elem?.length === MONTHS.en.length) {
        MONTHS[lng].map((el, idx) => {
          return ((elem[idx].childNodes[0] as HTMLElement).innerText = el);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, isChange, rangePickerRef]);

  const handleClickRangePicker = () => setIsChange(!isChange);

  const handleChangeRangeValue = (data: RangePickerSelectedDays) => {
    if (
      (data.from === rangeValues?.from || data.from === rangeValues?.to) &&
      rangeValues.to !== ''
    ) {
      setRangeValues({from: '', to: ''});
      router.push({
        query: {
          ...router.query,
          startDate: '',
          endDate: today,
          page: 0,
        },
      });
    } else {
      setRangeValues(data);
      router.push({
        query: {
          ...router.query,
          startDate: data?.from,
          endDate: data?.to || today,
          page: 0,
        },
      });
    }
  };

  return (
    <div className={togglerClasses}>
      <div role="button" onClick={toggleIsOpen} className={styles.header}>
        <Typography className={styles.header__text}>calendar</Typography>
        <CalendarOneIcon className={styles.header__icon} />
      </div>
      <div
        ref={rangePickerRef}
        onClick={handleClickRangePicker}
        className={`${contentClasses} calendar__trip`}>
        <RangePicker {...rangePickerProps} onChange={handleChangeRangeValue} />
      </div>
    </div>
  );
};

export default DatePicker;
