import React from "react";
import Sidebar from "../../features/sidebar/components/Sidebar";
import DeviceDetails from "../../features/deviceDetails/components/DeviceDetails";
import DeviceArea from "../../features/device/components/DeviceArea";
import RightPanel from "../../features/device/components/RightPanel";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      {/* Main Area (Header + Content) */}
      <div className="flex-1 flex flex-col px-8 py-8 gap-4">
        <DeviceDetails />
        {/* Main Content Row */}
        <main className="flex-1 flex flex-row gap-8">
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