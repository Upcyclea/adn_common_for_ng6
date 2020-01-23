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
Object.defineProperty(exports, "__esModule", { value: true });
var base_model_1 = require("./base.model");
var service_locator_service_1 = require("../common/service-locator.service");
var ActiveRecord = (function (_super) {
    __extends(ActiveRecord, _super);
    function ActiveRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        return _this;
    }
    ActiveRecord.prototype.build = function () {
        if (!this.service) {
            if (!this.provider) {
                throw new Error('Provider not found');
            }
            this.service = service_locator_service_1.ServiceLocator.injector.get(this.provider);
        }
        return this;
    };
    ActiveRecord.prototype.load = function (query) {
        var _this = this;
        this.build();
        if (this.id && this.id > 0) {
            return this.service.view(this.id, query).map(function (data) {
                _this.set(data);
                return data;
            });
        }
        else {
            throw new Error('Id is required');
        }
    };
    ActiveRecord.prototype.save = function () {
        var _this = this;
        this.build();
        if (this.id && this.id > 0) {
            return this.service.update(this.id, this.extractData(this)).map(function (res) {
                return res;
            });
        }
        else {
            return this.service.create(this.extractData(this)).map(function (res) {
                _this.id = res.id;
                return res;
            });
        }
    };
    ActiveRecord.prototype.destroy = function () {
        this.build();
        if (this.id && this.id > 0) {
            return this.service.remove(this.id);
        }
        else {
            throw new Error('Id is required');
        }
    };
    return ActiveRecord;
}(base_model_1.BaseModel));
exports.ActiveRecord = ActiveRecord;
