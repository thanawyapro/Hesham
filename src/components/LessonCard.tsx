/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lesson, Subject } from '../types.ts';
import { ACTIONS } from '../data.ts';
import { CheckCircle2, Youtube, ShieldAlert, BookOpen, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LessonCardProps {
  lesson: Lesson;
  subject: Subject;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onAddToErrors: () => void;
  onTriggerAction: (actionIndex: number) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  subject,
  isCompleted,
  onToggleComplete,
  onAddToErrors,
  onTriggerAction
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Direct trigger to youtube search API links
  const handleYoutube = (kind: 'شرح' | 'حل أسئلة') => {
    const query = `الصف الثالث الثانوي ${subject.title} ${lesson.title} ${kind}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article 
      layout
      className="bg-[#0b1426] border border-white/5 rounded-2xl p-3.5 flex flex-col gap-3 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
    >
      {/* Visual Accent Glow on card side using subject color */}
      <div 
        className="absolute top-0 right-0 w-1.5 h-full rounded-r-full"
        style={{ backgroundColor: subject.color }}
      />

      {/* Main Header Row */}
      <div className="flex items-start justify-between gap-3 pr-2.5">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-white/5 text-slate-400">
              #{(lesson.order || 1).toString().padStart(2, '0')}
            </span>
            <span className="text-[9px] font-black tracking-wide" style={{ color: subject.color }}>
              {lesson.tags?.join(' • ') || subject.title}
            </span>
          </div>
          <h4 className="text-xs font-black text-white mt-1.5 leading-relaxed tracking-wide">
            {lesson.title}
          </h4>
        </div>

        {/* Action Toggle complete checkbox */}
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-1 cursor-pointer py-1 px-2.5 rounded-full text-[10px] font-extrabold border transition-all ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-[#13233c] text-indigo-300 border-indigo-400/15 hover:border-indigo-400/30'}`}
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'fill-emerald-400/10' : ''}`} />
          <span>{isCompleted ? 'تم الإنجاز ✅' : 'خلصت الدرس'}</span>
        </button>
      </div>

      {/* Lesson Summary Abstract & Quick Task */}
      <div className="bg-[#0e1b32]/60 rounded-xl p-3 border border-white/5 space-y-2 text-right pr-2.5">
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          {lesson.summary}
        </p>
        <div className="flex items-start gap-1.5 pt-1.5 border-t border-white/5">
          <span className="text-[10px] font-black text-amber-500 shrink-0">المهمة السريعة:</span>
          <span className="text-[10px] text-slate-300 font-bold leading-relaxed">{lesson.quickTask}</span>
        </div>
      </div>

      {/* Quick Action Resources Rows */}
      <div className="grid grid-cols-3 gap-2 pr-2.5">
        <button
          onClick={() => handleYoutube('شرح')}
          className="flex items-center justify-center gap-1.5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/15 text-red-400 py-1.5 px-2 rounded-xl text-[10px] font-bold cursor-pointer transition-all"
        >
          <Youtube className="w-3.5 h-3.5" />
          <span>مرشد شرح</span>
        </button>
        <button
          onClick={() => handleYoutube('حل أسئلة')}
          className="flex items-center justify-center gap-1.5 bg-[#df7a15]/10 hover:bg-[#df7a15]/20 border border-[#df7a15]/15 text-[#f98a2b] py-1.5 px-2 rounded-xl text-[10px] font-bold cursor-pointer transition-all"
        >
          <Youtube className="w-3.5 h-3.5 text-orange-400" />
          <span>بنك حلول</span>
        </button>
        <button
          onClick={onAddToErrors}
          className="flex items-center justify-center gap-1 bg-[#dc2626]/5 hover:bg-[#dc2626]/10 border border-rose-500/10 hover:border-rose-500/20 text-rose-300 py-1.5 px-2 rounded-xl text-[10px] font-bold cursor-pointer transition-all"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>بنك الأخطاء</span>
        </button>
      </div>

      {/* Action triggers collapsible actions list */}
      <div className="pr-2.5">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-[#11203d] hover:bg-[#162a4d] border border-white/5 hover:border-white/10 text-slate-300 text-[10px] font-black py-2 px-3 rounded-xl cursor-pointer flex items-center justify-between transition-all"
        >
          <span>توليد كبسولات الـ AI والدراسة التفاعلية</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-1.5"
            >
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/40 border border-white/5 rounded-xl">
                {ACTIONS.map((act, index) => (
                  <button
                    key={index}
                    onClick={() => onTriggerAction(index)}
                    className="bg-[#122240] hover:bg-slate-950 border border-white/5 text-slate-200 py-1.5 px-2.5 rounded-lg text-[10px] font-bold cursor-pointer hover:border-indigo-500/20 text-right transition-all truncate"
                    title={act.description}
                  >
                    {act.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.article>
  );
};

export default LessonCard;
