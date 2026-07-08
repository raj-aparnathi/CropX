'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Download, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const DIAGNOSES = [
  {
    id: 'scan-001',
    cropEmoji: '🍅',
    crop: 'Tomato',
    variety: 'Hybrid F1',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    confidence: 94.2,
    severity: 'high',
    affectedArea: '~35%',
    date: '08 Jul 2026',
    time: '09:14 AM',
    field: 'Field A',
    treated: false,
    treatmentDue: '2 days',
  },
  {
    id: 'scan-002',
    cropEmoji: '🌾',
    crop: 'Rice',
    variety: 'IR-64',
    disease: 'Brown Spot',
    scientificName: 'Bipolaris oryzae',
    confidence: 87.5,
    severity: 'medium',
    affectedArea: '~18%',
    date: '07 Jul 2026',
    time: '02:31 PM',
    field: 'Paddy B',
    treated: true,
    treatmentDue: null,
  },
  {
    id: 'scan-003',
    cropEmoji: '🌿',
    crop: 'Wheat',
    variety: 'GW-496',
    disease: 'Powdery Mildew',
    scientificName: 'Blumeria graminis',
    confidence: 91.8,
    severity: 'low',
    affectedArea: '~8%',
    date: '06 Jul 2026',
    time: '11:05 AM',
    field: 'Plot C',
    treated: true,
    treatmentDue: null,
  },
  {
    id: 'scan-004',
    cropEmoji: '🌽',
    crop: 'Maize',
    variety: 'DHM-117',
    disease: 'Northern Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    confidence: 88.9,
    severity: 'high',
    affectedArea: '~22%',
    date: '05 Jul 2026',
    time: '04:48 PM',
    field: 'Field A',
    treated: false,
    treatmentDue: '5 days',
  },
  {
    id: 'scan-005',
    cropEmoji: '🍅',
    crop: 'Tomato',
    variety: 'Pusa Ruby',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    confidence: 82.3,
    severity: 'medium',
    affectedArea: '~14%',
    date: '04 Jul 2026',
    time: '08:22 AM',
    field: 'Field A',
    treated: true,
    treatmentDue: null,
  },
  {
    id: 'scan-006',
    cropEmoji: '🥔',
    crop: 'Potato',
    variety: 'Kufri Jyoti',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    confidence: 96.1,
    severity: 'critical',
    affectedArea: '~52%',
    date: '03 Jul 2026',
    time: '06:55 PM',
    field: 'Plot D',
    treated: true,
    treatmentDue: null,
  },
  {
    id: 'scan-007',
    cropEmoji: '🫘',
    crop: 'Soybean',
    variety: 'JS-335',
    disease: 'Rust',
    scientificName: 'Phakopsora pachyrhizi',
    confidence: 79.4,
    severity: 'low',
    affectedArea: '~6%',
    date: '02 Jul 2026',
    time: '10:17 AM',
    field: 'Paddy B',
    treated: false,
    treatmentDue: '7 days',
  },
  {
    id: 'scan-008',
    cropEmoji: '🌸',
    crop: 'Cotton',
    variety: 'Bt Hybrid',
    disease: 'Leaf Curl Virus',
    scientificName: 'Cotton leaf curl virus',
    confidence: 85.7,
    severity: 'critical',
    affectedArea: '~41%',
    date: '01 Jul 2026',
    time: '03:44 PM',
    field: 'Field B',
    treated: true,
    treatmentDue: null,
  },
];

const SEVERITY_CONFIG = {
  low: { label: 'Low', class: 'severity-low' },
  medium: { label: 'Medium', class: 'severity-medium' },
  high: { label: 'High', class: 'severity-high' },
  critical: { label: 'Critical', class: 'severity-critical' },
};

type SortKey = 'date' | 'confidence' | 'severity' | 'crop';
type SortDir = 'asc' | 'desc';

const SEVERITY_ORDER = { low: 0, medium: 1, high: 2, critical: 3 };

export default function RecentDiagnosesTable() {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = [...DIAGNOSES].sort((a, b) => {
    let cmp = 0;
    if (sortKey === 'confidence') cmp = a.confidence - b.confidence;
    else if (sortKey === 'severity') cmp = SEVERITY_ORDER[a.severity as keyof typeof SEVERITY_ORDER] - SEVERITY_ORDER[b.severity as keyof typeof SEVERITY_ORDER];
    else if (sortKey === 'crop') cmp = a.crop.localeCompare(b.crop);
    else cmp = a.id.localeCompare(b.id);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const toggleAll = () => {
    if (selectedRows.size === paginated.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(paginated.map(d => d.id)));
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronDown size={12} className="text-muted-foreground/40" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Recent Diagnoses</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{DIAGNOSES.length} scans total · {DIAGNOSES.filter(d => !d.treated).length} untreated</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.info('Syncing latest diagnoses...')}
            className="btn-ghost gap-1.5 text-xs"
          >
            <RefreshCw size={13} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button className="btn-secondary text-xs px-4 py-2 gap-1.5">
            <Download size={13} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedRows.size > 0 && (
        <div className="mb-3 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 flex items-center justify-between animate-fade-in-up">
          <span className="text-sm font-semibold">{selectedRows.size} scan{selectedRows.size > 1 ? 's' : ''} selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { toast.success(`${selectedRows.size} scans exported`); setSelectedRows(new Set()); }}
              className="text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 transition-colors"
            >
              Export Selected
            </button>
            <button
              onClick={() => { toast.success(`${selectedRows.size} scans marked as treated`); setSelectedRows(new Set()); }}
              className="text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 transition-colors"
            >
              Mark Treated
            </button>
            <button onClick={() => setSelectedRows(new Set())} className="text-xs text-white/70 hover:text-white px-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card-base p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginated.length && paginated.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort('crop')} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground">
                    Crop <SortIcon k="crop" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Disease</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort('confidence')} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground">
                    Confidence <SortIcon k="confidence" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort('severity')} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground">
                    Severity <SortIcon k="severity" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Affected</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort('date')} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground">
                    Date <SortIcon k="date" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((diag, idx) => {
                const sevConf = SEVERITY_CONFIG[diag.severity as keyof typeof SEVERITY_CONFIG];
                const isSelected = selectedRows.has(diag.id);
                return (
                  <tr
                    key={diag.id}
                    className={`border-b border-border transition-colors duration-150 cursor-pointer ${
                      isSelected ? 'bg-accent' : idx % 2 === 0 ? 'hover:bg-muted/40' : 'bg-muted/20 hover:bg-muted/50'
                    }`}
                    onClick={() => toggleRow(diag.id)}
                  >
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(diag.id)}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{diag.cropEmoji}</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{diag.crop}</p>
                          <p className="text-xs text-muted-foreground">{diag.variety}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-foreground">{diag.disease}</p>
                      <p className="text-xs text-muted-foreground italic">{diag.scientificName}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${diag.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold tabular-nums text-foreground">{diag.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`severity-badge ${sevConf.class}`}>
                        {sevConf.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-medium text-foreground">{diag.affectedArea}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-muted-foreground">{diag.field}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-xs font-medium text-foreground">{diag.date}</p>
                      <p className="text-xs text-muted-foreground">{diag.time}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      {diag.treated ? (
                        <div className="flex items-center gap-1.5 text-severity-low">
                          <CheckCircle size={14} />
                          <span className="text-xs font-semibold">Treated</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-severity-high">
                          <Clock size={14} />
                          <span className="text-xs font-semibold">Due {diag.treatmentDue}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toast.info(`Viewing report for ${diag.crop} — ${diag.disease}`)}
                          title="View full report"
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => toast.success(`Downloading PDF for ${diag.id}`)}
                          title="Download PDF report"
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                        >
                          <Download size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{(page - 1) * perPage + 1}–{Math.min(page * perPage, DIAGNOSES.length)}</span> of{' '}
            <span className="font-semibold text-foreground">{DIAGNOSES.length}</span> scans
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={`page-${p}`}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  page === p
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card hover:bg-muted text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}