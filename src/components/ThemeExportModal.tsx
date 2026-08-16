import React, { useState } from 'react';
import { 
  Palette, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  X, 
  Eye 
} from 'lucide-react';
import { DashboardTemplate } from '../types';

interface ThemeExportModalProps {
  template: DashboardTemplate;
  inline?: boolean;
  onClose?: () => void;
}

export const ThemeExportModal: React.FC<ThemeExportModalProps> = ({
  template,
  inline = false,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(template.colorScheme.primary);
  const [accentColor, setAccentColor] = useState(template.colorScheme.accent);

  const themeJson = {
    name: `${template.name} Corporate Palette`,
    dataColors: [
      primaryColor,
      accentColor,
      '#10b981',
      '#8b5cf6',
      '#ec4899',
      '#06b6d4',
      '#64748b',
      '#f97316'
    ],
    background: '#0f172a',
    foreground: '#f8fafc',
    tableAccent: primaryColor,
    visualStyles: {
      '*': {
        '*': {
          title: [{ show: true, fontColor: { solid: { color: '#ffffff' } }, fontSize: 11 }],
          background: [{ show: true, color: { solid: { color: '#1e293b' } }, transparency: 10 }],
          border: [{ show: true, color: { solid: { color: '#334155' } }, radius: 10 }]
        }
      }
    }
  };

  const jsonString = JSON.stringify(themeJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([jsonString], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.slug}_powerbi_theme.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const content = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-400/10 text-purple-400 flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Power BI Custom Theme Generator</span>
              <span className="text-xs bg-slate-800 text-purple-300 font-mono px-2 py-0.5 rounded">
                .JSON Format
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Import directly into Power BI Desktop via <strong className="text-slate-200">View &gt; Themes &gt; Browse for themes</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .json Theme</span>
          </button>
        </div>
      </div>

      {/* Palette Editor & Code */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Controls */}
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Customize Brand Swatches:
          </span>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Primary Brand Accent</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Secondary Accent</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-400 block mb-2">Palette Preview:</span>
            <div className="flex items-center gap-1.5">
              {themeJson.dataColors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-md shadow-sm border border-slate-700"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
            Generated Power BI Theme JSON:
          </span>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-purple-300 max-h-60 overflow-y-auto shadow-inner leading-relaxed">
            {jsonString}
          </div>
        </div>
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {content}
      </div>
    </div>
  );
};
