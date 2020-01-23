/**
 * Created by aleksandr on 2.05.17.
 */

import { Observable } from 'rxjs/Observable';
import { BaseModel } from './base.model';
import { ICrud } from './crud.interface';
import { ServiceLocator } from '../common/service-locator.service';
import { CrudService } from './crud.service';

export abstract class ActiveRecord extends BaseModel {

  public abstract id: number;
  public loaded: boolean = false;

  protected service: ICrud;
  protected abstract provider: typeof CrudService;

  /**
   * Inject service by given provider
   * @returns {ActiveRecord}
   */
  build() {
    if(!this.service) {
      if(!this.provider) {
        throw new Error('Provider not found');
      }
      this.service = ServiceLocator.injector.get(this.provider);
    }
    return this;
  }

  /**
   * get one record from REST server by given id;
   * @param query
   * @returns {Observable<T>}
   */
  load<T>(query?: any): Observable<T> {
    this.build();
    if(this.id && this.id > 0) {
      return this.service.view(this.id, query).map((data:T) => {
        this.set(data);
        return data;
      });
    } else {
      throw new Error('Id is required');
    }
  }


  /**
   * save record on REST server
   * @returns {Observable<R>}
   */
  save():Observable<any> {
    this.build();
    if(this.id && this.id > 0) {
      return this.service.update(this.id, this.extractData(this)).map((res) => {
        return res;
      });
    } else {
      return this.service.create(this.extractData(this)).map((res) => {
        this.id = res.id;
        return res;
      });
    }
  }

  /**
   * remove record from REST server
   * @returns {Observable<T>}
   */
  destroy():Observable<any> {
    this.build();
    if(this.id && this.id > 0) {
      return this.service.remove(this.id);
    } else {
      throw new Error('Id is required');
    }
  }

}
