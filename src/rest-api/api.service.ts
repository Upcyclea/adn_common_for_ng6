/**
 * Created by aleksandr on 28.04.17.
 */
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptionsArgs, Response } from '@angular/http';
import { IApiConfig } from './api-config.interface';
import { ServiceLocator } from '../common/service-locator.service';
import { RequestHeadersArgs } from './request-headers-args.interface';
import { ApiConfigService } from './api-config.service';

/**
 * This class provides the ApiService service with methods to interact with REST server.
 */
@Injectable()
export class ApiService {

  private _config:IApiConfig;
  private _http: Http;

  /**
   * Default Http onError handler
   * @param error
   * @returns {ErrorObservable}
   */
  public static onError (error: Response): ErrorObservable {

    let message:string|boolean = false;
    let json = error.json();
    if(error.status === 422) {
      let field = (<Array<any>>json).shift();
      message = field ? field.message : false;
    }
    if(error.status === 405) {
      message = json ? json.message : false;
    }

    console.error(message ? String(message) : `${error.status} - ${error.statusText}`);
    return Observable.throw(message ? new Error(String(message)) : error);

  }
  /**
   * Creates an instance of the ApiService
   * @constructor
   */
  constructor(private _configService: ApiConfigService) {
    console.log('%c Config',  'background: forestgreen; color: white', this._configService);
    this.setConfig(this._configService).injectServices();
  }

  /**
   * Inject the Http service
   * @returns {ApiService}
   */
  protected injectServices(): ApiService {
    this._http = ServiceLocator.injector.get(Http);
    return this;
  }

  /**
   * Set the REST config
   * @param config
   * @returns {ApiService}
   */
  protected setConfig(config: IApiConfig): ApiService {
    this._config = config;
    return this;
  }

  /**
   * Get REST api url
   * @returns {string}
   */
  public getApiUrl(): string {
    return this._config.api_url;
  }

  /**
   * Create url for REST endpoint
   * @param route
   * @returns {string}
   */
  public getEndpoint(route:string): string {
    return this.getApiUrl() +'/'+ route;
  }

  /**
   * Get copy of base request options
   * @returns {RequestOptionsArgs}
   */
  public getOptions(): RequestOptionsArgs {
    return JSON.parse(JSON.stringify(this._config.options));
  }

  /**
   * Get copy of base request headers
   * @returns {RequestHeadersArgs}
   */
  public getHeaders(): RequestHeadersArgs {
    return JSON.parse(JSON.stringify(this._config.headers));
  }

  /**
   * Merge request options and headers
   * @param options
   * @returns {RequestOptionsArgs}
   */
  protected mergeOptions(options:any = {}): RequestOptionsArgs {
    let customOptions = this.getOptions();
    let params: URLSearchParams = new URLSearchParams();
    if(!!options.search) {
      Object
        .keys(options.search)
        .forEach((key) => {
          params.set(key, String(options.search[key]));
        });
    }
    customOptions.params = params;
    customOptions.headers = new Headers(this.getHeaders());
    return customOptions;
  }

  /**
   * Send a POST request to REST server
   * @param url
   * @param data
   * @param options
   * @returns {Observable<Response>}
   */
  public sendPost(url:string, data:any = {}, options:Object = {}): Observable<Response> {
    let queryOptions: RequestOptionsArgs = this.mergeOptions(options);
    console.log('%c POST ', 'background: forestgreen; color: white', url, data, queryOptions);
    return this._http.post(url, data, queryOptions);
  }

  /**
   *  Send a PUT request to REST server
   * @param url
   * @param data
   * @param options
   * @returns {Observable<Response>}
   */
  public sendPut(url:string, data:any = {}, options:Object = {}): Observable<Response> {
    let queryOptions: RequestOptionsArgs = this.mergeOptions(options);
    console.log('%c PUT ',  'background: forestgreen; color: white' ,url, data, queryOptions);
    return this._http.put(url, data, queryOptions);
  }

  /**
   * Send a GET request to REST server
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  public sendGet(url:string, options:any = {}): Observable<Response> {
    let queryOptions = this.mergeOptions(options);
    console.log('%c GET ',  'background: forestgreen; color: white' , url, queryOptions);
    return this._http.get(url, queryOptions);
  }

  /**
   * Send a DELETE request to REST server
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  public sendDelete(url:string, options:any = {}): Observable<Response> {
    let queryOptions: RequestOptionsArgs = this.mergeOptions(options);
    console.log('%c DELETE ', 'background: forestgreen; color: white', url, queryOptions);
    return this._http.delete(url, queryOptions);
  }


}
