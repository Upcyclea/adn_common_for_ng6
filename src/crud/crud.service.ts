/**
 * Created by aleksandr on 2.05.17.
 */
import 'rxjs/add/operator/map'
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ApiService } from '../rest-api/api.service';
import { ICrud } from './crud.interface';
import { ActiveRecord } from './active-record.model';

@Injectable()
export abstract class CrudService<M extends ActiveRecord> extends ApiService implements ICrud {
  protected abstract namespace: string;
  protected abstract ModelClass: any;

  public relations: string[] = [];

  public get singularEndpoint():string {
    return this.namespace;
  }

  /**
   * @inheritDoc
   * @param route
   * @returns {string}
   */
  public getEndpoint(route?: string|number): string {
    return super.getEndpoint(`${this.namespace}${route ? '/' + String(route) : ''}`);
  }

  /**
   * @inheritDoc
   * @param route
   * @returns {string}
   */
  public getSingularEndpoint(route?: string|number): string {
    return super.getEndpoint(`${this.singularEndpoint}${route ? '/' + String(route): ''}`);
  }

  public get(query?:any): Observable<M[]> {
    return this
      .sendGet(this.getEndpoint(), {search: query})
      .map((res:Response) => res.json().map((item:M) => this.buildModel<M>(item)))
      .catch((err) => ApiService.onError(err));
  }

  public view(id:number, query?:any): Observable<M> {
    return this
      .sendGet(this.getSingularEndpoint(id), {search: query})
      .map((res:Response) => this.buildModel<M>(res.json()))
      .catch((err) => ApiService.onError(err));
  }

  public create(data:M): Observable<M> {
    return this
      .sendPost(this.getEndpoint(), data)
      .map((res:Response) => this.buildModel<M>(res.json()))
      .catch((err) => ApiService.onError(err));
  }

  public update(id:number, data:M): Observable<M> {
    return this
      .sendPut(this.getSingularEndpoint(id), data)
      .map((res:Response) => <M> res.json())
      .catch((err) => ApiService.onError(err));
  }

  public remove(id:number): Observable<M> {
    return this
      .sendDelete(this.getSingularEndpoint(id))
      .map((res:Response) => <M> res.json())
      .catch((err) => ApiService.onError(err));
  }

  public buildModel<M>(data: any):M {
    return new this.ModelClass(data);
  }
}
