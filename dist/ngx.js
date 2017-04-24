"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Injectable, Provider, OpaqueToken, InjectionToken, NgModule, ModuleWithProviders } from '@angular/core'
// import { Store } from '@ngrx/store'
var simplr_1 = require("./simplr");
var adapters_1 = require("./adapters");
// export function createSimplr(store): any {
//   return new Simplr(store)
// };
/**
 * DEPRECATED
 */
function provideSimplr() {
    return [
        { provide: adapters_1.Adapter, useClass: adapters_1.AdapterForNgrxStore },
        simplr_1.Simplr,
    ];
}
exports.provideSimplr = provideSimplr;
/**
 * DEPRECATED
 */
function provideSimplrForTesting() {
    return [
        { provide: adapters_1.Adapter, useClass: adapters_1.AdapterForTesting },
        simplr_1.Simplr,
    ];
}
exports.provideSimplrForTesting = provideSimplrForTesting;
//# sourceMappingURL=ngx.js.map