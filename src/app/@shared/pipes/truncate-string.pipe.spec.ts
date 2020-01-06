import { TruncateStringPipe } from './truncate-string.pipe';

describe('TruncateStringPipe', () => {

  it('should create an instance', () => {
    const pipe = new TruncateStringPipe();
    expect(pipe).toBeTruthy();
  });

  it('should correctly truncate a string over max length', () => {
    const pipe = new TruncateStringPipe();
    expect(pipe.transform('12345678910', 5)).toEqual('12345...');
  });

  it('should leave a string under max length unaltered', () => {
    const pipe = new TruncateStringPipe();
    expect(pipe.transform('12345678910', 11)).toEqual('12345678910');
  });

});
