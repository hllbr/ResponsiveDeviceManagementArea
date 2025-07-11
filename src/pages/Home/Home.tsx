import React, { useState } from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceDetails from "../../features/deviceDetails/components/DeviceDetails";
import DeviceArea from "../../features/device/components/DeviceArea";
import RightPanel from "../../features/device/components/RightPanel";
import { deviceTypes } from "../../data/deviceTypes";

const Home: React.FC = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [selectedId, setSelectedId] = useState(deviceTypes[0].id);

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  const handleSelectDevice = (id: string) => {
    setSelectedId(id);
  };

  const selectedDevice = deviceTypes.find((d) => d.id === selectedId)!;

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <Sidebar devices={deviceTypes} selectedId={selectedId} onSelect={handleSelectDevice} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-shrink-0 px-4 lg:px-8 pt-4 lg:pt-8">
          <DeviceDetails />
        </div>
        <main className="flex flex-col xl:flex-row gap-8 px-4 lg:px-8 pb-4 lg:pb-8 flex-1 items-stretch h-full">
          <div className={`${isRotated ? 'xl:flex-[6]' : 'xl:flex-[5]'} flex flex-col h-full`}>
            <DeviceArea device={selectedDevice} isRotated={isRotated} onRotate={handleRotate} />
          </div>
          <div className={`${isRotated ? 'xl:flex-[5]' : 'xl:flex-[6]'} hidden md:flex flex-col h-full`}>
            <RightPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
