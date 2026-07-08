import React from 'react';
import { Sprout, CalendarDays } from 'lucide-react';

export default function DashboardGreeting() {
  const hour = 10; // Static for SSR — backend would provide server time
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg gradient-green flex items-center justify-center">
            <Sprout size={14} className="text-white" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">{greeting}, Rajesh 👋</p>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Farm Health Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Anand, Gujarat · Last updated 5 min ago</p>
      </div>

      <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 self-start sm:self-auto">
        <CalendarDays size={16} className="text-primary" />
        <div>
          <p className="text-xs font-semibold text-foreground">Tuesday, 8 Jul 2026</p>
          <p className="text-xs text-muted-foreground">Kharif season · Week 27</p>
        </div>
      </div>
    </div>
  );
}