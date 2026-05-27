/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, Battery, ShieldAlert, Cpu, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export default function AndroidFrame({ children }: AndroidFrameProps) {
  const [isFramed, setIsFramed] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('18:00');
  const [batteryLevel] = useState<number>(88);
  const [isPwaInstalled] = useState<boolean>(false);

  // Keep the clock inside the Android status bar running
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const isAmPm = hours >= 12 ? 'م' : 'ص';
      hours = hours % 12 || 12; // 12-hour format
      setCurrentTime(`${hours}:${minutes} ${isAmPm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  // Check if system is already smaller than typical mobile window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsFramed(false); // Disable framing on mobile view natively
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#070e1c] text-slate-100 flex flex-col items-center">
      {/* Visual Header Controls (Only shown in browser) */}
      <h1 className="sr-only">Thanaweya AI Study OS</h1>
      <div className="w-full bg-[#0a152d]/80 backdrop-blur-md border-b border-white/5 py-3 px-4 flex flex-wrap justify-between items-center z-50 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 py-1 px-2.5 rounded-full font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>نظام التشغيل الذكي إصدار V9 Android PWA</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-400 font-medium hidden sm:inline">مثالي للشاشات اللمسية وتثبيته كـ App مستقل</span>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {/* Diagnostic info or help */}
          <button 
            onClick={() => {
              alert(
                "لتثبيت التطبيق على جهازك الاندرويد:\n" +
                "1. افتح الرابط في متصفح كوجل كروم (Chrome) على موبايلك.\n" +
                "2. اضغط على خيارات الثلاث نقاط في الأعلى.\n" +
                "3. اختر 'تثبيت التطبيق' (Install App) أو 'أضف للشاشة الرئيسية'.\n" +
                "سيتحول على الفور إلى تطبيق جوال أصيل بدون حواف المتصفح!"
              );
            }}
            className="flex items-center gap-1.5 cursor-pointer bg-white/5 hover:bg-white/10 text-slate-300 py-1.5 px-3 rounded-lg font-medium transition-all"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>تثبيت على الموبايل</span>
          </button>

          {/* Frame toggler */}
          <div className="bg-black/40 border border-white/5 rounded-lg p-0.5 flex gap-1">
            <button
              onClick={() => setIsFramed(true)}
              className={`flex items-center gap-1 cursor-pointer py-1.5 px-3 rounded-md transition-all ${isFramed ? 'bg-[#2563eb] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              title="محاكاة شاشة الموبايل"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">وضع الموبايل</span>
            </button>
            <button
              onClick={() => setIsFramed(false)}
              className={`flex items-center gap-1 cursor-pointer py-1.5 px-3 rounded-md transition-all ${!isFramed ? 'bg-[#2563eb] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              title="ملء شاشة المتصفح"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">ملء الشاشة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Frame Wrapping */}
      <div className="flex-1 w-full flex items-center justify-center py-6 px-4 relative overflow-hidden bg-gradient-to-b from-[#061125] to-[#040812] glow-primary">
        {isFramed ? (
          /* Android Frame Container */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[420px] aspect-[9/19] bg-[#0c1a35] rounded-[52px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[10px] border-[#1e2e4f] relative overflow-hidden flex flex-col"
            style={{ maxHeight: '860px' }}
          >
            {/* Camera Bezel Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#1e2e4f] rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#0d1627] border-2 border-slate-700/50 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/60" />
              </div>
              <div className="w-8 h-1 rounded-full bg-slate-800 ml-4" />
            </div>

            {/* Simulated Side Buttons */}
            <div className="absolute -left-[13px] top-32 w-[3px] h-12 bg-[#2c4069] rounded-r-md z-40" />
            <div className="absolute -left-[13px] top-48 w-[3px] h-16 bg-[#2c4069] rounded-r-md z-40" />
            <div className="absolute -right-[13px] top-36 w-[3px] h-20 bg-[#2c4069] rounded-l-md z-40" />

            {/* Android Status Bar */}
            <div className="h-10 bg-[#061226]/95 pt-2 px-6 flex justify-between items-center text-[10px] font-semibold tracking-wide text-slate-300 z-40 select-none border-b border-white/5 shrink-0 flex-row-reverse">
              {/* Left aligned widgets inside status bar (Arabic is RTL, so we reverse status bar alignments to fit native system guidelines!) */}
              <div className="flex items-center gap-1 mb-1 font-sans">{currentTime}</div>

              {/* Right aligned status items */}
              <div className="flex items-center gap-1.5 font-sans">
                <Battery className="w-3.5 h-3.5 text-emerald-400 rotate-90 scale-x-[-1]" />
                <span className="text-[9px] font-medium">{batteryLevel}%</span>
                <Wifi className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[8px] tracking-tighter bg-[#162947] border border-white/10 px-1 py-0.5 rounded text-sky-300">5G</span>
              </div>
            </div>

            {/* Embedded Active Application UI Content Screen */}
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative bg-[#061226] text-slate-100 flex flex-col">
              {children}
            </div>

            {/* Phone Home Virtual Indicator Bar */}
            <div className="h-6 bg-[#061226] flex items-center justify-center z-40 shrink-0 border-t border-white/5">
              <div className="w-28 h-1.5 rounded-full bg-slate-600/60 shadow-sm" />
            </div>
          </motion.div>
        ) : (
          /* Native Full Responsive Browser View (Tablet, Laptop, Desktop directly) */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-7xl mx-auto h-full flex flex-col bg-[#061226]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl"
            style={{ minHeight: '80vh' }}
          >
            {/* Full Web Responsive Inner View */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
              {children}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
