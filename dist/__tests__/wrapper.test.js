"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var testReducers = {
    timestamp: null,
    counter: null,
    flag: null,
    array: null,
};
describe('Wrapper Test', function () {
    var wrapper;
    beforeEach(function () {
        wrapper = new _1.Wrapper();
    });
    describe('Wrapper', function () {
        it('should create an instance', function () {
            expect(wrapper).toBeTruthy();
        });
        describe('mergeReducersIntoWrappedReducers', function () {
            it('created reducer has the same keys with the argument reducer', function () {
                var reducer = wrapper.mergeReducersIntoWrappedReducers(testReducers);
                var keys = Object.keys(reducer);
                expect(keys).toEqual(['timestamp', 'counter', 'flag', 'array']);
            });
            it('created reducer has replaced as wrapped reducer for each keys', function () {
                var reducer = wrapper.mergeReducersIntoWrappedReducers(testReducers);
                Object.keys(reducer).forEach(function (key) {
                    var func = reducer[key];
                    expect(func).toBeInstanceOf(Function);
                    expect(func.name).toBe('outerReducer');
                });
            });
        });
    });
});
//# sourceMappingURL=wrapper.test.js.map