export type IPaginationProps = {
  isRight?: boolean;
  activePage?: number;
  dataLength: number;
  setActivePage?: (arg: number) => void;
};

export type IPerPageProps = {
  rowsPerPage: number;
  setRowsPerPage: (arg: number) => void;
};
