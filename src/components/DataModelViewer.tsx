import React from 'react';
import { 
  Table, 
  Key, 
  Link2, 
  Layers, 
  FileSpreadsheet, 
  X, 
  Download,
  Info
} from 'lucide-react';
import { DashboardTemplate } from '../types';
import { STAR_SCHEMA_TABLES } from '../data/templatesData';

interface DataModelViewerProps {
  template: DashboardTemplate;
  inline?: boolean;
  onClose?: () => void;
}

export const DataModelViewer: React.FC<DataModelViewerProps> = ({
  template,
  inline = false,
  onClose,
}) => {
  const content = (
    <div className="space-y-4">
      {/* Model Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Star Schema Architecture: {template.name}</span>
              <span className="text-xs bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded">
                1 Fact + 4 Dimensions (1:*)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Clean star-schema design following Kimball dimensional modeling best practices for lightning-fast DAX aggregation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
            Relationship: 1-to-Many (*) Single Direction
          </span>
        </div>
      </div>

      {/* Model Visual Stage */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Entity Relationship Diagram (ERD)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAR_SCHEMA_TABLES.map((tbl) => {
            const isFact = tbl.type === 'Fact Table';

            return (
              <div
                key={tbl.name}
                className={`rounded-xl border p-3.5 bg-slate-950/80 transition-all ${
                  isFact 
                    ? 'border-blue-500/60 ring-1 ring-blue-500/30 md:col-span-2 lg:col-span-1 shadow-lg shadow-blue-500/10' 
                    : 'border-slate-800'
                }`}
              >
                {/* Table Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-2.5">
                  <div className="flex items-center gap-2">
                    <Table className={`w-4 h-4 ${isFact ? 'text-blue-400' : 'text-emerald-400'}`} />
                    <span className="font-bold text-xs text-white font-mono">{tbl.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isFact ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tbl.type}
                  </span>
                </div>

                {/* Column List */}
                <div className="space-y-1 text-[11px] font-mono">
                  {tbl.columns.map((col, cIdx) => {
                    const isPK = col.includes('(PK)');
                    const isFK = col.includes('(FK)');

                    return (
                      <div
                        key={cIdx}
                        className={`flex items-center justify-between p-1 rounded ${
                          isPK ? 'bg-amber-400/10 text-amber-300 font-semibold' :
                          isFK ? 'bg-blue-400/10 text-blue-300' : 'text-slate-400'
                        }`}
                      >
                        <span className="truncate">{col}</span>
                        {isPK && <Key className="w-3 h-3 text-amber-400 shrink-0" />}
                        {isFK && <Link2 className="w-3 h-3 text-blue-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Model Notes */}
        <div className="mt-4 p-3 bg-slate-950/90 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Data Refresh Optimization:</strong> All keys are integers (Surrogate Keys) to maximize VertiPaq dictionary encoding compression and sub-second query rendering on large datasets (10M+ rows).
          </span>
        </div>
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
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
