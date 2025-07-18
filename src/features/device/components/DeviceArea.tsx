import React from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";

interface DeviceAreaProps {
  isRotated: boolean;
  onRotate: () => void;
  src?: string; // cihaz görseli için opsiyonel prop
  deviceType: "phone" | "tablet";
  onDeviceTypeChange: (type: "phone" | "tablet") => void;
}

const DeviceArea: React.FC<DeviceAreaProps> = ({
  isRotated,
  onRotate,
  src,
  deviceType,
  onDeviceTypeChange,
}) => {
  return (
    <section className="h-full ">
      <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_auto] gap-y-4 gap-x-2 items-center w-fit max-w-full">
        {/* Header, iki kolonun toplamı kadar genişlikte */}
        <div className="col-span-2 w-full">
          <DeviceHeader />
        </div>
        {/* Altında iki kolonlu grid: DeviceScreen | DeviceActionButtonGroup */}
        <DeviceScreen isRotated={isRotated} src={src as string} />
        <DeviceActionButtonGroup onRotate={onRotate} />
      </div>
    </section>
  );
};

export default DeviceArea;
