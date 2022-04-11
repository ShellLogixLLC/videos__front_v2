import React from 'react';
import {useTranslation} from 'next-i18next';

import {filteredMass} from '~/utils';
import {HorizontalSlider} from '~/components';
import {DatePicker, FilterBySort, Typography} from '~/components';

import styles from './Home.module.scss';
import {AuthService} from '~/api';

const Home: React.FC = () => {
  const {t} = useTranslation();

  const {categories} = AuthService.useCategories();

  return (
    <article className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.newVideos')}
          </Typography>
          <HorizontalSlider />
        </section>
        <section className={styles.wrapper__content__two_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.categories')}
          </Typography>
          <HorizontalSlider
            isCategory
            dataList={categories?.categories}
            className={styles.wrapper__content__two_section_slider}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.topRated')}
          </Typography>
          <HorizontalSlider />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.mostLiked')}
          </Typography>
          <HorizontalSlider />
        </section>
      </div>
      <aside className={styles.filter_block}>
        <DatePicker />
        <FilterBySort options={filteredMass} />
      </aside>
    </article>
  );
};

export default Home;
