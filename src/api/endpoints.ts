const endpoints = {
  CategoryService: {
    getCategories: (): string => '/categories',
    getCategoryById: (id?: string | string[]): string => `/categories/${id}`,
    getVideoByCategoryId: (): string => `/videos`,
  },

  VideosService: {
    getVideos: (): string => '/videos?offset=0&limit=20',
    getVideoById: (id?: string | string[]): string => `/videos/${id}`,
    getVideoComments: (
      offset: number,
      limit: number,
      id?: string | string[],
    ): string => `/comments?videoId=${id}&offset=${offset}&limit=${limit}`,
    getVideoSimilar: (
      offset: number,
      limit: number,
      id?: string | string[],
    ): string => `/videos/${id}/similar?offset=${offset}&limit=${limit}`,
    getVideoLiked: (id?: string | string[]): string =>
      `/video-likes?videoId=${id}`,
  },

  VideosSearchService: {
    getVideosSearch: (arg: string, limit: number, offset: number): string =>
      `/videos?offset=${offset}&limit=${limit}&search=${arg}`,
  },

  WishlistService: {
    getWishlistVideoIds: (): string => `/favorites`,
    getWishlistVideos: (): string => `/favorites/videos`,
  },
};

export default endpoints;
