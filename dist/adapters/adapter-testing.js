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
// import { Injectable, Inject, Optional } from '@angular/core'
var Observable_1 = require("rxjs/Observable");
var adapter_1 = require("./adapter");
var wrapper_1 = require("../wrapper");
var AdapterForTesting = (function (_super) {
    __extends(AdapterForTesting, _super);
    function AdapterForTesting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.testing = true;
        _this.fakeState = {};
        _this.wrapper = new wrapper_1.Wrapper();
        return _this;
    }
    AdapterForTesting.prototype.setState = function (action, key) {
        var state = this.fakeState[key];
        if (state !== undefined) {
            var reducer = this.wrapper.createWrappedReducer(key);
            this.fakeState[key] = reducer(state, action);
        }
        else {
            console.error(key + ' is not found in fakeState keys.');
        }
    };
    AdapterForTesting.prototype.getState = function () {
        return Observable_1.Observable.of(this.fakeState);
    };
    AdapterForTesting.prototype.setInitialState = function (state) {
        this.fakeState = state;
    };
    return AdapterForTesting;
}(adapter_1.Adapter));
exports.AdapterForTesting = AdapterForTesting;
//# sourceMappingURL=adapter-testing.js.map