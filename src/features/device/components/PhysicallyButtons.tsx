import React from "react";

interface PhysicallyButtonsProps {
  isRotated?: boolean;
}

const PhysicallyButtons: React.FC<PhysicallyButtonsProps> = ({ isRotated = false }) => (
  <div className="bg-orange-200 rounded-lg w-full min-h-[60px] max-h-[80px] h-20 flex items-center justify-center text-orange-900 font-medium shadow">
    PhysicallyButtons
  </div>
);

export default PhysicallyButtons; 