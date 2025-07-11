import React from "react";
import { DeviceType } from "../../../data/deviceTypes";

interface SidebarProps {
  devices: DeviceType[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ devices, selectedId, onSelect }) => (
  <aside className="bg-blue-200 w-[12vw] min-w-[6vw] max-w-[9vw] lg:w-[4vw] lg:min-w-[5vw] lg:max-w-[7vw] min-h-screen sticky top-0 flex-shrink-0 flex flex-col items-center py-4 lg:py-8 px-2 lg:px-0 shadow-lg overflow-y-auto">
    <div className="w-full flex flex-col gap-2">
      {devices.map((d) => (
        <button
          key={d.id}
          onClick={() => onSelect(d.id)}
          className={`w-full text-xs lg:text-sm px-1 py-2 rounded-lg ${selectedId === d.id ? 'bg-blue-500 text-white' : 'bg-blue-400 text-blue-900'}`}
        >
          {d.name}
        </button>
      ))}
    </div>
  </aside>
);

export default Sidebar;
