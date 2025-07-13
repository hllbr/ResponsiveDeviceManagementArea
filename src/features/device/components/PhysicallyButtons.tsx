import React from "react";

interface PhysicallyButtonsProps {
  isRotated?: boolean;
 
}

const PhysicallyButtons: React.FC<PhysicallyButtonsProps> = ({ isRotated = false }) => (
  <div
    className={`bg-orange-200 rounded-lg flex items-center justify-center text-orange-900 font-medium shadow ${
      isRotated ? 'h-16 min-h-[6vh] max-h-[7vh]' : 'h-20 min-h-[7vh] max-h-[9vh]'
    }`}
  >
    PhysicallyButtons
  </div>
);

export default PhysicallyButtons; 