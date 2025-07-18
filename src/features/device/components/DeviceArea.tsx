import React, { useRef, useState, useEffect } from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";
import PhysicallyButtons from "./PhysicallyButtons";

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
  const screenWrapperRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (screenWrapperRef.current) {
      setScreenWidth(screenWrapperRef.current.offsetWidth);
    }
  }, [isRotated, src]);

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
            <div className="w-full flex flex-col items-center">
              <DeviceScreen
                isRotated={isRotated}
                src={src as string}
                onWidthChange={setScreenWidth}
              />
              <div style={{ width: screenWidth }}>
                <PhysicallyButtons width={screenWidth} />
              </div>
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
            <div className="flex flex-col items-center w-full">
              <DeviceScreen
                isRotated={isRotated}
                src={src as string}
                onWidthChange={setScreenWidth}
              />
              <div style={{ width: screenWidth }}>
                <PhysicallyButtons width={screenWidth} />
              </div>
            </div>
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
