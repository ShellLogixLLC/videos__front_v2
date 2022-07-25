import React from 'react';

import {filteredMass} from '~/utils';
import {CategoryService, VideosService} from '~/api';
import {
  DatePicker,
  FilterBySort,
  HorizontalSlider,
  Typography,
} from '~/components';
import {useAppSelector} from '~/hooks';
import {wishlistSelect} from '~/store/wishlist';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const {data, isLoading} = CategoryService.useCategories();
  const categories = data?.categories;

  const {videosData} = VideosService.useVideos();
  const videos = videosData?.videos;

  const {wishlistIds: wishlistData} = useAppSelector(wishlistSelect);

  console.log(wishlistData, 'data');

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
            isLoading={isLoading}
            dataList={categories}
            className={styles.wrapper__content__two_section_slider}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            topRated
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            mostLiked
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
  );
};

export default Home;
