export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: DataPaginatedResponse<T>;
  message?: string;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort: string | null;
}

export interface DataPaginatedResponse<T> {
  content: T;
  pageable: {
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
