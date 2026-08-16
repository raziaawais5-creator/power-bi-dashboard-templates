import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Wallet, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { FINANCE_MONTHLY_DATA } from '../data/templatesData';

interface FinanceDashboardViewProps {
  selectedPeriod: string;
}

export const FinanceDashboardView: React.FC<FinanceDashboardViewProps> = ({
  selectedPeriod,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('revenue');

  // Multiplier
  const mult = selectedPeriod === 'Q1' ? 0.38 : selectedPeriod === 'Q2' ? 0.48 : selectedPeriod === 'L12M' ? 1.3 : 1.0;

  return (
    <div className="space-y-4 text-slate-100">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-purple-950/40 border border-purple-800/40 px-3.5 py-2 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>CFO Executive Suite (GAAP & IFRS Multi-tier Model)</span>
          <span className="text-slate-400">• Period: <strong className="text-white">{selectedPeriod}</strong></span>
        </div>
        <div className="text-[11px] text-purple-300/80 font-mono">
          Model: ChartOfAccounts Hierarchy
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Net Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Gross Revenue</span>
            <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            ${Math.round(8940200 * mult).toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% vs Budget ($8.4M)</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Recognized ARR: <strong className="text-white">${Math.round(7850000 * mult).toLocaleString()}</strong>
          </div>
        </div>

        {/* EBITDA */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">EBITDA</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            ${Math.round(2480000 * mult).toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>27.7% EBITDA Margin (+3.4%)</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Operating Income: <strong className="text-emerald-400">${Math.round(2120000 * mult).toLocaleString()}</strong>
          </div>
        </div>

        {/* Gross Margin */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Gross Profit Margin</span>
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            62.8%
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+280 bps vs Prior Year</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            COGS: <strong className="text-slate-300">${Math.round(3320000 * mult).toLocaleString()}</strong>
          </div>
        </div>

        {/* Free Cash Flow */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Cash & Runway</span>
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            $14.8M
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-amber-400 font-semibold">
            <span>28 Months Runway (at $310k Burn)</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Quick Ratio: <strong className="text-white">2.4x</strong> | Current: <strong className="text-white">3.1x</strong>
          </div>
        </div>
      </div>

      {/* Waterfall & Monthly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* EBITDA Waterfall */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              P&L Waterfall Breakdown ($ Millions)
            </h4>
            <p className="text-[11px] text-slate-400 mb-4">Gross Revenue to Net Operating Income bridge</p>

            {/* Waterfall Bars */}
            <div className="space-y-3">
              {[
                { name: 'Gross Revenue', val: '+$8.94M', pct: 100, color: 'bg-emerald-500', isPositive: true },
                { name: 'Cost of Goods (COGS)', val: '-$3.32M', pct: 37.1, color: 'bg-rose-500', isPositive: false },
                { name: 'Gross Profit Subtotal', val: '+$5.62M', pct: 62.9, color: 'bg-blue-500', isPositive: true },
                { name: 'R&D & Engineering', val: '-$1.42M', pct: 15.9, color: 'bg-amber-500', isPositive: false },
                { name: 'Sales & Marketing OPEX', val: '-$1.18M', pct: 13.2, color: 'bg-amber-500', isPositive: false },
                { name: 'G&A and Administrative', val: '-$0.54M', pct: 6.0, color: 'bg-amber-500', isPositive: false },
                { name: 'EBITDA (Net Operating)', val: '+$2.48M', pct: 27.7, color: 'bg-purple-500', isPositive: true },
              ].map((step, idx) => (
                <div key={idx} className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">{step.name}</span>
                    <span className={`font-mono font-bold ${step.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {step.val}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-1.5 rounded-full ${step.color}`} style={{ width: `${step.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* P&L Statement Hierarchy Matrix */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">P&L Executive Matrix</h4>
            <p className="text-[11px] text-slate-400 mb-3">GAAP Multi-level Subtotals</p>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 bg-slate-950 rounded-lg flex justify-between font-bold text-white border-l-2 border-emerald-400">
                <span>1.0 Total Revenue</span>
                <span>${Math.round(8940200 * mult).toLocaleString()}</span>
              </div>
              <div className="pl-4 pr-2 py-1 flex justify-between text-slate-400 text-[11px]">
                <span>- Subscription SaaS (84%)</span>
                <span>${Math.round(7509700 * mult).toLocaleString()}</span>
              </div>
              <div className="pl-4 pr-2 py-1 flex justify-between text-slate-400 text-[11px]">
                <span>- Professional Services</span>
                <span>${Math.round(1430500 * mult).toLocaleString()}</span>
              </div>

              <div className="p-2 bg-slate-950 rounded-lg flex justify-between font-bold text-rose-300 border-l-2 border-rose-400">
                <span>2.0 Cost of Sales (COGS)</span>
                <span>(${Math.round(3320000 * mult).toLocaleString()})</span>
              </div>

              <div className="p-2 bg-blue-950/40 rounded-lg flex justify-between font-bold text-blue-300 border-l-2 border-blue-400">
                <span>3.0 Gross Profit (62.8%)</span>
                <span>${Math.round(5620200 * mult).toLocaleString()}</span>
              </div>

              <div className="p-2 bg-slate-950 rounded-lg flex justify-between font-bold text-amber-300 border-l-2 border-amber-400">
                <span>4.0 Total Operating OPEX</span>
                <span>(${Math.round(3140000 * mult).toLocaleString()})</span>
              </div>

              <div className="p-2 bg-purple-950/60 rounded-lg flex justify-between font-bold text-purple-200 border-l-2 border-purple-400">
                <span>5.0 Net Operating Profit</span>
                <span>${Math.round(2480200 * mult).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2.5 bg-purple-950/30 border border-purple-900/40 rounded-lg text-xs text-purple-300">
            <strong>Audit Status:</strong> Clean unmodified opinion. Ready for board reporting.
          </div>
        </div>

      </div>
    </div>
  );
};
