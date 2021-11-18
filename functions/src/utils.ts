export function randomString(len: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (len === 0) return '';

  return Array(len)
    .join()
    .split(',')
    .map(() => alphabet.charAt(Math.floor(Math.random() * alphabet.length)))
    .join('');
}
