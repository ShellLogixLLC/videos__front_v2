import React, {useCallback, useRef} from 'react';
import classnames from 'classnames';
import {useToggle} from 'react-use';

import {BottomArrow} from '~/assets';
import {useOnClickOutside} from '~/hooks';
import {INITIAL_PAGINATION_ROWS_ARR} from '~/constants';

import Typography from '../Typography';

import {IPerPageProps} from './types';
import styles from './Pagination.module.scss';

const ShowItem: React.FC<IPerPageProps> = ({rowsPerPage, setRowsPerPage}) => {
  const [expanded, toggleExpanded] = useToggle(false);

  const paginationRef = useRef<HTMLDivElement>(null);

  const arrowClasses = classnames(styles.arrow, {
    [styles.arrow_rotate]: expanded,
  });

  const currentItemClasses = classnames(styles.block__content, {
    [styles.block__content_radius]: expanded,
  });

  useOnClickOutside(paginationRef, () => toggleExpanded(false));

  const handleSelectValue = useCallback(
    (rows: number) => {
      setRowsPerPage(rows);
      toggleExpanded(false);
    },
    [toggleExpanded, setRowsPerPage],
  );

  const rowsPerPageList = INITIAL_PAGINATION_ROWS_ARR.map((rows, idx) => (
    <Typography
      key={idx}
      onClick={() => handleSelectValue(rows)}
      variant="Heading"
      type="Medium">
      {rows}
    </Typography>
  ));

  return (
    <div ref={paginationRef} className={styles.block}>
      <div onClick={toggleExpanded} className={currentItemClasses}>
        <Typography
          type="Medium"
          variant="Heading"
          className={styles.container__wrapper__show__txt}>
          show
        </Typography>

        <Typography
          type="Medium"
          variant="Heading"
          className={styles.container__wrapper__show__content__number}>
          {rowsPerPage}
        </Typography>
        <BottomArrow className={arrowClasses} />
      </div>
      {expanded && (
        <div className={styles.container__wrapper__expandable}>
          <div className={styles.container__wrapper__expandable__child}>
            {rowsPerPageList}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowItem;
