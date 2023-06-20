import { RaceTypeTextPipe } from './race-type-text.pipe';

describe('RaceTypeTextPipe', () => {
  it('create an instance', () => {
    const pipe = new RaceTypeTextPipe();
    expect(pipe).toBeTruthy();
  });
  it('should convert to class text', () => {
    const pipe = new RaceTypeTextPipe();
    expect(pipe.transform(0)).toEqual('Human');
    expect(pipe.transform(1)).toEqual('Awoken');
    expect(pipe.transform(2)).toEqual('Exo');
  });
  it('should return empty string on bad type', () => {
    const pipe = new RaceTypeTextPipe();
    expect(pipe.transform(1000)).toEqual('');
  });
});
