import { ClassTypeTextPipe } from './class-type-text.pipe';

describe('ClassTypeTextPipe', () => {
  it('create an instance', () => {
    const pipe = new ClassTypeTextPipe();
    expect(pipe).toBeTruthy();
  });
  it('should convert to class text', () => {
    const pipe = new ClassTypeTextPipe();
    expect(pipe.transform(0)).toEqual('Titan');
    expect(pipe.transform(1)).toEqual('Hunter');
    expect(pipe.transform(2)).toEqual('Warlock');
  });
  it('should return empty string on bad type', () => {
    const pipe = new ClassTypeTextPipe();
    expect(pipe.transform(1000)).toEqual('');
  });

});
