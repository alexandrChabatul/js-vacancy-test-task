export interface ProductsListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort?: {
    createdOn: 'asc' | 'desc';
  };
  filter?: {
    price?: {
      from: number | null;
      to: number | null;
    };
  };
}
