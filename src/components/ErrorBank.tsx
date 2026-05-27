/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Trash2, Cpu, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import { ErrorRecord } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface ErrorBankProps {
  errors: ErrorRecord[];
  onRemoveError: (errorId: string) => void;
  onDiagnoseError: (err: ErrorRecord) => void;
  onGlobalDiagnostic: () => void;
  selectedGrade?: string;
  selectedTerm?: string;
  currentTrack?: string;
}

export default function ErrorBank({ 
  errors, 
  onRemoveError, 
  onDiagnoseError, 
  onGlobalDiagnostic,
  selectedGrade,
  selectedTerm,
  currentTrack
}: ErrorBankProps) {
  const getGradeLabel = () => {
    if (selectedGrade === 'grade-1') return 'الصف الأول الثانوي';
    if (selectedGrade === 'grade-2') return 'الصف الثاني الثانوي';
    if (selectedGrade === 'grade-3') return 'الصف الثالث الثانوي';
    return '';
  };

  const getTermLabel = () => {
    if (selectedTerm === 'term-1') return 'الترم الأول';
    if (selectedTerm === 'term-2') return 'الترم الثاني';
    if (selectedTerm === 'final-revision') return 'المراجعات النهائية';
    if (selectedTerm === 'full-year') return 'المنهج الكامل';
    return '';
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 bg-[#061225] select-none text-right overflow-y-auto" dir="rtl">
      
      {/* Header title */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">دفتر الأخطاء والعلاجات الذكية</h2>
            <p className="text-[10px] text-slate-400 font-medium">سجل أخطائك وصعوباتك وعالجها فوريًا بأدلة مخصصة</p>
          </div>
        </div>

        {/* Counter badge */}
        <div className="bg-[#1e1420] text-rose-400 border border-rose-500/20 py-0.5 px-3 rounded-full text-xs font-black">
          {errors.length} خطأ مسجل
        </div>
      </div>

      {/* Path confirmation label */}
      {(selectedGrade || selectedTerm) && (
        <div className="bg-rose-500/5 border border-rose-500/15 p-2.5 rounded-xl text-[10px] font-black text-rose-300 flex items-center gap-1.5 justify-center shrink-0">
          <span>المسار النشط:</span>
          <span className="bg-slate-950 px-2 py-0.5 rounded-md text-white font-extrabold">{getGradeLabel()}</span>
          <span>•</span>
          <span className="bg-slate-950 px-2 py-0.5 rounded-md text-white font-extrabold">{getTermLabel()}</span>
          <span>•</span>
          <span className="bg-slate-950 px-2 py-0.5 rounded-md text-white font-extrabold">{currentTrack || 'مشترك'}</span>
        </div>
      )}

      {/* Global analysis trigger */}
      {errors.length > 0 && (
        <button
          type="button"
          onClick={onGlobalDiagnostic}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg active:scale-[0.98] shrink-0"
        >
          <Sparkles className="w-4 h-4 text-purple-300 animate-spin-slow" />
          <span>تحليل نقاط الضعف الكلي واختبار تشخيصي للأخطاء</span>
        </button>
      )}

      {/* List content view */}
      <div className="flex-1 overflow-y-auto max-h-[480px] space-y-2.5 pr-1">
        <AnimatePresence>
          {errors.length > 0 ? (
            errors.map((err) => (
              <motion.div
                key={err.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-[#0b1426] border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden group"
              >
                {/* Left Trash Button */}
                <div className="absolute top-4 left-4 flex gap-1.5 items-center">
                  <button
                    onClick={() => onRemoveError(err.id)}
                    className="p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-rose-400 cursor-pointer hover:bg-rose-500/10 transition-all"
                    title="حذف هذا السجل"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subject badge and content headers */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-black text-rose-400">
                    {err.subject} • {err.unit}
                  </span>
                  <h3 className="text-xs font-extrabold text-white leading-relaxed pr-0.5 mt-1">
                    {err.lesson}
                  </h3>
                  <span className="text-[8px] text-slate-500 tracking-wider font-bold mt-1">
                    أضيف بتاريخ: {err.date}
                  </span>
                </div>

                {/* Diagnostic solver button directly targeting this mistake */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => onDiagnoseError(err)}
                    className="flex-1 bg-[#15203c] border border-indigo-500/10 hover:bg-[#1b2b4f] text-slate-200 py-2 px-3 rounded-xl text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>عالج نقاط الضعف في هذا الدرس مع المدرس</span>
                  </button>
                </div>

              </motion.div>
            ))
          ) : (
            /* Empty state instructions card */
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-950/40 rounded-3xl border border-white/5 gap-3">
              <CheckCircle className="w-12 h-12 text-emerald-500/20 animate-pulse" />
              <h3 className="text-xs font-black text-slate-300">سجل أخطائك فارغ حالياً!</h3>
              <p className="text-[10px] text-slate-500 max-w-[240px] leading-relaxed">
                ممتاز! هذا يعني تنظيمك مثالي. خلال دراسة أي مادة، انقر على زر <strong className="text-rose-400">أضف لبنك أخطائي</strong> لتلقيم السجل بالدروس الصعبة لمعالجتها لاحقاً وتثبيتها.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
