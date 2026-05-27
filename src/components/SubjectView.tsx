/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Subject, Lesson } from '../types.ts';
import LessonCard from './LessonCard.tsx';
import { BookOpen, Award, ArrowLeft, Brain, Milestone, AlertCircle, Watch, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
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
  selectedGrade?: string;
  selectedTerm?: string;
  currentTrack?: string;
}

export default function SubjectView({
  subject,
  onBack,
  doneLessons,
  onToggleComplete,
  onAddToErrors,
  onTriggerActionOnLesson,
  onTriggerSpecialTool,
  selectedGrade,
  selectedTerm,
  currentTrack
}: SubjectViewProps) {
  const [activeUnitIndex, setActiveUnitIndex] = useState<number>(0);

  const hasUnits = subject.units && subject.units.length > 0;
  const activeUnit = hasUnits ? (subject.units[activeUnitIndex] || subject.units[0]) : null;

  // Calculate stats
  const totalLessonsCount = hasUnits ? subject.units.reduce((acc, u) => acc + u.lessons.length, 0) : 0;
  const subjectLessonsIds = hasUnits ? subject.units.flatMap(u => u.lessons.map(l => l.id)) : [];
  const completedCount = subjectLessonsIds.filter(id => doneLessons.includes(id)).length;
  const progressPercent = totalLessonsCount ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  const getGradeLabel = () => {
    if (selectedGrade === 'grade-1') return 'الصف الأول الثانوي';
    if (selectedGrade === 'grade-2') return 'الصف الثاني الثانوي';
    if (selectedGrade === 'grade-3') return 'الصف الثالث الثانوي';
    return 'الثانوية العامة';
  };

  const getTermLabel = () => {
    if (selectedTerm === 'term-1') return 'الترم الأول';
    if (selectedTerm === 'term-2') return 'الترم الثاني';
    if (selectedTerm === 'final-revision') return 'المراجعات النهائية';
    if (selectedTerm === 'full-year') return 'المنهج الكامل';
    return '';
  };

  // Handler for special tools
  const handleSpecialTool = (type: keyof typeof SPECIAL_PROMPTS) => {
    const blueprint = SPECIAL_PROMPTS[type];
    const promptText = `أنت مدرس خبير ومستشار أكاديمي بمصر في مادة (${subject.title}) لـ (${getGradeLabel()}) - (${getTermLabel()}) - شعبة (${currentTrack || 'مشترك'}).\n\nالموضوع:\n${blueprint}`;
    onTriggerSpecialTool(promptText);
  };

  return (
    <div className="flex-grow flex flex-col bg-bg-primary select-none text-right" dir="rtl">
      
      {/* Subject Header */}
      <div 
        className="p-5.5 relative overflow-hidden flex flex-col gap-4 border-b border-border-card shrink-0"
        style={{
          background: `linear-gradient(135deg, ${subject.color}15, var(--bg-primary) 92%)`,
        }}
      >
        {/* Glow orb */}
        <div 
          className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-20 filter blur-xl animate-pulse"
          style={{ backgroundColor: subject.color }}
        />

        {/* Back and title bar */}
        <div className="flex items-center justify-between z-10 flex-row-reverse">
          <button
            onClick={onBack}
            className="bg-bg-card border border-border-card hover:bg-bg-card-light px-3.5 py-2 rounded-xl text-text-secondary hover:text-text-primary cursor-pointer flex items-center gap-1.5 transition-all font-black text-[11px]"
          >
            <span>عرض المواد</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </button>

          <div className="flex items-center gap-3.5 flex-row-reverse">
            <div 
              className="w-12 h-12 rounded-[20px] flex items-center justify-center font-black text-lg text-white shadow-md cursor-default shrink-0"
              style={{ backgroundColor: subject.color }}
            >
              {subject.icon}
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-black tracking-wider text-text-muted leading-none">
                المسار: {subject.track}
              </span>
              <h2 className="text-sm font-black text-text-primary mt-1 leading-none">
                {subject.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Action Tool Cards Grid */}
        <div className="flex flex-col gap-2 mt-1.5 z-10">
          <label className="text-[10px] text-text-muted font-black mr-1">كبسولات المساعدة والأدوات الذكية للمادة:</label>
          <div className="grid grid-cols-5 gap-2 overflow-x-auto pb-1.5 invisible-scroll flex-row-reverse">
            <button
              onClick={() => handleSpecialTool('diagnostic')}
              className="bg-bg-card hover:bg-bg-card-light border border-border-card py-2.5 px-1 rounded-2xl cursor-pointer flex flex-col items-center text-center gap-1 text-[9px] font-black text-accent-blue transition-all min-w-[72px] shadow-subtle"
            >
              <Brain className="w-4 h-4 text-accent-blue" />
              <span>تحديد مستوى</span>
            </button>
            <button
              onClick={() => handleSpecialTool('smart_path')}
              className="bg-bg-card hover:bg-bg-card-light border border-border-card py-2.5 px-1 rounded-2xl cursor-pointer flex flex-col items-center text-center gap-1 text-[9px] font-black text-accent-green transition-all min-w-[72px] shadow-subtle"
            >
              <Milestone className="w-4 h-4 text-accent-green" />
              <span>مسار المذاكرة</span>
            </button>
            <button
              onClick={() => handleSpecialTool('tomorrow')}
              className="bg-bg-card hover:bg-bg-card-light border border-border-card py-2.5 px-1 rounded-2xl cursor-pointer flex flex-col items-center text-center gap-1 text-[9px] font-black text-accent-yellow transition-all min-w-[72px] shadow-subtle"
            >
              <Watch className="w-4 h-4 text-accent-yellow" />
              <span>خطة بكرة</span>
            </button>
            <button
              onClick={() => handleSpecialTool('plan')}
              className="bg-bg-card hover:bg-bg-card-light border border-border-card py-2.5 px-1 rounded-2xl cursor-pointer flex flex-col items-center text-center gap-1 text-[9px] font-black text-accent-blue transition-all min-w-[72px] shadow-subtle"
            >
              <GraduationCap className="w-4 h-4 text-accent-blue" />
              <span>أدوز تفصيلي</span>
            </button>
            <button
              onClick={() => handleSpecialTool('weakness')}
              className="bg-bg-card hover:bg-bg-card-light border border-border-card py-2.5 px-1 rounded-2xl cursor-pointer flex flex-col items-center text-center gap-1 text-[9px] font-black text-accent-red transition-all min-w-[72px] shadow-subtle"
            >
              <AlertCircle className="w-4 h-4 text-accent-red" />
              <span>نقاط ضعفي</span>
            </button>
          </div>
        </div>

        {/* Progress tracker metrics bar */}
        <div className="bg-bg-card border border-border-card rounded-[22px] p-3.5 flex justify-between items-center gap-3 mt-1 shrink-0 z-10 flex-row-reverse shadow-subtle">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-yellow shrink-0" />
            <div className="flex flex-col gap-0.5 text-right">
              <span className="text-[9px] text-text-muted font-bold leading-none font-black">معدل الإنجاز</span>
              <span className="text-xs font-black text-text-primary leading-none mt-0.5">{progressPercent}% مكتمل</span>
            </div>
          </div>
          <div className="flex-1 max-w-[130px] bg-bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className="h-full rounded-full bg-accent-green transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-text-secondary font-black">{completedCount} من أصل {totalLessonsCount} درس</span>
        </div>

      </div>

      {!hasUnits ? (
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-4 bg-bg-primary">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-[280px]">
            <h3 className="text-sm font-black text-white">سيتم تحديث الدروس من كتاب الوزارة</h3>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              هذه المادة تتبع الهيكلة والمقررات الوزارية الجديدة لعام 2025-2026. جاري رفع وتبويب المحتوى الرسمي والوحدات هنا فوريًا.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-[240px] mt-2">
            <a 
              href={subject.sourceUrl || "https://studentbooks.moe.gov.eg/"} 
              target="_blank" 
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10.5px] py-3 px-4 rounded-xl cursor-pointer shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>تحميل المنهج الإلكتروني للوزارة 🌐</span>
            </a>
            <button 
              onClick={() => alert("تم إرسال طلبك لتحديث هذه الدروس بأولوية لمشرفي المادة بالثانوية العامة بنجاح! ⭐")}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-black text-[9.5px] py-2.5 px-3 rounded-xl cursor-pointer transition-all"
            >
              طلب استعجال رفع محتوى المادة 📑
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Chapters (Units) Slider Horizontal selection */}
          <div className="shrink-0 pt-3.5 px-4 pb-2 border-b border-border-card flex flex-col gap-2 bg-bg-secondary">
            <label className="text-[10px] text-text-muted font-black mr-1">الفصول والأبواب الدراسية:</label>
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none flex-row-reverse">
              {subject.units.map((unit, idx) => {
                const isActive = idx === activeUnitIndex;
                return (
                  <button
                    key={unit.slug}
                    onClick={() => setActiveUnitIndex(idx)}
                    className={`py-2 px-4 rounded-full text-[11px] font-black cursor-pointer transition-all border shrink-0 ${
                      isActive 
                        ? 'bg-accent-blue text-white border-accent-blue font-extrabold shadow' 
                        : 'bg-bg-card text-text-secondary border-border-card hover:text-text-primary'
                    }`}
                  >
                    {unit.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Lessons List Panel rendered */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between border-b border-border-card pb-2">
              <span className="text-[10px] text-text-muted font-black">
                {activeUnit ? activeUnit.lessons.length : 0} درس مغطى
              </span>
              <h3 className="text-xs font-black text-text-primary">دروس الفصل الأكاديمي الحالي</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-[440px] overflow-y-auto pr-1">
              {activeUnit && activeUnit.lessons.map((lesson) => (
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
        </>
      )}

    </div>
  );
}
