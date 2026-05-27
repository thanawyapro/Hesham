/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Zap, Clipboard, Sliders, PlayCircle, HelpCircle, Star, Sparkles } from 'lucide-react';
import { LESSON_DATA } from '../data.ts';
import { motion } from 'motion/react';

interface EmergencyPlansProps {
  onGeneratePrompt: (promptText: string) => void;
}

export default function EmergencyPlans({ onGeneratePrompt }: EmergencyPlansProps) {
  // Option 1: Study hours calendar plan
  const [targetSubject, setTargetSubject] = useState<string>(LESSON_DATA[0].title);
  const [daysCount, setDaysCount] = useState<number>(7);
  const [dailyHours, setDailyHours] = useState<number>(3);
  const [currentLevel, setCurrentLevel] = useState<string>('متوسط');

  // Option 2: Exam tomorrow prep
  const [examSubject, setExamSubject] = useState<string>(LESSON_DATA[0].title);

  // Generates custom study calendar prompt
  const generateCalendarStudyPlan = () => {
    const prompt = `أنت موجه تربوي ممتاز ومدرس قدير للصف الثالث الثانوي في مصر. المطلوب صياغة خطة مذاكرة وجدول يومي مفصل وشخصي لمادة (${targetSubject}).\n\nالمتطلبات الأساسية:\n- عدد الأيام المتاحة: (${daysCount}) أيام.\n- عدد ساعات المذاكرة اليومية: (${dailyHours}) ساعات.\n- مستواي الحالي في المادة: (${currentLevel}).\n\nالمطلوب صياغة الخطة متضمنة تقسيم الأيام، المهام المقترحة (فهم، حل أسئلة، مراجعة الفخاخ)، وتوزيع الأبواب العلمية بشكل يضمن التغطية وحل الأخطاء مسبقًا.`;
    onGeneratePrompt(prompt);
  };

  // Generates exam emergency prep prompt
  const generateExamTomorrowPlan = () => {
    const prompt = `عندي امتحان بكرة في مادة (${examSubject}) للثانوية العامة المصرية! يرجى صياغة خطة إنقاذ عاجلة ومركزة مدتها 6 ساعات للمراجعة النهائية الليلة.\n\nالمطلوب توفيره بدقة:\n1. جدول زمني طارئ مقسم بدقة بالدقائق.\n2. أهم القوانين أو الكلمات أو الفخاخ التي تكررت في امتحانات السنين السابقة.\n3. أشهر 5 كمائن يقع فيها الطلاب في هذه المادة.\n4. نصيحة ذهبية للتعامل مع ورقة الامتحان غداً وكيفية إدارة الوقت لتجنب التوتر وطريقة النوم الصحيحة الليلة.`;
    onGeneratePrompt(prompt);
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 bg-[#061225] select-none text-right overflow-y-auto" dir="rtl">
      
      {/* Tab Header title */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-3 shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Zap className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-black text-white">خطط إنقاذ وجدولة الطوارئ الطارئة</h2>
          <p className="text-[10px] text-slate-400 font-medium">برامج مكثفة للتجهيز ليلة الامتحان وصياغة جداول دراسية مخصصة</p>
        </div>
      </div>

      {/* Box A: Calendar Scheduler */}
      <div className="bg-[#0b1426] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-black text-white">1) خطة جدولة دراسية مخصصة (حسب وقتك)</h3>
        </div>

        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
          صنف مستواك والوقت المتبقي حتى يحضر لك الموجه الذكي برنامجاً ممتعاً ومقسم بالتفصيل.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-slate-400 font-bold mr-1">المادة المطلوبة للمذاكرة</label>
            <select
              className="bg-slate-900 border border-white/10 text-[11px] text-white rounded-xl py-2 px-2 focus:border-indigo-500 outline-none"
              value={targetSubject}
              onChange={(e) => setTargetSubject(e.target.value)}
            >
              {LESSON_DATA.map(s => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-slate-400 font-bold mr-1">المستوى التقريبي الحالي</label>
            <select
              className="bg-slate-900 border border-white/10 text-[11px] text-white rounded-xl py-2 px-2 focus:border-indigo-500 outline-none"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
            >
              <option value="ضعيف ومشتت">ضعيف ومشتت (من الصفر)</option>
              <option value="متوسط ملخبط">متوسط (فاهم القواعد محتاج حل)</option>
              <option value="جيد جداً">ممتاز (مراجعة نهائية عاجلة)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-slate-400 font-bold mr-1">عدد الأيام المتبقية</label>
            <input
              type="number"
              min={1}
              max={60}
              className="bg-slate-900 border border-white/10 text-[11px] text-white rounded-xl py-2 px-3 focus:border-indigo-500 outline-none font-bold"
              value={daysCount}
              onChange={(e) => setDaysCount(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-slate-400 font-bold mr-1">ساعات المذاكرة المخصصة يومياً</label>
            <input
              type="number"
              min={1}
              max={18}
              className="bg-slate-900 border border-white/10 text-[11px] text-white rounded-xl py-2 px-3 focus:border-indigo-500 outline-none font-bold"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={generateCalendarStudyPlan}
          className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-emerald-950" />
          <span>صياغة خطة المذاكرة الشخصية في المعلم الذكي</span>
        </button>
      </div>

      {/* Box B: Exam Tomorrow */}
      <div className="bg-[#0b1426] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-black text-white">2) خطة إنقاذ ليلة الامتحان (امتحاني بكرة!)</h3>
        </div>

        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
          علاج سريع مكثف في 6 ساعات يسرد لك خلاصة القوانين، أهم الأفكار، وأشهر فخاخ الامتحانات لتفادي القلق.
        </p>

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-[9px] text-slate-400 font-bold mr-1">اختر مادة امتحان غد:</label>
          <select
            className="bg-slate-900 border border-white/10 text-[11px] text-white rounded-xl py-2 px-3 focus:border-indigo-500 outline-none w-full"
            value={examSubject}
            onChange={(e) => setExamSubject(e.target.value)}
          >
            {LESSON_DATA.map(s => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={generateExamTomorrowPlan}
          className="mt-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.98]"
        >
          <PlayCircle className="w-4 h-4 text-amber-950" />
          <span>توليد خطة الإنقاذ العاجلة لليلة الامتحان</span>
        </button>
      </div>

    </div>
  );
}
