/**
 * Created by aleksandr on 11.05.17.
 */
import { RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { IApiConfig } from './api-config.interface';
import { RequestHeadersArgs } from './request-headers-args.interface';

@Injectable()
export class ApiConfigService implements IApiConfig {
    api_url: string;
    isDebug: boolean;
    options: RequestOptionsArgs;
    headers: RequestHeadersArgs;
}
