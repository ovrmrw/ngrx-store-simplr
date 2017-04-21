import { OpaqueToken } from '@angular/core'


export interface Options {
  logging?: boolean;
  timeout?: number;
  retry?: number;
}


export const SimplrOptions = new OpaqueToken('Token Simplr Options');
