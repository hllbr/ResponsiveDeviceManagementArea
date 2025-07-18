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
      <div
        className={
          isRotated
            ? "grid grid-rows-[auto_1fr_auto] grid-cols-1 gap-y-4 items-center w-fit max-w-full"
            : "grid grid-rows-[auto_1fr] grid-cols-[auto_auto] gap-y-4 gap-x-2 items-center w-fit max-w-full"
        }
      >
        {/* Header, her iki modda da üstte ve tam genişlikte */}
        <div
          className={
            isRotated ? "row-span-1 col-span-1 w-full" : "col-span-2 w-full"
          }
        >
          <DeviceHeader />
        </div>
        {/* Ekran ve butonlar: yatayda alt alta, dikeyde yan yana */}
        {isRotated ? (
          <>
            <div className="w-full flex justify-center">
              <DeviceScreen isRotated={isRotated} src={src as string} />
            </div>
            <div className="w-full flex justify-center">
              <DeviceActionButtonGroup
                onRotate={onRotate}
                isRotated={isRotated}
              />
            </div>
          </>
        ) : (
          <>
            <DeviceScreen isRotated={isRotated} src={src as string} />
            <DeviceActionButtonGroup
              onRotate={onRotate}
              isRotated={isRotated}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default DeviceArea;
