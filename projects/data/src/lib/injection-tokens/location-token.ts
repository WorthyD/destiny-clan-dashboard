import { InjectionToken } from '@angular/core';

export const LocationToken = new InjectionToken('Location');
export function locationProvider() {
  return window.location;
}
