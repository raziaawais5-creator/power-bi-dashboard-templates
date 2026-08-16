import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  X, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Zap,
  Check
} from 'lucide-react';
import { CartItem, DashboardTemplate } from '../types';
import { DASHBOARD_TEMPLATES } from '../data/templatesData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (templateId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onAddBundle: (bundleTemplate: DashboardTemplate) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onAddBundle,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const bundleTemplate = DASHBOARD_TEMPLATES.find(t => t.id === 'complete-bundle')!;
  const hasBundleInCart = cart.some(item => item.template.id === 'complete-bundle');

  const subtotal = cart.reduce((sum, item) => sum + item.template.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BIREADY' || promoCode.trim().toUpperCase() === 'POWERBI10') {
      setAppliedDiscount(10);
      setPromoMessage('10% VIP Discount Applied!');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid coupon code. Try BIREADY');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Your Template Cart</h3>
                <p className="text-xs text-slate-400">{cart.length} item(s) selected</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-white text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our Sales, HR, Finance, or E-commerce templates to get started.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.template.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex items-start justify-between gap-3 group hover:border-blue-500/40 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      {item.template.category.toUpperCase()}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {item.template.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Includes .pbix + Excel + DAX Pack
                    </p>
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-sm font-black text-blue-400">
                        ${item.template.price}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">USD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.template.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {/* Bundle Upsell if individual items are added */}
            {!hasBundleInCart && cart.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 via-slate-900 to-indigo-950/30 border border-blue-500/40 space-y-2">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Upgrade to Master Bundle & Save $30!</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Get All 4 templates (Sales, HR, Finance, E-commerce) for only <strong className="text-white">$60 USD</strong> instead of $90.
                </p>
                <button
                  onClick={() => onAddBundle(bundleTemplate)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Switch to All-4 Bundle ($60)</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. BIREADY)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <div className={`text-[11px] font-medium ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {promoMessage}
                </div>
              )}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200">${subtotal.toFixed(2)} USD</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-blue-400 font-mono text-base">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={onCheckout}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-98"
              >
                <span>Proceed to Checkout (${total.toFixed(2)} USD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant .PBIX & .XLSX delivery after checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
