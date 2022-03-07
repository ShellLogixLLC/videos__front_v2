import Pagination from '.';

export interface Pagination {
  rowsPerPage?: number;
  activePage?: number;
  dataLength?: number;
  rowsPerPageArray?: number[];
  setActivePage?: (arg: number) => void;
  setRowsPerPage?: (arg: number) => void;
}

export type PaginationTypeof = typeof Pagination;
