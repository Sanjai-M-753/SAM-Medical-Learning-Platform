
import React from 'react';
import { NAV_ITEMS, APP_OWNER, COLORS } from '../constants';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Activity, 
  Hospital, 
  Settings2, 
  School, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole: UserRole;
}

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={20} />,
  learning: <GraduationCap size={20} />,
  health: <Activity size={20} />,
  directory: <Hospital size={20} />,
  equipment: <Settings2 size={20} />,
  colleges: <School size={20} />,
  'ai-lab': <Sparkles size={20} />
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen, userRole }) => {
  return (
    <aside className={`${isOpen ? 'w-80' : 'w-24'} flex flex-col bg-[#0B132B] text-white transition-all duration-700 ease-[cubic-bezier(0.19, 1, 0.22, 1)] border-r border-white/5 z-20`}>
      <div className="p-10 flex items-center justify-between">
        {isOpen ? (
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl group-hover:bg-cyan-400/40 transition-all"></div>
              <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border border-cyan-500/30">
                 <span className="font-black text-cyan-400 text-lg">S</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-[0.2em] leading-none">SAM</span>
              <span className="text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black mt-1">Intelligence</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto h-12 w-12 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-cyan-400/50 transition-all">
            <span className="font-black text-cyan-400">S</span>
          </div>
        )}
      </div>

      <div className="flex-1 px-5 space-y-1 mt-6">
        {isOpen && <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] px-5 mb-6">Neural Modules</p>}
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-5 py-4 rounded-2xl transition-all duration-500 group relative ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-[#00F5D415] to-transparent text-cyan-400' 
                : 'text-slate-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 w-1 h-8 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,245,212,0.8)]"></div>
            )}
            <span className={`transition-all duration-500 ${activeTab === item.id ? 'scale-110' : 'group-hover:text-cyan-400'}`}>
              {iconMap[item.id]}
            </span>
            {isOpen && <span className="ml-5 font-bold text-sm tracking-tight">{item.label}</span>}
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="p-8 m-8 glass rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl"></div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-cyan-400/10 rounded-xl">
              <ShieldCheck size={18} className="text-cyan-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">System Core</span>
          </div>
          <p className="text-sm font-black text-white mb-0.5">{APP_OWNER.name}</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{APP_OWNER.role}</p>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 text-white/30"
          >
            Minimize Interface <ChevronLeft size={14} />
          </button>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="m-8 p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-cyan-400 transition-all flex items-center justify-center"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
