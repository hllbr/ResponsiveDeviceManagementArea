export function calculateDevicePixels(diagonalInch: number, aspectRatio: number, ppi: number) {
  const heightInch = Math.sqrt(Math.pow(diagonalInch, 2) / (Math.pow(aspectRatio, 2) + 1));
  const widthInch = heightInch * aspectRatio;
  const widthPx = Math.round(widthInch * ppi);
  const heightPx = Math.round(heightInch * ppi);
  return { widthPx, heightPx };
}
