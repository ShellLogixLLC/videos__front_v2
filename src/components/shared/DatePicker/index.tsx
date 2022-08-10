import React, {FC, useState, useEffect, useRef} from 'react';
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
  const lng = getCookieFromBrowser('activeLang') || 'en';

  const router = useRouter();
  const {query} = router;

  const rangePickerRef = useRef<HTMLDivElement | null>(null);
  const currentElem = rangePickerRef?.current;

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [isChange, setIsChange] = useState<boolean>(false);
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
        <RangePicker {...rangePickerProps} onChange={setRangeValues} />
      </div>
    </div>
  );
};

export default DatePicker;
