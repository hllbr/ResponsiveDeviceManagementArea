import React from "react";

const Sidebar: React.FC = () => (
  <aside className="bg-blue-200 w-[12vw] min-w-[6vw] max-w-[9vw] lg:w-[4vw] lg:min-w-[5vw] lg:max-w-[7vw] min-h-screen sticky top-0 flex-shrink-0 flex flex-col items-center py-4 lg:py-8 px-2 lg:px-0 shadow-lg">
    <div className="w-4/5 h-32 lg:h-56 bg-blue-400 rounded-lg flex flex-col items-center justify-center text-blue-900 font-bold text-xs lg:text-lg mb-4">
      <div className="flex flex-col justify-center items-center">
        {"Sidebar".split("").map((char, idx) => (
          <span key={idx}>{char}</span>
        ))}
      </div>
    </div>
  </aside>
);

export default Sidebar; 