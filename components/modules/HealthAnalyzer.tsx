
import React, { useState } from 'react';
import { Activity, Heart, Wind, Droplets, Info } from 'lucide-react';

const HealthAnalyzer: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) {
      setBmi(parseFloat((w / (h * h)).toFixed(1)));
    }
  };

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (val < 25) return { label: 'Normal Weight', color: 'text-emerald-500' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-20">
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="text-blue-600" />
            Educational BMI Calculator
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Weight (kg)</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 70"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Height (cm)</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 175"
              />
            </div>
            <button 
              onClick={calculateBmi}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Calculate Analysis
            </button>
          </div>

          {bmi && (
            <div className="mt-10 p-6 bg-slate-50 rounded-2xl text-center border border-slate-100">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Your Result</p>
              <p className="text-5xl font-black text-slate-900 my-2">{bmi}</p>
              <p className={`text-lg font-bold ${getBmiCategory(bmi).color}`}>
                {getBmiCategory(bmi).label}
              </p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-4">
          <Info className="text-blue-600 shrink-0 mt-1" />
          <p className="text-sm text-blue-700 leading-relaxed">
            <span className="font-bold">Important Disclaimer:</span> This tool is for educational purposes only and follows WHO standard guidelines. It is NOT a medical diagnosis tool. Always consult a certified healthcare professional.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 px-2">Knowledge Matrix</h3>
        {[
          { icon: <Heart className="text-red-500" />, title: "Heart Rate Education", desc: "Understand beats per minute (BPM) ranges for resting vs active states.", color: "bg-red-50" },
          { icon: <Droplets className="text-blue-500" />, title: "Blood Pressure Basics", desc: "Learn about Systolic and Diastolic pressure readings (e.g. 120/80).", color: "bg-blue-50" },
          { icon: <Wind className="text-emerald-500" />, title: "Oxygen Saturation", desc: "SpO2 indicates the percentage of oxygen-carrying hemoglobin in the blood.", color: "bg-emerald-50" },
          { icon: <Activity className="text-purple-500" />, title: "Glucose Awareness", desc: "Insights into blood sugar monitoring and its physiological importance.", color: "bg-purple-50" },
        ].map((item, i) => (
          <div key={i} className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{item.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthAnalyzer;
