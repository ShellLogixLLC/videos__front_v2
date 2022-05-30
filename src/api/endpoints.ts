const endpoints = {
  CategoryService: {
    getCategories: (): string => '/categories',
    getCategoryById: (id?: string | string[]): string => `/categories/${id}`,
    getVideoByCategoryId: (): string => `/videos`,
  },

  VideosService: {
    getVideos: (): string => '/videos?offset=0&limit=20',
    getVideosSearch: (arg: string): string =>
      `/videos?offset=0&limit=20&search=${arg}`,
  },

  VideosSearchService: {
    getVideosSearch: (arg: string, limit: number, offset: number): string =>
      `/videos?offset=${offset}&limit=${limit}&search=${arg}`,
  },
};

export default endpoints;
