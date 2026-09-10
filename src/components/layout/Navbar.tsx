import React from 'react';
import { Search, Flame, Zap, Shield, BookOpen, User, Menu, X, Sparkles } from 'lucide-react';
import { StudentProfile } from '../../types';

interface NavbarProps {
  profile: StudentProfile;
  activeView: string;
  onNavigate: (view: string, param?: any) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeView,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'test-series', label: 'Test Series' },
    { id: 'daily-challenge', label: 'Daily Challenge' },
    { id: 'dashboard', label: 'My Dashboard' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#0a0d14]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🎓</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-300 transition-colors">
                RankRise
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                10
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block -mt-0.5">
              CBSE & NCERT Class 10
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeView === link.id
                  ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search, Stats & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/80 text-xs transition-colors"
            title="Search chapters, questions, formulas (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Search...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-900 text-slate-400 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Daily Streak */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
            title={`${profile.streakDays} Day Study Streak`}
          >
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>{profile.streakDays}d</span>
          </div>

          {/* XP Badge */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
            title={`${profile.xp} Study XP Points`}
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>{profile.xp.toLocaleString()} XP</span>
          </div>

          {/* Student Avatar / Profile Button */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
            title="View Student Profile"
          >
            <span className="text-base sm:text-lg">{profile.avatar}</span>
            <span className="hidden xl:inline text-xs font-semibold max-w-[90px] truncate">
              {profile.name}
            </span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a0d14]/95 p-4 space-y-2 backdrop-blur-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeView === link.id
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{link.label}</span>
              {activeView === link.id && <Sparkles className="w-4 h-4 text-brand-400" />}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-around py-2">
            <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold">
              <Flame className="w-4 h-4" /> {profile.streakDays} Days Streak
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
              <Zap className="w-4 h-4" /> {profile.xp} XP
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
