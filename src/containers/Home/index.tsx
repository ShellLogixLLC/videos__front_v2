import React, {useState} from 'react';

import {filteredMass} from '~/utils';
import {CategoryService, VideosService} from '~/api';
import {
  Button,
  DatePicker,
  FilterBySort,
  HorizontalSlider,
  LogoutModal,
  Typography,
} from '~/components';
import WishlistSearchService from '~/api/wishlist';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const {data, isLoading} = CategoryService.useCategories();
  const categories = data?.categories;

  const {videosData} = VideosService.useVideos();
  const videos = videosData?.videos;

  const {data: wishlistData} = WishlistSearchService.useVideoWishlistIds();
  const [showModal, setShowModal] = useState<boolean>(false);

  // const openModal = (): void => {
  //   setShowModal(!showModal);
  // };

  const close = (): void => {
    setShowModal(false);
  };

  return (
    <article className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            New Videos
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
        </section>
        <section className={styles.wrapper__content__two_section}>
          <Typography className={styles.wrapper__content__title}>
            Categories
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
            Top Rated
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
        </section>
        <section className={styles.wrapper__content__one_section}>
          <Typography className={styles.wrapper__content__title}>
            Most Liked
          </Typography>
          <HorizontalSlider
            isLoading={isLoading}
            dataList={videos}
            wishlist={wishlistData}
          />
          {/*<Button onClick={openModal}>Log Out</Button>*/}
        </section>
      </div>
      <aside className={styles.filter_block}>
        <DatePicker />
        <FilterBySort options={filteredMass} />
      </aside>
      <LogoutModal close={close} show={showModal} />
    </article>
  );
};

export default Home;
