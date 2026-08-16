import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Cpu, 
  Star, 
  CheckCircle,
  FileCode2,
  Users
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which versions of Power BI are supported?',
      a: 'All templates are 100% compatible with Power BI Desktop (both Microsoft Store and direct installer versions), Power BI Service (Pro and Premium Per User), Power BI Report Server, Power BI Mobile apps (iOS and Android), and Microsoft Fabric Lakehouse semantic models.'
    },
    {
      q: 'How do I connect my own company data into these templates?',
      a: 'Each template is built on a clean, standardized Star Schema. You can easily click "Transform Data > Data Source Settings" in Power BI Desktop to remap the queries to your live SQL database, Snowflake, BigQuery, Excel, SharePoint, Salesforce, or CSV files in under 5 minutes.'
    },
    {
      q: 'Can I customize the colors, logos, and DAX measures?',
      a: 'Yes! You have full unlocked edit access. You can add or modify visuals, change the theme using the included JSON theme files, tweak any DAX formula, or add your company logo.'
    },
    {
      q: 'What is included in the Complete Dashboard Bundle ($60)?',
      a: 'The $60 Master Bundle includes all 4 standalone templates (Sales $15, HR $20, Finance $25, E-commerce $30 — $90 total value), 180+ documented DAX measures, 4 ready-to-use sample Excel datasets, 12 custom corporate Power BI theme JSON files, the Figma design UI kit, and free lifetime template updates.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer an unconditional 30-day money-back guarantee. If the templates do not meet your business requirements or work with your data, simply reach out for a full prompt refund.'
    }
  ];

  const testimonials = [
    {
      name: 'David Van Der Beek',
      role: 'Lead BI Architect at FinTech Global',
      text: 'Saved our analytics team at least 80 hours of modeling and visual design work. The Finance CFO and Sales templates have rock-solid DAX measures.',
      rating: 5,
      avatar: 'DV'
    },
    {
      name: 'Sarah Lindqvist',
      role: 'Head of People Operations',
      text: 'The HR dashboard is brilliant! We replaced three disconnected spreadsheets with this single .pbix file and our executive team loves the 9-box matrix.',
      rating: 5,
      avatar: 'SL'
    },
    {
      name: 'Marcus Sterling',
      role: 'E-commerce Director',
      text: 'The E-commerce dashboard with blended ROAS and RFM cohorts paid for itself on day one. Clean visuals, easy data mapping.',
      rating: 5,
      avatar: 'MS'
    }
  ];

  return (
    <section className="py-12 border-t border-slate-800 space-y-12">
      
      {/* Testimonials */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">
            Trusted by 3,500+ Power BI Developers & CFOs
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Loved by Analytics Teams Worldwide
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-800/40 border border-slate-700 rounded-3xl p-5 flex flex-col justify-between space-y-3 hover:border-blue-500/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex text-blue-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-blue-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-700/60">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-400">
            Everything you need to know about our Power BI templates, licenses, and format support.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div
                key={idx}
                className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden transition-all hover:border-slate-600"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-700/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
