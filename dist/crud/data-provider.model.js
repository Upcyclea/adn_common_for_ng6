"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataProvider = (function () {
    function DataProvider(service) {
        this.service = service;
        this.records = [];
        this.currentPage = 1;
        this._sortField = null;
        this._sortDesc = false;
        this._fields = [];
        console.log(service);
    }
    Object.defineProperty(DataProvider.prototype, "paginationOptions", {
        get: function () {
            var options = {};
            if (this.currentPage > 1) {
                options.page = this.currentPage;
            }
            if (this._fields.length > 0) {
                options.fields = this._fields.join(',');
            }
            if (this._sortField) {
                options.sort = "" + (this._sortDesc ? '-' : '') + this._sortField;
            }
            return options;
        },
        enumerable: true,
        configurable: true
    });
    DataProvider.prototype.setPage = function (page) {
        this.currentPage = page;
        return this;
    };
    DataProvider.prototype.setFields = function (fields) {
        this._fields = fields;
        return this;
    };
    DataProvider.prototype.setSortOptions = function (field, desc) {
        this._sortField = field;
        this._sortDesc = Boolean(desc);
        return this;
    };
    DataProvider.prototype.loadRecords = function (query) {
        var _this = this;
        return this
            .service
            .sendGet(this.service.getEndpoint(), { search: Object.assign(query ? query : {}, this.paginationOptions) })
            .map(function (res) {
            _this.currentPage = Number(res.headers.get('X-Pagination-Current-Page'));
            _this.pageCount = Number(res.headers.get('X-Pagination-Page-Count'));
            _this.perPage = Number(res.headers.get('X-Pagination-Per-Page'));
            _this.totalCount = Number(res.headers.get('X-Pagination-Total-Count'));
            _this.records = res.json().map(function (item) { return _this.service.buildModel(item); });
            return _this.records;
        });
    };
    return DataProvider;
}());
exports.DataProvider = DataProvider;
