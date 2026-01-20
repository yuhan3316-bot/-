
import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; icon: string; label: string }[] = [
    { id: 'schedule', icon: 'fa-calendar-days', label: '行程' },
    { id: 'bookings', icon: 'fa-ticket', label: '憑證' },
    { id: 'expense', icon: 'fa-coins', label: '記帳' },
    { id: 'planning', icon: 'fa-list-check', label: '清單' },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-3xl soft-shadow border border-beige-200 z-50 px-6 py-3 safe-bottom">
      <div className="flex justify-between items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all active:scale-75 ${
              activeTab === tab.id ? 'text-clay-green' : 'text-brown-soft opacity-60'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-xl mb-1`}></i>
            <span className="text-[11px] font-black">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="w-1.5 h-1.5 bg-clay-green rounded-full mt-1 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
