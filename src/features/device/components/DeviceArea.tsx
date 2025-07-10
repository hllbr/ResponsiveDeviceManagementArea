import React from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import PhysicallyButtons from "./PhysicallyButtons";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";

interface DeviceAreaProps {
  isRotated: boolean;
  onRotate: () => void;
}

const DeviceArea: React.FC<DeviceAreaProps> = ({ isRotated, onRotate }) => {

  return (
    <section className="flex-1 flex flex-col gap-4 w-full ml-0">
      <DeviceHeader />
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 flex-1 min-h-[50vh] lg:min-h-[220px]">
        <div className="flex flex-col w-full h-full min-w-0">
          <DeviceScreen isRotated={isRotated} />
          <PhysicallyButtons isRotated={isRotated} />
        </div>
        {/* Cihaz Eylemleri sadece desktop'ta gösterilir */}
        <div className="hidden lg:flex flex-shrink-0 min-h-[380px] max-h-[680px]">
          <DeviceActionButtonGroup onRotate={onRotate} />
        </div>
      </div>
    </section>
  );
};

export default DeviceArea;
