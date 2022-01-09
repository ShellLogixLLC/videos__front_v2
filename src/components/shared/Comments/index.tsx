import React, {useState, useRef} from 'react';

import {LanguageArrowTop} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Typography from '../Typography';

import CommentBlock from './CommentBlock';
import CommentForm from './CommentForm';
import styles from './Comments.module.scss';

const Comments: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const refInput = useRef<HTMLHeadingElement>(null);

  useOnClickOutside(refInput, () => setExpanded(false));

  return (
    <div ref={refInput} className={styles.container}>
      <div
        onClick={handleClick}
        role="button"
        className={styles.container__content}>
        <div className={styles.container__content__title}>
          <Typography className={styles.container__content__title__text}>
            Comments
          </Typography>
          <span className={styles.container__content__title__count}>(20)</span>
        </div>
        <LanguageArrowTop className={styles.container__content__icon} />
      </div>
      {expanded && (
        <div className={styles.block}>
          <div className={styles.block__wrapper}>
            <CommentBlock />
          </div>
          <div className={styles.block__form}>
            <CommentForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
