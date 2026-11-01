import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  History, 
  PlusCircle, 
  FileSpreadsheet, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { user, signOut, isConfigured } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (tab: string, param?: any) => {
    onNavigate(tab, param);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-mediblue-700 via-mediblue-600 to-mediteal-500 flex items-center justify-center text-white shadow-lg shadow-mediblue-500/25 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-mediblue-950 to-mediblue-800 bg-clip-text text-transparent">
                  MediPredict
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-mediblue-100 text-mediblue-700 border border-mediblue-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                ML Disease Risk Prediction
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-3">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'home'
                  ? 'bg-mediblue-50 text-mediblue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('diseases')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'diseases' || currentTab === 'predict'
                  ? 'bg-mediblue-50 text-mediblue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Disease Prediction
            </button>

            <button
              onClick={() => handleNav('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-mediblue-50 text-mediblue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => handleNav('history')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'history'
                  ? 'bg-mediblue-50 text-mediblue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              History
            </button>

            <button
              onClick={() => handleNav('performance')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'performance'
                  ? 'bg-mediblue-50 text-mediblue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              ML Models
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'about'
                  ? 'bg-mediblue-50 text-mediblue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              About
            </button>
          </div>

          {/* Desktop Right Side / User Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav('diseases')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-mediblue-600 to-mediblue-700 text-white text-sm font-semibold shadow-md shadow-mediblue-600/20 hover:shadow-lg hover:from-mediblue-700 hover:to-mediblue-800 transition-all transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Prediction</span>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-mediblue-100 text-mediblue-700 flex items-center justify-center font-bold text-xs">
                    {user.full_name ? user.full_name.charAt(0) : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 max-w-[120px] truncate">
                    {user.full_name || user.email}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-800 truncate">{user.email}</p>
                      {isConfigured && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 mt-1 font-medium">
                          <ShieldCheck className="w-3 h-3" /> Supabase RLS Active
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('history')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <History className="w-4 h-4 text-slate-400" />
                      Prediction History
                    </button>
                    <button
                      onClick={() => handleNav('profile')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Profile Settings
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          signOut();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-mediblue-700 hover:bg-slate-100 rounded-xl transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-mediblue-50 hover:text-mediblue-700"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('diseases')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-mediblue-50 hover:text-mediblue-700"
          >
            Disease Prediction
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-mediblue-50 hover:text-mediblue-700"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNav('history')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-mediblue-50 hover:text-mediblue-700"
          >
            Prediction History
          </button>
          <button
            onClick={() => handleNav('performance')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-mediblue-50 hover:text-mediblue-700"
          >
            ML Models Performance
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-mediblue-50 hover:text-mediblue-700"
          >
            About
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <button
                  onClick={() => handleNav('profile')}
                  className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Profile ({user.email})
                </button>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 text-center text-sm font-semibold border border-slate-200 rounded-xl"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="w-full py-2.5 text-center text-sm font-semibold bg-mediblue-600 text-white rounded-xl"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
