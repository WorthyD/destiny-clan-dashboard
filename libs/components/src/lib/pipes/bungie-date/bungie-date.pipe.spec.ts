import { BungieDatePipe } from './bungie-date.pipe';

describe('BungieDatePipe', () => {
  it('create an instance', () => {
    const pipe = new BungieDatePipe('en-us');
    expect(pipe).toBeTruthy();
  });
});
