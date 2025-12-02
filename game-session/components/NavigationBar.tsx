import React from 'react';
import { Home, BookOpen, Gamepad2, User } from 'lucide-react';

interface NavigationBarProps {
  activeTab?: 'home' | 'game' | 'profile';
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab = 'home' }) => {
  return (
    <nav className="w-full bg-primary pb-safe shrink-0 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center h-16 px-8 mx-auto">
        <NavButton 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
          isActive={activeTab === 'home'} 
        />
        <NavButton 
          icon={<BookOpen className="w-6 h-6" />} 
          label="Learn" 
          isActive={false} 
        />
        <NavButton 
          icon={<Gamepad2 className="w-6 h-6" />} 
          label="Game" 
          isActive={activeTab === 'game'} 
        />
        <NavButton 
          icon={<User className="w-6 h-6" />} 
          label="Profile" 
          isActive={activeTab === 'profile'} 
        />
      </div>
    </nav>
  );
};

const NavButton = ({ icon, label, isActive }: { icon: React.ReactNode, label: string, isActive: boolean }) => (
  <button 
    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 w-16
      ${isActive 
        ? 'bg-white/20 text-white' 
        : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
  >
    {icon}
    <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-80'}`}>
      {label}
    </span>
  </button>
);