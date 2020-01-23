/**
 * Created by aleksandr on 2.05.17.
 */
import { Observable } from 'rxjs/Observable';
export interface ICrud {
  relations: string[];
  get<T>(query?:any): Observable<T[]>;
  view<T>(id:number): Observable<T>;
  view<T>(id:number, query:any): Observable<T>;
  create<T>(data:T): Observable<T>;
  update<T>(id:number, data:T): Observable<T>;
  remove<T>(id:number): Observable<T>;
}
