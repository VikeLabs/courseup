export function isValidAccessKey(key: string): boolean {
  // if the key isnt defined in the env, then it is invalid
  return key === process.env.ACCESS_KEY;
}
