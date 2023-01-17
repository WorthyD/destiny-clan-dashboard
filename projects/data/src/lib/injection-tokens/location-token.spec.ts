import { locationProvider } from './location-token';
describe('LocationToken', () => {
  it('should be created', () => {
    expect(locationProvider).toBeTruthy();
  });
  it('should return window location', () => {
    expect(locationProvider()).toEqual(window.location);
  });
});
