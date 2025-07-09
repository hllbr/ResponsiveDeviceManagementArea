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
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-[50vh] lg:min-h-[220px]">
        <div className="flex flex-col flex-1 items-center min-w-0">
          <div className={`flex flex-col w-full ${isRotated ? 'max-w-[700px]' : 'max-w-[500px]'}`}>
            <DeviceScreen isRotated={isRotated} />
            <PhysicallyButtons />
          </div>
        </div>
        {/* Cihaz Eylemleri sadece desktop'ta gösterilir */}
        <div className="hidden lg:flex">
          <DeviceActionButtonGroup onRotate={onRotate} />
        </div>
      </div>
    </section>
  );
};

export default DeviceArea;
