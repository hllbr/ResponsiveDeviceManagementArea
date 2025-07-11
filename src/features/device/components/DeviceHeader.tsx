import React from "react";
import { DeviceType } from "../../../data/deviceTypes";

interface DeviceHeaderProps {
  device: DeviceType;
}

const DeviceHeader: React.FC<DeviceHeaderProps> = ({ device }) => (
  <div className="bg-indigo-200 rounded-lg min-h-[6vh] h-12 lg:h-14 w-full flex items-center px-4 lg:px-6 text-indigo-900 font-semibold text-base lg:text-lg shadow">
    {device.name}
  </div>
);

export default DeviceHeader;
