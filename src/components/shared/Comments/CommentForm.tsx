import React from 'react';
import {useForm} from 'react-hook-form';

import Button from '../../shared/Button';
import EmojisInput from '../../shared/EmojisInput';

import styles from './Comments.module.scss';

const CommentForm: React.FC = () => {
  const {handleSubmit, register, formState, setValue, getValues} = useForm({
    mode: 'onChange',
  });

  const onSubmit = (values: any) => {};
  const addEmoji = (emoji: any) => {
    setValue('commentInput', getValues('commentInput') + emoji.native);
  };
  return (
    <form className={styles.block__form__box} onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Lora" autoComplete="off" {...register('nameInput')} />
      <EmojisInput
        {...register('commentInput')}
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
