const endpoints = {
  CategoryService: {
    getCategories: (): string => '/categories',
  },

  VideosService: {
    getVideos: (): string => '/videos?offset=0&limit=20',
    getVideosSearch: (arg: string): string =>
      `/videos?offset=0&limit=20&search=${arg}`,
  },

  VideosSearchService: {
    getVideosSearch: (arg: string): string =>
      `/videos?offset=0&limit=20&search=${arg}`,
  },
};

export default endpoints;
