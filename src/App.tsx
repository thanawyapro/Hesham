/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import AndroidFrame from './components/AndroidFrame.tsx';
import BottomNavBar, { TabId } from './components/BottomNavBar.tsx';
import SubjectView from './components/SubjectView.tsx';
import ErrorBank from './components/ErrorBank.tsx';
import EmbeddedTutor from './components/EmbeddedTutor.tsx';
import EmergencyPlans from './components/EmergencyPlans.tsx';
import { Subject, Lesson, ErrorRecord, Track } from './types.ts';
import { LESSON_DATA, ACTIONS } from './data.ts';
import { Search, GraduationCap, Star, BookOpen, ChevronLeft, Flame, BrainCircuit, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LOCAL_STORAGE_KEY = 'thanaweya_study_os_state';

// Default mock student data on initial load
interface SavedState {
  done: string[];
  errors: ErrorRecord[];
  points: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('curriculum');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<Track>('all');

  // Shared educational focus state triggers
  const [tutorContext, setTutorContext] = useState<{
    prompt?: string;
    subject?: Subject;
    lesson?: Lesson;
  }>({});

  // App metrics stored in local storage
  const [points, setPoints] = useState<number>(100); // 100 base welcome points!
  const [doneLessons, setDoneLessons] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorRecord[]>([]);

  // Load state from local storage on startup
  useEffect(() => {
    try {
      const parsed = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (parsed) {
        const data: SavedState = JSON.parse(parsed);
        if (data.done) setDoneLessons(data.done);
        if (data.errors) setErrors(data.errors);
        if (data.points !== undefined) setPoints(data.points);
      }
    } catch (e) {
      console.error("Failed to load study metrics from storage:", e);
    }
  }, []);

  // Save current state on any metric adjustments
  const saveState = (updatedDone: string[], updatedErrors: ErrorRecord[], updatedPoints: number) => {
    try {
      const payload: SavedState = {
        done: updatedDone,
        errors: updatedErrors,
        points: updatedPoints
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to save study metrics:", e);
    }
  };

  // Mark lesson done / completed logic
  const handleToggleComplete = (lessonId: string) => {
    let nextDone = [...doneLessons];
    let nextPoints = points;

    if (doneLessons.includes(lessonId)) {
      nextDone = nextDone.filter(id => id !== lessonId);
      nextPoints = Math.max(0, nextPoints - 10); // refund points
    } else {
      nextDone.push(lessonId);
      nextPoints += 10; // Award +10 points for completion!
    }

    setDoneLessons(nextDone);
    setPoints(nextPoints);
    saveState(nextDone, errors, nextPoints);
  };

  // Add lesson to mistakes/error bank log
  const handleAddToErrors = (lessonId: string) => {
    // Locate target lesson metadata
    let targetLesson: Lesson | null = null;
    let targetSubject: Subject | null = null;
    let targetUnitTitle = 'الفصل الأول';

    for (const sub of LESSON_DATA) {
      for (const unit of sub.units) {
        const found = unit.lessons.find(l => l.id === lessonId);
        if (found) {
          targetLesson = found;
          targetSubject = sub;
          targetUnitTitle = unit.title;
          break;
        }
      }
    }

    if (!targetLesson || !targetSubject) return;

    // Check if lesson error already exists in active bank to prevent multiples
    if (errors.some(err => err.lessonId === lessonId)) {
      alert("الدرس مضاف بالفعل في بنك أخطائك بنجاح!");
      return;
    }

    const newRecord: ErrorRecord = {
      id: `err-${Date.now()}-${Math.random().toString(36).substring(4, 9)}`,
      lessonId: lessonId,
      subject: targetSubject.title,
      unit: targetUnitTitle,
      lesson: targetLesson.title,
      date: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      type: 'صعوبة في الفهم / أخطاء تقويمية'
    };

    const nextErrors = [newRecord, ...errors];
    const nextPoints = points + 2; // Award bonus +2 points for courage of studying mistakes!

    setErrors(nextErrors);
    setPoints(nextPoints);
    saveState(doneLessons, nextErrors, nextPoints);
    alert(`تم إضافة درس (${targetLesson.title}) بنجاح إلى سجل أخطائك لتحميل المراجعة بالذكاء الاصطناعي!`);
  };

  // Remove resolved lesson error
  const handleRemoveError = (errorId: string) => {
    const nextErrors = errors.filter(err => err.id !== errorId);
    setErrors(nextErrors);
    saveState(doneLessons, nextErrors, points);
  };

  // Action pipeline connector: compiles action prompt and directs system to tutor area
  const handleTriggerActionOnLesson = (lesson: Lesson, subject: Subject, actionIndex: number) => {
    const action = ACTIONS[actionIndex];
    const systemIns = `أنت مدرس متخصص في مادة (${subject.title}) للثانوية العامة المصرية.`;
    const promptText = `الدرس المستهدف: (${lesson.title})\nموجز الدرس: (${lesson.summary})\nالمهمة المطلوبة فوريًا:\n${action.prompt}`;

    setTutorContext({
      prompt: promptText,
      subject: subject,
      lesson: lesson
    });
    setActiveTab('ai-tutor');
  };

  // Diagnostic solver for specific mistakes
  const handleDiagnoseError = (err: ErrorRecord) => {
    const sub = LESSON_DATA.find(s => s.title === err.subject);
    const les = sub?.units.flatMap(u => u.lessons).find(l => l.id === err.lessonId);

    const promptText = `أنت موجه تعليمي في مادة (${err.subject}) للثانوية العامة المصرية. لقد أخطأت في فهم أو حل تدريبات درس (${err.lesson}) في باب (${err.unit}).\n\nالمطلوب:\n- اشرح لي باختصار وتبسيط شديد الفكرة الأساسية للدرس.\n- اذكر لي أشهر الخطوط الحمراء أو الفخاخ التي تضعها وزارة التربية والتعليم في الامتحانات في هذا الدرس.\n- صغ لي سؤالاً اختبارياً قصيرا مع توفير الإجابة التفصيلية النموذجية المطابقة لأوزان الفهم والاستنتاج.`;

    setTutorContext({
      prompt: promptText,
      subject: sub,
      lesson: les
    });
    setActiveTab('ai-tutor');
  };

  // Global analysis of student weaknesses
  const handleGlobalDiagnostic = () => {
    const failedSubjects = [...new Set(errors.map(e => e.subject))].join('، ');
    const promptText = `أنت طبيب نفسي وموجه أكاديمي عالي المستوى لطلبة الثانوية العامة في مصر. لدي أخطاء وصعوبات مسجلة في المواد التالية: (${failedSubjects}).\n\nالمطلوب:\n1. صغ لي اختبارًا تشخيصيًا سريعًا من 7 أسئلة لقياس سبب تعثري في هذه المواد.\n2. حلل لي عقبات الطلاب الشائعة في هذه الأقسام.\n3. ضع لي خطة علاج نفسية وأكاديمية متكاملة لمد جسور الفهم وتخطي التوتر في الامتحان.`;

    setTutorContext({
      prompt: promptText
    });
    setActiveTab('ai-tutor');
  };

  // Navigates directly via simple custom prompt trigger
  const handleTriggerSpecialTool = (compiledPrompt: string) => {
    setTutorContext({
      prompt: compiledPrompt,
      subject: selectedSubject || undefined
    });
    setActiveTab('ai-tutor');
  };

  // Curriculum card filters
  const filteredSubjects = LESSON_DATA.filter(sub => {
    // 1. Filter by track tab
    if (selectedTrack !== 'all' && sub.track !== selectedTrack) return false;

    // 2. Filter by search query input
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSubject = sub.title.toLowerCase().includes(q) || sub.track.toLowerCase().includes(q);
      const matchLessons = sub.units.some(u => 
        u.title.toLowerCase().includes(q) || 
        u.lessons.some(l => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q))
      );
      return matchSubject || matchLessons;
    }

    return true;
  });

  return (
    <AndroidFrame>
      <div className="flex-1 flex flex-col min-h-0 bg-[#061225] text-slate-100 relative">
        <h2 className="sr-only">مقرر الثانوية العامة</h2>
        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            
            {activeTab === 'curriculum' && (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col min-h-0"
              >
                {selectedSubject ? (
                  /* Active Single Subject Workspace Workspace */
                  <SubjectView
                    subject={selectedSubject}
                    onBack={() => setSelectedSubject(null)}
                    doneLessons={doneLessons}
                    onToggleComplete={handleToggleComplete}
                    onAddToErrors={handleAddToErrors}
                    onTriggerActionOnLesson={(lesson, idx) => 
                      handleTriggerActionOnLesson(lesson, selectedSubject, idx)
                    }
                    onTriggerSpecialTool={handleTriggerSpecialTool}
                  />
                ) : (
                  /* Global Subjects Grid Panel catalog */
                  <div className="p-4 flex flex-col gap-4 text-right" dir="rtl">
                    
                    {/* Active welcoming panel */}
                    <div className="bg-gradient-to-l from-indigo-950/45 to-[#0b1426] border border-white/5 rounded-3xl p-4 flex justify-between items-center gap-4 relative overflow-hidden shrink-0">
                      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-indigo-500/10 filter blur-[40px] pointer-events-none" />
                      <div>
                        <div className="flex items-center gap-1.5 text-indigo-400">
                          <Flame className="w-4 h-4 fill-amber-500 stroke-none animate-pulse" />
                          <span className="text-[10px] font-black tracking-wide">أهلاً بك يا بطل الثانوية العامة</span>
                        </div>
                        <h3 className="text-sm font-black text-white mt-1 leading-relaxed">
                          نظام المذاكرة الذكي للنجاح الباهر
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                          ابدأ اختيار المواد من الأسفل للدراسة، أو شغل المعلم الذكي لتوليد الخلاصة والأسئلة فوراً.
                        </p>
                      </div>

                      {/* Mascot indicator badge icon */}
                      <div className="w-11 h-11 bg-indigo-500/15 border border-indigo-400/20 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0 shadow-lg">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Integrated dynamic Search header */}
                    <div className="relative shrink-0">
                      <input
                        type="text"
                        placeholder="ابحث بذكاء: مادة، درس، تفاضل، كيمياء انتقالية..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-xs font-bold text-slate-200 outline-none focus:border-indigo-500 placeholder-slate-600 transition-all text-right"
                      />
                      <Search className="w-4 h-4 text-indigo-400 absolute top-4 right-4" />
                    </div>

                    {/* Track filter pills catalog */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <label className="text-[10px] text-slate-500 font-extrabold mr-1">صنف المواد حسب شعبتك التعليمية:</label>
                      <div className="flex gap-1.5 overflow-x-auto pb-1 invisible-scroll">
                        {[
                          { id: 'all', label: 'كل المواد' },
                          { id: 'مشترك', label: 'المواد المشتركة' },
                          { id: 'علمي علوم / علمي رياضة', label: 'علمي مشترک' },
                          { id: 'علمي علوم', label: 'شعبة علمي علوم' },
                          { id: 'علمي رياضة', label: 'شعبة علمي رياضة' },
                          { id: 'أدبي', label: 'الشعبة الأدبية' }
                        ].map((track) => {
                          const isActive = selectedTrack === track.id;
                          return (
                            <button
                              key={track.id}
                              onClick={() => setSelectedTrack(track.id as Track)}
                              className={`py-1.5 px-3.5 rounded-full text-[10px] font-black cursor-pointer border transition-all shrink-0 ${isActive ? 'bg-[#2563eb] text-white border-[#2563eb] font-extrabold shadow' : 'bg-slate-950/30 text-slate-400 border-white/5 hover:text-white'}`}
                            >
                              {track.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filtered Subjects Grid list */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span className="text-[10px] text-slate-500 font-black">المواد المتوفرة للمنهج</span>
                        <span className="text-[10px] text-indigo-400 font-bold">{filteredSubjects.length} مادة</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                        {filteredSubjects.map((sub) => {
                          const totalLes = sub.units.reduce((acc, u) => acc + u.lessons.length, 0);
                          const subLessons = sub.units.flatMap(u => u.lessons.map(l => l.id));
                          const countDone = subLessons.filter(id => doneLessons.includes(id)).length;
                          const pct = totalLes ? Math.round((countDone / totalLes) * 100) : 0;

                          return (
                            <button
                              key={sub.slug}
                              onClick={() => setSelectedSubject(sub)}
                              className="w-full bg-[#0b1426] border border-white/5 hover:border-white/10 rounded-2xl p-4 text-right cursor-pointer flex items-center justify-between gap-4 transition-all hover:bg-slate-900/60 relative overflow-hidden group shadow-md"
                            >
                              {/* Glowing subtle edge marker */}
                              <div className="absolute top-0 right-0 w-1 h-full" style={{ backgroundColor: sub.color }} />

                              <div className="flex items-center gap-3.5">
                                <div 
                                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow"
                                  style={{ backgroundColor: sub.color }}
                                >
                                  {sub.icon}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <h4 className="text-xs font-black text-white group-hover:text-amber-400 transition-colors leading-relaxed">
                                    {sub.title}
                                  </h4>
                                  <span className="text-[9px] text-slate-400 leading-none">
                                    {sub.track} • {sub.units.length} وحدات • {totalLes} درس
                                  </span>
                                  
                                  {/* Progress micro display */}
                                  {pct > 0 && (
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                      <div className="w-20 bg-slate-950 rounded-full h-1 overflow-hidden">
                                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                                      </div>
                                      <span className="text-[8px] text-emerald-400 font-extrabold leading-none">{pct}% مكتمل</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors group-hover:translate-x-[-2px]" />
                            </button>
                          );
                        })}

                        {filteredSubjects.length === 0 && (
                          <div className="text-center py-10 text-slate-500 text-xs font-semibold">
                            لا توجد مواد تطابق تفضيلاتك وتعبيرات بحثك المحددة...
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'errors' && (
              <motion.div
                key="errors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <ErrorBank
                  errors={errors}
                  onRemoveError={handleRemoveError}
                  onDiagnoseError={handleDiagnoseError}
                  onGlobalDiagnostic={handleGlobalDiagnostic}
                />
              </motion.div>
            )}

            {activeTab === 'ai-tutor' && (
              <motion.div
                key="ai-tutor"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <EmbeddedTutor
                  initialPrompt={tutorContext.prompt}
                  initialSubject={tutorContext.subject}
                  initialLesson={tutorContext.lesson}
                  onClearInitial={() => setTutorContext({})}
                />
              </motion.div>
            )}

            {activeTab === 'plans' && (
              <motion.div
                key="plans"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <EmergencyPlans
                  onGeneratePrompt={(promptText) => {
                    setTutorContext({
                      prompt: promptText
                    });
                    setActiveTab('ai-tutor');
                  }}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Global Footer Navigation */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            // Reset subject open workspace if tab switches from curriculum to errors/ai-tutor etc.
            if (tab !== 'curriculum') {
              // Note: We don't necessarily have to close it, but it allows a cleaner back transition
            }
          }}
          points={points}
        />
      </div>
    </AndroidFrame>
  );
}
