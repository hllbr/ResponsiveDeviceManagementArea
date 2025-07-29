import React, { useRef, useEffect } from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";
import PhysicallyButtons from "./PhysicallyButtons";

interface DeviceInstanceProps {
  isRotated: boolean;
  onRotate: () => void;
  src?: string;
  deviceType: "phone" | "tablet";
  onDeviceTypeChange: (type: "phone" | "tablet") => void;
}

const DeviceInstance: React.FC<DeviceInstanceProps> = ({
  isRotated,
  onRotate,
  src,
  deviceType,
  onDeviceTypeChange,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={wrapperRef}>
      <div
        className={
          isRotated
            ? "grid grid-rows-[auto_1fr_auto] grid-cols-1 gap-y-4 items-center w-fit max-w-full"
            : "grid grid-rows-[auto_1fr] grid-cols-[auto_auto] gap-y-4 gap-x-2 items-center w-fit max-w-full"
        }
      >
        {/* Header */}
        <div
          className={
            isRotated ? "row-span-1 col-span-1 w-full" : "col-span-2 w-full"
          }
        >
          <DeviceHeader />
        </div>

        {/* Screen & Buttons */}
        {isRotated ? (
          <>
            <div className="w-full flex flex-col items-center">
              <DeviceScreen
                isRotated={isRotated}
                src={src as string}
                onWidthChange={() => {}}
              />
              <PhysicallyButtons width={0} />
            </div>
            <div className="w-full flex justify-center">
              <DeviceActionButtonGroup onRotate={onRotate} isRotated />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center w-full">
              <DeviceScreen
                isRotated={isRotated}
                src={src as string}
                onWidthChange={() => {}}
              />
              <PhysicallyButtons width={0} />
            </div>
            <DeviceActionButtonGroup onRotate={onRotate} isRotated={false} />
          </>
        )}
      </div>
    </section>
  );
};

export default DeviceInstance;
