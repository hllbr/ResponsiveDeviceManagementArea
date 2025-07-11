import { calculateDevicePixels } from '../utils/deviceCalculations';

export interface DeviceType {
  id: string;
  name: string;
  diagonalInch: number;
  aspectRatio: number; // width / height
  ppi: number;
}

export function getDevicePixels(device: DeviceType) {
  return calculateDevicePixels(device.diagonalInch, device.aspectRatio, device.ppi);
}

export const deviceTypes: DeviceType[] = [
  { id: 'default', name: 'Default Phone', diagonalInch: 6, aspectRatio: 9 / 16, ppi: 300 },
  { id: 'iphone-x', name: 'iPhone X', diagonalInch: 5.8, aspectRatio: 9 / 19.5, ppi: 458 },
  { id: 'samsung-tab', name: 'Samsung Tablet', diagonalInch: 10.1, aspectRatio: 16 / 10, ppi: 160 },
];
