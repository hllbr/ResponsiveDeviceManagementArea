import React from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceDetails from "../../features/deviceDetails/components/DeviceDetails";
import DeviceArea from "../../features/device/components/DeviceArea";
import RightPanel from "../../features/device/components/RightPanel";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <Sidebar />
      {/* Main Area (Header + Content) */}
      <div className="flex-1 flex flex-col px-4 lg:px-8 py-4 lg:py-8 gap-4 min-w-0">
        <DeviceDetails />
        {/* Main Content Row */}
        <main className="flex-1 flex flex-col xl:flex-row gap-4 lg:gap-8 min-h-0">
          {/* Sol Panel */}
          <DeviceArea />
          {/* Right Panel */}
          <RightPanel />
        </main>
      </div>
    </div>
  );
};

export default Home; 