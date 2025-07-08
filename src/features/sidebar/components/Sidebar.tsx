import React from "react";

const Sidebar: React.FC = () => (
  <aside className="bg-blue-200 w-[4vw] min-w-[44px] max-w-[56px] flex-shrink-0 flex flex-col items-center py-8 shadow-lg">
    <div className="w-4/5 h-16 bg-blue-400 rounded-lg flex items-center justify-center text-blue-900 font-bold text-lg mb-4" style={{height: '220px', width: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {"Sidebar".split("").map((char, idx) => (
        <span key={idx}>{char}</span>
      ))}
    </div>
  </aside>
);

export default Sidebar; 