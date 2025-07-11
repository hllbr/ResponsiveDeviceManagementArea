import React from "react";

interface DeviceScreenProps {
  isRotated: boolean;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({ isRotated }) => (
  <div 
    className={`bg-green-200 rounded-lg flex items-center justify-center text-green-900 font-medium shadow w-full ${
      isRotated 
        ? 'aspect-[16/9] min-h-[25vh] max-h-[35vh]' 
        : 'aspect-[9/16] min-h-[40vh] max-h-[70vh]'
    }`}
  >
    DeviceScreen {isRotated ? '(Yatay)' : '(Dikey)'}
  </div>
);

export default DeviceScreen; 