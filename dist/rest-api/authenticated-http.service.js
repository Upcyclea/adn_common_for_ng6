"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var router_1 = require("@angular/router");
var AuthenticatedHttpService = (function (_super) {
    __extends(AuthenticatedHttpService, _super);
    function AuthenticatedHttpService(backend, defaultOptions, _router) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this._router = _router;
        return _this;
    }
    AuthenticatedHttpService.prototype.request = function (url, options) {
        var _this = this;
        return _super.prototype.request.call(this, url, options).catch(function (error) {
            if ((error.status === 401 || error.status === 403)) {
                _this._router.navigate(['login']);
            }
            return Observable_1.Observable.throw(error);
        });
    };
    return AuthenticatedHttpService;
}(http_1.Http));
AuthenticatedHttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.XHRBackend,
        http_1.RequestOptions,
        router_1.Router])
], AuthenticatedHttpService);
exports.AuthenticatedHttpService = AuthenticatedHttpService;
