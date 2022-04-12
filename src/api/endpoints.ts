const endpoints = {
  CategoryService: {
    getCategories: (): string => '/categories',
  },

  VideosService: {
    getVideos: (): string => '/videos?offset=0&limit=20',
  },
};

export default endpoints;
