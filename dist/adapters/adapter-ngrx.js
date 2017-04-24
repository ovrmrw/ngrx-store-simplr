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
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var adapter_1 = require("./adapter");
var AdapterForNgrxStore = (function (_super) {
    __extends(AdapterForNgrxStore, _super);
    function AdapterForNgrxStore(store) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.testing = false;
        if (!_this.store) {
            throw new Error('Token "Store" for @ngrx/store is not found.');
        }
        return _this;
    }
    AdapterForNgrxStore.prototype.setState = function (action) {
        this.store.dispatch(action);
    };
    AdapterForNgrxStore.prototype.getState = function () {
        return this.store.select(function (s) { return s; });
    };
    AdapterForNgrxStore.prototype.setInitialState = function (state) {
        console.warn('Use setInitialState function only for testing.');
    };
    return AdapterForNgrxStore;
}(adapter_1.Adapter));
AdapterForNgrxStore.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
AdapterForNgrxStore.ctorParameters = function () { return [
    { type: store_1.Store, decorators: [{ type: core_1.Inject, args: [store_1.Store,] }, { type: core_1.Optional },] },
]; };
exports.AdapterForNgrxStore = AdapterForNgrxStore;
//# sourceMappingURL=adapter-ngrx.js.map