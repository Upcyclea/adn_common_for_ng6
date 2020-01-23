"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var service_locator_service_1 = require("../common/service-locator.service");
var api_config_service_1 = require("./api-config.service");
var ApiService = (function () {
    function ApiService(_configService) {
        this._configService = _configService;
        console.log('%c Config', 'background: forestgreen; color: white', this._configService);
        this.setConfig(this._configService).injectServices();
    }
    ApiService.onError = function (error) {
        var message = false;
        var json = error.json();
        if (error.status === 422) {
            var field = json.shift();
            message = field ? field.message : false;
        }
        if (error.status === 405) {
            message = json ? json.message : false;
        }
        console.error(message ? String(message) : error.status + " - " + error.statusText);
        return Observable_1.Observable.throw(message ? new Error(String(message)) : error);
    };
    ApiService.prototype.injectServices = function () {
        this._http = service_locator_service_1.ServiceLocator.injector.get(http_1.Http);
        return this;
    };
    ApiService.prototype.setConfig = function (config) {
        this._config = config;
        return this;
    };
    ApiService.prototype.getApiUrl = function () {
        return this._config.api_url;
    };
    ApiService.prototype.getEndpoint = function (route) {
        return this.getApiUrl() + '/' + route;
    };
    ApiService.prototype.getOptions = function () {
        return JSON.parse(JSON.stringify(this._config.options));
    };
    ApiService.prototype.getHeaders = function () {
        return JSON.parse(JSON.stringify(this._config.headers));
    };
    ApiService.prototype.mergeOptions = function (options) {
        if (options === void 0) { options = {}; }
        var customOptions = this.getOptions();
        var params = new http_1.URLSearchParams();
        if (!!options.search) {
            Object
                .keys(options.search)
                .forEach(function (key) {
                params.set(key, String(options.search[key]));
            });
        }
        customOptions.params = params;
        customOptions.headers = new http_1.Headers(this.getHeaders());
        return customOptions;
    };
    ApiService.prototype.sendPost = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        var queryOptions = this.mergeOptions(options);
        console.log('%c POST ', 'background: forestgreen; color: white', url, data, queryOptions);
        return this._http.post(url, data, queryOptions);
    };
    ApiService.prototype.sendPut = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        var queryOptions = this.mergeOptions(options);
        console.log('%c PUT ', 'background: forestgreen; color: white', url, data, queryOptions);
        return this._http.put(url, data, queryOptions);
    };
    ApiService.prototype.sendGet = function (url, options) {
        if (options === void 0) { options = {}; }
        var queryOptions = this.mergeOptions(options);
        console.log('%c GET ', 'background: forestgreen; color: white', url, queryOptions);
        return this._http.get(url, queryOptions);
    };
    ApiService.prototype.sendDelete = function (url, options) {
        if (options === void 0) { options = {}; }
        var queryOptions = this.mergeOptions(options);
        console.log('%c DELETE ', 'background: forestgreen; color: white', url, queryOptions);
        return this._http.delete(url, queryOptions);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], ApiService);
exports.ApiService = ApiService;
