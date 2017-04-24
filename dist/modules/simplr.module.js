"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var simplr_1 = require("../simplr");
var adapters_1 = require("../adapters");
var SimplrModule = (function () {
    function SimplrModule() {
    }
    SimplrModule.forRoot = function () {
        return {
            ngModule: SimplrModule,
            providers: [
                { provide: adapters_1.Adapter, useClass: adapters_1.AdapterForNgrxStore },
                simplr_1.Simplr,
            ]
        };
    };
    SimplrModule.forTesting = function () {
        return {
            ngModule: SimplrModule,
            providers: [
                { provide: adapters_1.Adapter, useClass: adapters_1.AdapterForTesting },
                simplr_1.Simplr,
            ]
        };
    };
    return SimplrModule;
}());
SimplrModule.decorators = [
    { type: core_1.NgModule, args: [{},] },
];
/** @nocollapse */
SimplrModule.ctorParameters = function () { return []; };
exports.SimplrModule = SimplrModule;
//# sourceMappingURL=simplr.module.js.map