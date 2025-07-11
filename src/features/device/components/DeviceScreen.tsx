import React from "react";

interface DeviceScreenProps {
  width: number;
  height: number;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({ width, height }) => (
  <div
    className="bg-green-200 rounded-lg flex items-center justify-center text-green-900 font-medium shadow w-full"
    style={{ aspectRatio: `${width} / ${height}`, maxWidth: '100%', maxHeight: '80vh' }}
  >
    DeviceScreen
  </div>
);

export default DeviceScreen;
