import React from "react";

function App() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-200 w-[18vw] min-w-[180px] max-w-[300px] flex-shrink-0 flex flex-col items-center py-8 shadow-lg">
        <div className="w-4/5 h-16 bg-blue-400 rounded-lg flex items-center justify-center text-blue-900 font-bold text-lg mb-4">
          Sidebar
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-row px-8 py-8 gap-8">
        {/* Left Panel */}
        <section className="flex-1 flex flex-col gap-4">
          {/* Device Details Header */}
          <div className="bg-purple-200 rounded-lg h-12 flex items-center px-6 text-purple-900 font-semibold text-lg shadow">
            Device Details
          </div>

          {/* Device Image Placeholder */}
          <div className="bg-pink-200 rounded-lg flex-1 min-h-[220px] flex items-center justify-center text-pink-900 font-semibold text-xl shadow">
            Device Image Area
          </div>

          {/* 3 Small Boxes */}
          <div className="flex flex-row gap-4 h-20">
            <div className="flex-1 bg-green-200 rounded-lg flex items-center justify-center text-green-900 font-medium shadow">
              DeviceScreen
            </div>
            <div className="flex-1 bg-yellow-200 rounded-lg flex items-center justify-center text-yellow-900 font-medium shadow">
              DeviceActionButtonGroup
            </div>
            <div className="flex-1 bg-orange-200 rounded-lg flex items-center justify-center text-orange-900 font-medium shadow">
              PhysicallyButtons
            </div>
          </div>

          {/* Device Header */}
          <div className="bg-indigo-200 rounded-lg h-12 flex items-center px-6 text-indigo-900 font-semibold text-lg shadow">
            DeviceHeader
          </div>
        </section>

        {/* Right Panel */}
        <aside className="w-[38vw] min-w-[320px] max-w-[500px] bg-teal-200 rounded-lg flex flex-col items-center px-6 py-6 shadow-lg">
          <div className="w-full h-full flex items-center justify-center text-teal-900 font-semibold text-xl">
            Right Panel
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
