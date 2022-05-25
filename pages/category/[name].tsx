import React from 'react';
import {GetServerSideProps, NextPage} from 'next';

import {Seo} from '~/components';
import {Category} from '~/containers';
import endpoints from '~/api/endpoints';
import ApiService from '~/api/ApiService';
import {ICategoriesPageQueries} from '~/types';

const CategoriesPage: NextPage = () => {
  return (
    <Seo title="Categories page" metaDescription="Categories page description">
      <Category />
    </Seo>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {name, page} = query as ICategoriesPageQueries;

  const activePage = page ? Number(page) : 0;

  const activeCategory = await ApiService.get(
    endpoints.CategoryService.getCategoryById(name),
  );

  const categoryVideos = await ApiService.get(
    endpoints.CategoryService.getVideoByCategoryId(),
    {
      offset: activePage * 9,
      limit: 9,
      categoryIds: [name],
    },
  );

  return {
    props: {
      fallback: {
        [endpoints.CategoryService.getCategoryById(name)]: activeCategory,
        [endpoints.CategoryService.getVideoByCategoryId()]: categoryVideos,
      },
    },
  };
};

export default CategoriesPage;
