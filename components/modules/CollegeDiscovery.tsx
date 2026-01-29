
import React, { useState } from 'react';
import { School, MapPin, GraduationCap, Building2, TrendingUp, Search, Layers } from 'lucide-react';

const colleges = [
  {
    name: "PSG Institute of Technology",
    location: "Coimbatore, Tamil Nadu",
    type: "Biomedical Engineering",
    fees: "₹1.5L - ₹2.5L/year",
    rank: "NIRF #63",
    placement: "95% Placement",
    courses: ["B.E. Biomedical", "M.Tech Clinical Eng."]
  },
  {
    name: "SRM Institute of Science and Tech",
    location: "Chennai, Tamil Nadu",
    type: "Medical & Biomedical",
    fees: "₹2.5L - ₹4.0L/year",
    rank: "NIRF #18",
    placement: "98% Placement",
    courses: ["B.Tech BioMed", "MBBS", "B.Pharm"]
  },
  {
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    type: "Research & Eng",
    fees: "₹2.0L/year",
    rank: "NIRF #1",
    placement: "100% Placement",
    courses: ["Applied Mechanics (BioMed)", "BS-MS Biological Sci"]
  }
];

const CollegeDiscovery: React.FC = () => {
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleCompare = (name: string) => {
    if (compareList.includes(name)) {
      setCompareList(compareList.filter(n => n !== name));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, name]);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">College Discovery Engine</h2>
          <p className="text-sm text-slate-500">Explore top institutions for Biomedical and Medical sciences in Tamil Nadu.</p>
        </div>
        {compareList.length > 0 && (
          <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 animate-in zoom-in">
            Compare ({compareList.length}/3)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                <School size={24} className="text-blue-600" />
              </div>
              <div className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                {college.rank}
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-800 leading-tight mb-2">{college.name}</h4>
            <p className="text-xs text-slate-500 flex items-center gap-1 mb-6">
              <MapPin size={12} /> {college.location}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Building2 size={12} /> FEES</span>
                <span className="text-xs font-bold text-slate-700">{college.fees}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><TrendingUp size={12} /> PLACEMENT</span>
                <span className="text-xs font-bold text-emerald-600">{college.placement}</span>
              </div>
              <div className="pt-2 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 block mb-2">COURSES</span>
                <div className="flex flex-wrap gap-2">
                  {college.courses.map((c, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-medium rounded-lg">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-2">
              <button className="flex-1 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-1">
                <Search size={14} /> Full Details
              </button>
              <button 
                onClick={() => toggleCompare(college.name)}
                className={`p-3 rounded-xl transition-all ${
                  compareList.includes(college.name) ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <Layers size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeDiscovery;
