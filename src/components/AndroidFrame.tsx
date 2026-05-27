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
    <div className="min-h-screen bg-bg-secondary text-text-primary flex flex-col items-center select-none transition-colors duration-200">
      {/* Visual Header Controls (Only shown in browser) */}
      <h1 className="sr-only">Thanaweya AI Study OS</h1>
      <div className="w-full bg-bg-card border-b border-border-card py-2.5 px-4 flex flex-wrap justify-between items-center z-50 text-xs shadow-sm flex-row-reverse">
        
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
            className="flex items-center gap-1.5 cursor-pointer bg-bg-card-light hover:bg-bg-secondary border border-border-card text-text-secondary py-1.5 px-3 rounded-xl font-bold transition-all text-[11px]"
          >
            <Download className="w-3.5 h-3.5 text-accent-blue" />
            <span>تثبيت على الموبايل</span>
          </button>

          {/* Frame toggler */}
          <div className="bg-bg-secondary border border-border-card rounded-xl p-0.5 flex gap-1">
            <button
              onClick={() => setIsFramed(true)}
              className={`flex items-center gap-1 cursor-pointer py-1.5 px-3 rounded-lg transition-all text-[11px] font-bold ${isFramed ? 'bg-accent-blue text-white shadow-md' : 'text-text-muted hover:text-text-primary'}`}
              title="محاكاة شاشة الموبايل"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">وضع الموبايل</span>
            </button>
            <button
              onClick={() => setIsFramed(false)}
              className={`flex items-center gap-1 cursor-pointer py-1.5 px-3 rounded-lg transition-all text-[11px] font-bold ${!isFramed ? 'bg-accent-blue text-white shadow-md' : 'text-text-muted hover:text-text-primary'}`}
              title="ملء شاشة المتصفح"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ملء الشاشة</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-row-reverse">
          <div className="flex items-center gap-1 bg-accent-green/10 text-accent-green border border-accent-green/15 py-1 px-2.5 rounded-full font-black text-[10px]">
            <Cpu className="w-3.5 h-3.5" />
            <span>نظام التشغيل الذكي إصدار V9 Android PWA</span>
          </div>
          <span className="text-text-muted hidden sm:inline">|</span>
          <span className="text-text-secondary font-black hidden sm:inline text-[10px]">مثالي للشاشات اللمسية وتثبيته كـ App مستقل</span>
        </div>
      </div>

      {/* Frame Wrapping */}
      <div className="flex-1 w-full flex items-center justify-center py-6 px-4 relative overflow-hidden bg-bg-secondary glow-primary">
        {isFramed ? (
          /* Android Frame Container */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[415px] aspect-[9/19] bg-bg-primary rounded-[48px] shadow-2xl border-[10px] border-bg-card relative overflow-hidden flex flex-col transition-colors duration-200"
            style={{ maxHeight: '840px' }}
          >
            {/* Camera Bezel Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-bg-card rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-bg-primary border-2 border-border-card flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-accent-blue/60" />
              </div>
              <div className="w-8 h-1 rounded-full bg-bg-secondary ml-4" />
            </div>

            {/* Simulated Side Buttons */}
            <div className="absolute -left-[13px] top-32 w-[3px] h-12 bg-bg-card rounded-r-md z-40" />
            <div className="absolute -left-[13px] top-48 w-[3px] h-16 bg-bg-card rounded-r-md z-40" />
            <div className="absolute -right-[13px] top-36 w-[3px] h-20 bg-bg-card rounded-l-md z-40" />

            {/* Android Status Bar */}
            <div className="h-10 bg-bg-primary pt-2 px-6 flex justify-between items-center text-[10px] font-semibold tracking-wide text-text-secondary z-40 select-none border-b border-border-card shrink-0 flex-row-reverse transition-colors">
              {/* Left aligned widgets inside status bar (Arabic is RTL, so we reverse status bar alignments!) */}
              <div className="flex items-center gap-1 mb-1 font-sans">{currentTime}</div>

              {/* Right aligned status items */}
              <div className="flex items-center gap-1.5 font-sans">
                <Battery className="w-3.5 h-3.5 text-accent-green rotate-90 scale-x-[-1]" />
                <span className="text-[9px] font-medium">{batteryLevel}%</span>
                <Wifi className="w-3.5 h-3.5 text-accent-blue" />
                <span className="text-[8px] tracking-tighter bg-bg-secondary border border-border-card px-1 py-0.5 rounded text-accent-blue">5G</span>
              </div>
            </div>

            {/* Embedded Active Application UI Content Screen */}
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative bg-bg-primary text-text-primary flex flex-col transition-colors duration-200">
              {children}
            </div>

            {/* Phone Home Virtual Indicator Bar */}
            <div className="h-5 bg-bg-primary flex items-center justify-center z-40 shrink-0 border-t border-border-card transition-colors">
              <div className="w-28 h-1.5 rounded-full bg-text-muted/30 shadow-sm" />
            </div>
          </motion.div>
        ) : (
          /* Native Full Responsive Browser View (Tablet, Laptop, Desktop directly) */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl mx-auto h-full flex flex-col bg-bg-primary rounded-[28px] overflow-hidden border border-border-card relative shadow-xl transition-colors duration-200"
            style={{ minHeight: '78vh' }}
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
