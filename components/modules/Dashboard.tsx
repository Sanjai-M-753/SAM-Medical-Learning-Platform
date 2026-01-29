
import React from 'react';
import { UserProfile } from '../../types';
import { 
  BookOpen, 
  MapPin, 
  ChevronRight, 
  Award, 
  Clock, 
  Sparkles, 
  Zap, 
  Target,
  ShieldCheck,
  Lock,
  Cpu,
  Waves
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BRAND, COLORS } from '../../constants';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 4.1 },
  { name: 'Wed', hours: 3.2 },
  { name: 'Thu', hours: 6.5 },
  { name: 'Fri', hours: 5.0 },
  { name: 'Sat', hours: 8.2 },
  { name: 'Sun', hours: 4.5 },
];

const Dashboard: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <div className="space-y-12 pb-24">
      {/* Cinematic Hero Section */}
      <section className="relative h-80 rounded-[4rem] overflow-hidden flex items-center px-16 group shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C2541] via-[#0B132B] to-[#14213D] z-0"></div>
        <div className="absolute top-0 right-0 w-full h-full opacity-5 z-0 pointer-events-none">
          <Waves className="w-full h-full text-cyan-400 animate-pulse" strokeWidth={0.5} />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-4 px-6 py-2 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 mb-8">
            <Cpu size={16} className="text-cyan-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">SAM Neural Engine Synchronized</span>
          </div>
          <h2 className="text-6xl font-black mb-6 tracking-tighter leading-none text-white">
            <span className="text-sam-gradient">Welcome, {user.fullName.split(' ')[0]}.</span>
          </h2>
          <p className="text-[#A9B4C7] text-xl mb-10 font-medium leading-relaxed">
            Clinical learning path for <span className="text-white font-bold">{user.degree}</span> is currently optimized for <span className="text-cyan-400 font-black">HIGH CAPACITY.</span>
          </p>
          <div className="flex items-center space-x-6">
            <button className="px-10 py-4 btn-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em]">
              Resume Protocol
            </button>
            <button className="px-10 py-4 glass text-[#E6EEF8] rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-white/10 hover:bg-white/10 transition-all">
              System Health
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid - Ultra Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { icon: <BookOpen size={28} />, label: "Module Coverage", value: "72%", sub: "Optimal progression", color: "from-cyan-500 to-blue-400" },
          { icon: <Clock size={28} />, label: "Sync Duration", value: "48h", sub: "Goal: 60h / week", color: "from-violet-600 to-indigo-400" },
          { icon: <Target size={28} />, label: "Clinical Rank", value: "A-1", sub: "Top 0.2% Global", color: "from-emerald-500 to-teal-400" },
          { icon: <Zap size={28} />, label: "Neural Nodes", value: "14", sub: "New nodes verified", color: "from-orange-500 to-yellow-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#121A2F] p-10 rounded-[3rem] border border-white/5 hover:border-cyan-500/20 transition-all group relative overflow-hidden cursor-pointer shadow-lg">
            <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity`}></div>
            <div className="flex items-center justify-between mb-10">
              <div className="p-5 bg-white/5 rounded-2xl text-slate-400 group-hover:text-cyan-400 transition-all">
                {stat.icon}
              </div>
              <ChevronRight size={20} className="text-white/10 group-hover:text-white transition-all" />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <div className="flex items-baseline space-x-3">
                <p className="text-5xl font-black text-white tracking-tighter leading-none">{stat.value}</p>
                <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
              </div>
              <p className="text-xs text-slate-600 mt-6 font-bold uppercase tracking-widest">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Momentum Chart */}
        <div className="lg:col-span-2 bg-[#121A2F] p-12 rounded-[4rem] border border-white/5 shadow-xl">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-2">Cognitive Momentum</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Neural Telemetry Stream</p>
            </div>
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
              <button className="px-6 py-2.5 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Active</button>
              <button className="px-6 py-2.5 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">History</button>
            </div>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F5D4" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#00F5D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: 'rgba(255,255,255,0.2)', fontWeight: 900}} 
                  dy={20} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: 'rgba(255,255,255,0.2)', fontWeight: 900}} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1C2541', 
                    borderRadius: '24px', 
                    border: '1px solid rgba(0,245,212,0.1)', 
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)',
                    padding: '20px'
                  }}
                  itemStyle={{ color: '#00F5D4', fontWeight: 900, fontSize: '18px' }}
                  labelStyle={{ color: 'white', opacity: 0.3, fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, marginBottom: '8px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#00F5D4" strokeWidth={5} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Neural Log */}
        <div className="bg-[#121A2F] p-12 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-xl">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-600/5 blur-[80px]"></div>
          <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-3">Neural Stream</h3>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-12">SAM Central Logs</p>
          
          <div className="space-y-10">
            {[
              { title: "Neuro-Anatomy Module", time: "1h", type: "Optimized", icon: <Cpu size={16} /> },
              { title: "Clinical Intel Sync", time: "5h", type: "Verified", icon: <Lock size={16} /> },
              { title: "Map Node Retrieval", time: "12h", type: "Success", icon: <MapPin size={16} /> },
              { title: "Identity Encryption", time: "1d", type: "Secure", icon: <ShieldCheck size={16} /> }
            ].map((activity, i) => (
              <div key={i} className="flex items-start justify-between group cursor-pointer">
                <div className="flex items-start space-x-5">
                  <div className="mt-1 p-3 bg-white/5 rounded-xl text-slate-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all duration-300">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-base font-black text-white group-hover:text-cyan-400 transition-colors">{activity.title}</p>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">{activity.type}</p>
                  </div>
                </div>
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{activity.time}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-16 py-5 text-[11px] font-black text-slate-600 uppercase tracking-[0.4em] bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:text-white border border-white/5">
            Full Audit Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
