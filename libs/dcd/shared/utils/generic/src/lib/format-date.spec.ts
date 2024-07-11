import { formatDate } from './format-date';

describe('Format Date', () => {
  it('should format a string', () => {
    expect(formatDate('1-2-1900')).toEqual('1900-01-02');
  });

  it('should format number', () => {
    const d = new Date('1-2-1900').getTime();
    expect(formatDate(d)).toEqual('1900-01-02');
  });

  it('should format date', () => {
    const d = new Date('1-2-1900');
    expect(formatDate(d)).toEqual('1900-01-02');
  });
});
