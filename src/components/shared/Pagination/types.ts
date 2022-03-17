import Pagination from '.';

export interface Pagination {
  rowsPerPage?: number;
  activePage?: number;
  dataLength?: number;
  setActivePage?: (arg: number) => void;
  setRowsPerPage?: (arg: number) => void;
}

export type PaginationTypeof = typeof Pagination;
