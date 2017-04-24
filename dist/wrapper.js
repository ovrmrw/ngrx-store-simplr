"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wrapper = (function () {
    function Wrapper() {
    }
    Wrapper.prototype.mergeReducersIntoWrappedReducers = function (reducers) {
        var _this = this;
        var keys = Object.keys(reducers);
        var finalReducers = keys.reduce(function (p, key) {
            p[key] = _this.createWrappedReducer(key, reducers[key]);
            return p;
        }, {});
        return finalReducers;
    };
    Wrapper.prototype.createWrappedReducer = function (key, innerReducer) {
        var _a = this.getActionKeysForSimplr(key), _UPDATE_ = _a._UPDATE_, _FAILED_ = _a._FAILED_;
        return function outerReducer(state, action) {
            switch (action.type) {
                case _UPDATE_:
                    if (action.payload instanceof Object && !(action.payload instanceof Array)) {
                        return __assign({}, state, action.payload);
                    }
                    else if (action.payload instanceof Array) {
                        return action.payload.slice();
                    }
                    else {
                        return action.payload;
                    }
                case _FAILED_:
                    return state;
                default:
                    return innerReducer ? innerReducer(state, action) : state;
            }
        };
    };
    Wrapper.prototype.getActionKeysForSimplr = function (key) {
        return {
            _UPDATE_: this.createUpdateKey(key),
            _FAILED_: this.createFailedKey(key),
        };
    };
    Wrapper.prototype.createUpdateKey = function (key) {
        return key + ' @UPDATE@';
    };
    Wrapper.prototype.createFailedKey = function (key) {
        return key + ' @FAILED@';
    };
    return Wrapper;
}());
exports.Wrapper = Wrapper;
//# sourceMappingURL=wrapper.js.map