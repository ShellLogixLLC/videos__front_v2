import React from 'react';
import {useForm} from 'react-hook-form';
import {BaseEmoji} from 'emoji-mart';

import Button from '../../shared/Button';
import Typography from '../Typography';
import EmojisInput from '../../shared/EmojisInput';

import styles from './Comments.module.scss';

const CommentForm: React.FC = () => {
  const {handleSubmit, register, formState, setValue, getValues} = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {};

  const addEmoji = (emoji: BaseEmoji) =>
    setValue('commentInput', getValues('commentInput') + emoji.native);

  return (
    <form className={styles.block__form__box} onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Lora" autoComplete="off" {...register('nameInput')} />
      <EmojisInput
        {...register('commentInput')}
        placeholder="Type your text here..."
        addEmoji={addEmoji}
      />
      <Button disabled={!formState.isValid} type="submit">
        <Typography>comment</Typography>
      </Button>
    </form>
  );
};

export default CommentForm;
