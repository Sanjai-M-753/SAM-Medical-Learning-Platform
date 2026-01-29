
import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/modules/Dashboard';
import LearningHub from './components/modules/LearningHub';
import HealthAnalyzer from './components/modules/HealthAnalyzer';
import Directory from './components/modules/Directory';
import EquipmentDB from './components/modules/EquipmentDB';
import CollegeDiscovery from './components/modules/CollegeDiscovery';
import AIInnovationLab from './components/modules/AIInnovationLab';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Persistence check
  useEffect(() => {
    const saved = localStorage.getItem('sam_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('sam_user', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sam_user');
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'learning': return <LearningHub />;
      case 'health': return <HealthAnalyzer />;
      case 'directory': return <Directory />;
      case 'equipment': return <EquipmentDB />;
      case 'colleges': return <CollegeDiscovery />;
      case 'ai-lab': return <AIInnovationLab />;
      default: return <Dashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050B14] text-slate-200 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen} 
        userRole={user.role}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          activeTabLabel={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
        />
        
        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-[100rem] mx-auto animate-fadeIn">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
