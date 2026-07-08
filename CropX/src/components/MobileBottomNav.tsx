'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ScanLine, History, Users, User } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface MobileBottomNavProps {
  currentPath: string;
}

const TABS = [
  { icon: LayoutDashboard, label: 'Home', href: '/home-dashboard' },
  { icon: ScanLine, label: 'Scan', href: '/home-dashboard' },
  { icon: History, label: 'History', href: '/home-dashboard' },
  { icon: Users, label: 'Community', href: '/home-dashboard' },
  { icon: User, label: 'Profile', href: '/home-dashboard' },
];

export default function MobileBottomNav({ currentPath }: MobileBottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.label === 'Home' && currentPath === tab.href;
          return (
            <Link
              key={`mobile-nav-${tab.label}`}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-accent' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}