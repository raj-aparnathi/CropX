import React from 'react';
import { AlertTriangle, AlertOctagon, Info, ChevronRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const ALERTS = [
  {
    id: 'alert-001',
    severity: 'critical',
    title: 'Late Blight Outbreak',
    crop: 'Tomato',
    field: 'Field A',
    message: 'Phytophthora infestans detected in 3 nearby farms. Immediate fungicide application recommended.',
    time: '2 hrs ago',
    actionLabel: 'View Treatment',
  },
  {
    id: 'alert-002',
    severity: 'high',
    title: 'High Rust Advisory',
    crop: 'Wheat',
    field: 'Plot C',
    message: 'Puccinia striiformis risk elevated due to high humidity (78%). Inspect lower leaves.',
    time: '5 hrs ago',
    actionLabel: 'See Prevention',
  },
  {
    id: 'alert-003',
    severity: 'medium',
    title: 'Brown Spot Risk',
    crop: 'Rice',
    field: 'Paddy B',
    message: 'Bipolaris oryzae spore count elevated. Monitor closely over next 48 hours.',
    time: '1 day ago',
    actionLabel: 'Check Forecast',
  },
  {
    id: 'alert-004',
    severity: 'low',
    title: 'Fertilizer Reminder',
    crop: 'All Fields',
    field: '',
    message: 'Scheduled nitrogen top-dressing due in 3 days based on crop growth stage.',
    time: '2 days ago',
    actionLabel: 'Mark Done',
  },
];

const SEVERITY_CONFIG = {
  critical: { icon: AlertOctagon, bgClass: 'bg-severity-critical-bg border-severity-critical/30', textClass: 'text-severity-critical', badgeClass: 'severity-critical', label: 'CRITICAL' },
  high: { icon: AlertTriangle, bgClass: 'bg-severity-high-bg border-severity-high/30', textClass: 'text-severity-high', badgeClass: 'severity-high', label: 'HIGH' },
  medium: { icon: AlertTriangle, bgClass: 'bg-severity-medium-bg border-severity-medium/30', textClass: 'text-severity-medium', badgeClass: 'severity-medium', label: 'MEDIUM' },
  low: { icon: Info, bgClass: 'bg-accent border-primary/20', textClass: 'text-primary', badgeClass: 'severity-low', label: 'LOW' },
};

export default function DiseaseAlertsSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Disease Alerts</h2>
          <p className="text-xs text-muted-foreground mt-0.5">4 active alerts · 1 critical</p>
        </div>
        <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
        {ALERTS.map((alert, idx) => {
          const config = SEVERITY_CONFIG[alert.severity as keyof typeof SEVERITY_CONFIG];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className={`rounded-2xl border p-4 flex flex-col gap-3 card-shadow fade-in-up stagger-${idx + 1} ${config.bgClass}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={config.textClass} />
                  <span className={`severity-badge ${config.badgeClass}`}>{config.label}</span>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{alert.time}</span>
              </div>

              <div>
                <p className={`text-sm font-bold ${config.textClass}`}>{alert.title}</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  {alert.crop}{alert.field ? ` · ${alert.field}` : ''}
                </p>
                <p className="text-xs text-foreground/80 mt-2 leading-relaxed line-clamp-2">{alert.message}</p>
              </div>

              <button className={`mt-auto text-xs font-semibold flex items-center gap-1 ${config.textClass} hover:underline`}>
                {alert.actionLabel} <ChevronRight size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}