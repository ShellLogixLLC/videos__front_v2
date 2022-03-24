
export interface Pagination {
  isRight?: boolean;
  activePage?: number;
  dataLength: number;
  setActivePage?: (arg: number) => void;
}

export interface PerPage {
  rowsPerPage: number;
  setRowsPerPage: (arg: number) => void;
}


