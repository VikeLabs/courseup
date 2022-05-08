import { randomString, formatTime } from '../utils';

describe('randomString', () => {
  it('should return a random string of length 12', () => {
    const rndm = randomString(12);
    expect(rndm).toHaveLength(12);
  });

  it('should return a random character for length 1', () => {
    const rndm = randomString(1);
    expect(rndm).toHaveLength(1);
  });

  it('should return an empty string when len is 0', () => {
    const rndm = randomString(0);
    expect(rndm).toStrictEqual('');
  });
});

describe('formatTime', () => {
  it('should return the correct time in the morning', () => {
    const t = formatTime('1130');
    expect(t).toStrictEqual('11:30 am');
  });

  it('should return the correct time in the morning for single digit hours', () => {
    const t = formatTime('0800');
    expect(t).toStrictEqual('8:00 am');
  });

  it('should return the correct time for midnight', () => {
    const t = formatTime('0000');
    expect(t).toStrictEqual('12:00 am');
  });

  it('should return the correct time in the afternoon', () => {
    const t = formatTime('1330');
    expect(t).toStrictEqual('1:30 pm');
  });

  it('should return the correct time in the evening for double digit hours', () => {
    const t = formatTime('2300');
    expect(t).toStrictEqual('11:00 pm');
  });

  it('should return the correct time for noon', () => {
    const t = formatTime('1200');
    expect(t).toStrictEqual('12:00 pm');
  });
});
