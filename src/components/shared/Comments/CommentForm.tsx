import React from 'react';
import {useForm} from 'react-hook-form';

import {Input, Button, EmojisInput} from '~/components';

import styles from './Comments.module.scss';

const CommentForm: React.FC = () => {
  const {handleSubmit, register, formState} = useForm({
    mode: 'onChange',
  });

  const onSubmit = (values: any) => {
    // eslint-disable-next-line no-console
    console.log(values, 'asd');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.block__form__box}>
        <Input placeholder="Lora" {...register('nameInput')} />
        <EmojisInput
          {...register('commentInput')}
          placeholder="Type your text here..."
        />
        <Button disabled={!formState.isValid} type="submit">
          Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
