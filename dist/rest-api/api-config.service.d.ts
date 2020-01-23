import { RequestOptionsArgs } from '@angular/http';
import { IApiConfig } from './api-config.interface';
import { RequestHeadersArgs } from './request-headers-args.interface';
export declare class ApiConfigService implements IApiConfig {
    api_url: string;
    isDebug: boolean;
    options: RequestOptionsArgs;
    headers: RequestHeadersArgs;
}
