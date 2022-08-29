import React from 'react';
import * as yup from 'yup';
import shortid from 'shortid';
import classNames from 'classnames';
import {BaseEmoji} from 'emoji-mart';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {videoActions} from '~/store/video';
import {useAppDispatch, useLocales} from '~/hooks';
import {Button, EmojisInput, Typography} from '~/components';

import {ICommentForm} from './types';
import styles from './Comments.module.scss';

const CommentForm: React.FC<ICommentForm> = ({addNewComment}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {id: activeVideoId} = router.query;

  const schema = yup.object({
    comment: yup.string().trim().required(),
  });

  const {handleSubmit, register, formState, setValue, getValues, trigger} =
    useForm({
      mode: 'all',
      resolver: yupResolver(schema),
    });

  const onSubmit = ({comment}: {[key: string]: string}): void => {
    dispatch(
      videoActions.sendComment({
        videoId: activeVideoId,
        message: comment,
      }),
    );
    dispatch(videoActions.getVideoComments({videoId: activeVideoId as string}));
    setValue('comment', '');
    addNewComment({
      id: shortid.generate(),
      videoId: activeVideoId,
      message: comment,
    });
  };

  const addEmoji = (emoji: BaseEmoji): void => {
    setValue('comment', getValues('comment'.trim()) + emoji.native);
    trigger();
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
