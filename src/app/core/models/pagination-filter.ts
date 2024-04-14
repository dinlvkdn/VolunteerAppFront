export interface PaginationFilter{
  pageNumber: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: number;
  organizationId? : string;
}
