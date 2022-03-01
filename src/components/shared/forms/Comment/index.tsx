import Image from 'next/image';

import {OvalImage} from '~/assets';

import Comments from '../../Comments';

import styles from './CommentForm.module.scss';

const CommentForm: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__image}>
        <Image src={OvalImage} alt="user" />
      </div>
      <div className={styles.container__input}>
        <Comments />
      </div>
    </div>
  );
};

export default CommentForm;
