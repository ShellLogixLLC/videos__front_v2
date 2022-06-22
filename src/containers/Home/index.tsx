import React from 'react';
import {useTranslation} from 'next-i18next';

import {filteredMass} from '~/utils';
import {CategoryService, VideosService} from '~/api';
import {
  DatePicker,
  Typography,
  FilterBySort,
  HorizontalSlider,
} from '~/components';
import WishlistSearchService from '~/api/wishlist';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const {data, isLoading} = CategoryService.useCategories();
  const categories = data?.categories;

  const {t} = useTranslation('common');

  const {videosData} = VideosService.useVideos();
  const videos = videosData?.videos;

  const {data: wishlistData} = WishlistSearchService.useVideoWishlistIds();

  return (
    // <React.Suspense fallback="loading">
    <article className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('newVideos')}
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
        </section>
        <section className={styles.wrapper__content__two_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('categories')}
          </Typography>
          <HorizontalSlider
            isCategory
            isLoading={isLoading}
            dataList={categories}
            className={styles.wrapper__content__two_section_slider}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('topRated')}
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            {t('mostLiked')}
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
        </section>
      </div>
      <aside className={styles.filter_block}>
        <DatePicker />
        <FilterBySort options={filteredMass} />
      </aside>
    </article>
    // </React.Suspense>
  );
};

export default Home;
