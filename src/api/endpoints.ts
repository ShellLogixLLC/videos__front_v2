const endpoints = {
  CategoryService: {
    getCategories: (): string => '/categories',
    getCategoryById: (id?: string | string[]): string => `/categories/${id}`,
    getVideoByCategoryId: (): string => `/videos`,
  },

  VideosService: {
    getVideos: (): string => '/videos?offset=0&limit=20',
    getRandomVideos: (limit: number): string => `/videos/random?limit=${limit}`,
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
    getLikedVideoIds: (): string => `/video-likes/video-ids`,
  },

  VideosSearchService: {
    getVideosSearch: (search: string): string => `/videos?search=${search}`,
    getRandomVideosSearch: (search: string): string =>
      `/videos/random?search=${search}`,
  },

  WishlistService: {
    getWishlistVideoIds: (): string => `/favorites`,
    getWishlistVideos: (): string => `/favorites/videos`,
  },
};

export default endpoints;
