import React, { useState } from 'react';
import { 
  Users, 
  UserMinus, 
  UserPlus, 
  Smile, 
  Clock, 
  Award, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { HR_HEADCOUNT_DATA, HR_DEPT_STATS } from '../data/templatesData';

interface HRDashboardViewProps {
  selectedPeriod: string;
  selectedDept: string;
}

export const HRDashboardView: React.FC<HRDashboardViewProps> = ({
  selectedPeriod,
  selectedDept,
}) => {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const filteredDepts = HR_DEPT_STATS.filter(d => {
    if (selectedDept === 'All') return true;
    return d.department.toLowerCase().includes(selectedDept.toLowerCase());
  });

  return (
    <div className="space-y-4 text-slate-100">
      {/* Context banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-2 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>HR & Workforce Analytics Active Model</span>
          <span className="text-slate-400">• Period: <strong className="text-white">{selectedPeriod}</strong> | Department: <strong className="text-white">{selectedDept}</strong></span>
        </div>
        <div className="text-[11px] text-emerald-300/80 font-mono">
          Model: Star Schema (Dim_Employees)
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Active Headcount */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Active Headcount</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">1,482</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+15.8% Net YoY Growth</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            348 Hires vs 116 Exits (FY26)
          </div>
        </div>

        {/* Turnover Rate */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Annual Turnover</span>
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <UserMinus className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">7.4%</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>-2.1% Below Industry Avg (9.5%)</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Voluntary: <strong className="text-slate-200">5.8%</strong> | Involuntary: <strong className="text-slate-200">1.6%</strong>
          </div>
        </div>

        {/* Time to Hire */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Avg Time to Hire</span>
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">28.4 Days</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>-4.6 Days Velocity</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Offer Acceptance Rate: <strong className="text-emerald-400">89.2%</strong>
          </div>
        </div>

        {/* Employee Satisfaction */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 group hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Employee eNPS</span>
            <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Smile className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">+54.0</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+6 pts vs Q1 Pulse</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            92% Participation Rate (1,363 responses)
          </div>
        </div>
      </div>

      {/* Headcount Timeline Chart & Department Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Headcount Growth SVG Curve */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Headcount Growth & Net Monthly Additions
              </h4>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-mono">
                +202 Net Additions
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Monthly employee intake vs separation trajectory</p>

            {/* SVG Area Chart */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[420px]">
                <svg viewBox="0 0 460 160" className="w-full h-36 overflow-visible">
                  <defs>
                    <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <path
                    d="M 40,120 L 40,110 L 95,98 L 150,84 L 205,72 L 260,60 L 315,48 L 370,36 L 425,20 L 425,140 L 40,140 Z"
                    fill="url(#hrGrad)"
                  />

                  {/* Line */}
                  <path
                    d="M 40,110 L 95,98 L 150,84 L 205,72 L 260,60 L 315,48 L 370,36 L 425,20"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Points */}
                  {[
                    { x: 40, y: 110, val: 1280, m: 'Jan' },
                    { x: 95, y: 98, val: 1302, m: 'Feb' },
                    { x: 150, y: 84, val: 1330, m: 'Mar' },
                    { x: 205, y: 72, val: 1358, m: 'Apr' },
                    { x: 260, y: 60, val: 1386, m: 'May' },
                    { x: 315, y: 48, val: 1415, m: 'Jun' },
                    { x: 370, y: 36, val: 1448, m: 'Jul' },
                    { x: 425, y: 20, val: 1482, m: 'Aug' },
                  ].map((p, i) => (
                    <g key={i} className="cursor-pointer group">
                      <circle cx={p.x} cy={p.y} r="4" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                      <text x={p.x} y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">{p.m}</text>
                      <text x={p.x} y={p.y - 8} fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">{p.val}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 mt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <UserPlus className="w-3.5 h-3.5" /> Avg 43.5 Monthly Hires
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <UserMinus className="w-3.5 h-3.5" /> Avg 14.5 Monthly Exits
            </span>
          </div>
        </div>

        {/* Right: 9-Box Talent Grid */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              9-Box Talent Calibration Matrix
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">Performance vs Growth Potential categorization</p>

            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-semibold text-center">
              {/* Row 1: High Potential */}
              <div 
                onClick={() => setSelectedBox('Future Stars')}
                className={`p-2 rounded-lg bg-blue-900/30 border border-blue-700/50 cursor-pointer hover:bg-blue-800/40 transition-colors ${selectedBox === 'Future Stars' ? 'ring-2 ring-blue-400' : ''}`}
              >
                <div className="text-blue-300">Enigma</div>
                <div className="text-white font-bold text-xs mt-0.5">8.4%</div>
              </div>
              <div 
                onClick={() => setSelectedBox('High Potentials')}
                className={`p-2 rounded-lg bg-emerald-900/40 border border-emerald-700/50 cursor-pointer hover:bg-emerald-800/50 transition-colors ${selectedBox === 'High Potentials' ? 'ring-2 ring-emerald-400' : ''}`}
              >
                <div className="text-emerald-300">Growth Leader</div>
                <div className="text-white font-bold text-xs mt-0.5">14.2%</div>
              </div>
              <div 
                onClick={() => setSelectedBox('Top Stars')}
                className={`p-2 rounded-lg bg-amber-900/40 border border-amber-500/60 cursor-pointer hover:bg-amber-800/50 transition-colors ${selectedBox === 'Top Stars' ? 'ring-2 ring-amber-400' : ''}`}
              >
                <div className="text-amber-300">★ Star Talent</div>
                <div className="text-white font-bold text-xs mt-0.5">12.8%</div>
              </div>

              {/* Row 2: Medium Potential */}
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300">
                <div>Dilemma</div>
                <div className="text-white font-bold text-xs mt-0.5">6.1%</div>
              </div>
              <div className="p-2 rounded-lg bg-blue-900/30 border border-blue-800 text-blue-200">
                <div>Core Contributor</div>
                <div className="text-white font-bold text-xs mt-0.5">24.6%</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-900/30 border border-emerald-800 text-emerald-200">
                <div>High Performer</div>
                <div className="text-white font-bold text-xs mt-0.5">18.4%</div>
              </div>

              {/* Row 3: Low Potential */}
              <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/50 text-rose-300">
                <div>Risk / Action</div>
                <div className="text-white font-bold text-xs mt-0.5">3.2%</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400">
                <div>Effective</div>
                <div className="text-white font-bold text-xs mt-0.5">7.8%</div>
              </div>
              <div className="p-2 rounded-lg bg-blue-900/20 border border-blue-900/40 text-blue-300">
                <div>Trusted Pro</div>
                <div className="text-white font-bold text-xs mt-0.5">4.5%</div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400">
            Top Talent Retention Rate: <strong className="text-emerald-400">96.8%</strong>
          </div>
        </div>

      </div>

      {/* Department Breakdown Matrix */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-bold text-white">Department Headcount, Turnover & Satisfaction</h4>
            <p className="text-[11px] text-slate-400">Granular people metrics across organizational units</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2 pl-2">Department</th>
                <th className="pb-2">Headcount</th>
                <th className="pb-2">Share %</th>
                <th className="pb-2">Turnover %</th>
                <th className="pb-2">Payroll Budget</th>
                <th className="pb-2 text-right pr-2">Satisfaction (eNPS)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDepts.map((d) => (
                <tr key={d.department} className="hover:bg-slate-800/40">
                  <td className="py-2.5 pl-2 font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                    <span>{d.department}</span>
                  </td>
                  <td className="py-2.5 text-slate-200 font-semibold">{d.headcount}</td>
                  <td className="py-2.5 text-slate-400">{Math.round((d.headcount / 1428) * 100)}%</td>
                  <td className="py-2.5">
                    <span className={`font-semibold ${d.turnover < 6 ? 'text-emerald-400' : d.turnover < 9 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {d.turnover}%
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-300">{d.budget}</td>
                  <td className="py-2.5 text-right pr-2 font-bold text-emerald-400">{d.satisfaction}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
