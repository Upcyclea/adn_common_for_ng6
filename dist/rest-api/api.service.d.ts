import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { RequestOptionsArgs, Response } from '@angular/http';
import { IApiConfig } from './api-config.interface';
import { RequestHeadersArgs } from './request-headers-args.interface';
import { ApiConfigService } from './api-config.service';
export declare class ApiService {
    private _configService;
    private _config;
    private _http;
    static onError(error: Response): ErrorObservable;
    constructor(_configService: ApiConfigService);
    protected injectServices(): ApiService;
    protected setConfig(config: IApiConfig): ApiService;
    getApiUrl(): string;
    getEndpoint(route: string): string;
    getOptions(): RequestOptionsArgs;
    getHeaders(): RequestHeadersArgs;
    protected mergeOptions(options?: any): RequestOptionsArgs;
    sendPost(url: string, data?: any, options?: Object): Observable<Response>;
    sendPut(url: string, data?: any, options?: Object): Observable<Response>;
    sendGet(url: string, options?: any): Observable<Response>;
    sendDelete(url: string, options?: any): Observable<Response>;
}
