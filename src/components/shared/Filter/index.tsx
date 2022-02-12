import React, {useState, useMemo, useRef} from 'react';

import {useOnClickOutside} from '~/hooks';

import Link from '../Link';
import Typography from '../Typography';

import {FilterProps} from './types';
//
import styles from './Filter.module.scss';

const Filter: React.FC<FilterProps> = ({options, filterTitle, IconProp}) => {
  const filterRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleOpener = () => {
    setExpanded(true);
  };

  useOnClickOutside(filterRef, () => {
    setExpanded(false);
  });

  const renderFilteredTable = useMemo(
    () =>
      options.map(({routes, nameRoute, id}) => {
        return routes ? (
          <Link key={id} to={routes} className={styles.container__content__box}>
            {nameRoute}
          </Link>
        ) : (
          <Typography key={id} className={styles.container__content__box}>
            {nameRoute}
          </Typography>
        );
      }),
    [options],
  );

  return (
    <div ref={filterRef} onClick={handleOpener} className={styles.container}>
      <div className={styles.container__header}>
        <Typography className={styles.container__header__title}>
          {filterTitle}
        </Typography>
        <IconProp />
      </div>
      {expanded && (
        <div className={styles.container__content}>{renderFilteredTable}</div>
      )}
    </div>
  );
};

export default Filter;
