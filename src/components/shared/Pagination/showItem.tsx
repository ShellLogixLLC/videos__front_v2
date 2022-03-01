import React, {useState, useMemo, useCallback, useRef} from 'react';
import classnames from 'classnames';

import {BottomArrow} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Typography from '../Typography';

import {Pagination} from './types';
import styles from './Pagination.module.scss';

const ShowItem: React.FC<Pagination> = ({
  rowsPerPage = 5,
  setRowsPerPage = (e) => e,
  rowsPerPageArray = [5, 10, 15, 20],
}) => {
  const [expanded, setExpanded] = useState(false);

  const paginationRef = useRef(null);

  const memoizedRotate = useMemo(() => (expanded ? 180 : 0), [expanded]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleOutsideClick = () => {
    setExpanded(false);
  };

  useOnClickOutside(paginationRef, handleOutsideClick);

  const handleSelectValue = useCallback(
    (rows: number) => {
      setRowsPerPage(rows);
      setExpanded(false);
    },
    [setExpanded, setRowsPerPage],
  );

  const rowsPerPageList = useMemo(
    () =>
      rowsPerPageArray.map((rows) => (
        <Typography
          key={rows}
          onClick={() => handleSelectValue(rows)}
          variant="Heading"
          type="Medium">
          {rows}
        </Typography>
      )),
    [handleSelectValue, rowsPerPageArray],
  );

  const showClasses = classnames(
    styles.container__wrapper__show__content__wrapper__classes,
    {
      [styles.container__wrapper__show__content__wrapper_radius]: expanded,
    },
  );

  return (
    <div
      ref={paginationRef}
      className={styles.container__wrapper__show__content__wrapper}>
      <div onClick={handleClick} className={showClasses}>
        <Typography
          type="Medium"
          variant="Heading"
          className={styles.container__wrapper__show__txt}>
          Show
        </Typography>

        <Typography
          type="Medium"
          variant="Heading"
          className={styles.container__wrapper__show__content__number}>
          {rowsPerPage}
        </Typography>
        <BottomArrow
          style={{
            transform: `rotate(${memoizedRotate}deg)`,
          }}
        />
      </div>
      {expanded && (
        <div className={styles.container__wrapper__expandable}>
          <div className={styles.container__wrapper__expandable__content}>
            {rowsPerPageList}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowItem;
