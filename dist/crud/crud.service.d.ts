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
    get(query?: any): Observable<M[]>;
    view(id: number, query?: any): Observable<M>;
    create(data: M): Observable<M>;
    update(id: number, data: M): Observable<M>;
    remove(id: number): Observable<M>;
    buildModel<M>(data: any): M;
}
