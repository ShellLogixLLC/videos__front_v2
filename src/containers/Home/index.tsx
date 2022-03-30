import React from 'react';
import {useTranslation} from 'next-i18next';

import {Typography} from '~/components';
import {HorizontalSlider} from '~/components';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
      <section className={styles.wrapper__one_section}>
        <Typography
          variant="Heading"
          type="Extra"
          className={styles.wrapper__one_section__title}>
          {t('common.newVideos')}
        </Typography>
        <HorizontalSlider />
      </section>
    </div>
  );
};

export default Home;
