'use client';

import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import Link from 'next/link';

export default function DashboardTopbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement?.classList?.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 lg:px-8">
      {/* Left — mobile menu + search */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors">
          <Menu size={20} className="text-foreground" />
        </button>
        {searchOpen ? (
          <div className="flex items-center gap-2 rounded-xl border border-border bg-input px-3 py-2 w-48 md:w-64">
            <Search size={14} className="text-muted-foreground flex-shrink-0" />
            <input
              autoFocus
              onBlur={() => setSearchOpen(false)}
              type="text"
              placeholder="Search diseases, crops..."
              className="text-sm bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-input px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors w-56"
          >
            <Search size={14} />
            <span>Search crops, diseases...</span>
            <span className="ml-auto text-xs bg-muted rounded-md px-1.5 py-0.5 font-mono">⌘K</span>
          </button>
        )}
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        <button onClick={() => setSearchOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors">
          <Search size={18} className="text-muted-foreground" />
        </button>

        <button onClick={toggleDark} className="p-2 rounded-xl hover:bg-muted transition-colors">
          {darkMode ? <Sun size={18} className="text-secondary" /> : <Moon size={18} className="text-muted-foreground" />}
        </button>

        <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-severity-high text-white text-xs flex items-center justify-center font-bold">5</span>
        </button>

        <Link href="/" className="flex items-center gap-2 rounded-xl hover:bg-muted px-2 py-1.5 transition-colors">
          <div className="w-8 h-8 rounded-full gradient-green flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-foreground">Rajesh Patel</p>
            <p className="text-xs text-muted-foreground">Anand, Gujarat</p>
          </div>
        </Link>
      </div>
    </header>
  );
}