import React from "react";

interface DeviceScreenProps {
  isRotated: boolean;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({ isRotated }) => (
  <div 
    className={`bg-green-200 rounded-lg flex items-center justify-center text-green-900 font-medium shadow w-full ${
      isRotated 
        ? 'aspect-[16/9] min-h-[180px] max-h-[280px]' 
        : 'aspect-[9/16] min-h-[320px] max-h-[600px]'
    }`}
  >
    DeviceScreen {isRotated ? '(Yatay)' : '(Dikey)'}
  </div>
);

export default DeviceScreen; 