import { Action } from '@ngrx/store';
export { Action } from '@ngrx/store';
export interface SimplrOptions {
    logging?: boolean;
    timeout?: number;
    retry?: number;
}
export interface Result<T, K extends keyof T> {
    action: Action;
    state: T;
    partial: T[K];
}
