"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("./api.service");
var api_config_service_1 = require("./api-config.service");
var RestApiModule = RestApiModule_1 = (function () {
    function RestApiModule() {
    }
    RestApiModule.forRoot = function (ApiConfig) {
        return {
            ngModule: RestApiModule_1,
            providers: [
                {
                    provide: api_config_service_1.ApiConfigService,
                    useValue: ApiConfig
                },
                api_service_1.ApiService
            ]
        };
    };
    return RestApiModule;
}());
RestApiModule = RestApiModule_1 = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [],
        exports: []
    })
], RestApiModule);
exports.RestApiModule = RestApiModule;
var RestApiModule_1;
