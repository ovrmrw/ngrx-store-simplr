"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
require("rxjs/add/observable/of");
require("rxjs/add/observable/from");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/combineLatest");
require("rxjs/add/operator/timeout");
require("rxjs/add/operator/take");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/retry");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
var wrapper_1 = require("./wrapper");
var adapters_1 = require("./adapters");
var TIMEOUT = 1000 * 15;
var RETRY = 3;
var Simplr = (function () {
    function Simplr(adapter) {
        this.adapter = adapter;
        this.wrapper = new wrapper_1.Wrapper();
    }
    Simplr.prototype.dispatch = function (key, resolver, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var returner$ = new ReplaySubject_1.ReplaySubject();
        var _a = this.wrapper.getActionKeysForSimplr(key), _UPDATE_ = _a._UPDATE_, _FAILED_ = _a._FAILED_;
        var action$ = Observable_1.Observable.of(resolver)
            .mergeMap(function (resolver) {
            if (resolver instanceof Promise || resolver instanceof Observable_1.Observable) {
                return Observable_1.Observable.from(resolver).retry(options.retry || RETRY);
            }
            else {
                return Observable_1.Observable.of(resolver);
            }
        })
            .combineLatest(this.adapter.getState())
            .timeout(options.timeout || TIMEOUT)
            .take(1)
            .map(function (_a) {
            var resolver = _a[0], state = _a[1];
            if (resolver instanceof Function) {
                return resolver(state[key], state);
            }
            else {
                return resolver;
            }
        })
            .map(function (resolver) {
            var temp = resolver;
            while (temp instanceof Function) {
                temp = temp();
            }
            return temp;
        })
            .map(function (payload) {
            return {
                type: _UPDATE_,
                payload: payload,
            };
        })
            .catch(function (err) {
            if (!_this.adapter.testing) {
                console.error(err.message || err);
            }
            return Observable_1.Observable.of({
                type: _FAILED_,
            });
        });
        action$.subscribe(function (action) {
            if (_this.adapter.testing) {
                _this.adapter.setState(action, key);
            }
            else {
                _this.adapter.setState(action);
            }
            returner$.next(action);
        });
        return returner$
            .combineLatest(this.adapter.getState())
            .take(1)
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return Object.assign({}, {
                action: action,
                state: state,
                partial: state[key]
            });
        })
            .do(function (result) {
            if (options.logging) {
                console.log('result:', result);
            }
        });
    };
    return Simplr;
}());
Simplr.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
Simplr.ctorParameters = function () { return [
    { type: adapters_1.Adapter, decorators: [{ type: core_1.Inject, args: [adapters_1.Adapter,] },] },
]; };
exports.Simplr = Simplr;
//# sourceMappingURL=simplr.js.map