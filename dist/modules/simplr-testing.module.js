"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var simplr_1 = require("../simplr");
var adapters_1 = require("../adapters");
/**
 * DEPRECATED
 */
var SimplrTestingModule = (function () {
    function SimplrTestingModule() {
    }
    return SimplrTestingModule;
}());
SimplrTestingModule.decorators = [
    { type: core_1.NgModule, args: [{
                providers: [
                    { provide: adapters_1.Adapter, useClass: adapters_1.AdapterForTesting },
                    simplr_1.Simplr,
                ]
            },] },
];
/** @nocollapse */
SimplrTestingModule.ctorParameters = function () { return []; };
exports.SimplrTestingModule = SimplrTestingModule;
//# sourceMappingURL=simplr-testing.module.js.map