/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lesson, Subject } from '../types.ts';
import { ACTIONS } from '../data.ts';
import { CheckCircle2, Youtube, ShieldAlert, BookOpen, Clock, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
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
      className="bg-bg-card border border-border-card rounded-[24px] p-4.5 flex flex-col gap-3.5 shadow-subtle hover:scale-[1.01] transition-all relative overflow-hidden group text-right"
      dir="rtl"
    >
      {/* Visual Accent Glow on card side using subject color */}
      <div 
        className="absolute top-0 right-0 w-1.5 h-full"
        style={{ backgroundColor: subject.color }}
      />

      {/* Main Header Row */}
      <div className="flex items-start justify-between gap-3 pr-2 flex-row-reverse">
        {/* Action Toggle complete checkbox */}
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-1 cursor-pointer py-1 px-3 rounded-full text-[10px] font-bold border transition-all shrink-0 ${
            isCompleted 
              ? 'bg-accent-green/10 text-accent-green border-accent-green/30' 
              : 'bg-bg-card-light text-text-secondary border-border-card hover:border-accent-blue/45'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isCompleted ? 'مكتمل ✓' : 'تحديد المكتمل'}</span>
        </button>

        <div className="flex-1 text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[9px] font-black tracking-wide leading-none" style={{ color: subject.color }}>
              {lesson.tags?.slice(0, 1).join(' • ') || subject.title}
            </span>
            <span className="text-[10px] font-semibold py-0.5 px-1.5 rounded bg-bg-card-light text-text-muted">
              #{ (lesson.order || 1).toString().padStart(2, '0') }
            </span>
          </div>
          <h4 className="text-xs font-black text-text-primary mt-1.5 leading-relaxed">
            {lesson.title}
          </h4>
        </div>
      </div>

      {/* Lesson Summary Abstract & Quick Task */}
      <div className="bg-bg-card-light rounded-2xl p-3 border border-border-card space-y-2 text-right pr-2">
        <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
          {lesson.summary}
        </p>
        <div className="flex items-start gap-1.5 pt-2 border-t border-border-card flex-row-reverse justify-end">
          <span className="text-[10px] font-black text-accent-yellow shrink-0">المهمة:</span>
          <span className="text-[10px] text-text-primary font-bold leading-relaxed">{lesson.quickTask}</span>
        </div>
      </div>

      {/* Quick Action Resources Rows - Subdued style for secondary buttons to prevent color overload */}
      <div className="grid grid-cols-3 gap-2 pr-2">
        <button
          onClick={() => handleYoutube('شرح')}
          className="flex items-center justify-center gap-1 cursor-pointer py-2 px-1.5 rounded-xl text-[10px] font-black bg-bg-card-light text-text-secondary border border-border-card hover:bg-bg-primary hover:text-red-500 transition-all"
        >
          <Youtube className="w-3.5 h-3.5 text-text-muted group-hover:text-red-500 shrink-0" />
          <span className="truncate">مرشد شرح</span>
        </button>
        <button
          onClick={() => handleYoutube('حل أسئلة')}
          className="flex items-center justify-center gap-1 cursor-pointer py-2 px-1.5 rounded-xl text-[10px] font-black bg-bg-card-light text-text-secondary border border-border-card hover:bg-bg-primary hover:text-amber-500 transition-all"
        >
          <Youtube className="w-3.5 h-3.5 text-text-muted group-hover:text-amber-500 shrink-0" />
          <span className="truncate">بنك حلول</span>
        </button>
        <button
          onClick={onAddToErrors}
          className="flex items-center justify-center gap-1 cursor-pointer py-2 px-1.5 rounded-xl text-[10px] font-black bg-bg-card-light text-text-secondary border border-border-card hover:bg-red-500/10 hover:text-accent-red transition-all"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-red shrink-0" />
          <span className="truncate">بنك الأخطاء</span>
        </button>
      </div>

      {/* Action triggers collapsible actions list */}
      <div className="pr-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-accent-blue/10 hover:bg-accent-blue/15 border border-accent-blue/20 text-accent-blue text-[10px] font-extrabold py-2 px-3.5 rounded-xl cursor-pointer flex items-center justify-between transition-all"
        >
          <ChevronDown className={`w-3.5 h-3.5 text-accent-blue transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          <span className="flex items-center gap-1 font-black">
            <Sparkles className="w-3 h-3 text-accent-blue" />
            توليد كبسولات الـ AI والمراجعة التفاعلية
          </span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-1.5"
            >
              <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-bg-card-light border border-border-card rounded-xl">
                {ACTIONS.map((act, index) => (
                  <button
                    key={index}
                    onClick={() => onTriggerAction(index)}
                    className="bg-bg-card hover:bg-bg-primary border border-border-card text-text-secondary hover:text-text-primary py-2 px-2.5 rounded-lg text-[10px] font-bold cursor-pointer hover:border-accent-blue/30 text-right transition-all truncate"
                    title={act.description}
                  >
                    • {act.name}
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
