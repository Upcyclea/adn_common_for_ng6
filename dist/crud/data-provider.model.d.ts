import { ActiveRecord } from './active-record.model';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs/Observable';
import { IDataProviderOptions } from './data-provider-options.interface';
export declare class DataProvider<S extends CrudService<M>, M extends ActiveRecord> {
    private service;
    records: M[];
    currentPage: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
    private _sortField;
    private _sortDesc;
    private _fields;
    constructor(service: S);
    readonly paginationOptions: IDataProviderOptions.Pagination;
    setPage(page: number): this;
    setFields(fields: string[]): this;
    setSortOptions(field: string, desc?: boolean): this;
    loadRecords(query?: any): Observable<M[]>;
}
