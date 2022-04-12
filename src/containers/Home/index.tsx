import React from 'react';
import {useTranslation} from 'next-i18next';

import {filteredMass} from '~/utils';
import {HorizontalSlider} from '~/components';
import {CategoryService, VideosService} from '~/api';
import {DatePicker, FilterBySort, Typography} from '~/components';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const {t} = useTranslation();

  const {data} = CategoryService.useCategories();
  const categories = data?.categories;
  const {videosData} = VideosService.useVideos();
  const videos = videosData?.videos;

  //this data will change after
  const categoryArr = categories && [
    ...categories,
    ...categories,
    ...categories,
  ];
  const videosArr = videos && [...videos, ...videos, ...videos];

  return (
    <article className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.newVideos')}
          </Typography>
          <HorizontalSlider dataList={videosArr} />
        </section>
        <section className={styles.wrapper__content__two_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.categories')}
          </Typography>
          <HorizontalSlider
            isCategory
            dataList={categoryArr}
            className={styles.wrapper__content__two_section_slider}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.topRated')}
          </Typography>
          <HorizontalSlider dataList={videosArr} />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('common.mostLiked')}
          </Typography>
          <HorizontalSlider dataList={videosArr} />
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
