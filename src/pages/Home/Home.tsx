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

  // Responsive grid class for 2 devices
  let gridClass = "";
  if (selectedDevices.length === 2) {
    gridClass =
      "grid md:grid-cols-2 grid-cols-1 gap-12 px-4 lg:px-8 pb-4 lg:pb-8 items-stretch";
  }

  const handleRotate = (src: string) => {
    setRotatedMap((prev) => ({ ...prev, [src]: !prev[src] }));
  };

  // 3 cihazda: herhangi biri rotate ise 2+1, hiçbiri rotate değilse 3 yan yana
  let anyRotated = false;
  if (selectedDevices.length === 3) {
    anyRotated = selectedDevices.some((src) => !!rotatedMap[src]);
  }

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-[auto_1fr]">
      <Sidebar
        onDeviceSelect={setSelectedDevices}
        selectedDevices={selectedDevices}
      />
      <div className="flex flex-col min-w-0">
        <div className="px-4 lg:px-8 pt-4 lg:pt-8">
          <DeviceDetails />
        </div>
        {/* Tekli görünüm: eski yapı */}
        {selectedDevices.length === 1 ? (
          <main className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-8 px-4 lg:px-8 pb-4 lg:pb-8 items-stretch">
            {/* Sol panel */}
            <div className="min-w-0">
              <DeviceArea
                isRotated={singleIsRotated}
                onRotate={() => setSingleIsRotated((r) => !r)}
                deviceType={deviceType}
                onDeviceTypeChange={setDeviceType}
                src={selectedDevices[0]}
                onPortraitHeight={(h: number) => setPortraitHeight(h)}
              />
            </div>
            {/* Sağ panel */}
            <div className="hidden md:block min-w-0">
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
                  selectedDevices.length === 2 &&
                  selectedDevices.some((src) => rotatedMap[src])
                    ? "inline-block min-w-max"
                    : selectedDevices.length === 3 &&
                      selectedDevices.some((src) => rotatedMap[src])
                    ? "inline-block min-w-max"
                    : selectedDevices.length === 2
                    ? "flex-1 basis-1/2 max-w-[50%] min-w-[320px]"
                    : selectedDevices.length === 3
                    ? "flex-1 basis-1/3 max-w-[33.333%] min-w-[320px]"
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
