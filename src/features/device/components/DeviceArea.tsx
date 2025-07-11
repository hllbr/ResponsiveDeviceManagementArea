import React from "react";
import DeviceHeader from "./DeviceHeader";
import DeviceScreen from "./DeviceScreen";
import PhysicallyButtons from "./PhysicallyButtons";
import DeviceActionButtonGroup from "./DeviceActionButtonGroup";

interface DeviceAreaProps {
  isRotated: boolean;
  onRotate: () => void;
  src?: string; // cihaz görseli için opsiyonel prop
}

const DeviceArea: React.FC<DeviceAreaProps> = ({ isRotated, onRotate, src }) => {
  // Artık genişlik state'i ve PhysicallyButtons gerekmiyor
  return (
    <section className={`flex-1 flex flex-col gap-4 w-full ml-0 mx-auto ${isRotated ? 'max-w-[70vw]' : 'max-w-[40vw]'}`}>
      <DeviceHeader />
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 flex-1 min-h-[50vh] lg:min-h-[25vh] h-full items-stretch">
        <div className={`flex flex-col items-center w-full h-full min-w-0 ${isRotated ? 'aspect-[16/9] min-w-[30vw] max-w-[40vw] h-auto' : 'aspect-[9/16] min-h-[40vh] max-h-[70vh]'}`}>
          <DeviceScreen isRotated={isRotated} src={src} />
        </div>
        {/* Cihaz Eylemleri sadece desktop'ta gösterilir */}
        <div className="hidden lg:flex flex-shrink-0 min-h-[50vh] max-h-[80vh] h-full">
          <DeviceActionButtonGroup onRotate={onRotate} />
        </div>
      </div>
    </section>
  );
};

export default DeviceArea;
