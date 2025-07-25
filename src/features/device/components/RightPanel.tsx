import React from "react";

interface RightPanelProps {
  /** Sabitlenen portrait yüksekliği (px) */
  fixedHeight?: number;
}

const RightPanel: React.FC<RightPanelProps> = ({ fixedHeight }) => (
  <div
    className="bg-teal-200 rounded-lg grid place-items-center px-4 lg:px-6 py-4 lg:py-6 shadow-lg min-w-0"
    style={{
      height: fixedHeight ? `${fixedHeight}px` : undefined,
    }}
  >
    <div className="w-full h-full flex items-center justify-center text-teal-900 font-semibold text-lg lg:text-xl">
      Right Panel
    </div>
  </div>
);

export default RightPanel;
