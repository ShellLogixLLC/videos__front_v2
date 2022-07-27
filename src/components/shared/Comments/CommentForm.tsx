import React, {useState} from 'react';
import shortid from 'shortid';
import {useForm} from 'react-hook-form';
import {BaseEmoji} from 'emoji-mart';
import {useRouter} from 'next/router';

import {videoActions} from '~/store/video';
import {useAppDispatch, useLocales} from '~/hooks';
import {Button, EmojisInput, Typography} from '~/components';

import styles from './Comments.module.scss';
import {ICommentForm} from './types';

const CommentForm: React.FC<ICommentForm> = ({addNewComment}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {id: activeVideoId} = router.query;
  const [hasError, setError] = useState<boolean>(false);

  const {handleSubmit, register, formState, setValue, getValues} = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({comment}: {[key: string]: string}): void => {
    if (getValues('comment').trim().length === 0) {
      // setError(true);
      return;
    } else {
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
      setError(false);
    }
  };

  const addEmoji = (emoji: BaseEmoji): void => {
    setValue('comment', getValues('comment'.trim()) + emoji.native);
  };

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
        disabled={!formState.isValid || hasError}
        type="submit">
        <Typography>comment</Typography>
      </Button>
    </form>
  );
};

export default CommentForm;
