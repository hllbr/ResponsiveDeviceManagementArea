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
      "grid md:grid-cols-2 grid-cols-1 gap-8 px-4 lg:px-8 pb-4 lg:pb-8 items-stretch";
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
        ) : selectedDevices.length === 2 ? (
          // 2 cihaz için responsive grid
          <main className={gridClass}>
            {selectedDevices.map((src) => (
              <DeviceArea
                key={src}
                isRotated={!!rotatedMap[src]}
                onRotate={() => handleRotate(src)}
                deviceType={deviceType}
                onDeviceTypeChange={setDeviceType}
                src={src}
                onPortraitHeight={undefined}
              />
            ))}
          </main>
        ) : selectedDevices.length === 3 ? (
          // 3 cihaz için: herhangi biri rotate ise 2+1, yoksa 3 yan yana
          anyRotated ? (
            <main className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 lg:px-8 pb-4 lg:pb-8 items-stretch">
              {/* Üst sıra */}
              <div className="md:col-span-1">
                <DeviceArea
                  key={selectedDevices[0]}
                  isRotated={!!rotatedMap[selectedDevices[0]]}
                  onRotate={() => handleRotate(selectedDevices[0])}
                  deviceType={deviceType}
                  onDeviceTypeChange={setDeviceType}
                  src={selectedDevices[0]}
                  onPortraitHeight={undefined}
                />
              </div>
              <div className="md:col-span-1">
                <DeviceArea
                  key={selectedDevices[1]}
                  isRotated={!!rotatedMap[selectedDevices[1]]}
                  onRotate={() => handleRotate(selectedDevices[1])}
                  deviceType={deviceType}
                  onDeviceTypeChange={setDeviceType}
                  src={selectedDevices[1]}
                  onPortraitHeight={undefined}
                />
              </div>
              {/* Alt sıra, sola hizalı */}
              <div className="md:col-span-1">
                <DeviceArea
                  key={selectedDevices[2]}
                  isRotated={!!rotatedMap[selectedDevices[2]]}
                  onRotate={() => handleRotate(selectedDevices[2])}
                  deviceType={deviceType}
                  onDeviceTypeChange={setDeviceType}
                  src={selectedDevices[2]}
                  onPortraitHeight={undefined}
                />
              </div>
            </main>
          ) : (
            <main className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8 px-4 lg:px-8 pb-4 lg:pb-8 items-stretch">
              {selectedDevices.map((src) => (
                <DeviceArea
                  key={src}
                  isRotated={!!rotatedMap[src]}
                  onRotate={() => handleRotate(src)}
                  deviceType={deviceType}
                  onDeviceTypeChange={setDeviceType}
                  src={src}
                  onPortraitHeight={undefined}
                />
              ))}
            </main>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Home;
