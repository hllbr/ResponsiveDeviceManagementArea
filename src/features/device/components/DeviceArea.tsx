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
    <section className="w-full h-full grid grid-rows-[auto_1fr] gap-4 p-4">
      {/* En üstte Header */}
      <DeviceHeader />
      {/* Altında iki kolonlu grid: DeviceScreen | DeviceActionButtonGroup */}
      <div className="w-full h-full grid grid-cols-[1fr_auto] gap-4 items-start">
        <DeviceScreen isRotated={isRotated} src={src} />
        <DeviceActionButtonGroup onRotate={onRotate} />
      </div>
    </section>
  );
};

export default DeviceArea;
