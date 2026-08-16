import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Download, 
  Layers, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  FileCode2,
  Palette
} from 'lucide-react';
import { DashboardTemplate } from '../types';

interface BundleHeroProps {
  bundleTemplate: DashboardTemplate;
  onSelectLivePreview: (template: DashboardTemplate) => void;
  onBuyNow: (template: DashboardTemplate) => void;
  onAddToCart: (template: DashboardTemplate) => void;
}

export const BundleHero: React.FC<BundleHeroProps> = ({
  bundleTemplate,
  onSelectLivePreview,
  onBuyNow,
  onAddToCart,
}) => {
  return (
    <div 
      id="bundle-hero-section"
      className="relative rounded-3xl bg-slate-800/50 border border-slate-700 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Decorative gradient glowing orb */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Offer Details */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Ultimate Power BI Master Bundle</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Get All 4 Dashboards for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300">$60 USD</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Instant access to the complete enterprise BI suite: <strong className="text-white">Sales ($15)</strong>, <strong className="text-white">HR ($20)</strong>, <strong className="text-white">Finance ($25)</strong>, and <strong className="text-white">E-commerce ($30)</strong>. Includes 180+ DAX formulas, star-schema Excel datasets, Figma design kit, and custom Power BI color themes.
          </p>

          {/* Included Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Sales Dashboard ($15 Individual Value)',
              'HR & Talent Dashboard ($20 Individual Value)',
              'CFO Finance Dashboard ($25 Individual Value)',
              'E-commerce & D2C Dashboard ($30 Individual Value)',
              '180+ Production DAX Measures',
              '12 Corporate Power BI Theme .JSONs',
              'Star Schema Excel Starter Files',
              'Commercial Reseller / Client License'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Social Proof & Guarantee */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 border-t border-slate-700/80">
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <div className="flex text-blue-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-blue-400" />
                ))}
              </div>
              <span className="text-slate-200">5.0</span>
              <span className="text-slate-400 font-normal">(890+ BI Analysts Rated)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Lifetime Updates & Support Included</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Box & Action Stage */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Bundle Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white tracking-tight">$60</span>
                <span className="text-sm font-bold text-slate-400">USD</span>
                <span className="text-base text-slate-500 line-through font-semibold">$90 USD</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block bg-blue-600/20 text-blue-300 border border-blue-500/40 text-xs font-extrabold px-3 py-1 rounded-full">
                SAVE $30 (33% OFF)
              </span>
            </div>
          </div>

          {/* Interactive Live Preview Callout */}
          <div className="my-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bold text-white">Test-Drive on Website</p>
                <p className="text-[11px] text-slate-400">Click to interact with the live dashboards directly.</p>
              </div>
            </div>
            <button
              onClick={() => onSelectLivePreview(bundleTemplate)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 font-semibold text-xs border border-blue-500/30 whitespace-nowrap transition-colors"
            >
              Open Live
            </button>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              id="bundle-buy-now-btn"
              onClick={() => onBuyNow(bundleTemplate)}
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-blue-50 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-white/10 transition-all transform active:scale-98"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Instant Download Bundle — $60 USD</span>
            </button>

            <button
              id="bundle-add-cart-btn"
              onClick={() => onAddToCart(bundleTemplate)}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>+ Add Complete Bundle to Cart</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3 text-emerald-400" /> Instant .zip file
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-400" /> 100% Verified
            </span>
            <span>•</span>
            <span>All Power BI Versions</span>
          </div>
        </div>

      </div>
    </div>
  );
};
