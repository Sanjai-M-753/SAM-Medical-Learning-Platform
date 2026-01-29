
import React, { useState } from 'react';
import { Hospital, User, Star, MapPin, Search, Phone, Navigation } from 'lucide-react';
import { searchWithGrounding } from '../../services/geminiService';

const Directory: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<'hospitals' | 'doctors'>('hospitals');

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await searchWithGrounding(`${activeType} ${query}`, 'maps');
      // Mock parsing for the sake of demo, usually we'd process groundingChunks
      setResults(res.grounding.map((g: any) => ({
        name: g.maps?.title || 'Location Found',
        address: 'Search Result in Google Maps',
        uri: g.maps?.uri
      })));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Global Medical Directory</h2>
        <p className="text-slate-500 mb-8">Locate the best healthcare facilities and specialists with real-time intelligence.</p>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 w-fit mx-auto">
          <button 
            onClick={() => setActiveType('hospitals')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeType === 'hospitals' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
          >
            Hospitals
          </button>
          <button 
            onClick={() => setActiveType('doctors')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeType === 'doctors' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
          >
            Doctors
          </button>
        </div>

        <div className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={activeType === 'hospitals' ? "Enter city or specialty (e.g. Cardiology in Chennai)" : "Search specialist name or field..."}
            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white h-64 rounded-3xl animate-pulse border border-slate-100" />
          ))
        ) : results.length > 0 ? (
          results.map((res, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                  {activeType === 'hospitals' ? <Hospital size={24} /> : <User size={24} />}
                </div>
                <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  <span>4.8</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-800">{res.name}</h4>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                <MapPin size={14} />
                {res.address}
              </p>
              
              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                <a 
                  href={res.uri} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <Navigation size={14} />
                  Navigate
                </a>
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <Phone size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center opacity-40">
            <Search size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium text-slate-500">Find medical excellence worldwide</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
