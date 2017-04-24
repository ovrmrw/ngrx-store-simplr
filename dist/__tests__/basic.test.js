"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var _2 = require("../");
var Observable_1 = require("rxjs/Observable");
var initialState = {
    timestamp: {
        local: 0,
        server: 0,
    },
    counter: 1,
    flag: true,
    array: ['a', 'b'],
};
describe('Basic Test', function () {
    var adapter;
    var simplr;
    beforeEach(function () {
        adapter = new _2.AdapterForTesting();
        simplr = new _1.Simplr(adapter);
    });
    describe('Simplr', function () {
        it('should create an instance', function () {
            expect(simplr).toBeTruthy();
        });
        it('can dispatch callback as both sync and async', function () { return __awaiter(_this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adapter.setInitialState(__assign({}, initialState));
                        return [4 /*yield*/, simplr.dispatch('timestamp', function (s) { return ({ local: s.local + 1 }); }).toPromise()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, simplr.dispatch('timestamp', Promise.resolve(function (s) { return ({ local: s.local + 1 }); })).toPromise()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, simplr.dispatch('timestamp', Observable_1.Observable.of(function (s) { return ({ local: s.local + 1 }); })).toPromise()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, adapter.getState().toPromise()];
                    case 4:
                        state = _a.sent();
                        expect(state.timestamp.local).toBe(3);
                        expect(state.timestamp).toEqual({ local: 3, server: 0 });
                        return [2 /*return*/];
                }
            });
        }); });
        it('can dispatch direct value as both sync and async', function () { return __awaiter(_this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adapter.setInitialState(__assign({}, initialState));
                        return [4 /*yield*/, simplr.dispatch('timestamp', ({ local: 1 })).toPromise()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, simplr.dispatch('timestamp', Promise.resolve({ local: 1 })).toPromise()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, simplr.dispatch('timestamp', Observable_1.Observable.of({ local: 1 })).toPromise()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, adapter.getState().toPromise()];
                    case 4:
                        state = _a.sent();
                        expect(state.timestamp.local).toBe(1);
                        expect(state.timestamp).toEqual({ local: 1, server: 0 });
                        return [2 /*return*/];
                }
            });
        }); });
        it('can dispatch deep nested callback', function () { return __awaiter(_this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adapter.setInitialState(__assign({}, initialState));
                        return [4 /*yield*/, simplr.dispatch('timestamp', ({ local: 1 })).toPromise()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, simplr.dispatch('timestamp', function (state) { return function () { return function () { return function () { return ({ local: state.local + 1 }); }; }; }; }).toPromise()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, adapter.getState().toPromise()];
                    case 3:
                        state = _a.sent();
                        expect(state.timestamp.local).toBe(2);
                        expect(state.timestamp).toEqual({ local: 2, server: 0 });
                        return [2 /*return*/];
                }
            });
        }); });
        it('can dispatch number', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _UPDATE_, _FAILED_, result, state;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new _1.Wrapper().getActionKeysForSimplr('counter'), _UPDATE_ = _a._UPDATE_, _FAILED_ = _a._FAILED_;
                        adapter.setInitialState(__assign({}, initialState));
                        return [4 /*yield*/, simplr.dispatch('counter', function (state) { return state - 1; }).toPromise()];
                    case 1:
                        result = _b.sent();
                        expect(result.action).toEqual({ type: _UPDATE_, payload: 0 });
                        return [4 /*yield*/, adapter.getState().toPromise()];
                    case 2:
                        state = _b.sent();
                        expect(state.counter).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can dispatch boolean', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _UPDATE_, _FAILED_, result, state;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new _1.Wrapper().getActionKeysForSimplr('flag'), _UPDATE_ = _a._UPDATE_, _FAILED_ = _a._FAILED_;
                        adapter.setInitialState(__assign({}, initialState));
                        return [4 /*yield*/, simplr.dispatch('flag', false).toPromise()];
                    case 1:
                        result = _b.sent();
                        expect(result.action).toEqual({ type: _UPDATE_, payload: false });
                        return [4 /*yield*/, adapter.getState().toPromise()];
                    case 2:
                        state = _b.sent();
                        expect(state.flag).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can dispatch array', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _UPDATE_, _FAILED_, result, state;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new _1.Wrapper().getActionKeysForSimplr('array'), _UPDATE_ = _a._UPDATE_, _FAILED_ = _a._FAILED_;
                        adapter.setInitialState(__assign({}, initialState));
                        return [4 /*yield*/, simplr.dispatch('array', function (state) { return state.concat(['c']); }).toPromise()];
                    case 1:
                        result = _b.sent();
                        expect(result.action).toEqual({ type: _UPDATE_, payload: ['a', 'b', 'c'] });
                        return [4 /*yield*/, adapter.getState().toPromise()];
                    case 2:
                        state = _b.sent();
                        expect(state.array).toEqual(['a', 'b', 'c']);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Adapter', function () {
        it('should create an instance', function () {
            expect(adapter).toBeTruthy();
        });
        it('should return a state as Observable', function () { return __awaiter(_this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adapter.setInitialState(__assign({}, initialState));
                        return [4 /*yield*/, adapter.getState().toPromise()];
                    case 1:
                        state = _a.sent();
                        expect(state).toEqual(initialState);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=basic.test.js.map