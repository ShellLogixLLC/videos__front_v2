import React from 'react';
import Image, {ImageProps} from 'next/image';
import classNames from 'classnames';

import styles from './Image.module.scss';

const ImageComp: React.FC<ImageProps> = ({
  src,
  alt,
  layout = 'fill',
  className = '',
  ...all
}) => {
  const wrapperClasses = classNames(styles.wrapper, className);

  return (
    <div className={wrapperClasses}>
      <Image
        src={src}
        alt={alt}
        layout={layout}
        className={styles.wrapper__img}
      />
    </div>
  );
};

export default ImageComp;
