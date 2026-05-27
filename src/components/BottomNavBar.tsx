/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, ShieldAlert, Zap, Bot, Star } from 'lucide-react';
import { motion } from 'motion/react';

export type TabId = 'curriculum' | 'errors' | 'plans' | 'ai-tutor';

interface BottomNavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  points: number;
}

export default function BottomNavBar({ activeTab, onTabChange, points }: BottomNavBarProps) {
  const tabs: Array<{ id: TabId; label: string; icon: any; color: string; badge?: boolean }> = [
    { id: 'curriculum', label: 'المقرر', icon: BookOpen, color: 'text-indigo-400' },
    { id: 'errors', label: 'الأخطاء', icon: ShieldAlert, color: 'text-rose-400' },
    { id: 'ai-tutor', label: 'المعلم الذكي', icon: Bot, color: 'text-emerald-400', badge: true },
    { id: 'plans', label: 'خطة الطوارئ', icon: Zap, color: 'text-amber-400' },
  ];

  return (
    <div className="shrink-0 bg-[#0d172a]/95 border-t border-white/5 backdrop-blur-lg safe-padding-bottom z-40 sticky bottom-0">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-1 relative">
        
        {/* Floating Points Widget visible directly above the navigation bar */}
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] py-1 px-3 rounded-full flex items-center gap-1 shadow-md shadow-amber-500/10 active:scale-95 transition-all select-none border border-amber-300">
          <Star className="w-3 h-3 fill-slate-950 stroke-none animate-spin-slow" />
          <span>{points} نقطة إنجاز</span>
        </div>

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as TabId)}
              className="relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl cursor-pointer select-none focus:outline-none min-w-[70px] transition-all"
            >
              {/* Highlight background bubble */}
              {isActive && (
                <motion.div
                  layoutId="activeBubble"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon and indicators */}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-all ${isActive ? tab.color : 'text-slate-400 hover:text-slate-300'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>

              {/* Tab Title */}
              <span className={`text-[11px] font-bold mt-1 tracking-wide transition-all ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
