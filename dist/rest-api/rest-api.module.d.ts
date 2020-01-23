import { ModuleWithProviders } from '@angular/core';
import { IApiConfig } from './api-config.interface';
export declare class RestApiModule {
    static forRoot(ApiConfig: IApiConfig): ModuleWithProviders;
}
