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
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var api_service_1 = require("../rest-api/api.service");
var CrudService = (function (_super) {
    __extends(CrudService, _super);
    function CrudService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.relations = [];
        return _this;
    }
    Object.defineProperty(CrudService.prototype, "singularEndpoint", {
        get: function () {
            return this.namespace;
        },
        enumerable: true,
        configurable: true
    });
    CrudService.prototype.getEndpoint = function (route) {
        return _super.prototype.getEndpoint.call(this, "" + this.namespace + (route ? '/' + String(route) : ''));
    };
    CrudService.prototype.getSingularEndpoint = function (route) {
        return _super.prototype.getEndpoint.call(this, "" + this.singularEndpoint + (route ? '/' + String(route) : ''));
    };
    CrudService.prototype.get = function (query) {
        var _this = this;
        return this
            .sendGet(this.getEndpoint(), { search: query })
            .map(function (res) { return res.json().map(function (item) { return _this.buildModel(item); }); })
            .catch(function (err) { return api_service_1.ApiService.onError(err); });
    };
    CrudService.prototype.view = function (id, query) {
        var _this = this;
        return this
            .sendGet(this.getSingularEndpoint(id), { search: query })
            .map(function (res) { return _this.buildModel(res.json()); })
            .catch(function (err) { return api_service_1.ApiService.onError(err); });
    };
    CrudService.prototype.create = function (data) {
        var _this = this;
        return this
            .sendPost(this.getEndpoint(), data)
            .map(function (res) { return _this.buildModel(res.json()); })
            .catch(function (err) { return api_service_1.ApiService.onError(err); });
    };
    CrudService.prototype.update = function (id, data) {
        return this
            .sendPut(this.getSingularEndpoint(id), data)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return api_service_1.ApiService.onError(err); });
    };
    CrudService.prototype.remove = function (id) {
        return this
            .sendDelete(this.getSingularEndpoint(id))
            .map(function (res) { return res.json(); })
            .catch(function (err) { return api_service_1.ApiService.onError(err); });
    };
    CrudService.prototype.buildModel = function (data) {
        return new this.ModelClass(data);
    };
    return CrudService;
}(api_service_1.ApiService));
CrudService = __decorate([
    core_1.Injectable()
], CrudService);
exports.CrudService = CrudService;
