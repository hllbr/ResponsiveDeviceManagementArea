import React from "react";

const Sidebar: React.FC = () => (
  <aside className="bg-blue-200 w-full lg:w-[4vw] lg:min-w-[44px] lg:max-w-[56px] h-auto lg:h-screen flex-shrink-0 flex flex-row lg:flex-col items-center py-4 lg:py-8 px-4 lg:px-0 shadow-lg">
    <div className="w-full lg:w-4/5 h-12 lg:h-56 bg-blue-400 rounded-lg flex items-center justify-center text-blue-900 font-bold text-sm lg:text-lg mb-0 lg:mb-4">
      <span className="lg:hidden">Sidebar</span>
      <div className="hidden lg:flex flex-col justify-center items-center">
        {"Sidebar".split("").map((char, idx) => (
          <span key={idx}>{char}</span>
        ))}
      </div>
    </div>
  </aside>
);

export default Sidebar; 