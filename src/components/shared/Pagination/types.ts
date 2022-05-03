export type IPaginationProps = {
  isRight?: boolean;
  dataLength: number;
  activePage?: number;
  isCategory?: boolean;
  rowsPerPage?: number;
  isPerPageNeeded?: boolean;
  isMoreButtonNeeded?: boolean;
  setActivePage?: (arg: number) => void;
  setRowsPerPage?: (arg: number) => void;
  transformXValue?: number | null;
  transformMaxWeight?: number | null;
  handleClickLeftArrow?: () => void;
  handleClickRightArrow?: () => void;
};

export type IPerPageProps = {
  rowsPerPage: number;
  setRowsPerPage: (arg: number) => void;
};
