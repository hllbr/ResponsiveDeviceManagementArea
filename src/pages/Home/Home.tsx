import React, { useState } from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceDetails from "../../features/deviceDetails/components/DeviceDetails";
import DeviceArea from "../../features/device/components/DeviceArea";
import RightPanel from "../../features/device/components/RightPanel";

const DEFAULT_DEVICES = ["/src/assets/diktel.jpg"];

const Home: React.FC = () => {
  const [deviceType, setDeviceType] = useState<"phone" | "tablet">("phone");
  const [selectedDevices, setSelectedDevices] =
    useState<string[]>(DEFAULT_DEVICES);
  const [portraitHeight, setPortraitHeight] = useState<number>(0);
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
      <div className="flex flex-col min-w-0">
        <div className="px-4 lg:px-8 pt-2">
          <DeviceDetails />
        </div>

        {/* Tekli görünüm */}
        {selectedDevices.length === 1 ? (
          <main
            className="flex gap-8 px-4 lg:px-8 pb-4 lg:pb-8 items-stretch overflow-x-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="min-w-[375px] flex-shrink-0">
              <DeviceArea
                isRotated={singleIsRotated}
                onRotate={() => setSingleIsRotated((r) => !r)}
                deviceType={deviceType}
                onDeviceTypeChange={setDeviceType}
                src={selectedDevices[0]}
                onPortraitHeight={(h: number) => setPortraitHeight(h)}
              />
            </div>
            <div className="flex-1 min-w-[600px]">
              <RightPanel fixedHeight={portraitHeight} />
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
            } px-4 lg:px-8 pb-4 lg:pb-8 items-stretch overflow-x-auto`}
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
                <DeviceArea
                  isRotated={!!rotatedMap[src]}
                  onRotate={() => handleRotate(src)}
                  deviceType={deviceType}
                  onDeviceTypeChange={setDeviceType}
                  src={src}
                  onPortraitHeight={undefined}
                />
              </div>
            ))}
          </main>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
