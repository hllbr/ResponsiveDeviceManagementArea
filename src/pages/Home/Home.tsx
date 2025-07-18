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

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-[auto_1fr]">
      <Sidebar onDeviceSelect={setSelectedDeviceSrc} />
      {/* Main Area (Header + Content) */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-shrink-0 px-4 lg:px-8 pt-4 lg:pt-8">
          <DeviceDetails />
        </div>
        {/* Main Content Row */}
        <main className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-8 px-4 lg:px-8 pb-4 lg:pb-8 flex-1 items-stretch h-full">
          {/* Sol Panel - DeviceArea */}
          <div className="flex flex-col h-full min-w-0">
            <DeviceArea
              isRotated={isRotated}
              onRotate={handleRotate}
              deviceType={deviceType}
              onDeviceTypeChange={setDeviceType}
              src={selectedDeviceSrc}
            />
          </div>
          {/* Sağ Panel - RightPanel */}
          <div className="hidden md:flex flex-col h-full min-w-0">
            <RightPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
