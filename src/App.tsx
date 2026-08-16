import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Download, 
  Star, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Eye,
  SlidersHorizontal,
  ExternalLink,
  Code2,
  Table,
  LayoutGrid
} from 'lucide-react';
import { DashboardTemplate, CartItem } from './types';
import { DASHBOARD_TEMPLATES } from './data/templatesData';
import { Header } from './components/Header';
import { TemplateCard } from './components/TemplateCard';
import { BundleHero } from './components/BundleHero';
import { BentoGridShowcase } from './components/BentoGridShowcase';
import { LiveDashboardViewer } from './components/LiveDashboardViewer';
import { DaxExplorerModal } from './components/DaxExplorerModal';
import { DataModelViewer } from './components/DataModelViewer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FaqSection } from './components/FaqSection';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLiveViewerOpen, setIsLiveViewerOpen] = useState<boolean>(false);
  const [liveViewerTemplateId, setLiveViewerTemplateId] = useState<string>('sales-dashboard');

  // Modals state
  const [activeDaxModalTemplate, setActiveDaxModalTemplate] = useState<DashboardTemplate | null>(null);
  const [activeSchemaModalTemplate, setActiveSchemaModalTemplate] = useState<DashboardTemplate | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    // initial sample item for demonstration
    { template: DASHBOARD_TEMPLATES[0], quantity: 1 }
  ]);

  // Handle Cart Operations
  const handleAddToCart = (template: DashboardTemplate) => {
    setCart(prev => {
      const existing = prev.find(item => item.template.id === template.id);
      if (existing) {
        return prev.map(item => 
          item.template.id === template.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { template, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (template: DashboardTemplate) => {
    setCart([{ template, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  const handleRemoveFromCart = (templateId: string) => {
    setCart(prev => prev.filter(item => item.template.id !== templateId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddBundleToCart = (bundleTemplate: DashboardTemplate) => {
    // Replace all with bundle to give best price
    setCart([{ template: bundleTemplate, quantity: 1 }]);
  };

  // Handle opening live preview
  const handleOpenLiveViewer = (templateId: string = 'sales-dashboard') => {
    setLiveViewerTemplateId(templateId);
    setIsLiveViewerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    return DASHBOARD_TEMPLATES.filter(template => {
      // Category filter
      if (activeTab !== 'all' && activeTab !== 'live-viewer' && activeTab !== 'bento-showcase') {
        if (activeTab === 'bundle' && template.category !== 'bundle') return false;
        if (activeTab !== 'bundle' && template.category !== activeTab) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = template.name.toLowerCase().includes(q);
        const matchesDesc = template.description.toLowerCase().includes(q);
        const matchesCat = template.category.toLowerCase().includes(q);
        const matchesFeature = template.features.some(f => f.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesCat || matchesFeature;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  const bundleTemplate = DASHBOARD_TEMPLATES.find(t => t.id === 'complete-bundle')!;

  // If live dashboard viewer mode is open
  if (isLiveViewerOpen) {
    return (
      <LiveDashboardViewer
        initialTemplateId={liveViewerTemplateId}
        onBackToCatalog={() => setIsLiveViewerOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenLiveViewer={handleOpenLiveViewer}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 w-full">
        
        {/* Bento Showcase Grid Section */}
        {(!searchQuery && (activeTab === 'all' || activeTab === 'bento-showcase')) && (
          <section id="bento-grid-section">
            <BentoGridShowcase
              onSelectLivePreview={handleOpenLiveViewer}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onViewDax={(t) => setActiveDaxModalTemplate(t)}
              onViewSchema={(t) => setActiveSchemaModalTemplate(t)}
            />
          </section>
        )}

        {/* Featured Master Bundle Banner (Visible in bundle tab or with search) */}
        {activeTab === 'bundle' && !searchQuery && (
          <BundleHero
            bundleTemplate={bundleTemplate}
            onSelectLivePreview={() => handleOpenLiveViewer('sales-dashboard')}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Templates Grid Section */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-blue-400" />
                {activeTab === 'all' || activeTab === 'bento-showcase' 
                  ? 'Detailed Catalog & Source Files' 
                  : `${activeTab.toUpperCase()} Templates`}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every template includes full .PBIX, Excel star-schema model, DAX code library, and PDF setup guide.
              </p>
            </div>

            {/* Quick Live Preview Launch Pill */}
            <button
              onClick={() => handleOpenLiveViewer('sales-dashboard')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all group"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Launch Interactive Live Canvas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelectLivePreview={(t) => handleOpenLiveViewer(t.id)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onViewDax={(t) => setActiveDaxModalTemplate(t)}
                onViewSchema={(t) => setActiveSchemaModalTemplate(t)}
              />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 bg-slate-800/40 border border-slate-700 rounded-3xl space-y-3">
              <p className="text-slate-200 font-bold text-base">No templates found for "{searchQuery}"</p>
              <p className="text-xs text-slate-400">Try searching for "Sales", "HR", "Finance", or "E-commerce".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-blue-400 border border-blue-500/30"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Technical Capabilities Matrix in Bento style */}
        <section className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Architecture & Compliance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why Teams Choose Our Power BI Templates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="font-bold text-white text-sm">Kimball Star-Schema Models</h4>
              <p className="text-slate-400 leading-relaxed">
                Clean separation of Fact and Dimension tables ensuring blazing-fast report refreshes and memory efficiency in Power BI Desktop and Service.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="font-bold text-white text-sm">Documented DAX Formulas</h4>
              <p className="text-slate-400 leading-relaxed">
                Time-intelligence measures, dynamic variance %, YTD/QTD calculations, and semi-additive balances written with best-practice formatting.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="font-bold text-white text-sm">1-Click Theme Customization</h4>
              <p className="text-slate-400 leading-relaxed">
                Includes custom JSON theme files so you can instantaneously align all colors, card corners, and chart palettes with your company brand guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ & Testimonials */}
        <FaqSection />

      </main>

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">
              BI
            </div>
            <span className="font-bold text-white">Template<span className="text-blue-500">Store</span></span>
            <span>— powerbi.com/power-bi-templates</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Sales ($15)</span>
            <span>•</span>
            <span>HR ($20)</span>
            <span>•</span>
            <span>Finance ($25)</span>
            <span>•</span>
            <span>E-commerce ($30)</span>
            <span>•</span>
            <span className="text-blue-400 font-bold">Complete Bundle ($60)</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Prices in USD ($). Instant digital delivery.
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onAddBundle={handleAddBundleToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderCompleted={handleClearCart}
      />

      {activeDaxModalTemplate && (
        <DaxExplorerModal
          template={activeDaxModalTemplate}
          onClose={() => setActiveDaxModalTemplate(null)}
        />
      )}

      {activeSchemaModalTemplate && (
        <DataModelViewer
          template={activeSchemaModalTemplate}
          onClose={() => setActiveSchemaModalTemplate(null)}
        />
      )}

    </div>
  );
}

