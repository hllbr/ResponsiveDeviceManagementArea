import React, { useState } from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceDetails from "../../features/deviceDetails/components/DeviceDetails";
import DeviceArea from "../../features/device/components/DeviceArea";
import RightPanel from "../../features/device/components/RightPanel";

const Home: React.FC = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [deviceType, setDeviceType] = useState<"phone" | "tablet">("phone");
  const [selectedDeviceSrc, setSelectedDeviceSrc] = useState<string>(
    "/src/assets/diktel.jpg"
  );

  // Portrait moddayken ölçülen yükseklik
  const [portraitHeight, setPortraitHeight] = useState<number>(0);

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-[auto_1fr]">
      <Sidebar onDeviceSelect={setSelectedDeviceSrc} />

      <div className="flex flex-col min-w-0">
        <div className="px-4 lg:px-8 pt-4 lg:pt-8">
          <DeviceDetails />
        </div>

        <main className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-8 px-4 lg:px-8 pb-4 lg:pb-8 items-stretch">
          {/* Sol panel */}
          <div className="min-w-0">
            <DeviceArea
              isRotated={isRotated}
              onRotate={handleRotate}
              deviceType={deviceType}
              onDeviceTypeChange={setDeviceType}
              src={selectedDeviceSrc}
              // Portrait mode’daki yüksekliği al
              onPortraitHeight={(h: number) => setPortraitHeight(h)}
            />
          </div>

          {/* Sağ panel */}
          <div className="hidden md:block min-w-0">
            <RightPanel fixedHeight={portraitHeight} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
