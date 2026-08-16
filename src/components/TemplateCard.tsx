import React from 'react';
import { 
  Check, 
  Download, 
  ExternalLink, 
  Eye, 
  FileSpreadsheet, 
  Layers, 
  Sparkles, 
  Star, 
  Zap,
  Code2,
  Table
} from 'lucide-react';
import { DashboardTemplate } from '../types';

interface TemplateCardProps {
  template: DashboardTemplate;
  onSelectLivePreview: (template: DashboardTemplate) => void;
  onAddToCart: (template: DashboardTemplate) => void;
  onBuyNow: (template: DashboardTemplate) => void;
  onViewDax: (template: DashboardTemplate) => void;
  onViewSchema: (template: DashboardTemplate) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelectLivePreview,
  onAddToCart,
  onBuyNow,
  onViewDax,
  onViewSchema,
}) => {
  const isBundle = template.category === 'bundle';

  return (
    <div 
      id={`template-card-${template.id}`}
      className={`rounded-3xl bg-slate-800/50 border transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden group ${
        isBundle 
          ? 'border-blue-500/60 ring-2 ring-blue-500/20 bg-gradient-to-b from-slate-800/60 via-slate-900 to-blue-950/20' 
          : 'border-slate-700 hover:border-blue-500/50'
      }`}
    >
      <div>
        {/* Card Header & Badges */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
                {template.category.toUpperCase()}
              </span>
              {template.badge && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-200 border border-slate-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  {template.badge}
                </span>
              )}
            </div>

            {/* Price badge in USD */}
            <div className="text-right">
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-2xl font-black text-blue-400 tracking-tight">
                  ${template.price}
                </span>
                <span className="text-xs font-bold text-slate-400">USD</span>
              </div>
              {template.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  ${template.originalPrice} USD
                </span>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-blue-400 transition-colors">
            {template.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {template.description}
          </p>

          {/* Reviews & Metrics count */}
          <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-slate-700/70 py-2.5 mb-4">
            <div className="flex items-center gap-1 text-blue-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-blue-400" />
              <span>{template.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({template.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{template.daxCount} DAX</span>
            </div>
            <div className="flex items-center gap-1">
              <Table className="w-3.5 h-3.5 text-slate-400" />
              <span>{template.tablesCount} Tables</span>
            </div>
          </div>

          {/* Interactive Visual Preview Stage Mockup */}
          <div 
            onClick={() => onSelectLivePreview(template)}
            className="group/stage relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3.5 cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden mb-4"
          >
            {/* Top Power BI Bar emulation */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-slate-300 font-sans font-semibold truncate max-w-[140px]">{template.slug}.pbix</span>
              </div>
              <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                ● Interactive Canvas
              </span>
            </div>

            {/* Metric widgets preview */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {template.previewMetrics.slice(0, 4).map((metric, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-2">
                  <span className="text-[10px] text-slate-400 block truncate">{metric.label}</span>
                  <div className="flex items-baseline justify-between gap-1 mt-0.5">
                    <span className="text-xs font-bold text-white font-mono">{metric.value}</span>
                    <span className={`text-[9px] font-semibold ${metric.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual preview hover overlay */}
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] opacity-0 group-hover/stage:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
              <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover/stage:scale-110 transition-transform">
                <Eye className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-blue-300 flex items-center gap-1">
                Open Interactive Dashboard <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Core Features List */}
          <div className="space-y-1.5 mb-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dashboard Highlights:</h4>
            {template.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>

          {/* Assets Pack Pills */}
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Package Includes:</span>
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-800 text-blue-300 px-2 py-0.5 rounded-md font-mono font-bold text-[10px] border border-slate-700">.PBIX</span>
              <span className="bg-slate-800 text-emerald-300 px-2 py-0.5 rounded-md font-mono font-bold text-[10px] border border-slate-700">.XLSX</span>
              <span className="bg-slate-800 text-purple-300 px-2 py-0.5 rounded-md font-mono font-bold text-[10px] border border-slate-700">DAX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 border-t border-slate-700/70 mt-4">
        {/* Quick Tools Row (DAX & Schema) */}
        <div className="flex items-center justify-between gap-2 py-3 text-xs">
          <button 
            id={`btn-view-dax-${template.id}`}
            onClick={() => onViewDax(template)}
            className="text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>View DAX Formulas</span>
          </button>
          <button 
            id={`btn-view-schema-${template.id}`}
            onClick={() => onViewSchema(template)}
            className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <Table className="w-3.5 h-3.5 text-emerald-400" />
            <span>Star Schema</span>
          </button>
        </div>

        {/* Primary CTA Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            id={`btn-live-preview-${template.id}`}
            onClick={() => onSelectLivePreview(template)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-100 font-semibold text-xs border border-slate-600 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Live Preview</span>
          </button>

          <button
            id={`btn-buy-now-${template.id}`}
            onClick={() => onBuyNow(template)}
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 ${
              isBundle
                ? 'bg-white hover:bg-blue-50 text-slate-900 shadow-white/10'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Buy — ${template.price}</span>
          </button>
        </div>

        {/* Add to cart secondary */}
        <button
          id={`btn-add-cart-${template.id}`}
          onClick={() => onAddToCart(template)}
          className="w-full mt-2 text-center text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors flex items-center justify-center gap-1"
        >
          <span>+ Add to Cart (${template.price} USD)</span>
        </button>
      </div>
    </div>
  );
};
