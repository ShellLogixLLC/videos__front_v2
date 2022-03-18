import Pagination from '.';

export interface Pagination {
  isRigh?: boolean;
  activePage?: number;
  dataLength?: number;
  rowsPerPage?: number;
  setActivePage?: (arg: number) => void;
  setRowsPerPage?: (arg: number) => void;
}

export type PaginationTypeof = typeof Pagination;
