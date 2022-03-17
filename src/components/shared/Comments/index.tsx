import React, {useState, useRef} from 'react';
import {useToggle} from 'react-use';
import classNames from 'classnames';

import {LanguageArrowTop} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Typography from '../Typography';

import CommentForm from './CommentForm';
import CommentBlock from './CommentBlock';

import styles from './Comments.module.scss';

const Comments: React.FC = () => {
  const [expanded, toggleExpanded] = useToggle(false);

  const refInput = useRef<HTMLHeadingElement>(null);

  const blockClassNames = classNames(styles.block, {
    [styles.block_hiden]: !expanded,
  });

  const containerClassNames = classNames(styles.container, {
    [styles.container_close]: !expanded,
  });

  useOnClickOutside(refInput, () => toggleExpanded(false));

  return (
    <div ref={refInput} className={containerClassNames}>
      <div
        onClick={toggleExpanded}
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

      <div className={blockClassNames}>
        <div className={styles.block__wrapper}>
          <CommentBlock />
        </div>
        <div className={styles.block__form}>
          <CommentForm />
        </div>
      </div>
    </div>
  );
};

export default Comments;
