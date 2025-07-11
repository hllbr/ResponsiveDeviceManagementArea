import React from "react";

interface PhysicallyButtonsProps {
  isRotated?: boolean;
  width?: number;
}

const PhysicallyButtons: React.FC<PhysicallyButtonsProps> = ({ isRotated = false, width }) => (
  <div
    className={`bg-orange-200 rounded-lg flex items-center justify-center text-orange-900 font-medium shadow ${
      isRotated ? 'h-16 min-h-[6vh] max-h-[7vh]' : 'h-20 min-h-[7vh] max-h-[9vh]'
    }`}
    style={width ? { width } : { width: '100%' }}
  >
    PhysicallyButtons
  </div>
);

export default PhysicallyButtons; 