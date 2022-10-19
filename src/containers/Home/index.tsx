import React from 'react';

import {useAppSelector} from '~/hooks';
import {wishlistSelect} from '~/store/wishlist';
import {HorizontalSlider, Typography} from '~/components';
import {CategoryService, VideosService} from '~/api';
import {
  SLIDER_COUNT,
  VIDEO_INITIAL_OFFSET,
  SORT_BY_VIEWED_AND_LIKED,
} from '~/constants';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const {data, isLoading} = CategoryService.useCategories();
  const categories = data?.categories;

  const {videosData} = VideosService.useVideos();

  const videos = videosData?.videos;

  const {data: mostViewedData, isLoading: mostViewedLoading} =
    CategoryService.useActiveCategory({
      limit: SLIDER_COUNT,
      offset: VIDEO_INITIAL_OFFSET,
      viewsSort: SORT_BY_VIEWED_AND_LIKED,
    });

  const {data: mostLikedData, isLoading: mostLikedLoading} =
    CategoryService.useActiveCategory({
      limit: SLIDER_COUNT,
      offset: VIDEO_INITIAL_OFFSET,
      likesSort: SORT_BY_VIEWED_AND_LIKED,
    });

  const {wishlistIds: wishlistData} = useAppSelector(wishlistSelect);

  return (
    <article className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            newVideos
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
        </section>
        <section className={styles.wrapper__content__two_section}>
          <Typography className={styles.wrapper__content__title}>
            categories
          </Typography>
          <HorizontalSlider
            isCategory
            isScrollable={true}
            isLoading={isLoading}
            dataList={categories}
            className={styles.wrapper__content__two_section_slider}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            mostViewed
          </Typography>
          <HorizontalSlider
            isLoading={mostViewedLoading}
            dataList={mostViewedData?.videos}
            wishlist={wishlistData}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            mostLiked
          </Typography>
          <HorizontalSlider
            isLoading={mostLikedLoading}
            dataList={mostLikedData?.videos}
            wishlist={wishlistData}
          />
        </section>
      </div>
    </article>
  );
};

export default Home;
