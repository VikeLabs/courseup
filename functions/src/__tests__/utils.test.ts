import { randomString } from '../utils';

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
