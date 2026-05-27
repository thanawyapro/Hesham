/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Award, BookOpen, ChevronRight, ChevronLeft, Calendar, HelpCircle, Users } from 'lucide-react';

interface GradeSelectorProps {
  initialGrade?: string;
  initialTerm?: string;
  initialTrack?: string;
  onSelect: (grade: string, term: string, track: string) => void;
  showBackButton?: boolean;
  onCancel?: () => void;
}

export default function GradeSelector({
  initialGrade,
  initialTerm,
  initialTrack,
  onSelect,
  showBackButton = false,
  onCancel
}: GradeSelectorProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedGrade, setSelectedGrade] = useState<string>(initialGrade || '');
  const [selectedTerm, setSelectedTerm] = useState<string>(initialTerm || '');
  const [selectedTrack, setSelectedTrack] = useState<string>(initialTrack || '');

  const grades = [
    { id: 'grade-1', title: 'الصف الأول الثانوي', label: 'أولى ثانوي', subtitle: 'مرحلة التأسيس للمرحلة الثانوية العامة', common: true },
    { id: 'grade-2', title: 'الصف الثاني الثانوي', label: 'تانية ثانوي', subtitle: 'تبدأ هنا مسارات التخصص المبدئية', common: false },
    { id: 'grade-3', title: 'الصف الثالث الثانوي', label: 'ثالثة ثانوي (الشهادة)', subtitle: 'العام المصيري الأهم وبنك المراجعة المتكامل', common: false }
  ];

  const terms = [
    { id: 'term-1', title: 'الترم الأول', label: 'الفصل الدراسي الأول', date: 'سبتمبر - يناير' },
    { id: 'term-2', title: 'الترم الثاني', label: 'الفصل الدراسي الثاني', date: 'فبراير - يونيو' }
  ];

  const grade2Tracks = [
    { id: 'علمي', title: 'شعبة علمي', desc: 'الفيزياء، الكيمياء، الأحياء والرياضيات المتقدمة' },
    { id: 'أدبي', title: 'شعبة أدبي', desc: 'التاريخ، الجغرافيا، الفلسفة وعلم النفس' }
  ];

  const grade3Tracks = [
    { id: 'علمي علوم', title: 'علمي علوم', desc: 'التركيز على الأحياء، الجيولوجيا، الفيزياء والكيمياء' },
    { id: 'علمي رياضة', title: 'علمي رياضة', desc: 'التركيز على الرياضيات البحتة والتطبيقية والفيزياء والكيمياء' },
    { id: 'أدبي', title: 'الشعبة الأدبية', desc: 'التركيز على التاريخ، الجغرافيا السياسية، الفلسفة والمنطق' }
  ];

  const handleGradeSelect = (gradeId: string) => {
    setSelectedGrade(gradeId);
    if (gradeId === 'grade-1') {
      setSelectedTrack('مشترك');
      setStep(2); // Grade 1 has no track selection, only term
    } else {
      setSelectedTrack('');
      setStep(2);
    }
  };

  const handleTermSelect = (termId: string) => {
    setSelectedTerm(termId);
    if (selectedGrade === 'grade-1') {
      // Done for Grade 1
      onSelect(selectedGrade, termId, 'مشترك');
    } else if (selectedGrade === 'grade-2') {
      // Grade 2 goes to Track selection
      setStep(3);
    } else {
      // Grade 3: term is set, goes to track selection
      setStep(3);
    }
  };

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    let term = selectedTerm;
    if (selectedGrade === 'grade-3') {
      term = 'full-year'; // Default for Grade 3
    }
    onSelect(selectedGrade, term, trackId);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  const getSelectedGradeLabel = () => grades.find(g => g.id === selectedGrade)?.title || '';
  const getSelectedTermLabel = () => terms.find(t => t.id === selectedTerm)?.title || '';

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-bg-primary text-text-primary min-h-0 select-none overflow-y-auto w-full select-none" dir="rtl">
      
      {/* Background radial soft light blobs */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-accent-blue/5 rounded-full filter blur-[70px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent-blue/5 rounded-full filter blur-[70px] pointer-events-none" />

      <div className="w-full max-w-md bg-bg-card border border-border-card rounded-[28px] p-6 shadow-subtle relative overflow-hidden flex flex-col gap-5 z-10 my-auto text-right">
        
        {/* Onboarding progress steps banner */}
        <div className="flex items-center justify-between border-b border-border-card pb-4 flex-row-reverse">
          <div className="flex items-center gap-2.5 flex-row-reverse">
            <div className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0">
              <GraduationCap className="w-4.5 h-4.5" />
            </div>
            <div className="text-right">
              <h1 className="text-xs font-black text-text-primary leading-none">تخصيص الخطة الأكاديمية</h1>
              <p className="text-[10px] text-text-muted font-black mt-1 leading-none">خطوة {step} من {selectedGrade === 'grade-1' ? 2 : 3}</p>
            </div>
          </div>

          {(step > 1 || showBackButton) && (
            <button
              onClick={handleBack}
              className="p-1.5 px-3 rounded-xl bg-bg-card-light border border-border-card hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-all text-[10px] font-black cursor-pointer flex items-center gap-1"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>رجوع</span>
            </button>
          )}
        </div>

        {/* Step 1: Select Academic Grade */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h2 className="text-sm font-black text-text-primary">مرحباً بك، اختر صفك الأكاديمي</h2>
              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed font-semibold">
                يرجى تحديد مرحلتك الدراسية بالثانوية العامة لعرض الخطة والمواد والأدوات والامتحانات الملائمة لك تماماً.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {grades.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGradeSelect(g.id)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group hover:bg-bg-card-light ${selectedGrade === g.id ? 'bg-bg-card-light border-accent-blue shadow-md' : 'bg-bg-card border-border-card hover:border-accent-blue/20'}`}
                >
                  <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-all group-hover:translate-x-[-3px]" />
                  
                  <div className="flex items-center gap-3.5 flex-row-reverse">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all shadow ${selectedGrade === g.id ? 'bg-accent-blue text-white' : 'bg-bg-primary border border-border-card text-text-secondary group-hover:text-accent-blue'}`}>
                      {g.id === 'grade-1' ? '١ث' : g.id === 'grade-2' ? '٢ث' : '٣ث'}
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-xs font-black text-text-primary group-hover:text-accent-blue transition-colors leading-none">{g.title}</span>
                      <span className="text-[9px] text-[#94a3b8] font-semibold mt-1 leading-none">{g.subtitle}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Academic Term */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            <div>
              <span className="text-[9px] font-bold text-accent-blue bg-accent-blue/10 px-2 py-1 rounded-full border border-accent-blue/10">
                {getSelectedGradeLabel()}
              </span>
              <h2 className="text-sm font-black text-text-primary mt-2">اختر الفصل الدراسي (الترم)</h2>
              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed font-semibold">
                اختر الترم الحالي لمعالجة تقدمك التعليمي الفوري، أو اختر الشهادة الكاملة للصف الثالث.
              </p>
            </div>

            {selectedGrade === 'grade-3' ? (
              // For grade 3 students, display options for Full Year or Final Revision
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleTermSelect('full-year')}
                  className="w-full text-right p-4 rounded-2xl border bg-bg-card border-border-card hover:border-accent-blue/20 hover:bg-bg-card-light transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-all group-hover:translate-x-[-3px]" />
                  
                  <div className="flex items-center gap-3.5 flex-row-reverse">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-xs font-black text-text-primary group-hover:text-accent-blue leading-none">المنهج والترتيب الكامل</span>
                      <span className="text-[9px] text-text-secondary mt-1 leading-none">كافة الوحدات التعليمية والدروس لعام كامل</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleTermSelect('final-revision')}
                  className="w-full text-right p-4 rounded-2xl border bg-bg-card border-border-card hover:border-accent-blue/20 hover:bg-bg-card-light transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-all group-hover:translate-x-[-3px]" />
                  
                  <div className="flex items-center gap-3.5 flex-row-reverse">
                    <div className="w-10 h-10 rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center text-accent-yellow shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-xs font-black text-text-primary group-hover:text-accent-blue leading-none">المراجعات النهائية وعقليات الامتحان</span>
                      <span className="text-[9px] text-text-secondary mt-1 leading-none">ملخصات سريعة وضغط كبسولات الامتحان الذكية</span>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              // Grade 1 & 2 display standard term cards
              <div className="flex flex-col gap-3">
                {terms.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTermSelect(t.id)}
                    className="w-full text-right p-4 rounded-2xl border bg-bg-card border-border-card hover:border-accent-blue/20 hover:bg-bg-card-light transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-all group-hover:translate-x-[-3px]" />
                    
                    <div className="flex items-center gap-3.5 flex-row-reverse">
                      <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-0.5 text-right">
                        <span className="text-xs font-black text-text-primary group-hover:text-accent-blue leading-none">{t.title}</span>
                        <span className="text-[9px] text-text-secondary mt-1 leading-none">{t.label} • {t.date}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: Select Specialization Track */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-1.5 flex-row-reverse justify-start">
                <span className="text-[9px] font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full border border-accent-blue/10">
                  {getSelectedGradeLabel()}
                </span>
                <span className="text-[9px] font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full border border-accent-green/10">
                  {getSelectedTermLabel() || 'منهج كامل'}
                </span>
              </div>
              <h2 className="text-sm font-black text-text-primary mt-2">اختر شعبتك التعليمية</h2>
              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed font-semibold">
                يرجى تحديد شعبتك لعرض المواد التخصصية مثل الفيزياء والرياضيات لعلمي، أو التاريخ والجغرافيا لأدبي.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {(selectedGrade === 'grade-2' ? grade2Tracks : grade3Tracks).map((tr) => (
                <button
                  key={tr.id}
                  onClick={() => handleTrackSelect(tr.id)}
                  className="w-full text-right p-4 rounded-2xl border bg-bg-card border-border-card hover:border-accent-blue/20 hover:bg-bg-card-light transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-all group-hover:translate-x-[-3px]" />
                  
                  <div className="flex items-center gap-3.5 flex-row-reverse">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue font-extrabold text-xs shrink-0">
                      {tr.id === 'أدبي' ? 'أدبي' : 'علمي'}
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-xs font-black text-text-primary group-hover:text-accent-blue leading-none">{tr.title}</span>
                      <span className="text-[9px] text-text-secondary leading-normal max-w-[200px] block font-semibold mt-1">{tr.desc}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer info badge */}
        <div className="flex items-center gap-1.5 justify-center mt-2 p-2.5 bg-accent-blue/5 rounded-xl border border-accent-blue/10 text-[9px] font-bold text-text-secondary text-center leading-normal">
          <HelpCircle className="w-3.5 h-3.5 text-accent-blue shrink-0" />
          <span>يمكنك دائمًا تغيير الصف والمرحلة لاحقًا من شريط الاختيار العلوي.</span>
        </div>
      </div>
    </div>
  );
}
