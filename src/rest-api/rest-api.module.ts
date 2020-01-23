/**
 * Created by aleksandr on 10.05.17.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConfigService } from './api-config.service';
import { IApiConfig } from './api-config.interface';


@NgModule({
    imports: [],
    declarations: [],
    exports: []
})
export class RestApiModule {
    static forRoot(ApiConfig:IApiConfig): ModuleWithProviders {
        return {
            ngModule: RestApiModule,
            providers: [
                {
                    provide: ApiConfigService,
                    useValue: ApiConfig
                },
                ApiService
            ]
        };
    }
}
