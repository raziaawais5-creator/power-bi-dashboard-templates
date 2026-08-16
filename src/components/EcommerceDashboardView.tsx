import React, { useState } from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Target, 
  CreditCard, 
  Repeat, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Zap,
  Percent
} from 'lucide-react';
import { ECOM_CHANNEL_DATA } from '../data/templatesData';

interface EcommerceDashboardViewProps {
  selectedPeriod: string;
}

export const EcommerceDashboardView: React.FC<EcommerceDashboardViewProps> = ({
  selectedPeriod,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  // Multiplier
  const mult = selectedPeriod === 'Q1' ? 0.36 : selectedPeriod === 'Q2' ? 0.46 : selectedPeriod === 'L12M' ? 1.3 : 1.0;

  return (
    <div className="space-y-4 text-slate-100">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-orange-950/40 border border-orange-800/40 px-3.5 py-2 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-orange-300">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Shopify & Omnichannel E-commerce Data Engine</span>
          <span className="text-slate-400">• Period: <strong className="text-white">{selectedPeriod}</strong></span>
        </div>
        <div className="text-[11px] text-orange-300/80 font-mono">
          Model: RFM_Customer_Transactions
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* GMV */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-orange-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">GMV (Gross Merchandise)</span>
            <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            ${Math.round(1924500 * mult).toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+28.7% YoY Volume</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Total Orders: <strong className="text-white">22,274</strong> (Avg $86.40 AOV)
          </div>
        </div>

        {/* Blended ROAS */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Blended ROAS</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">4.2x</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+$0.82 Return per Ad Dollar</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Total Ad Spend: <strong className="text-slate-300">$358,000</strong>
          </div>
        </div>

        {/* Blended CAC */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Blended CAC</span>
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">$31.20</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>-8.4% Customer Acquisition Cost</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            LTV to CAC Ratio: <strong className="text-emerald-400">4.6x Healthy</strong>
          </div>
        </div>

        {/* Repeat Rate */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Repeat Purchase Rate</span>
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Repeat className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">38.6%</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+4.2% 90-day Cohort</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            90-Day LTV: <strong className="text-white">$142.50</strong>
          </div>
        </div>
      </div>

      {/* Channel Attribution & Cart Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Marketing Attribution Table */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <h4 className="text-sm font-bold text-white mb-1">Ad Channel Attribution, Spend & ROAS Efficiency</h4>
          <p className="text-[11px] text-slate-400 mb-3">Multi-touch attribution across acquisition channels</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-2 pl-2">Channel</th>
                  <th className="pb-2">Ad Spend</th>
                  <th className="pb-2">Attributed Rev</th>
                  <th className="pb-2">ROAS</th>
                  <th className="pb-2 text-right pr-2">CAC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {ECOM_CHANNEL_DATA.map((ch) => (
                  <tr key={ch.channel} className="hover:bg-slate-800/40">
                    <td className="py-2.5 pl-2 font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }}></span>
                      <span>{ch.channel}</span>
                    </td>
                    <td className="py-2.5 text-slate-300 font-mono">{ch.spend}</td>
                    <td className="py-2.5 text-emerald-400 font-bold font-mono">{ch.revenue}</td>
                    <td className="py-2.5">
                      <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded font-bold">
                        {ch.roas}x
                      </span>
                    </td>
                    <td className="py-2.5 text-right pr-2 text-slate-300 font-mono">{ch.cac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Funnel Conversion Stage */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Conversion Funnel</h4>
            <p className="text-[11px] text-slate-400 mb-3">Store Visit to Purchase</p>

            <div className="space-y-2 text-xs">
              {[
                { stage: 'Store Sessions', count: '584,200', pct: 100 },
                { stage: 'Product Page Views', count: '312,400', pct: 53.5 },
                { stage: 'Add to Cart', count: '48,600', pct: 8.3 },
                { stage: 'Initiate Checkout', count: '32,100', pct: 5.5 },
                { stage: 'Completed Orders', count: '22,274', pct: 3.82 },
              ].map((st, i) => (
                <div key={i} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-[11px] font-semibold text-white mb-1">
                    <span>{st.stage}</span>
                    <span className="font-mono text-amber-400">{st.count} ({st.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${st.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 p-2 bg-orange-950/30 border border-orange-900/40 rounded-lg text-xs text-orange-300">
            <strong>Conversion Rate:</strong> 3.82% (+0.6% vs benchmark).
          </div>
        </div>

      </div>
    </div>
  );
};
