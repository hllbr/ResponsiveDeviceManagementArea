import React from "react";

interface PhysicallyButtonsProps {
  width: number;
  isRotated?: boolean;
}

const PhysicallyButtons: React.FC<PhysicallyButtonsProps> = ({ width, isRotated = false }) => (
  <div
    className={`bg-orange-200 rounded-lg flex items-center justify-center text-orange-900 font-medium shadow ${isRotated ? 'h-16' : 'h-20'}`}
    style={{ width, maxWidth: '100%' }}
  >
    PhysicallyButtons
  </div>
);

export default PhysicallyButtons;
