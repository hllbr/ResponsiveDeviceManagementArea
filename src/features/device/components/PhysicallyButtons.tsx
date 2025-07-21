import React from "react";

interface PhysicallyButtonsProps {
  width?: number;
}

const PhysicallyButtons: React.FC<PhysicallyButtonsProps> = ({ width }) => (
  <div
    className="bg-orange-200 rounded-lg text-orange-900 font-medium shadow h-10 flex items-center justify-center"
    style={{
      width: width ? width : "100%",

      maxHeight: "80px",
      maxWidth: "100%",
    }}
  >
    PhysicallyButtons
  </div>
);

export default PhysicallyButtons;
