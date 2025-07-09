import React from "react";

interface PhysicallyButtonsProps {
  isRotated?: boolean;
}

const PhysicallyButtons: React.FC<PhysicallyButtonsProps> = ({ isRotated = false }) => (
  <div className={`bg-orange-200 rounded-lg w-full flex items-center justify-center text-orange-900 font-medium shadow ${
    isRotated ? 'h-16 min-h-[50px] max-h-[60px]' : 'h-20 min-h-[60px] max-h-[80px]'
  }`}>
    PhysicallyButtons
  </div>
);

export default PhysicallyButtons; 