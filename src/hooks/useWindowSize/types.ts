export type UseWindowSizeProps = {
  isWide?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  isLaptop?: boolean;
  isDesktop?: boolean;
  isMinTablet?: boolean;
  isTabletMid?: boolean;
  isMaxTablet?: boolean;
  isLargeTablet?: boolean;
  //
  windowWidth?: number;
  windowHeight?: number;
};

export type GetSizeType = {
  width: number;
  height: number;
};
