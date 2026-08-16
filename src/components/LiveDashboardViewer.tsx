import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  Calendar, 
  Filter, 
  Maximize2, 
  Minimize2, 
  Download, 
  FileCode2, 
  Table, 
  Palette, 
  Share2, 
  Zap, 
  Sparkles, 
  ArrowLeft,
  Check,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { DashboardTemplate } from '../types';
import { DASHBOARD_TEMPLATES } from '../data/templatesData';
import { SalesDashboardView } from './SalesDashboardView';
import { HRDashboardView } from './HRDashboardView';
import { FinanceDashboardView } from './FinanceDashboardView';
import { EcommerceDashboardView } from './EcommerceDashboardView';
import { DaxExplorerModal } from './DaxExplorerModal';
import { DataModelViewer } from './DataModelViewer';
import { ThemeExportModal } from './ThemeExportModal';

interface LiveDashboardViewerProps {
  initialTemplateId?: string;
  onBackToCatalog: () => void;
  onAddToCart: (template: DashboardTemplate) => void;
  onBuyNow: (template: DashboardTemplate) => void;
}

export const LiveDashboardViewer: React.FC<LiveDashboardViewerProps> = ({
  initialTemplateId = 'sales-dashboard',
  onBackToCatalog,
  onAddToCart,
  onBuyNow,
}) => {
  const [activeTemplateId, setActiveTemplateId] = useState<string>(
    initialTemplateId === 'complete-bundle' ? 'sales-dashboard' : initialTemplateId
  );
  const [activeTab, setActiveTab] = useState<'visuals' | 'dax' | 'model' | 'theme'>('visuals');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<'powerbi-dark' | 'classic-light' | 'midnight-blue' | 'emerald-forest'>('powerbi-dark');
  
  // Interactive Slicer states
  const [selectedPeriod, setSelectedPeriod] = useState<string>('YTD');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const currentTemplate = DASHBOARD_TEMPLATES.find(t => t.id === activeTemplateId) || DASHBOARD_TEMPLATES[0];

  const handleExportMockData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Create and trigger download of sample CSV data
      const csvContent = "data:text/csv;charset=utf-8,Date,Entity,Metric,Actual,Target,VariancePct\n2026-01-01,North America,Revenue,320000,300000,6.67\n2026-02-01,North America,Revenue,350000,320000,9.38\n2026-03-01,Europe,Revenue,410000,360000,13.89\n2026-04-01,Asia Pacific,Revenue,380000,370000,2.70\n2026-05-01,Latin America,Revenue,460000,400000,15.00";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${currentTemplate.slug}_SampleData.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto' : ''}`}>
      
      {/* Top Power BI Desktop Emulation App Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand / Return & File name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Marketplace</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
              Pb
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <span>{currentTemplate.name}</span>
                <span className="text-[10px] bg-slate-800 text-amber-400 px-1.5 py-0.2 rounded font-mono">
                  ${currentTemplate.price} USD
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Power BI Interactive Service Live Preview</p>
            </div>
          </div>
        </div>

        {/* Center: Template Quick Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          {[
            { id: 'sales-dashboard', name: 'Sales ($15)' },
            { id: 'hr-dashboard', name: 'HR ($20)' },
            { id: 'finance-dashboard', name: 'Finance ($25)' },
            { id: 'ecommerce-dashboard', name: 'E-commerce ($30)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTemplateId(item.id)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTemplateId === item.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Right: Buy Template CTA & Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMockData}
            disabled={isExporting}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export Data (.csv)'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onBuyNow(currentTemplate)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Download .PBIX — ${currentTemplate.price} USD</span>
          </button>
        </div>
      </div>

      {/* Power BI Ribbon & Slicers Toolbar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: View Tabs (Canvas, DAX, Star Schema, Theme) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('visuals')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'visuals'
                ? 'bg-slate-800 text-amber-300 border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dashboard Canvas</span>
          </button>

          <button
            onClick={() => setActiveTab('dax')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'dax'
                ? 'bg-slate-800 text-amber-300 border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>DAX Measures ({currentTemplate.daxCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('model')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'model'
                ? 'bg-slate-800 text-amber-300 border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Star Schema Model ({currentTemplate.tablesCount} Tables)</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'theme'
                ? 'bg-slate-800 text-amber-300 border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme JSON</span>
          </button>
        </div>

        {/* Right: Interactive Slicers */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Time Slicer */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-medium">Period:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="YTD" className="bg-slate-900">YTD (2026)</option>
              <option value="Q1" className="bg-slate-900">Q1 2026</option>
              <option value="Q2" className="bg-slate-900">Q2 2026</option>
              <option value="Q3" className="bg-slate-900">Q3 2026</option>
              <option value="Q4" className="bg-slate-900">Q4 2026</option>
              <option value="L12M" className="bg-slate-900">Last 12 Months</option>
            </select>
          </div>

          {/* Region / Category Slicer */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400 font-medium">Filter:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Regions / Depts</option>
              <option value="North America" className="bg-slate-900">North America / Tech</option>
              <option value="Europe" className="bg-slate-900">Europe / EMEA</option>
              <option value="Asia Pacific" className="bg-slate-900">Asia Pacific / APAC</option>
              <option value="Latin America" className="bg-slate-900">Latin America / LATAM</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'visuals' && (
          <div>
            {activeTemplateId === 'sales-dashboard' && (
              <SalesDashboardView 
                selectedPeriod={selectedPeriod} 
                selectedRegion={selectedRegion} 
              />
            )}
            {activeTemplateId === 'hr-dashboard' && (
              <HRDashboardView 
                selectedPeriod={selectedPeriod} 
                selectedDept={selectedRegion} 
              />
            )}
            {activeTemplateId === 'finance-dashboard' && (
              <FinanceDashboardView 
                selectedPeriod={selectedPeriod} 
              />
            )}
            {activeTemplateId === 'ecommerce-dashboard' && (
              <EcommerceDashboardView 
                selectedPeriod={selectedPeriod} 
              />
            )}
          </div>
        )}

        {activeTab === 'dax' && (
          <DaxExplorerModal template={currentTemplate} inline={true} />
        )}

        {activeTab === 'model' && (
          <DataModelViewer template={currentTemplate} inline={true} />
        )}

        {activeTab === 'theme' && (
          <ThemeExportModal template={currentTemplate} inline={true} />
        )}
      </div>

      {/* Bottom Sticky Footer with Purchase Guarantee */}
      <div className="mt-auto bg-slate-900 border-t border-slate-800 p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Like what you see? Get this production-ready Power BI template for <span className="text-amber-400">${currentTemplate.price} USD</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Includes .PBIX file, Excel data model, {currentTemplate.daxCount} DAX formulas, and step-by-step PDF manual.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onAddToCart(currentTemplate)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              + Add to Cart (${currentTemplate.price})
            </button>
            <button
              onClick={() => onBuyNow(currentTemplate)}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-500/20 transition-all"
            >
              Instant Download — ${currentTemplate.price} USD
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
