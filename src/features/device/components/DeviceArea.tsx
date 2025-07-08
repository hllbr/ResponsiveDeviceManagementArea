import React from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import PhysicallyButtons from "./PhysicallyButtons";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";

const DeviceArea: React.FC = () => (
  <section className="flex-1 flex flex-col gap-4">
    <DeviceHeader />
    <div className="flex flex-row gap-4 flex-1 min-h-[220px]">
      <div className="flex flex-col flex-1">
        <DeviceScreen />
        <PhysicallyButtons />
      </div>
      <DeviceActionButtonGroup />
    </div>
  </section>
);

export default DeviceArea; 