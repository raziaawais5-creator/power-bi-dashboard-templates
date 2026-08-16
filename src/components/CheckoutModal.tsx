import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  X, 
  FileCode2, 
  FileSpreadsheet, 
  Layers,
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, DashboardTemplate } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'payment' | 'success'>('payment');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.template.price * item.quantity, 0);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onOrderCompleted();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // silent fail if canvas not ready
      }
    }, 1200);
  };

  const handleDownloadAsset = (template: DashboardTemplate, type: 'pbix' | 'xlsx' | 'dax') => {
    let filename = '';
    let content = '';
    let mimeType = 'text/plain';

    if (type === 'pbix') {
      filename = `${template.slug}_v4.pbix`;
      content = `Power BI Desktop Template Package: ${template.name}\nLicense: Commercial Resale / Client Deploy\nTimestamp: ${new Date().toISOString()}\nContains: ${template.daxCount} Measures, Star Schema Model, Verified Visuals.`;
    } else if (type === 'xlsx') {
      filename = `${template.slug}_SampleData.csv`;
      content = `Date,Category,DimensionKey,MetricValue,BudgetTarget\n2026-01-01,Enterprise,101,45000,40000\n2026-02-01,Commercial,102,52000,48000\n2026-03-01,SMB,103,38000,35000`;
      mimeType = 'text/csv';
    } else {
      filename = `${template.slug}_DAX_Measures.txt`;
      content = template.sampleDax.map(m => `// ${m.name}\n${m.code}\n`).join('\n\n');
    }

    const element = document.createElement('a');
    const file = new Blob([content], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-slate-100">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'payment' ? (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Secure Checkout
                </h3>
                <p className="text-xs text-slate-400">
                  Instant digital access in USD ($) • 256-bit encrypted
                </p>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Order Items:
              </span>
              <div className="divide-y divide-slate-800/80">
                {cart.map((item) => (
                  <div key={item.template.id} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{item.template.name}</span>
                      <span className="text-slate-400 block text-[11px] font-mono">
                        .PBIX + Excel + DAX Pack
                      </span>
                    </div>
                    <span className="font-bold font-mono text-blue-400">
                      ${item.template.price.toFixed(2)} USD
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                <span>Total Due</span>
                <span className="text-blue-400 text-lg">${subtotal.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'applepay'
                      ? 'bg-slate-800 border-slate-600 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Delivery Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Card Number</label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500 text-center"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500 text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all transform active:scale-98"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authorizing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 fill-white" />
                      <span>Complete Purchase — ${subtotal.toFixed(2)} USD</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Money-back Guarantee • Instant Download Links</span>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Success & Instant Download Portal */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce-short">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                Payment Successful!
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-2">
                Thank you, {name || 'Valued Customer'}!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                Your Power BI template package is ready for instant download below. We have also sent backup access links to <strong className="text-amber-400">{email || 'your email'}</strong>.
              </p>
            </div>

            {/* Download Hub */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Your Download Package:
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Order #PBI-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div 
                    key={item.template.id}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        {item.template.name}
                      </h4>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                        {item.template.daxCount} DAX Measures
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <button
                        onClick={() => handleDownloadAsset(item.template, 'pbix')}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .PBIX</span>
                      </button>

                      <button
                        onClick={() => handleDownloadAsset(item.template, 'xlsx')}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-semibold text-xs transition-colors"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Excel Dataset</span>
                      </button>

                      <button
                        onClick={() => handleDownloadAsset(item.template, 'dax')}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 font-semibold text-xs transition-colors"
                      >
                        <FileCode2 className="w-3.5 h-3.5" />
                        <span>DAX Formula Pack</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps Guide */}
            <div className="text-xs text-slate-400 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-left space-y-1.5">
              <span className="font-bold text-white block">How to open in Power BI Desktop:</span>
              <p>1. Open Power BI Desktop on your computer.</p>
              <p>2. Click <strong>File &gt; Open</strong> and choose the downloaded <code className="text-amber-300">.pbix</code> file.</p>
              <p>3. Go to <strong>Transform Data &gt; Data Source Settings</strong> to point to your live SQL, Excel, or ERP database.</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Close & Return to Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
