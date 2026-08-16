import React from 'react';
import { 
  BarChart3, 
  ShoppingCart, 
  Sparkles, 
  Search, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenLiveViewer: (templateId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  onOpenLiveViewer,
}) => {
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800/80 text-slate-200">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 text-slate-300 px-4 py-1.5 text-xs font-medium text-center flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        <span>Instant .PBIX & Excel downloads with verified DAX formulas. Power BI Desktop & Fabric ready.</span>
        <span className="hidden sm:inline bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
          USD PRICING
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand matching Bento Grid theme */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  Template<span className="text-blue-500">Store</span>
                </h1>
                <span className="text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  BENTO .PBIX
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">powerbi.com/power-bi-templates</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-templates-input"
              type="text"
              placeholder="Search Sales, HR, Finance, E-commerce templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Navigation & Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Interactive Dashboard Button */}
            <button
              id="header-live-dashboard-btn"
              onClick={() => onOpenLiveViewer()}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-blue-400 border border-blue-500/30 hover:border-blue-400 text-xs font-semibold transition-all shadow-sm group"
            >
              <Sparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span>Interactive Live Dashboard</span>
            </button>

            {/* Currency Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>USD ($)</span>
            </div>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/25 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-blue-700 text-xs font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-slate-800/80 scrollbar-none text-xs font-medium">
          {[
            { id: 'all', label: 'All Templates' },
            { id: 'bento-showcase', label: '🍱 Bento Grid Overview' },
            { id: 'sales', label: 'Sales ($15)' },
            { id: 'hr', label: 'HR Analytics ($20)' },
            { id: 'finance', label: 'Finance ($25)' },
            { id: 'ecommerce', label: 'E-commerce ($30)' },
            { id: 'bundle', label: 'Complete Bundle ($60)' },
            { id: 'live-viewer', label: '⚡ Live Interactive Canvas', isSpecial: true },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => {
                if (tab.id === 'live-viewer') {
                  onOpenLiveViewer();
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : tab.isSpecial
                  ? 'bg-blue-600/15 text-blue-400 hover:bg-blue-600/25 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
