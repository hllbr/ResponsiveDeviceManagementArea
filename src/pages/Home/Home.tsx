import React, { useState } from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceDetails from "../../features/deviceDetails/components/DeviceDetails";
import DeviceArea from "../../features/device/components/DeviceArea";
import RightPanel from "../../features/device/components/RightPanel";

const Home: React.FC = () => {
  const [isRotated, setIsRotated] = useState(false);

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="h-screen flex flex-row bg-gray-100 overflow-hidden">
      <Sidebar />
      {/* Main Area (Header + Content) */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <div className="flex-shrink-0 px-4 lg:px-8 pt-4 lg:pt-8">
          <DeviceDetails />
        </div>
        {/* Main Content Row - Scrollable */}
        <main className="flex-1 flex flex-col xl:flex-row gap-4 lg:gap-8 px-4 lg:px-8 pb-4 lg:pb-8 overflow-auto">
          {/* Sol Panel - Rotasyona göre hafif oransal değişim */}
          <div className={`${isRotated ? 'xl:flex-[6]' : 'xl:flex-[5]'} flex flex-col`}>
            <DeviceArea isRotated={isRotated} onRotate={handleRotate} />
          </div>
          {/* Right Panel - Rotasyona göre hafif oransal değişim */}
          <div className={`${isRotated ? 'xl:flex-[5]' : 'xl:flex-[6]'} flex flex-col`}>
            <RightPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home; 