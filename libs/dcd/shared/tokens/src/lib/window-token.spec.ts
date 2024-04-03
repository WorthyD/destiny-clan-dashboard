import { windowProvider } from './window-token';
describe('WindowToken', () => {
  it('should be created', () => {
    expect(windowProvider).toBeTruthy();
  });
  it('should return window ', () => {
    expect(windowProvider()).toEqual(window);
  });
});
