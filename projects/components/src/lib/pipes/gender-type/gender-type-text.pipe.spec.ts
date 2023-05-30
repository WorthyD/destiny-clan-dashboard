import { GenderTypeTextPipe } from './gender-type-text.pipe';

describe('GenderTypeTextPipe', () => {
  it('create an instance', () => {
    const pipe = new GenderTypeTextPipe();
    expect(pipe).toBeTruthy();
  });
  it('should convert to class text', () => {
    const pipe = new GenderTypeTextPipe();
    expect(pipe.transform(0)).toEqual('Male');
    expect(pipe.transform(1)).toEqual('Female');
  });
  it('should return empty string on bad type', () => {
    const pipe = new GenderTypeTextPipe();
    expect(pipe.transform(1000)).toEqual('');
  });
});
