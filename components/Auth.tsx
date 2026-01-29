
import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { Mail, Lock, User, School, Book, GraduationCap, ArrowRight, Sparkles, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { BRAND, APP_OWNER, COLORS } from '../constants';

interface AuthProps {
  onLogin: (profile: UserProfile) => void;
}

const SAMLogo: React.FC<{ size?: number, showLabel?: boolean }> = ({ size = 64, showLabel = true }) => (
  <div className="flex flex-col items-center">
    <div className="relative flex items-center justify-center group" style={{ width: size, height: size }}>
      <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl blur-2xl group-hover:bg-cyan-400/20 transition-all duration-700 animate-pulse"></div>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        <path d="M30 35H70L30 50H70L30 65H70" stroke="url(#sam-grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 20V80" stroke="white" strokeOpacity="0.05" strokeWidth="2" />
        <path d="M20 50H80" stroke={COLORS.cyan} strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
        <defs>
          <linearGradient id="sam-grad" x1="30" y1="35" x2="70" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor={COLORS.cyan} />
            <stop offset="1" stopColor={COLORS.violet} />
          </linearGradient>
        </defs>
      </svg>
    </div>
    {showLabel && (
      <div className="mt-4 text-center">
        <h1 className="text-3xl font-black tracking-[0.4em] text-white">SAM</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">{BRAND.fullName}</p>
      </div>
    )}
  </div>
);

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    collegeName: '',
    degree: '',
    year: '1st Year',
    role: UserRole.STUDENT
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      fullName: formData.fullName || 'SAM User',
      email: formData.email,
      collegeName: formData.collegeName,
      degree: formData.degree,
      year: formData.year,
      role: formData.role
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 glass-premium rounded-[3.5rem] overflow-hidden z-10 animate-fadeIn">
        
        {/* Cinematic Left Panel */}
        <div className="relative bg-gradient-to-b from-[#0B132B] to-[#1C2541] p-16 flex flex-col justify-between border-r border-white/5 overflow-hidden">
          {/* Subtle medical tech glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <SAMLogo size={80} />
            
            <div className="mt-16">
              <h2 className="text-5xl font-black leading-[1.1] tracking-tighter">
                <span className="text-sam-gradient">Architecture of <br /> Clinical Intel.</span>
              </h2>
              <p className="text-[#A9B4C7] text-lg mt-8 font-medium leading-relaxed max-w-sm">
                Synchronizing global medical knowledge into one intelligent ecosystem. Designed for the elite of healthcare.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
             <div className="flex items-center space-x-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                  <Cpu size={24} />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm uppercase tracking-widest">Neural Learning</h4>
                  <p className="text-xs text-[#A9B4C7] mt-1">AI-driven academic paths.</p>
                </div>
             </div>
             <div className="flex items-center space-x-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm uppercase tracking-widest">Verified Intel</h4>
                  <p className="text-xs text-[#A9B4C7] mt-1">High-fidelity medical databases.</p>
                </div>
             </div>
          </div>

          <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/5 pt-8">
            <div>
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Chief Architect</p>
              <p className="text-sm font-bold text-[#A9B4C7]">{APP_OWNER.name}</p>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
              STABLE v3.1.2
            </div>
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="bg-[#0D1528] p-16 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-2">{isRegister ? 'Initialize Account' : 'Secure Entry'}</h3>
                <p className="text-[#A9B4C7] text-xs font-bold uppercase tracking-widest opacity-60">System Protocol Activation</p>
              </div>
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs font-black text-cyan-400 hover:text-white transition-all tracking-widest border-b border-cyan-400/30 pb-1"
              >
                {isRegister ? 'Sign In' : 'Join SAM'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-black text-white/30 uppercase mb-2 block tracking-widest">Identity Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                      <input 
                        required 
                        className="w-full pl-14 pr-6 py-4 bg-[#1B263B] rounded-2xl border border-white/5 outline-none transition-all text-sm font-semibold text-white" 
                        placeholder="Full Name" 
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black text-white/30 uppercase mb-2 block tracking-widest">Medical Academy</label>
                    <div className="relative group">
                      <School className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                      <input 
                        required 
                        className="w-full pl-14 pr-6 py-4 bg-[#1B263B] rounded-2xl border border-white/5 outline-none transition-all text-sm font-semibold text-white" 
                        placeholder="Institution Name"
                        value={formData.collegeName}
                        onChange={e => setFormData({...formData, collegeName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/30 uppercase mb-2 block tracking-widest">Specialization</label>
                    <input 
                      required 
                      className="w-full px-6 py-4 bg-[#1B263B] rounded-2xl border border-white/5 outline-none transition-all text-sm font-semibold text-white" 
                      placeholder="e.g. BioMed"
                      value={formData.degree}
                      onChange={e => setFormData({...formData, degree: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/30 uppercase mb-2 block tracking-widest">Cycle</label>
                    <select 
                      className="w-full px-6 py-4 bg-[#1B263B] rounded-2xl border border-white/5 outline-none transition-all text-sm font-semibold text-white appearance-none cursor-pointer"
                      value={formData.year}
                      onChange={e => setFormData({...formData, year: e.target.value})}
                    >
                      <option className="bg-[#0B132B]">Phase 1</option>
                      <option className="bg-[#0B132B]">Phase 2</option>
                      <option className="bg-[#0B132B]">Phase 3</option>
                      <option className="bg-[#0B132B]">Resident</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black text-white/30 uppercase mb-2 block tracking-widest">Neural Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                  <input 
                    type="email" 
                    required 
                    className="w-full pl-14 pr-6 py-4 bg-[#1B263B] rounded-2xl border border-white/5 outline-none transition-all text-sm font-semibold text-white" 
                    placeholder="email@nexus.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-white/30 uppercase mb-2 block tracking-widest">Encryption Key</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-14 pr-6 py-4 bg-[#1B263B] rounded-2xl border border-white/5 outline-none transition-all text-sm font-semibold text-white" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 btn-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl mt-6 flex items-center justify-center gap-4 group"
              >
                {isRegister ? 'Synchronize Identity' : 'Initialize Workspace'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-12 flex items-center justify-center space-x-6 opacity-40">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">AES-256</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">TLS 1.3</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">FIPS 140-2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
