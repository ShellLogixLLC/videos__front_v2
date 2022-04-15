import React from 'react';
import NextImage, {ImageProps} from 'next/image';
import classNames from 'classnames';

import styles from './Image.module.scss';

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  layout = 'fill',
  className = '',
}) => {
  const wrapperClasses = classNames(styles.wrapper, className);

  return (
    <div className={wrapperClasses}>
      <NextImage
        src={src}
        alt={alt}
        layout={layout}
        className={styles.wrapper__img}
      />
    </div>
  );
};

export default Image;
