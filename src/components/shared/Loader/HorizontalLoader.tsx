import React from 'react';
import usePortal from 'react-useportal';

import {useLockBodyScroll} from '~/hooks';

import styles from './Loader.module.scss';

const HorizontalLoader: React.FC = () => {
  const {Portal} = usePortal();

  useLockBodyScroll();

  const renderHorizontalLoaderItems = Array.from(
    Array(10),
    (item: any, index: number) => <div key={`${item}${index}`} />,
  );

  return (
    <Portal>
      <div className={styles.loader}>
        <div className={styles.loader__content}>
          {renderHorizontalLoaderItems}
        </div>
      </div>
    </Portal>
  );
};

export default HorizontalLoader;
