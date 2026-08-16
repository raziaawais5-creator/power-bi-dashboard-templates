import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  MessageSquare,
  ShieldCheck,
  Download,
  Layers,
  Code2
} from 'lucide-react';
import { DashboardTemplate } from '../types';
import { DASHBOARD_TEMPLATES } from '../data/templatesData';

interface BentoGridShowcaseProps {
  onSelectLivePreview: (templateId: string) => void;
  onAddToCart: (template: DashboardTemplate) => void;
  onBuyNow: (template: DashboardTemplate) => void;
  onViewDax: (template: DashboardTemplate) => void;
  onViewSchema: (template: DashboardTemplate) => void;
}

export const BentoGridShowcase: React.FC<BentoGridShowcaseProps> = ({
  onSelectLivePreview,
  onAddToCart,
  onBuyNow,
  onViewDax,
  onViewSchema,
}) => {
  const [customQuoteModal, setCustomQuoteModal] = useState(false);
  const [customRequirement, setCustomRequirement] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  const bundle = DASHBOARD_TEMPLATES.find(t => t.id === 'complete-bundle') || DASHBOARD_TEMPLATES[0];
  const sales = DASHBOARD_TEMPLATES.find(t => t.id === 'sales-dashboard') || DASHBOARD_TEMPLATES[0];
  const hr = DASHBOARD_TEMPLATES.find(t => t.id === 'hr-dashboard') || DASHBOARD_TEMPLATES[1];
  const finance = DASHBOARD_TEMPLATES.find(t => t.id === 'finance-dashboard') || DASHBOARD_TEMPLATES[2];
  const ecommerce = DASHBOARD_TEMPLATES.find(t => t.id === 'ecommerce-dashboard') || DASHBOARD_TEMPLATES[3];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSubmitted(true);
    setTimeout(() => {
      setCustomSubmitted(false);
      setCustomQuoteModal(false);
      setCustomRequirement('');
      setCustomEmail('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Bento Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Bento Layout</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Premium Power BI Templates
          </h2>
          <p className="text-slate-400 mt-1 text-sm">
            Production-ready dashboards for data-driven decisions. Instant download with full source files.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>4 Production .PBIX • 180+ DAX Measures</span>
        </div>
      </div>

      {/* Main 12-Column Bento Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Bento Tile 1: Master Bundle Showcase (Col-Span 7) */}
        <div 
          id="bento-bundle-card"
          className="col-span-12 lg:col-span-7 bg-slate-800/50 border border-slate-700 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group hover:border-blue-500/60 transition-all duration-300 shadow-xl"
        >
          <div className="z-10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="bg-blue-600/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/30">
                Best Value • All-In-One
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-md">
                Save $30 USD
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2 leading-tight">
              Complete Dashboard<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300">
                Master Bundle
              </span>
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-md leading-relaxed">
              Includes Sales, HR, Finance, and E-commerce templates with 180+ production DAX formulas, Star Schema Excel models, 12 custom JSON themes, and lifetime updates.
            </p>

            {/* Micro feature pills */}
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-slate-300">
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> 4 Master .PBIX Files
              </span>
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Star Schema Models
              </span>
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Commercial License
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-8 pt-6 border-t border-slate-700/60 z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">$60</div>
              <span className="text-sm font-bold text-slate-400">USD</span>
              <span className="text-base text-slate-500 line-through font-medium ml-1">$90 USD</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectLivePreview('sales-dashboard')}
                className="px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-blue-400 font-semibold text-xs border border-blue-500/30 hover:border-blue-400 transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Live Canvas</span>
              </button>

              <button
                id="bento-btn-bundle-get"
                onClick={() => onBuyNow(bundle)}
                className="bg-white text-slate-900 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-white/10 flex items-center gap-2 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-slate-900" />
                <span>Get the Bundle ($60)</span>
              </button>
            </div>
          </div>

          {/* Decorative ambient background orb and chart wireframe */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-8 right-8 hidden sm:flex flex-col gap-2.5 opacity-30 pointer-events-none">
            <div className="w-48 h-2.5 bg-slate-600 rounded-full"></div>
            <div className="w-32 h-2.5 bg-blue-500 rounded-full"></div>
            <div className="w-40 h-2.5 bg-slate-600 rounded-full"></div>
            <div className="w-24 h-2.5 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* Right Stack: Sales & HR Bento Cards (Col-Span 5) */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          
          {/* Bento Tile 2: Sales Dashboard ($15) */}
          <div 
            id="bento-card-sales"
            className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group shadow-md"
          >
            <div className="flex justify-between items-start gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 uppercase">
                    Sales & CRM
                  </span>
                  <span className="text-[10px] text-slate-400">42 DAX</span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Sales Dashboard
                </h4>
                <p className="text-slate-400 text-xs mt-1">
                  Pipeline velocity, quota leaderboard & ARR telemetry
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-400 block">$15</span>
                <span className="text-[10px] font-mono text-slate-500 line-through">$35 USD</span>
              </div>
            </div>

            {/* Mini data metric indicator */}
            <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-700/60 mb-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">Pipeline Velocity</span>
              <span className="font-bold text-white font-mono">$12.4M ARR (+24%)</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectLivePreview('sales-dashboard')}
                className="w-full py-2 bg-slate-700/70 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Live View</span>
              </button>
              <button
                onClick={() => onBuyNow(sales)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Buy — $15</span>
              </button>
            </div>
          </div>

          {/* Bento Tile 3: HR Dashboard ($20) */}
          <div 
            id="bento-card-hr"
            className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group shadow-md"
          >
            <div className="flex justify-between items-start gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    People Analytics
                  </span>
                  <span className="text-[10px] text-slate-400">38 DAX</span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  HR Dashboard
                </h4>
                <p className="text-slate-400 text-xs mt-1">
                  Turnover analysis, 9-box matrix & eNPS sentiment
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-400 block">$20</span>
                <span className="text-[10px] font-mono text-slate-500 line-through">$45 USD</span>
              </div>
            </div>

            {/* Mini data metric indicator */}
            <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-700/60 mb-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">Retention Rate</span>
              <span className="font-bold text-emerald-400 font-mono">92.4% (+4.1%)</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectLivePreview('hr-dashboard')}
                className="w-full py-2 bg-slate-700/70 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Live View</span>
              </button>
              <button
                onClick={() => onBuyNow(hr)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Buy — $20</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bento Row: 3 Equal-Sized Bento Tiles (Cols 4, 4, 4) */}

        {/* Bento Tile 4: Finance Analytics ($25) */}
        <div 
          id="bento-card-finance"
          className="col-span-12 md:col-span-4 bg-slate-800/50 border border-slate-700 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group shadow-md"
        >
          <div>
            <div className="flex justify-between items-start gap-2 mb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 uppercase">
                  CFO Suite
                </span>
                <h4 className="text-lg font-bold text-white leading-tight mt-1 group-hover:text-blue-400 transition-colors">
                  Finance<br />Analytics
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-blue-400">$25</span>
                <span className="text-[10px] text-slate-500 block">USD</span>
              </div>
            </div>

            {/* Visual Column Sparkline Widget */}
            <div className="flex items-end gap-1.5 h-12 my-3 p-2 bg-slate-900/60 rounded-xl border border-slate-700/60">
              <div className="h-4 w-2 bg-blue-500/40 rounded-full"></div>
              <div className="h-6 w-2 bg-blue-500/60 rounded-full"></div>
              <div className="h-8 w-2 bg-blue-500 rounded-full"></div>
              <div className="h-5 w-2 bg-blue-500/50 rounded-full"></div>
              <div className="h-10 w-2 bg-blue-400 rounded-full"></div>
              <div className="h-7 w-2 bg-blue-500/70 rounded-full"></div>
              <div className="h-9 w-2 bg-blue-400 rounded-full"></div>
              <div className="h-11 w-2 bg-blue-300 rounded-full"></div>
              <span className="text-[10px] text-slate-400 font-mono ml-auto">EBITDA +28.5%</span>
            </div>

            <p className="text-slate-400 text-xs line-clamp-2">
              GAAP/IFRS P&L statement matrix, OPEX breakdown, and cash runway ratios.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => onSelectLivePreview('finance-dashboard')}
              className="py-2 bg-slate-700/70 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
            >
              Preview
            </button>
            <button
              onClick={() => onBuyNow(finance)}
              className="py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-colors"
            >
              Purchase ($25)
            </button>
          </div>
        </div>

        {/* Bento Tile 5: E-commerce Insights ($30) */}
        <div 
          id="bento-card-ecommerce"
          className="col-span-12 md:col-span-4 bg-slate-800/50 border border-slate-700 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group shadow-md"
        >
          <div>
            <div className="flex justify-between items-start gap-2 mb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 uppercase">
                  Omnichannel
                </span>
                <h4 className="text-lg font-bold text-white leading-tight mt-1 group-hover:text-blue-400 transition-colors">
                  E-commerce<br />Insights
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-blue-400">$30</span>
                <span className="text-[10px] text-slate-500 block">USD</span>
              </div>
            </div>

            {/* Visual Cohort / ROAS status bar */}
            <div className="h-12 my-3 p-2 bg-slate-900/60 rounded-xl border border-slate-700/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs text-slate-300 font-mono">ROAS 4.82x</span>
              </div>
              <div className="w-20 bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[78%]"></div>
              </div>
            </div>

            <p className="text-slate-400 text-xs line-clamp-2">
              Shopify & Amazon blended GMV, RFM customer cohorts, and CAC payback tracking.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => onSelectLivePreview('ecommerce-dashboard')}
              className="py-2 bg-slate-700/70 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
            >
              Preview
            </button>
            <button
              onClick={() => onBuyNow(ecommerce)}
              className="py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-colors"
            >
              Purchase ($30)
            </button>
          </div>
        </div>

        {/* Bento Tile 6: Bespoke Custom Dashboard Tile */}
        <div 
          id="bento-card-custom"
          className="col-span-12 md:col-span-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-2 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="text-white text-3xl font-black tracking-tight">Custom?</div>
          <p className="text-blue-100 text-xs px-2 leading-relaxed">
            Need a bespoke dashboard for your specific SQL, ERP, or Salesforce dataset? Our Microsoft certified BI architects can build it.
          </p>

          <button
            onClick={() => setCustomQuoteModal(true)}
            className="mt-3 px-5 py-2 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Request a Custom Quote</span>
          </button>
        </div>

      </div>

      {/* Custom Quote Modal */}
      {customQuoteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-100 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Custom Power BI Development
              </h3>
              <button
                onClick={() => setCustomQuoteModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            {customSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Request Received!</h4>
                <p className="text-xs text-slate-300">
                  Our Lead BI Architect will email you within 4 hours with a scope outline and quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-3">
                <p className="text-xs text-slate-300">
                  Tell us about your data source (e.g. SQL Server, Snowflake, NetSuite) and required KPI metrics:
                </p>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. We need a multi-entity consolidation dashboard with currency revaluation and automated refresh..."
                  value={customRequirement}
                  onChange={(e) => setCustomRequirement(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="analyst@company.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-500/25"
                >
                  Submit Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
