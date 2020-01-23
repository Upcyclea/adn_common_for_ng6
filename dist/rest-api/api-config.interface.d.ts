import { RequestOptionsArgs } from '@angular/http';
import { RequestHeadersArgs } from './request-headers-args.interface';
export interface IApiConfig {
    api_url: string;
    isDebug: boolean;
    options: RequestOptionsArgs;
    headers: RequestHeadersArgs;
}
