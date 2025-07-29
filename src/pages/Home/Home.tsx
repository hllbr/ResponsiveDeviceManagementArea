import React, { useState } from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceInstance from "../../features/device/components/DeviceInstance";
import RightPanel from "../../features/device/components/RightPanel";
import ManageDeviceHeader from "../../features/device/components/ManageDeviceHeader";

const DEFAULT_DEVICES = ["/src/assets/diktel.jpg"];

const Home: React.FC = () => {
  const [deviceType, setDeviceType] = useState<"phone" | "tablet">("phone");
  const [selectedDevices, setSelectedDevices] =
    useState<string[]>(DEFAULT_DEVICES);
  const [rotatedMap, setRotatedMap] = useState<{ [src: string]: boolean }>({});
  const [singleIsRotated, setSingleIsRotated] = useState(false);

  const handleRotate = (src: string) => {
    setRotatedMap((prev) => ({ ...prev, [src]: !prev[src] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-[auto_1fr]">
      <Sidebar
        onDeviceSelect={setSelectedDevices}
        selectedDevices={selectedDevices}
      />
      <div className="flex flex-col min-w-0 h-screen">
        {/* Sabit DeviceDetails alanı */}
        <div className="flex-shrink-0 px-4 lg:px-8 ">
          <ManageDeviceHeader />
        </div>

        {/* Scroll edilebilir ana içerik alanı */}
        <div className="flex-1 overflow-y-auto overlfow-x-auto min-h-0">
          {/* Tekli görünüm */}
          {selectedDevices.length === 1 ? (
            <main className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-8 px-4 lg:px-8 pb-4  items-stretch">
              <div className="min-w-0 flex justify-center xl:justify-start">
                <DeviceInstance
                  isRotated={singleIsRotated}
                  onRotate={() => setSingleIsRotated((r) => !r)}
                  deviceType={deviceType}
                  onDeviceTypeChange={setDeviceType}
                  src={selectedDevices[0]}
                />
              </div>
              <div className="hidden md:block md:h-[88vh] min-w-0 flex items-stretch">
                {/* md:h-[calc(100vh-11rem)] */}
                <RightPanel />
              </div>
            </main>
          ) : selectedDevices.length > 1 ? (
            <main
              className={`flex ${
                selectedDevices.length === 2 &&
                selectedDevices.some((src) => rotatedMap[src])
                  ? "gap-24"
                  : selectedDevices.length === 3 &&
                    selectedDevices.some((src) => rotatedMap[src])
                  ? "gap-20"
                  : selectedDevices.length === 2
                  ? "justify-between gap-12"
                  : selectedDevices.length === 3
                  ? "justify-between gap-16"
                  : "gap-8"
              } px-4 lg:px-8 pb-4 lg:pb-8 items-stretch  min-h-0`}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {selectedDevices.map((src) => (
                <div
                  key={src}
                  className={
                    // **Burada shrink-0 ekledik**
                    (selectedDevices.length === 2 &&
                      selectedDevices.some((s) => rotatedMap[s])) ||
                    (selectedDevices.length === 3 &&
                      selectedDevices.some((s) => rotatedMap[s]))
                      ? "inline-block min-w-max shrink-0"
                      : selectedDevices.length === 2
                      ? "flex-1 basis-1/2 "
                      : selectedDevices.length === 3
                      ? "flex-1 basis-1/3 "
                      : "inline-block min-w-max"
                  }
                >
                  <DeviceInstance
                    isRotated={!!rotatedMap[src]}
                    onRotate={() => handleRotate(src)}
                    deviceType={deviceType}
                    onDeviceTypeChange={setDeviceType}
                    src={src}
                  />
                </div>
              ))}
            </main>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
