import React from "react";

interface DeviceScreenProps {
  isRotated: boolean;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({ isRotated }) => (
  <div 
    className={`bg-green-200 rounded-lg flex items-center justify-center text-green-900 font-medium shadow ${
      isRotated 
        ? 'w-full h-48' 
        : 'w-full h-[600px]'
    }`}
  >
    DeviceScreen {isRotated ? '(Yatay)' : '(Dikey)'}
  </div>
);

export default DeviceScreen; 