export function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (str.charCodeAt(i) ^ i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

type RGB = [number, number, number];

export function hashToRGB(hash: number) {
  return Array.from({ length: 3 }).map(
    (_, idx) => parseInt(String(Math.abs(hash) / (256 ^ idx)), 10) % 256,
  ) as RGB;
}

export const inverseColor = (rgb: RGB) =>
  rgb.map((c) => (256 - c) % 256) as RGB;

export const textToRGB = (text: string) => hashToRGB(hashCode(text));
