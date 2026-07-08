'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import {
  LayoutDashboard, ScanLine, History, Users, User,
  ChevronLeft, ChevronRight, Bell, Settings, LogOut,
  Sprout, TrendingUp
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SidebarProps {
  currentPath: string;
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Home', href: '/home-dashboard', badge: null },
  { icon: ScanLine, label: 'AI Scan', href: '/home-dashboard', badge: 'NEW' },
  { icon: History, label: 'Scan History', href: '/home-dashboard', badge: '12' },
  { icon: TrendingUp, label: 'Disease Reports', href: '/home-dashboard', badge: null },
  { icon: Users, label: 'Community', href: '/home-dashboard', badge: '3' },
];

const BOTTOM_ITEMS = [
  { icon: Bell, label: 'Notifications', href: '/home-dashboard', badge: '5' },
  { icon: Settings, label: 'Settings', href: '/home-dashboard', badge: null },
  { icon: User, label: 'Profile', href: '/home-dashboard', badge: null },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden lg:flex fixed left-0 top-0 h-full flex-col bg-card border-r border-border z-30 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center border-b border-border h-16 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <AppLogo size={32} />
            <span className="font-bold text-lg text-primary truncate">CropX</span>
          </div>
        )}
        {collapsed && <AppLogo size={32} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex-shrink-0 w-7 h-7 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors ${collapsed ? 'mt-0' : ''}`}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Farm info strip */}
      {!collapsed && (
        <div className="mx-3 mt-3 rounded-xl bg-accent border border-primary/20 p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center flex-shrink-0">
              <Sprout size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Rajesh Patel</p>
              <p className="text-xs text-muted-foreground truncate">Anand, Gujarat</p>
            </div>
          </div>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">Main Menu</p>
        )}
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href && item.label === 'Home';
          return (
            <Link
              key={`nav-${item.label}`}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`nav-item ${isActive ? 'nav-item-active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0 ${
                      item.badge === 'NEW' ?'bg-secondary/20 text-secondary' :'bg-primary/10 text-primary'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 pb-4 border-t border-border pt-3 space-y-1">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={`nav-bottom-${item.label}`}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`nav-item ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <Icon size={18} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-severity-high text-white text-xs flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
            </Link>
          );
        })}

        {/* Logout */}
        <Link href="/" className={`nav-item text-severity-high hover:bg-severity-high/10 hover:text-severity-high ${collapsed ? 'justify-center px-0' : ''}`}>
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}