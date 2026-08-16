import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  BarChart,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SALES_CHART_DATA, SALES_BY_REGION, SALES_REPS_LEADERBOARD } from '../data/templatesData';

interface SalesDashboardViewProps {
  selectedPeriod: string;
  selectedRegion: string;
}

export const SalesDashboardView: React.FC<SalesDashboardViewProps> = ({
  selectedPeriod,
  selectedRegion,
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [selectedRep, setSelectedRep] = useState<string | null>(null);
  const [metricToggle, setMetricToggle] = useState<'revenue' | 'winRate'>('revenue');

  // Filter multiplier based on selected period
  const periodMultiplier = 
    selectedPeriod === 'Q1' ? 0.35 :
    selectedPeriod === 'Q2' ? 0.45 :
    selectedPeriod === 'Q3' ? 0.52 :
    selectedPeriod === 'Q4' ? 0.68 :
    selectedPeriod === 'L12M' ? 1.25 : 1.0;

  // Filtered reps
  const filteredReps = SALES_REPS_LEADERBOARD.filter(rep => {
    if (selectedRegion === 'All') return true;
    return rep.region.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  const totalRev = Math.round(4829400 * periodMultiplier);
  const targetRev = Math.round(4400000 * periodMultiplier);
  const quotaAttain = Math.round((totalRev / targetRev) * 100);

  // SVG Chart Dimensions
  const chartHeight = 180;
  const chartWidth = 540;
  const maxVal = 800000;

  return (
    <div className="space-y-4 text-slate-100">
      {/* Top Notification / Context Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-950/40 border border-blue-800/40 px-3.5 py-2 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Interactive Power BI Data Engine Active</span>
          <span className="text-slate-400">• Filter: <strong className="text-white">{selectedPeriod}</strong> | Region: <strong className="text-white">{selectedRegion}</strong></span>
        </div>
        <div className="text-[11px] text-blue-300/80 font-mono">
          Model: Star Schema (Fact_Sales)
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Total Revenue (YTD)</span>
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            ${totalRev.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs Last Year</span>
          </div>
          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(quotaAttain, 100)}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Target: ${targetRev.toLocaleString()}</span>
            <span className="font-bold text-blue-400">{quotaAttain}% Attained</span>
          </div>
        </div>

        {/* Pipeline Value */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Active Pipeline</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            ${Math.round(12450000 * periodMultiplier).toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.1% YoY Velocity</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-3">
            Weighted Forecast: <strong className="text-slate-200">${Math.round(4120000 * periodMultiplier).toLocaleString()}</strong>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Deal Win Rate</span>
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            34.8%
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+3.2% vs Benchmark</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-3">
            Closed Won: <strong className="text-white">184 Deals</strong> (Avg $42.5k)
          </div>
        </div>

        {/* Rep Quota Attainment */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Reps at Quota</span>
            <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            83.3%
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-purple-400 font-semibold">
            <span>5 of 6 Reps Above Target</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-3">
            Top Rep: <strong className="text-amber-400">Sarah Jenkins (122%)</strong>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Monthly Revenue vs Target Visual */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart className="w-4 h-4 text-blue-400" />
                Monthly Revenue Trend & Target Variance
              </h4>
              <p className="text-[11px] text-slate-400">Hover over any bar to inspect actual vs quota variance</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => setMetricToggle('revenue')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  metricToggle === 'revenue' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue ($)
              </button>
              <button
                onClick={() => setMetricToggle('winRate')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  metricToggle === 'winRate' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Win Rate (%)
              </button>
            </div>
          </div>

          {/* Responsive SVG Chart */}
          <div className="w-full overflow-x-auto py-2">
            <div className="min-w-[500px]">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
                {/* Horizontal Grid lines */}
                {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
                  <g key={i}>
                    <line
                      x1="30"
                      y1={chartHeight - ratio * (chartHeight - 30)}
                      x2={chartWidth - 10}
                      y2={chartHeight - ratio * (chartHeight - 30)}
                      stroke="#334155"
                      strokeDasharray="3 3"
                      strokeWidth="0.8"
                    />
                    <text
                      x="2"
                      y={chartHeight - ratio * (chartHeight - 30) + 4}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="sans-serif"
                    >
                      ${Math.round((maxVal * ratio) / 1000)}k
                    </text>
                  </g>
                ))}

                {/* Bars */}
                {SALES_CHART_DATA.map((d, index) => {
                  const x = 40 + index * 41;
                  const barW = 22;
                  const val = metricToggle === 'revenue' ? d.revenue : d.winRate * 12000;
                  const targetVal = metricToggle === 'revenue' ? d.target : 35 * 12000;
                  const h = ((val * periodMultiplier) / maxVal) * (chartHeight - 30);
                  const y = chartHeight - h;
                  const targetY = chartHeight - ((targetVal * periodMultiplier) / maxVal) * (chartHeight - 30);
                  const isHovered = hoveredMonth === index;

                  return (
                    <g 
                      key={d.month} 
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredMonth(index)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {/* Target marker line */}
                      <line
                        x1={x - 2}
                        y1={targetY}
                        x2={x + barW + 2}
                        y2={targetY}
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Actual Revenue Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barW}
                        height={Math.max(h, 4)}
                        rx="4"
                        fill={isHovered ? '#60a5fa' : '#2563eb'}
                        className="transition-colors duration-150"
                      />

                      {/* Month label */}
                      <text
                        x={x + barW / 2}
                        y={chartHeight + 14}
                        fill={isHovered ? '#ffffff' : '#94a3b8'}
                        fontSize="10"
                        fontWeight={isHovered ? 'bold' : 'normal'}
                        textAnchor="middle"
                      >
                        {d.month}
                      </text>

                      {/* Hover Tooltip in SVG */}
                      {isHovered && (
                        <g>
                          <rect
                            x={Math.min(Math.max(x - 40, 5), chartWidth - 110)}
                            y={Math.max(y - 45, 0)}
                            width="95"
                            height="40"
                            rx="6"
                            fill="#0f172a"
                            stroke="#3b82f6"
                            strokeWidth="1"
                          />
                          <text
                            x={Math.min(Math.max(x - 40, 5), chartWidth - 110) + 6}
                            y={Math.max(y - 45, 0) + 14}
                            fill="#93c5fd"
                            fontSize="9"
                            fontWeight="bold"
                          >
                            {d.month}: ${Math.round(val * periodMultiplier).toLocaleString()}
                          </text>
                          <text
                            x={Math.min(Math.max(x - 40, 5), chartWidth - 110) + 6}
                            y={Math.max(y - 45, 0) + 28}
                            fill="#f59e0b"
                            fontSize="8"
                          >
                            Target: ${Math.round(targetVal * periodMultiplier).toLocaleString()}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-600 rounded"></span> Actual Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-400 rounded-full"></span> Target Quota
              </span>
            </div>
            <span className="text-slate-400">Total Deals: 540 Closed</span>
          </div>
        </div>

        {/* Right: Regional Breakdown Donut */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Regional Contribution</h4>
            <p className="text-[11px] text-slate-400 mb-3">Sales share & Quota Attainment</p>

            <div className="space-y-3">
              {SALES_BY_REGION.map((reg) => (
                <div key={reg.region} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: reg.color }}></span>
                      <span>{reg.region}</span>
                    </div>
                    <span>${Math.round(reg.revenue * periodMultiplier).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${reg.percentage}%`, backgroundColor: reg.color }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{reg.percentage}% of Global Rev</span>
                    <span className="text-emerald-400 font-semibold">{reg.quota}% Quota</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 p-2.5 bg-blue-950/30 border border-blue-900/40 rounded-lg text-xs text-blue-300">
            <strong>Key Insight:</strong> North America + EMEA drive 73.9% of top-line velocity.
          </div>
        </div>

      </div>

      {/* Reps Leaderboard Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Sales Representative Performance & Attainment Leaderboard
            </h4>
            <p className="text-[11px] text-slate-400">Sortable matrix with dynamic DAX Quota Attainment calculation</p>
          </div>
          <div className="text-xs text-slate-400">
            Showing {filteredReps.length} Sales Executives
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2 pl-2">Sales Rep</th>
                <th className="pb-2">Region</th>
                <th className="pb-2">Deals</th>
                <th className="pb-2">Quota</th>
                <th className="pb-2">Achieved</th>
                <th className="pb-2">Attainment %</th>
                <th className="pb-2 text-right pr-2">Club Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredReps.map((rep) => (
                <tr 
                  key={rep.rep}
                  onClick={() => setSelectedRep(rep.rep === selectedRep ? null : rep.rep)}
                  className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                    selectedRep === rep.rep ? 'bg-blue-950/40 border-l-2 border-blue-400' : ''
                  }`}
                >
                  <td className="py-2.5 pl-2 font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 font-mono">
                      {rep.rep.split(' ').map(n => n[0]).join('')}
                    </span>
                    <span>{rep.rep}</span>
                  </td>
                  <td className="py-2.5 text-slate-300">{rep.region}</td>
                  <td className="py-2.5 text-slate-300">{rep.deals}</td>
                  <td className="py-2.5 text-slate-400">{rep.quota}</td>
                  <td className="py-2.5 font-semibold text-white">{rep.achieved}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${rep.attainment >= 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {rep.attainment}%
                      </span>
                      <div className="w-16 bg-slate-800 rounded-full h-1.5 hidden sm:block">
                        <div 
                          className={`h-1.5 rounded-full ${rep.attainment >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(rep.attainment, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 text-right pr-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      rep.status === 'President Club' 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : rep.status === 'Over Target'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {rep.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
