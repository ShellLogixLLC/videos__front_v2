import React from 'react';
import shortid from 'shortid';
import {useForm} from 'react-hook-form';
import {BaseEmoji} from 'emoji-mart';
import {useRouter} from 'next/router';

import {videoActions} from '~/store/video';
import {useAppDispatch} from '~/hooks';
import {Button, EmojisInput} from '~/components';

import styles from './Comments.module.scss';
import {ICommentForm} from './types';

const CommentForm: React.FC<ICommentForm> = ({addNewComment}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {id: activeVideoId} = router.query;

  const {handleSubmit, register, formState, setValue, getValues} = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({comment}: {[key: string]: string}): void => {
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
    setValue('comment', getValues('comment') + emoji.native);
  };

  return (
    <form className={styles.block__form__box} onSubmit={handleSubmit(onSubmit)}>
      <EmojisInput
        {...register('comment')}
        placeholder="Type your text here..."
        addEmoji={addEmoji}
      />
      <Button disabled={!formState.isValid} type="submit">
        Comment
      </Button>
    </form>
  );
};

export default CommentForm;
