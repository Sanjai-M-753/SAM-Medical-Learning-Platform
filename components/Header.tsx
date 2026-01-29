
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Search, Bell, User, LogOut, Cpu, Command } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  onLogout: () => void;
  activeTabLabel: string;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, activeTabLabel }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-28 bg-transparent flex items-center justify-between px-12 z-10 shrink-0 relative">
      <div className="flex items-center space-x-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">{activeTabLabel}</h1>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-pulse delay-75"></div>
            </div>
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Neural Interface Optimized</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-10">
        <div className="hidden lg:flex items-center bg-[#1B263B] rounded-3xl px-8 py-4 w-[32rem] border border-white/5 focus-within:border-cyan-500/40 focus-within:bg-[#212E4A] transition-all group shadow-xl">
          <Search size={20} className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search SAM Intelligence Hub..." 
            className="bg-transparent border-none focus:outline-none ml-5 w-full text-sm text-[#E6EEF8] font-semibold placeholder:text-slate-600"
          />
          <div className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
             <Command size={10} className="text-slate-500" />
             <span className="text-[10px] font-black text-slate-500">K</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative p-4 text-slate-500 hover:text-cyan-400 hover:bg-white/5 rounded-2xl transition-all group">
            <Bell size={24} />
            <span className="absolute top-4 right-4 w-3 h-3 bg-cyan-500 rounded-full border-2 border-[#0B132B] shadow-[0_0_12px_rgba(0,245,212,0.8)]"></span>
          </button>

          <div className="h-10 w-[1px] bg-white/10 mx-2"></div>

          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-5 p-1 rounded-2xl hover:bg-white/5 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#00F5D4] to-[#4FACFE] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl group-hover:scale-[1.05] transition-all border border-white/10">
                {user.fullName.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-black text-white leading-none mb-2">{user.fullName}</p>
                <div className="px-3 py-1 bg-cyan-400/10 rounded-lg inline-block border border-cyan-400/20">
                  <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest leading-none">{user.degree}</p>
                </div>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-6 w-72 glass-premium rounded-[2.5rem] py-4 z-50 animate-in fade-in slide-in-from-top-6">
                <div className="px-8 py-6 border-b border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Authenticated Module</p>
                  <p className="text-lg font-black text-white">{user.fullName}</p>
                  <p className="text-xs text-slate-400 truncate mt-1 font-bold">{user.email}</p>
                </div>
                <div className="p-3 space-y-2">
                  <button className="w-full flex items-center space-x-5 px-6 py-4 text-sm text-[#A9B4C7] hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold group">
                    <User size={20} className="text-cyan-400" />
                    <span>User Protocol</span>
                  </button>
                  <button className="w-full flex items-center space-x-5 px-6 py-4 text-sm text-[#A9B4C7] hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold group">
                    <Cpu size={20} className="text-violet-400" />
                    <span>Parameters</span>
                  </button>
                </div>
                <div className="border-t border-white/5 p-3 mt-3">
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-5 px-6 py-4 text-sm text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-black uppercase tracking-[0.2em]"
                  >
                    <LogOut size={20} />
                    <span>End Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
