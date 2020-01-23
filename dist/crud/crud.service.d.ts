import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../rest-api/api.service';
import { ICrud } from './crud.interface';
import { ActiveRecord } from './active-record.model';
export declare abstract class CrudService<M extends ActiveRecord> extends ApiService implements ICrud {
    protected abstract namespace: string;
    protected abstract ModelClass: any;
    relations: string[];
    readonly singularEndpoint: string;
    getEndpoint(route?: string | number): string;
    getSingularEndpoint(route?: string | number): string;
    get<M>(query?: any): Observable<M[]>;
    view<M>(id: number, query?: any): Observable<M>;
    create<M>(data: M): Observable<M>;
    update<M>(id: number, data: M): Observable<M>;
    remove<M>(id: number): Observable<M>;
    buildModel<M>(data: any): M;
}
