import React from 'react';
import usePortal from 'react-useportal';

import {useLockedBody} from '~/hooks';

import styles from './Loader.module.scss';

const HorizontalLoader: React.FC = () => {
  const {Portal} = usePortal();

  useLockedBody();

  return (
    <Portal>
      <div className={styles.loader}>
        <div className={styles.loader__content}>
          {Array.from(Array(8), (item: any, index: number) => (
            <div key={`${item}${index}`} />
          ))}
        </div>
      </div>
    </Portal>
  );
};

export default HorizontalLoader;
