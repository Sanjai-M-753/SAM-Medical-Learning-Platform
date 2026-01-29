
import React, { useState } from 'react';
import { Settings2, Cpu, Info, Shield, DollarSign, Lightbulb, Search } from 'lucide-react';

const equipmentList = [
  {
    name: "MRI (Magnetic Resonance Imaging)",
    category: "Diagnostic",
    principle: "Uses strong magnetic fields and radio waves to generate images of organs.",
    components: ["Superconducting Magnet", "Gradient Coils", "RF Coils", "Computer System"],
    uses: "Brain imaging, spinal cord, soft tissue analysis.",
    safety: "No metallic implants allowed, loud noise protection.",
    cost: "$1M - $3M",
    innovations: "Portable low-field MRI scanners, AI reconstruction."
  },
  {
    name: "Mechanical Ventilator",
    category: "Critical Care",
    principle: "Mechanically moves breathable air into and out of the lungs.",
    components: ["Oxygen supply", "Flow sensors", "PEEP valves", "Display monitor"],
    uses: "Respiratory failure, COVID-19 care, ICU monitoring.",
    safety: "Alarm management, infection control, pressure settings.",
    cost: "$25k - $50k",
    innovations: "Automated weaning algorithms, remote monitoring."
  },
  {
    name: "Hemodialysis Machine",
    category: "Therapeutic",
    principle: "Filters blood to remove toxins when kidneys fail.",
    components: ["Dialyzer", "Blood pump", "Air detector", "Proportioning system"],
    uses: "End-stage renal disease, acute kidney injury.",
    safety: "Blood leak detection, heparin infusion control.",
    cost: "$15k - $30k",
    innovations: "Wearable artificial kidneys, home dialysis tech."
  }
];

const EquipmentDB: React.FC = () => {
  const [selected, setSelected] = useState<typeof equipmentList[0] | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Equipment Catalog</h3>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search devices..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="space-y-3">
          {equipmentList.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(item)}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${
                selected?.name === item.name 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                  : 'bg-white text-slate-700 border-slate-100 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{item.category}</p>
                <Cpu size={14} className={selected?.name === item.name ? 'text-blue-200' : 'text-slate-300'} />
              </div>
              <p className="font-bold leading-tight">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selected ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-right-4">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{selected.name}</h2>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mt-2 uppercase">
                  {selected.category} Machine
                </span>
              </div>
              <Settings2 className="text-slate-200" size={48} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2">
                    <Info size={16} className="text-blue-500" /> Working Principle
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.principle}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2">
                    <Cpu size={16} className="text-purple-500" /> Key Components
                  </h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {selected.components.map((c, i) => (
                      <li key={i} className="text-sm text-slate-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-300 rounded-full" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2">
                    <Shield size={16} className="text-emerald-500" /> Safety Protocols
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.safety}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-1">
                      <DollarSign size={10} /> Cost Est.
                    </h4>
                    <p className="text-sm font-bold text-slate-800">{selected.cost}</p>
                  </div>
                  <div className="flex-1 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                    <h4 className="flex items-center gap-1 text-[10px] font-bold text-yellow-600 uppercase mb-1">
                      <Lightbulb size={10} /> Next Gen
                    </h4>
                    <p className="text-[10px] text-yellow-800 font-medium">{selected.innovations}</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Generate Deep Analysis with Gemini
              <Cpu size={18} className="text-blue-400" />
            </button>
          </div>
        ) : (
          <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-10 opacity-60">
            <Settings2 size={64} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-400">Select Equipment</h3>
            <p className="text-sm text-slate-400 max-w-xs mt-2">Choose a device from the catalog to see its technical architecture and clinical profile.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDB;
