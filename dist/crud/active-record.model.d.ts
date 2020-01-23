import { Observable } from 'rxjs/Observable';
import { BaseModel } from './base.model';
import { ICrud } from './crud.interface';
import { CrudService } from './crud.service';
export declare abstract class ActiveRecord extends BaseModel {
    abstract id: number;
    loaded: boolean;
    protected service: ICrud;
    protected abstract provider: typeof CrudService;
    build(): this;
    load<T>(query?: any): Observable<T>;
    save(): Observable<any>;
    destroy(): Observable<any>;
}
