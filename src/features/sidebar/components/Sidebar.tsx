import React, { useState } from "react";

interface SidebarProps {
  onDeviceSelect?: (srcs: string[]) => void;
  selectedDevices?: string[];
}

const deviceIcons = [
  { src: "/src/assets/phone.jpg", label: "Phone" },
  { src: "/src/assets/device1.jpg", label: "Device1" },
  { src: "/src/assets/diktel.jpg", label: "Diktel" },
  { src: "/src/assets/farmdev-tablet.jpg", label: "Device2" },
  { src: "/src/assets/huawei-tablet.jpg", label: "Device3" },
];

function getCombinations(arr: any[], k: number) {
  const results: any[][] = [];
  function helper(start: number, combo: any[]) {
    if (combo.length === k) {
      results.push(combo);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      helper(i + 1, [...combo, arr[i]]);
    }
  }
  helper(0, []);
  return results;
}

const singleCombos = deviceIcons.map((d) => [d]);
const doubleCombos = getCombinations(deviceIcons, 2);
const tripleCombos = getCombinations(deviceIcons, 3);
const quadrupleCombos = getCombinations(deviceIcons, 4);
const quintupleCombos = getCombinations(deviceIcons, 5);

const Sidebar: React.FC<SidebarProps> = ({
  onDeviceSelect,
  selectedDevices = [],
}) => {
  const [openAccordion, setOpenAccordion] = useState<1 | 2 | 3 | 4 | 5>(1);

  const isSelectedCombo = (combo: { src: string }[]) => {
    if (combo.length !== selectedDevices.length) return false;
    const comboSrcs = combo.map((c) => c.src).sort();
    const selectedSrcs = [...selectedDevices].sort();
    return comboSrcs.every((src, i) => src === selectedSrcs[i]);
  };

  return (
    <aside className="bg-blue-200 w-[12vw] min-w-[6vw] max-w-[9vw] lg:w-[4vw] lg:min-w-[5vw] lg:max-w-[7vw] min-h-screen sticky top-0 flex-shrink-0 flex flex-col items-center py-2 px-1 shadow-lg overflow-y-auto">
      <div className="flex flex-col gap-2 items-center w-full mt-1">
        {/* Accordion 1: Tekli örnekler */}
        <div className="w-full">
          <button
            className={`w-full flex items-center justify-center font-bold text-blue-700 bg-blue-100 rounded-t-md border border-blue-400 py-1 text-xs focus:outline-none ${
              openAccordion === 1 ? "" : "opacity-70"
            }`}
            onClick={() => setOpenAccordion(1)}
            aria-expanded={openAccordion === 1}
          >
            1
          </button>
          {openAccordion === 1 && (
            <div className="flex flex-col gap-0.5 items-center w-full border border-t-0 border-blue-400 rounded-b-md p-0.5 bg-white">
              {singleCombos.map((combo) => (
                <button
                  key={combo[0].src}
                  className={`flex items-center justify-center w-4 h-4 rounded border-2 p-0.5 transition-all shadow-sm ${
                    isSelectedCombo(combo)
                      ? "border-blue-800 ring-2 ring-blue-500 bg-blue-100"
                      : "border-blue-400 hover:border-blue-600 bg-white"
                  }`}
                  onClick={() =>
                    onDeviceSelect && onDeviceSelect([combo[0].src])
                  }
                >
                  <img
                    src={combo[0].src}
                    alt={combo[0].label}
                    className="w-2 h-2 object-cover rounded-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Accordion 2: 2'li kombinasyonlar */}
        <div className="w-full">
          <button
            className={`w-full flex items-center justify-center font-bold text-blue-700 bg-blue-100 rounded-t-md border border-blue-400 py-1 text-xs focus:outline-none ${
              openAccordion === 2 ? "" : "opacity-70"
            }`}
            onClick={() => setOpenAccordion(2)}
            aria-expanded={openAccordion === 2}
          >
            2
          </button>
          {openAccordion === 2 && (
            <div className="flex flex-col gap-0.5 items-center w-full border border-t-0 border-blue-400 rounded-b-md p-0.5 bg-white">
              {doubleCombos.map((combo) => (
                <button
                  key={combo.map((c) => c.src).join("-")}
                  className={`flex items-center justify-center gap-0.5 w-6 h-4 rounded border-2 p-0.5 transition-all shadow-sm ${
                    isSelectedCombo(combo)
                      ? "border-blue-800 ring-2 ring-blue-500 bg-blue-100"
                      : "border-blue-400 hover:border-blue-600 bg-white"
                  }`}
                  onClick={() =>
                    onDeviceSelect && onDeviceSelect(combo.map((c) => c.src))
                  }
                >
                  {combo.map((c) => (
                    <img
                      key={c.src}
                      src={c.src}
                      alt={c.label}
                      className="w-2 h-2 object-cover rounded-full"
                    />
                  ))}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Accordion 3: 3'lü kombinasyonlar */}
        <div className="w-full">
          <button
            className={`w-full flex items-center justify-center font-bold text-blue-700 bg-blue-100 rounded-t-md border border-blue-400 py-1 text-xs focus:outline-none ${
              openAccordion === 3 ? "" : "opacity-70"
            }`}
            onClick={() => setOpenAccordion(3)}
            aria-expanded={openAccordion === 3}
          >
            3
          </button>
          {openAccordion === 3 && (
            <div className="flex flex-col gap-0.5 items-center w-full border border-t-0 border-blue-400 rounded-b-md p-0.5 bg-white">
              {tripleCombos.map((combo) => (
                <button
                  key={combo.map((c) => c.src).join("-")}
                  className={`flex items-center justify-center gap-0.5 w-8 h-4 rounded border-2 p-0.5 transition-all shadow-sm ${
                    isSelectedCombo(combo)
                      ? "border-blue-800 ring-2 ring-blue-500 bg-blue-100"
                      : "border-blue-400 hover:border-blue-600 bg-white"
                  }`}
                  onClick={() =>
                    onDeviceSelect && onDeviceSelect(combo.map((c) => c.src))
                  }
                >
                  {combo.map((c) => (
                    <img
                      key={c.src}
                      src={c.src}
                      alt={c.label}
                      className="w-2 h-2 object-cover rounded-full"
                    />
                  ))}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Accordion 4: 4'lü kombinasyonlar */}
        <div className="w-full">
          <button
            className={`w-full flex items-center justify-center font-bold text-blue-700 bg-blue-100 rounded-t-md border border-blue-400 py-1 text-xs focus:outline-none ${
              openAccordion === 4 ? "" : "opacity-70"
            }`}
            onClick={() => setOpenAccordion(4)}
            aria-expanded={openAccordion === 4}
          >
            4
          </button>
          {openAccordion === 4 && (
            <div className="flex flex-col gap-0.5 items-center w-full border border-t-0 border-blue-400 rounded-b-md p-0.5 bg-white">
              {quadrupleCombos.map((combo) => (
                <button
                  key={combo.map((c) => c.src).join("-")}
                  className={`flex items-center justify-center gap-0.5 w-10 h-4 rounded border-2 p-0.5 transition-all shadow-sm ${
                    isSelectedCombo(combo)
                      ? "border-blue-800 ring-2 ring-blue-500 bg-blue-100"
                      : "border-blue-400 hover:border-blue-600 bg-white"
                  }`}
                  onClick={() =>
                    onDeviceSelect && onDeviceSelect(combo.map((c) => c.src))
                  }
                >
                  {combo.map((c) => (
                    <img
                      key={c.src}
                      src={c.src}
                      alt={c.label}
                      className="w-2 h-2 object-cover rounded-full"
                    />
                  ))}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Accordion 5: 5'li kombinasyonlar */}
        <div className="w-full">
          <button
            className={`w-full flex items-center justify-center font-bold text-blue-700 bg-blue-100 rounded-t-md border border-blue-400 py-1 text-xs focus:outline-none ${
              openAccordion === 5 ? "" : "opacity-70"
            }`}
            onClick={() => setOpenAccordion(5)}
            aria-expanded={openAccordion === 5}
          >
            5
          </button>
          {openAccordion === 5 && (
            <div className="flex flex-col gap-0.5 items-center w-full border border-t-0 border-blue-400 rounded-b-md p-0.5 bg-white">
              {quintupleCombos.map((combo) => (
                <button
                  key={combo.map((c) => c.src).join("-")}
                  className={`flex items-center justify-center gap-0.5 w-12 h-4 rounded border-2 p-0.5 transition-all shadow-sm ${
                    isSelectedCombo(combo)
                      ? "border-blue-800 ring-2 ring-blue-500 bg-blue-100"
                      : "border-blue-400 hover:border-blue-600 bg-white"
                  }`}
                  onClick={() =>
                    onDeviceSelect && onDeviceSelect(combo.map((c) => c.src))
                  }
                >
                  {combo.map((c) => (
                    <img
                      key={c.src}
                      src={c.src}
                      alt={c.label}
                      className="w-2 h-2 object-cover rounded-full"
                    />
                  ))}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
