import React from 'react';
import shortid from 'shortid';
import {useForm} from 'react-hook-form';
import {BaseEmoji} from 'emoji-mart';
import {useRouter} from 'next/router';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames';

import {videoActions} from '~/store/video';
import {useAppDispatch, useLocales} from '~/hooks';
import {Button, EmojisInput, Typography} from '~/components';

import styles from './Comments.module.scss';
import {ICommentForm} from './types';

const CommentForm: React.FC<ICommentForm> = ({addNewComment}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {id: activeVideoId} = router.query;

  const schema = yup.object({
    comment: yup.string().trim().required(),
  });

  const {handleSubmit, register, formState, setValue, getValues} = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({comment}: {[key: string]: string}): void | any => {
    dispatch(
      videoActions.sendComment({
        videoId: activeVideoId,
        message: comment,
      }),
    );
    setValue('comment', '');
    addNewComment({
      id: shortid.generate(),
      videoId: activeVideoId,
      message: comment,
    });
  };

  const addEmoji = (emoji: BaseEmoji): void => {
    setValue('comment', getValues('comment'.trim()) + emoji.native);
  };

  const typoClassName = classNames(styles.block__form__button__text, {
    [styles.block__form__button__text__disabled]: !formState.isValid,
  });

  const {translatedTypo: translatedPlaceholder} =
    useLocales('typeYourTextHere');

  return (
    <form className={styles.block__form__box} onSubmit={handleSubmit(onSubmit)}>
      <EmojisInput
        {...register('comment')}
        placeholder={translatedPlaceholder || ''}
        addEmoji={addEmoji}
      />
      <Button
        className={styles.block__form__button}
        disabled={!formState.isValid}
        type="submit">
        <Typography className={typoClassName}>comment</Typography>
      </Button>
    </form>
  );
};

export default CommentForm;
