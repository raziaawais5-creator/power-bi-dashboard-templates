import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  X, 
  Sparkles, 
  BookOpen, 
  Terminal 
} from 'lucide-react';
import { DashboardTemplate } from '../types';

interface DaxExplorerModalProps {
  template: DashboardTemplate;
  inline?: boolean;
  onClose?: () => void;
}

export const DaxExplorerModal: React.FC<DaxExplorerModalProps> = ({
  template,
  inline = false,
  onClose,
}) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [selectedMeasure, setSelectedMeasure] = useState<number>(0);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleDownloadAllDax = () => {
    const allDaxText = template.sampleDax
      .map(m => `// ====================================\n// Measure: ${m.name}\n// Description: ${m.description}\n// ====================================\n${m.code}\n\n`)
      .join('\n');
    
    const element = document.createElement('a');
    const file = new Blob([allDaxText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.slug}_DAX_Measures.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const content = (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{template.name}</span>
              <span className="text-xs bg-slate-800 text-amber-400 font-mono px-2 py-0.5 rounded">
                {template.daxCount} Production Measures
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Fully optimized for VertiPaq engine performance and standard star-schema data models.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadAllDax}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 text-xs font-semibold transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download DAX Pack (.txt)</span>
        </button>
      </div>

      {/* Measures Explorer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left List */}
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 block">
            Featured Measures:
          </span>
          {template.sampleDax.map((measure, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMeasure(idx)}
              className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                selectedMeasure === idx
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Terminal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{measure.name}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">DAX</span>
            </button>
          ))}

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 mt-4">
            <span className="text-amber-400 font-bold block mb-1">⚡ Performance Optimized:</span>
            All DAX measures utilize <code className="text-amber-200">DIVIDE</code> with safe fallbacks and <code className="text-amber-200">CALCULATE</code> context transition guards.
          </div>
        </div>

        {/* Right Code Viewer */}
        <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  {template.sampleDax[selectedMeasure]?.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {template.sampleDax[selectedMeasure]?.description}
                </p>
              </div>

              <button
                onClick={() => handleCopy(template.sampleDax[selectedMeasure]?.code || '', selectedMeasure)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                {copiedIdx === selectedMeasure ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy DAX</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-amber-300/90 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
              {template.sampleDax[selectedMeasure]?.code}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Syntax: Power BI Desktop DAX Standard</span>
            <span className="text-emerald-400 font-semibold">✓ Verified Compatible with latest Fabric engine</span>
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
