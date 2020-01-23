/**
 * Created by aleksandr on 9.05.17.
 */

export module IDataProviderOptions {
  export interface Pagination {
      page?: number;
      sort?: string;
      fields?: string;
  }
}
