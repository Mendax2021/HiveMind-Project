export function generateRandomTempId(): number {
  const seed = Date.now();
  return Math.floor(Math.abs(Math.sin(seed) * 1000000));
}
