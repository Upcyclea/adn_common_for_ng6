"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel = (function () {
    function BaseModel(data) {
        if (data) {
            this.set(data);
        }
    }
    BaseModel.prototype.set = function (data) {
        var _this = this;
        try {
            var dataValues_1 = this.extractData(typeof data === 'string' ? JSON.parse(data) : data);
            Object.keys(dataValues_1).forEach(function (key) {
                _this[key] = dataValues_1[key];
            });
        }
        catch (e) {
            console.error(e);
        }
        return this;
    };
    BaseModel.prototype.extractData = function (data) {
        var json = {};
        this.fields().forEach(function (field) {
            if (data.hasOwnProperty(field)) {
                json[field] = data[field];
            }
        });
        return json;
    };
    BaseModel.prototype.toJSON = function () {
        return this.extractData(this);
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
