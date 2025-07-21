import React, { useRef, useEffect } from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";
import PhysicallyButtons from "./PhysicallyButtons";

interface DeviceAreaProps {
  isRotated: boolean;
  onRotate: () => void;
  src?: string;
  deviceType: "phone" | "tablet";
  onDeviceTypeChange: (type: "phone" | "tablet") => void;
  /** Portrait modda ölçülen yüksekliği bildirir */
  onPortraitHeight?: (height: number) => void;
}

const DeviceArea: React.FC<DeviceAreaProps> = ({
  isRotated,
  onRotate,
  src,
  deviceType,
  onDeviceTypeChange,
  onPortraitHeight,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measurePortrait = () => {
      if (!isRotated && wrapperRef.current && onPortraitHeight) {
        const h = wrapperRef.current.getBoundingClientRect().height;
        onPortraitHeight(h);
      }
    };
    // Mount ve src değiştiğinde ölç
    measurePortrait();
    // Ekran yeniden boyutlandığında da ölç
    window.addEventListener("resize", measurePortrait);
    return () => window.removeEventListener("resize", measurePortrait);
  }, [isRotated, src, onPortraitHeight]);

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

export default DeviceArea;
