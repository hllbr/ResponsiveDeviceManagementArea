import React from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import PhysicallyButtons from "./PhysicallyButtons";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";
import { DeviceType, getDevicePixels } from "../../../data/deviceTypes";

interface DeviceAreaProps {
  device: DeviceType;
  isRotated: boolean;
  onRotate: () => void;
}

const DeviceArea: React.FC<DeviceAreaProps> = ({ device, isRotated, onRotate }) => {
  const { widthPx, heightPx } = getDevicePixels(device);
  const screenWidth = isRotated ? heightPx : widthPx;
  const screenHeight = isRotated ? widthPx : heightPx;

  return (
    <section className="flex-1 flex flex-col gap-4 mx-auto" style={{ width: screenWidth }}>
      <DeviceHeader device={device} />
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 flex-1 items-stretch">
        <div className="flex flex-col items-center w-full h-full min-w-0">
          <DeviceScreen width={screenWidth} height={screenHeight} />
          <PhysicallyButtons width={screenWidth} isRotated={isRotated} />
        </div>
        <div className="hidden lg:flex flex-shrink-0">
          <DeviceActionButtonGroup onRotate={onRotate} />
        </div>
      </div>
    </section>
  );
};

export default DeviceArea;
