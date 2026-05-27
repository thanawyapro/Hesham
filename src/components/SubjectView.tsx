/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Subject, Lesson } from '../types.ts';
import LessonCard from './LessonCard.tsx';
import { BookOpen, Award, ArrowLeft, Brain, Milestone, AlertCircle, Watch, GraduationCap, ArrowRight } from 'lucide-react';
import { SPECIAL_PROMPTS } from '../data.ts';
import { motion } from 'motion/react';

interface SubjectViewProps {
  subject: Subject;
  onBack: () => void;
  doneLessons: string[];
  onToggleComplete: (id: string) => void;
  onAddToErrors: (id: string) => void;
  onTriggerActionOnLesson: (lesson: Lesson, actionIndex: number) => void;
  onTriggerSpecialTool: (promptText: string) => void;
}

export default function SubjectView({
  subject,
  onBack,
  doneLessons,
  onToggleComplete,
  onAddToErrors,
  onTriggerActionOnLesson,
  onTriggerSpecialTool
}: SubjectViewProps) {
  const [activeUnitIndex, setActiveUnitIndex] = useState<number>(0);

  const activeUnit = subject.units[activeUnitIndex] || subject.units[0];

  // Calculate stats
  const totalLessonsCount = subject.units.reduce((acc, u) => acc + u.lessons.length, 0);
  const subjectLessonsIds = subject.units.flatMap(u => u.lessons.map(l => l.id));
  const completedCount = subjectLessonsIds.filter(id => doneLessons.includes(id)).length;
  const progressPercent = totalLessonsCount ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  // Handler for special tools
  const handleSpecialTool = (type: keyof typeof SPECIAL_PROMPTS) => {
    const blueprint = SPECIAL_PROMPTS[type];
    const promptText = `أنت مدرس خبير ومستشار أكاديمي في مادة (${subject.title}) للثانوية العامة المصرية.\n\nالموضوع:\n${blueprint}`;
    onTriggerSpecialTool(promptText);
  };

  return (
    <div className="flex-grow flex flex-col bg-[#061225] select-none text-right" dir="rtl">
      
      {/* Subject Header */}
      <div 
        className="p-5 relative overflow-hidden flex flex-col gap-4 text-white p-5 border-b border-white/5 shrink-0"
        style={{
          background: `linear-gradient(135deg, ${subject.color}15, #061125 90%)`,
        }}
      >
        {/* Glow orb */}
        <div 
          className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-20 filter blur-xl animate-pulse"
          style={{ backgroundColor: subject.color }}
        />

        {/* Back and title bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg"
              style={{ backgroundColor: subject.color }}
            >
              {subject.icon}
            </div>
            <div>
              <span className="text-[10px] font-black tracking-wider text-slate-400">
                الشعبة: {subject.track}
              </span>
              <h2 className="text-base font-black text-white mt-0.5">
                {subject.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onBack}
            className="bg-slate-900 border border-white/5 hover:border-white/10 p-2.5 rounded-xl text-slate-400 hover:text-white cursor-pointer flex items-center gap-1.5 transition-all font-bold text-xs"
          >
            <span>عرض المواد</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        {/* Action Tool Cards Grid */}
        <div className="flex flex-col gap-1.5 mt-2 z-10">
          <label className="text-[10px] text-slate-400 font-bold mr-1">بوابات التوليد والأدوات الذكية للمادة:</label>
          <div className="grid grid-cols-5 gap-1.5 overflow-x-auto pb-1 invisible-scroll">
            <button
              onClick={() => handleSpecialTool('diagnostic')}
              className="bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-indigo-500/20 py-2 px-2.5 rounded-xl cursor-pointer flex flex-col items-center text-center gap-1 text-[10px] font-bold text-indigo-300 transition-all min-w-[76px]"
            >
              <Brain className="w-4 h-4" />
              <span>تحديد مستوى</span>
            </button>
            <button
              onClick={() => handleSpecialTool('smart_path')}
              className="bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-emerald-500/20 py-2 px-2.5 rounded-xl cursor-pointer flex flex-col items-center text-center gap-1 text-[10px] font-bold text-emerald-300 transition-all min-w-[76px]"
            >
              <Milestone className="w-4 h-4" />
              <span>مسار المذاكرة</span>
            </button>
            <button
              onClick={() => handleSpecialTool('tomorrow')}
              className="bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-amber-500/20 py-2 px-2.5 rounded-xl cursor-pointer flex flex-col items-center text-center gap-1 text-[10px] font-bold text-amber-300 transition-all min-w-[76px]"
            >
              <Watch className="w-4 h-4" />
              <span>خطة بكرة</span>
            </button>
            <button
              onClick={() => handleSpecialTool('plan')}
              className="bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-sky-500/20 py-2 px-2.5 rounded-xl cursor-pointer flex flex-col items-center text-center gap-1 text-[10px] font-bold text-sky-300 transition-all min-w-[76px]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>أدوز تفصيلي</span>
            </button>
            <button
              onClick={() => handleSpecialTool('weakness')}
              className="bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-rose-500/20 py-2 px-2.5 rounded-xl cursor-pointer flex flex-col items-center text-center gap-1 text-[10px] font-bold text-rose-300 transition-all min-w-[76px]"
            >
              <AlertCircle className="w-4 h-4" />
              <span>نقاط ضعفي</span>
            </button>
          </div>
        </div>

        {/* Progress tracker metrics bar */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3 flex justify-between items-center gap-4 mt-1 shrink-0 z-10 flex-row-reverse">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold leading-none">معدل الإنجاز</span>
              <span className="text-xs font-black text-white leading-none">{progressPercent}% مكتمل</span>
            </div>
          </div>
          <div className="flex-1 max-w-[140px] bg-slate-950/60 rounded-full h-2.5 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-sky-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-bold">{completedCount} من أصل {totalLessonsCount} درس</span>
        </div>

      </div>

      {/* Chapters (Units) Slider Horizontal selection */}
      <div className="shrink-0 pt-3.5 px-4 pb-2 border-b border-white/5 flex flex-col gap-2 bg-[#081329]">
        <label className="text-[10px] text-slate-400 font-black mr-1">الفصول والأبواب الدراسية:</label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-row-reverse">
          {subject.units.map((unit, idx) => {
            const isActive = idx === activeUnitIndex;
            return (
              <button
                key={unit.slug}
                onClick={() => setActiveUnitIndex(idx)}
                className={`py-2 px-4 rounded-full text-xs font-black cursor-pointer transition-all border shrink-0 ${isActive ? 'bg-white text-[#061225] border-white font-extrabold shadow-md' : 'bg-slate-950/40 text-slate-400 border-white/5 hover:text-white'}`}
              >
                {unit.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Lessons List Panel rendered */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h3 className="text-xs font-black text-slate-300">دروس الفصل الأكاديمي الحالي</h3>
          <span className="text-[10px] text-slate-500 font-black">{activeUnit.lessons.length} درس مغطى</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
          {activeUnit.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              subject={subject}
              isCompleted={doneLessons.includes(lesson.id)}
              onToggleComplete={() => onToggleComplete(lesson.id)}
              onAddToErrors={() => onAddToErrors(lesson.id)}
              onTriggerAction={(actionIndex) => onTriggerActionOnLesson(lesson, actionIndex)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
