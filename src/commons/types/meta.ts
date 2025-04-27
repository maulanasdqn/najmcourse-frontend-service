export enum EMetaOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type TMetaRequest = {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  order?: EMetaOrder;
  filter?: string;
  filter_by?: string;
};
