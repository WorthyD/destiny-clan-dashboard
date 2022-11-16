import { BungieDateTimePipe } from './bungie-date-time.pipe';

describe('BungieDateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new BungieDateTimePipe('en-US');
    expect(pipe).toBeTruthy();
  });
});
