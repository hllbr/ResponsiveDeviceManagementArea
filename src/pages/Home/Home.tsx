import React, { useState } from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceDetails from "../../features/deviceDetails/components/DeviceDetails";
import DeviceArea from "../../features/device/components/DeviceArea";
import RightPanel from "../../features/device/components/RightPanel";

const Home: React.FC = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [deviceType, setDeviceType] = useState<"phone" | "tablet">("phone");
  const [selectedDeviceSrc, setSelectedDeviceSrc] = useState<string>("/src/assets/diktel.jpg");

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <Sidebar onDeviceSelect={setSelectedDeviceSrc} />
      {/* Main Area (Header + Content) */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-shrink-0 px-4 lg:px-8 pt-4 lg:pt-8">
          <DeviceDetails />
        </div>
        {/* Main Content Row */}
        <main className="flex flex-col xl:flex-row gap-8 px-4 lg:px-8 pb-4 lg:pb-8 flex-1 items-stretch h-full">
          {/* Sol Panel - Rotasyona göre hafif oransal değişim */}
          <div className={`${deviceType === "tablet" ? (isRotated ? "xl:flex-[8]" : "xl:flex-[7]") : (isRotated ? "xl:flex-[6]" : "xl:flex-[5]")} flex flex-col h-full`}>
            <DeviceArea isRotated={isRotated} onRotate={handleRotate} deviceType={deviceType} onDeviceTypeChange={setDeviceType} src={selectedDeviceSrc} />
          </div>
          {/* Right Panel - Rotasyona göre hafif oransal değişim - Sadece büyük ekranlarda */}
          <div className={`${deviceType === "tablet" ? (isRotated ? "xl:flex-[4]" : "xl:flex-[5]") : (isRotated ? "xl:flex-[5]" : "xl:flex-[6]")} hidden md:flex flex-col h-full`}>
            <RightPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home; 