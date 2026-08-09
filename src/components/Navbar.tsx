import React, { useState } from 'react';
import { NavTab } from '../types';
import { Database, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'teams', label: 'Teams & Points' },
    { id: 'speakers', label: 'Speaker Rankings' },
    { id: 'adjudicators', label: 'Adjudicators' },
    { id: 'announcements', label: 'Updates' },
    { 
      id: 'tabulation', 
      label: 'Admin Tab & Supabase', 
      icon: <Database className="w-3.5 h-3.5 text-amber-300" /> 
    },
  ];

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };


  return (
    <header className="sticky top-0 z-50 bg-[#332C24] border-b border-[#684B35] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* LOGO & TITLE matching user HTML structure */}
        <div 
          onClick={() => handleTabClick('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative">
            <img 
              src="https://i.postimg.cc/qvPTHjhQ/Logo.png" 
              alt="SSDC LoS Logo" 
              className="w-10 h-10 rounded-full object-cover border-2 border-[#816644] group-hover:border-[#A97142] transition-all shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#8B5E3C] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full text-white border border-[#332C24]">
              2.0
            </div>
          </div>
          <div>
            <h2 className="font-['Orbitron'] font-black text-sm sm:text-base leading-tight text-[#f5e4cb] group-hover:text-amber-200 transition-colors uppercase tracking-wider">
              League of Spars
            </h2>
            <p className="text-[11px] text-[#c9b8a7] font-semibold tracking-widest uppercase">
              Season 2 &bull; SSDC
            </p>
          </div>
        </div>

        {/* DESKTOP MENU LINKS */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#8B5E3C] text-white shadow-md shadow-[#8B5E3C]/30 border border-[#A97142]'
                    : 'text-[#f5e4cb] hover:text-white hover:bg-[#1F1A17]/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[#f5e4cb] hover:text-amber-300 rounded-lg bg-[#1F1A17] border border-[#684B35] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1F1A17] border-b border-[#684B35] px-4 py-3 space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#8B5E3C] text-white border-l-4 border-amber-300'
                    : 'text-[#f5e4cb] hover:bg-[#332C24]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                {isActive && <span className="text-xs text-amber-300 font-normal">&bull; Active</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
