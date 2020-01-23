/**
 * Created by aleksandr on 9.05.17.
 */
import { ActiveRecord } from './active-record.model';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs/Observable';
import { IDataProviderOptions } from './data-provider-options.interface';
import { Response } from '@angular/http';

/**
 * This class provides the DataProvider factory with methods
 * to interact with yii2 rest-full pagination system.
 */
export class DataProvider<S extends CrudService<M>, M extends ActiveRecord> {

  public records: M[] = [];

  public currentPage: number = 1;
  public pageCount: number;
  public perPage: number;
  public totalCount: number;

  private _sortField: string|null = null;
  private _sortDesc: boolean = false;
  private _fields: string[] = [];

  /**
   * Creates an instance of the DataProvider
   * @constructor
   */
  constructor(private service: S) {
    console.log(service);
  }

  /**
   * Get pagination options for request
   * @returns {IDataProviderOptions.Pagination}
   */
  get paginationOptions():IDataProviderOptions.Pagination {
    let options: IDataProviderOptions.Pagination = {};
    if(this.currentPage > 1) {
      options.page = this.currentPage;
    }
    if(this._fields.length > 0) {
      options.fields = this._fields.join(',');
    }
    if(this._sortField) {
      options.sort = `${this._sortDesc ? '-' : ''}${this._sortField}`;
    }
    return options;
  }

  /**
   * Set offset page
   * @param page
   * @returns {DataProvider}
   */
  setPage(page:number) {
    this.currentPage = page;
    return this;
  }

  /**
   * Set custom fields to request
   * @param fields
   * @returns {DataProvider}
   */
  setFields(fields:string[]) {
    this._fields = fields;
    return this;
  }

  /**
   * Set a sort field and sort order
   * @param field
   * @param desc
   * @returns {DataProvider}
   */
  setSortOptions(field:string, desc?:boolean) {
    this._sortField = field;
    this._sortDesc = Boolean(desc);
    return this;
  }

  /**
   * Performs a get response with pagination params
   * @param query
   * @returns {Observable<M[]>}
   */
  loadRecords(query?:any):Observable<M[]> {
    return this
      .service
      .sendGet(this.service.getEndpoint(), {search: Object.assign(query ? query : {}, this.paginationOptions)})
      .map((res:Response) => {
        this.currentPage=Number(res.headers.get('X-Pagination-Current-Page'));
        this.pageCount=Number(res.headers.get('X-Pagination-Page-Count'));
        this.perPage=Number(res.headers.get('X-Pagination-Per-Page'));
        this.totalCount=Number(res.headers.get('X-Pagination-Total-Count'));
        this.records = res.json().map((item:M) => this.service.buildModel<M>(item));
        return this.records;
      });
  }

}
