import Pagination from '.';

export interface Pagination {
  rowsPerPage?: number;
  activePage?: number;
  dataLength?: number;
  rowsPerPageArray?: number[];
  setActivePage?: (arg: any) => void;
  setRowsPerPage?: (arg: any) => void;
}

export type PaginationTypeof = typeof Pagination;
