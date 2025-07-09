import React, { useState } from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import PhysicallyButtons from "./PhysicallyButtons";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";

const DeviceArea: React.FC = () => {
  const [isRotated, setIsRotated] = useState(false);

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  return (
    <section className="flex-1 flex flex-col gap-4 w-full max-w-[90vw] lg:max-w-[600px] ml-0">
      <DeviceHeader />
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-[50vh] lg:min-h-[220px]">
        <div className="flex flex-col flex-1 items-center min-w-0">
          <div className="flex flex-col w-full max-w-[500px]">
            <DeviceScreen isRotated={isRotated} />
            <PhysicallyButtons />
          </div>
        </div>
        <DeviceActionButtonGroup onRotate={handleRotate} />
      </div>
    </section>
  );
};

export default DeviceArea;
