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
import AuthScreen from './components/AuthScreen.tsx';
import GradeSelector from './components/GradeSelector.tsx';
import { Subject, Lesson, ErrorRecord, Track } from './types.ts';
import { LESSON_DATA, ACTIONS } from './data.ts';
import { supabase, isSupabaseConfigured, syncPullState, syncPushState } from './lib/supabase.ts';
import { 
  Search, GraduationCap, Star, BookOpen, ChevronLeft, Flame, 
  BrainCircuit, HeartHandshake, Cloud, CloudOff, LogOut, RefreshCw, User, Sun, Moon, CheckCircle2, SlidersHorizontal 
} from 'lucide-react';
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
  const [showAllSubjects, setShowAllSubjects] = useState<boolean>(false);

  // Academic pathways customization states
  const [selectedGrade, setSelectedGrade] = useState<string>(() => {
    try {
      return localStorage.getItem('thanaweya_selected_grade') || '';
    } catch {
      return '';
    }
  });

  const [selectedTerm, setSelectedTerm] = useState<string>(() => {
    try {
      return localStorage.getItem('thanaweya_selected_term') || '';
    } catch {
      return '';
    }
  });

  const [currentTrack, setCurrentTrack] = useState<string>(() => {
    try {
      return localStorage.getItem('thanaweya_selected_track') || '';
    } catch {
      return '';
    }
  });

  // Theme representation: light | dark | auto
  const [appearanceMode, setAppearanceMode] = useState<'light' | 'dark' | 'auto'>(() => {
    try {
      return (localStorage.getItem('thanaweya_appearance_mode') as 'light' | 'dark' | 'auto') || 'auto';
    } catch {
      return 'auto';
    }
  });

  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    if (appearanceMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        setActiveTheme(mediaQuery.matches ? 'dark' : 'light');
      };
      setActiveTheme(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setActiveTheme(appearanceMode);
    }
  }, [appearanceMode]);

  const handleSetAppearanceMode = (mode: 'light' | 'dark' | 'auto') => {
    setAppearanceMode(mode);
    try {
      localStorage.setItem('thanaweya_appearance_mode', mode);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTheme = () => {
    const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
    handleSetAppearanceMode(nextTheme);
  };

  // Authentication states
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isMock, setIsMock] = useState<boolean>(true);
  const [cloudSyncing, setCloudSyncing] = useState<boolean>(false);

  // Shared educational focus state triggers
  const [tutorContext, setTutorContext] = useState<{
    prompt?: string;
    subject?: Subject;
    lesson?: Lesson;
  }>({});

  // App metrics stored in local storage / cloud
  const [points, setPoints] = useState<number>(100); // 100 base welcome points!
  const [doneLessons, setDoneLessons] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorRecord[]>([]);

  // Track-specific state loading effect whenever Grade / Term / Track selection is made
  useEffect(() => {
    if (!selectedGrade) return;

    const pathKey = `thanaweya_study_os_state_${selectedGrade}_${selectedTerm}_${currentTrack}`;
    try {
      const parsed = localStorage.getItem(pathKey);
      if (parsed) {
        const data: SavedState = JSON.parse(parsed);
        setDoneLessons(data.done || []);
        setErrors(data.errors || []);
        setPoints(data.points !== undefined ? data.points : 100);
      } else {
        // Fallback or brand new pathway
        setDoneLessons([]);
        setErrors([]);
        setPoints(100);
      }
    } catch (err) {
      console.error("Failed to load local metrics catalog for track:", err);
    }
  }, [selectedGrade, selectedTerm, currentTrack]);

  // Session Recovery & Initial State Load
  useEffect(() => {
    const checkSessionAndLoad = async () => {
      // 1. Initial Local Cache Load (to keep app instant)
      try {
        const pathKey = selectedGrade 
          ? `thanaweya_study_os_state_${selectedGrade}_${selectedTerm}_${currentTrack}`
          : LOCAL_STORAGE_KEY;
        const parsed = localStorage.getItem(pathKey);
        if (parsed) {
          const data: SavedState = JSON.parse(parsed);
          if (data.done) setDoneLessons(data.done);
          if (data.errors) setErrors(data.errors);
          if (data.points !== undefined) setPoints(data.points);
        }
      } catch (err) {
        console.error("Failed to load local metrics catalog:", err);
      }

      // 2. Recover live cloud state if Supabase is active
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const loggedInUser = {
              id: session.user.id,
              email: session.user.email || ''
            };
            setUser(loggedInUser);
            setIsMock(false);

            setCloudSyncing(true);
            const cloudState = await syncPullState(session.user.id);
            if (cloudState) {
              setDoneLessons(cloudState.done);
              setErrors(cloudState.errors);
              setPoints(cloudState.points);

              // Update local memory cache with cloud master
              const payload: SavedState = {
                done: cloudState.done,
                errors: cloudState.errors,
                points: cloudState.points
              };
              const activeKey = selectedGrade 
                ? `thanaweya_study_os_state_${selectedGrade}_${selectedTerm}_${currentTrack}`
                : LOCAL_STORAGE_KEY;
              localStorage.setItem(activeKey, JSON.stringify(payload));
            }
            setCloudSyncing(false);
          }
        } catch (err) {
          console.error("Auth session recovery failed:", err);
        }

        // Setup live listener for dynamic changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
          if (session?.user) {
            setUser({ id: session.user.id, email: session.user.email || '' });
            setIsMock(false);
          } else {
            setUser(null);
          }
        });

        return () => subscription.unsubscribe();
      }
    };

    checkSessionAndLoad();
  }, []);

  // Save state handler with dual local persistence + cloud backup
  const saveState = async (
    updatedDone: string[], 
    updatedErrors: ErrorRecord[], 
    updatedPoints: number,
    overrideUser?: { id: string; email: string }
  ) => {
    const currentUser = overrideUser || user;
    const pathKey = selectedGrade 
      ? `thanaweya_study_os_state_${selectedGrade}_${selectedTerm}_${currentTrack}`
      : LOCAL_STORAGE_KEY;
    try {
      const payload: SavedState = {
        done: updatedDone,
        errors: updatedErrors,
        points: updatedPoints
      };
      localStorage.setItem(pathKey, JSON.stringify(payload));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));

      if (currentUser && !isMock && isSupabaseConfigured) {
        setCloudSyncing(true);
        await syncPushState(currentUser.id, {
          done: updatedDone,
          errors: updatedErrors,
          points: updatedPoints
        });
        setCloudSyncing(false);
      }
    } catch (err) {
      console.error("State syncer failed:", err);
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
      type: 'صعوبة في الفهم / أخطاء تقويمية',
      gradeId: selectedGrade,
      termId: selectedTerm,
      track: currentTrack
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

    const promptText = `أنت مدرس ثانوية عامة مصري خبير للمرحلة الحالية:
الصف الدراسي: (${getGradeLabel()})
الترم/الفصل الدراسي: (${getTermLabel()})
الشعبة/المسار: (${currentTrack || 'مشترك'})
المادة الدراسية: (${subject.title})
تصنيف المادة الكلي: (${subject.addedToTotal ? 'مضافة للمجموع الكلي للشهادة الثانوية ونظام التقويم المجموعي' : 'خارج المجموع الكلي - مادة نجاح ورسوب'})

الدرس المستهدف للمذاكرة: (${lesson.title})
موجز الدرس: (${lesson.summary})

المطلوب فوريًا وملاءمته بنسبة 100% لأوزان وصعوبة امتحانات شهادة الثانوية العامة بجمهورية مصر العربية لهذه السنة بوزارة التربية والتعليم:
${action.prompt}`;

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

    const promptText = `أنت موجه تعليمي خبير في مادة (${err.subject}) لـ (${getGradeLabel()}) - (${getTermLabel()}) بمصر. لقد أخطأت في فهم أو حل تدريبات درس (${err.lesson}) في باب (${err.unit}).\n\nالمطلوب لعلاج نقطة الضعف:\n- اشرح لي باختصار وتبسيط شديد الفكرة الأساسية للدرس.\n- اذكر أشهر الخطوط الحمراء أو الفخاخ التي يضعها واضعو الامتحانات بمصر في هذا الدرس.\n- صغ لي سؤالاً اختبارياً قصيرا مع توفير الإجابة التفصيلية النموذجية المطابقة لأوزان الفهم والاستنتاج لهذه المرحلة الكورس.`;

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

    const promptText = `أنت معالج تربوي وموجه أكاديمي عالي المستوى لطلبة الثانوية العامة في مصر خصيصاً لـ (${getGradeLabel()}) - (${getTermLabel()}). لدي أخطاء وصعوبات مسجلة في المواد التالية: (${failedSubjects}).\n\nالمطلوب:\n1. صغ لي اختبارًا تشخيصيًا سريعًا من 7 أسئلة لقياس سبب تعثري في هذه المواد.\n2. حلل لي عقبات الطلاب الشائعة في هذه الأقسام.\n3. ضع لي خطة علاج نفسية وأكاديمية متكاملة لمد جسور الفهم وتخطي التوتر في الامتحان.`;

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

  // Auth Success logic that merges local/cloud progress
  const handleAuthSuccess = async (authenticatedUser: { id: string; email: string }, isUserMock: boolean) => {
    setUser(authenticatedUser);
    setIsMock(isUserMock);

    if (!isUserMock && isSupabaseConfigured) {
      setCloudSyncing(true);
      const cloudState = await syncPullState(authenticatedUser.id);
      if (cloudState) {
        setDoneLessons(cloudState.done);
        setErrors(cloudState.errors);
        setPoints(cloudState.points);

        // Update local storage representation
        const localPayload: SavedState = {
          done: cloudState.done,
          errors: cloudState.errors,
          points: cloudState.points
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localPayload));
      } else {
        // Upload any existing offline work so the student never loses progress!
        await syncPushState(authenticatedUser.id, {
          done: doneLessons,
          errors: errors,
          points: points
        });
      }
      setCloudSyncing(false);
    }
  };

  // Sign out routine that clears session
  const handleSignOut = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error("Sign out error:", err);
      }
    }
    setUser(null);
    setIsMock(true);
    // Clear local states for isolation in shared environments
    setDoneLessons([]);
    setErrors([]);
    setPoints(100);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    alert('تم تسجيل الخروج وتصفير البيانات المحلية بنجاح.');
  };

  // Curriculum card filters with precise pathways sorting
  const filteredSubjects = LESSON_DATA.filter(sub => {
    // 1. Filter by Grade
    if (sub.gradeId !== selectedGrade) return false;

    // 2. Filter by Term
    if (sub.termId !== selectedTerm) return false;

    // 3. Filter by Custom track selection
    const track = currentTrack;
    if (track !== 'مشترك') {
      const subTrack = sub.track;
      if (subTrack !== 'مشترك' && subTrack !== track) {
        // Shared scientific branches in G3 (e.g., Chemistry, Physics belong to both G3 Bio and G3 Math)
        if ((track === 'علمي علوم' || track === 'علمي رياضة') && subTrack === 'علمي علوم / علمي رياضة') {
          // Accept G3 shared scientific
        } else {
          return false;
        }
      }
    } else {
      // If the student's active track is "مشترك", only show مشتركة subjects
      if (sub.track !== 'مشترك') return false;
    }

    // 4. Filter by visibleByDefault (hide optional/vocational unless enabled by showAllSubjects)
    const isSpecialSearched = searchQuery.trim() !== '';
    if (!showAllSubjects && sub.visibleByDefault === false && !isSpecialSearched) {
      return false;
    }

    // 5. Map optional search query filter including metadata classifications
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      
      const getGradeLabel = () => {
        if (sub.gradeId === 'grade-1') return 'الصف الأول الثانوي أولى ثانوي مشتركة سنة أولى';
        if (sub.gradeId === 'grade-2') return 'الصف الثاني الثانوي تانية ثانوي شعبة علمي أدبي';
        if (sub.gradeId === 'grade-3') return 'الصف الثالث الثانوي تالتة ثانوي ثالثة ثانوي شهادة بكالوريا';
        return '';
      };

      const getTermLabel = () => {
        if (sub.termId === 'term-1') return 'الترم الأول الفصل الدراسي الأول';
        if (sub.termId === 'term-2') return 'الترم الثاني الفصل الدراسي الثاني';
        if (sub.termId === 'final-revision') return 'المراجعات النهائية كبسولة المراجعة مراجعة';
        if (sub.termId === 'full-year') return 'المنهج الكامل العام الدراسي كاملا';
        return '';
      };

      const getCategoryLabel = () => {
        let label = '';
        if (sub.addedToTotal) label += ' مضافة للمجموع أساسية كبرى درجة درجات ';
        if (sub.category === 'pass_fail') label += ' خارج المجموع نجاح ورسوب نجاح وسقوط مستقلة ';
        if (sub.category === 'optional_activity') label += ' اختيارية نشاط حر تربوي هوايات ';
        if (sub.category === 'vocational') label += ' مهنية تربية مهنية حرفية صناعة زراعة مشروعات ';
        return label;
      };

      const gradeTxt = getGradeLabel().toLowerCase();
      const termTxt = getTermLabel().toLowerCase();
      const catTxt = getCategoryLabel().toLowerCase();
      const subjectTxt = sub.title.toLowerCase();
      const trackTxt = sub.track ? sub.track.toLowerCase() : '';

      const matchSubject = 
        subjectTxt.includes(q) || 
        trackTxt.includes(q) || 
        gradeTxt.includes(q) || 
        termTxt.includes(q) || 
        catTxt.includes(q);

      const matchLessons = sub.units ? sub.units.some(u => 
        u.title.toLowerCase().includes(q) || 
        u.lessons.some(l => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q))
      ) : false;

      return matchSubject || matchLessons;
    }

    return true;
  });

  if (!user) {
    return (
      <AndroidFrame>
        <div className={`flex-1 flex flex-col min-h-0 relative ${activeTheme === 'light' ? 'theme-light' : 'theme-dark'}`}>
          <AuthScreen onAuthSuccess={handleAuthSuccess} />
        </div>
      </AndroidFrame>
    );
  }

  // If the user is authenticated but has not selected an academic stage/profile yet
  if (!selectedGrade) {
    return (
      <AndroidFrame>
        <div className={`flex-1 flex flex-col min-h-0 relative ${activeTheme === 'light' ? 'theme-light' : 'theme-dark'}`}>
          <GradeSelector
            onSelect={(grade, term, track) => {
              setSelectedGrade(grade);
              setSelectedTerm(term);
              setCurrentTrack(track);
              try {
                localStorage.setItem('thanaweya_selected_grade', grade);
                localStorage.setItem('thanaweya_selected_term', term);
                localStorage.setItem('thanaweya_selected_track', track);
              } catch (e) {
                console.error(e);
              }
            }}
          />
        </div>
      </AndroidFrame>
    );
  }

  // Finds the first incomplete lesson in active path
  const getContinueLearningLesson = () => {
    if (!filteredSubjects || filteredSubjects.length === 0) return null;
    for (const sub of filteredSubjects) {
      for (const unit of sub.units) {
        const nextIncomplete = unit.lessons.find(l => !doneLessons.includes(l.id));
        if (nextIncomplete) {
          return { lesson: nextIncomplete, subject: sub };
        }
      }
    }
    return null;
  };
  const continueLearning = getContinueLearningLesson();

  const getDailyReviewLesson = () => {
    if (!filteredSubjects || filteredSubjects.length === 0) return null;
    // Return a random lesson from the current active subjects lists
    const allActiveLessons: { lesson: Lesson; subject: Subject }[] = [];
    for (const sub of filteredSubjects) {
      for (const unit of sub.units) {
        for (const l of unit.lessons) {
          allActiveLessons.push({ lesson: l, subject: sub });
        }
      }
    }
    if (allActiveLessons.length === 0) return null;
    
    // Seed by date so it changes daily but stays common for the day
    const day = new Date().getDate();
    const idx = day % allActiveLessons.length;
    return allActiveLessons[idx];
  };
  const dailyReview = getDailyReviewLesson();

  return (
    <AndroidFrame>
      <div className={`flex-1 flex flex-col min-h-0 bg-[#061225] text-slate-100 relative ${activeTheme === 'light' ? 'theme-light' : 'theme-dark'}`}>
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
                    selectedGrade={selectedGrade}
                    selectedTerm={selectedTerm}
                    currentTrack={currentTrack}
                  />
                ) : (
                  /* Global Subjects Grid Panel catalog */
                  <div className="p-4 flex flex-col gap-4 text-right animate-fade-in" dir="rtl">
                    
                    {/* Dynamic Path selection bar and info header */}
                    <div className="bg-[#10192d] border border-indigo-500/20 p-3 rounded-2xl flex items-center justify-between gap-3 text-right shrink-0 shadow-md">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <GraduationCap className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[8px] text-indigo-400 font-black">المسار الأكاديمي النشط</span>
                          <h4 className="text-[10px] font-black text-slate-100 mt-0.5 leading-none">
                            {selectedGrade === 'grade-1' ? 'الصف الأول الثانوي' : selectedGrade === 'grade-2' ? 'الصف الثاني الثانوي' : 'الصف الثالث الثانوي'} • {selectedTerm === 'term-1' ? 'الترم الأول' : selectedTerm === 'term-2' ? 'الترم الثاني' : selectedTerm === 'final-revision' ? 'مراجعة نهائية' : 'منهج كامل'} • {currentTrack}
                          </h4>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedGrade('');
                          setSelectedSubject(null);
                        }}
                        className="bg-indigo-600/15 hover:bg-indigo-600 text-indigo-300 hover:text-white font-black text-[9px] py-1.5 px-3 rounded-xl cursor-pointer transition-all flex items-center gap-1 shadow-inner"
                      >
                        <RefreshCw className="w-2.5 h-2.5 animate-spin-hover" />
                        <span>تغيير</span>
                      </button>
                    </div>
                    
                    {/* User Profile / Supabase Synchronization status card */}
                    <div className="flex items-center justify-between bg-slate-900/40 border border-white/5 py-2 px-3 rounded-2xl text-xs font-semibold text-slate-300 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-6.5 h-6.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[8px] text-slate-500 font-bold leading-none">الملف الأكاديمي الحالي</span>
                          <span className="text-[10px] text-slate-200 font-black mt-0.5 max-w-[130px] truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isMock ? (
                          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 py-0.5 px-2 rounded-lg text-[8px] text-amber-400 font-black">
                            <CloudOff className="w-3 h-3" />
                            <span>زائر محلي</span>
                          </div>
                        ) : (
                          <div className={`flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 py-0.5 px-2 rounded-lg text-[8px] text-emerald-400 font-black ${cloudSyncing ? 'animate-pulse' : ''}`}>
                            <Cloud className={`w-3 h-3 ${cloudSyncing ? 'animate-bounce' : ''}`} />
                            <span>سحابي مزامن</span>
                          </div>
                        )}

                        <button
                          onClick={toggleTheme}
                          className="p-1 px-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-white/10 text-indigo-400 text-[8px] font-black cursor-pointer transition-all flex items-center gap-1"
                          title={activeTheme === 'light' ? 'التحويل للوضع الداكن' : 'التحويل للوضع المضيء'}
                        >
                          {activeTheme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                          <span>{activeTheme === 'light' ? 'داكن' : 'مضيء'}</span>
                        </button>

                        <button
                          onClick={handleSignOut}
                          className="p-1 px-1.5 rounded-lg bg-slate-950 hover:bg-rose-950 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 text-[8px] font-black cursor-pointer transition-all flex items-center gap-1"
                          title="تسجيل الخروج"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>خروج</span>
                        </button>
                      </div>
                    </div>
                    
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
                      <div className="w-12 h-12 bg-indigo-950 border border-indigo-500/30 rounded-2xl overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
                        <img 
                          src="/src/assets/images/thanaweya_os_icon_1779908135626.png" 
                          alt="Thanaweya AI Study OS Icon" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Continue Learning Widget Section */}
                    {continueLearning ? (
                      <div className="bg-[#0b1426] border border-emerald-500/20 p-4 rounded-3xl relative overflow-hidden flex flex-col gap-2.5 shrink-0 text-right">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500" />
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-emerald-400" />
                            <span className="text-[9px] font-black text-emerald-400">تابع المذاكرة ومواصلة التعلم</span>
                          </div>
                          <span className="text-[8px] text-slate-500 font-extrabold">{continueLearning.subject.title}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 mt-0.5 pr-1">
                          <h4 className="text-xs font-black text-white leading-relaxed">{continueLearning.lesson.title}</h4>
                          <p className="text-[9.5px] text-slate-400 font-medium leading-relaxed max-w-[280px]">{continueLearning.lesson.summary}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedSubject(continueLearning.subject);
                          }}
                          className="w-full bg-[#132d20] hover:bg-[#163628] border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-300 py-2.5 px-4 rounded-xl text-[10px] font-black cursor-pointer text-center transition-all shadow-md"
                        >
                          مواصلة دراسة هذا الدرس الآن ←
                        </button>
                      </div>
                    ) : (
                      <div className="bg-[#0b1426] border border-indigo-500/10 p-4 rounded-3xl text-center flex flex-col items-center justify-center gap-2 shrink-0">
                        <Star className="w-8 h-8 text-amber-400 animate-spin-slow" />
                        <h4 className="text-xs font-black text-slate-200">أشرقت بنورك الأكاديمي! 🌸</h4>
                        <span className="text-[9px] text-slate-500 font-medium max-w-[240px] leading-relaxed">
                          لقد أكملت كافة المخرجات التعليمية والدروس النشطة في المسار الحالي بنجاح بارز. يمكنك زيادة تحديك وتغيير المسار الدراسي لترم أو مرحلة أخرى بنجاح!
                        </span>
                      </div>
                    )}

                    {/* Daily Review Widget Section */}
                    {dailyReview && (
                      <div className="bg-[#0b1426] border border-indigo-500/15 p-4 rounded-3xl flex flex-col gap-3 relative overflow-hidden shrink-0 text-right">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-indigo-500" />
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <BrainCircuit className="w-4 h-4 text-indigo-400" />
                            <span className="text-[9px] font-black text-indigo-400">تحدي المراجعة اليومية الذكية</span>
                          </div>
                          <span className="text-[8px] text-slate-500 font-bold">{dailyReview.subject.title}</span>
                        </div>
                        
                        <div className="bg-[#121f3a]/40 rounded-xl p-3 border border-white/5">
                          <h5 className="text-[10px] font-black text-amber-400">سؤال تنشيط التذكر العالي اليوم:</h5>
                          <p className="text-[11px] text-slate-200 font-bold leading-relaxed mt-1">
                            هل يمكنك تذكر القوانين والأفكار الأساسية في درس: <strong className="text-white">({dailyReview.lesson.title})</strong>؟
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              // Trigger 1 minute summary action - 'ملخص آخر دقيقة' is index 2 in ACTIONS
                              handleTriggerActionOnLesson(dailyReview.lesson, dailyReview.subject, 2);
                            }}
                            className="flex-1 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 py-2.5 px-3 rounded-xl text-[9px] font-black cursor-pointer transition-all text-center"
                          >
                            شغل مراجعة AI سريعة
                          </button>
                          <button
                            onClick={() => {
                              // Trigger Interactive Quiz - 'اختبرني تفاعلياً' is index 4 in ACTIONS
                              handleTriggerActionOnLesson(dailyReview.lesson, dailyReview.subject, 4);
                            }}
                            className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 py-2.5 px-3 rounded-xl text-[9px] font-black cursor-pointer transition-all text-center"
                          >
                            ابدأ اختبار مع AI
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Official Curriculum Report Panel */}
                    <div className="bg-[#122240]/40 border border-indigo-500/15 rounded-2xl p-3.5 flex flex-col gap-2 shrink-0 text-right animate-fade-in" dir="rtl">
                      <div className="flex items-center justify-between border-b border-indigo-500/10 pb-1.5 flex-row-reverse">
                        <span className="text-[10px] text-indigo-400 font-black flex items-center gap-1.5">
                          📡 تقرير المقررات الرسمية (هيكلة ٢٠٢٥ - ٢٠٢٦)
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold">وفق القرارات الوزارية الجديدة</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-slate-950/40 p-2 rounded-xl border border-white/5 flex flex-col justify-center">
                          <span className="text-[11px] font-black text-amber-500">٣ صفوف</span>
                          <span className="text-[8px] text-slate-400 font-bold mt-1">المراحل الدراسية</span>
                        </div>
                        <div className="bg-slate-950/40 p-2 rounded-xl border border-white/5 flex flex-col justify-center">
                          <span className="text-[11px] font-black text-emerald-400">
                            {filteredSubjects.length} مقررات
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold mt-1">مواد بالمسار الحالي</span>
                        </div>
                        <div className="bg-slate-950/40 p-2 rounded-xl border border-white/5 flex flex-col justify-center">
                          <span className="text-[11px] font-black text-indigo-400">
                            {filteredSubjects.filter(s => s.addedToTotal).length} مواد
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold mt-1">مضافة للمجموع</span>
                        </div>
                        <div className="bg-slate-950/40 p-2 rounded-xl border border-white/5 flex flex-col justify-center">
                          <span className="text-[11px] font-black text-rose-400">
                            {filteredSubjects.filter(s => s.addedToTotal === false).length} مواد/أنشطة
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold mt-1">أخرى خارج المجموع</span>
                        </div>
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
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 flex-row-reverse text-right">
                        <button
                          onClick={() => setShowAllSubjects(!showAllSubjects)}
                          className={`px-2.5 py-1 text-[8.5px] font-black rounded-lg border cursor-pointer transition-all ${
                            showAllSubjects 
                              ? 'bg-amber-600/20 text-amber-400 border-amber-500/30 font-extrabold' 
                              : 'bg-slate-950/40 text-slate-400 border-white/5 hover:text-white'
                          }`}
                        >
                          {showAllSubjects ? 'إخفاء الأنشطة والمهنية ×' : 'عرض الأنشطة والمهام الاختيارية ⚙️'}
                        </button>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-500 font-black">المواد المقررة:</span>
                          <span className="text-[10px] text-indigo-400 font-black">({filteredSubjects.length}) مادة بالمسار</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                        {filteredSubjects.map((sub) => {
                          const totalLes = sub.units.reduce((acc, u) => acc + u.lessons.length, 0);
                          const subLessons = sub.units.flatMap(u => u.lessons.map(l => l.id));
                          const countDone = subLessons.filter(id => doneLessons.includes(id)).length;
                          const pct = totalLes ? Math.round((countDone / totalLes) * 100) : 0;

                          return (
                            <button
                              key={sub.subjectId || sub.slug}
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
                                  <div className="flex items-center gap-2 flex-row-reverse text-right">
                                    <h4 className="text-xs font-black text-white group-hover:text-amber-400 transition-colors leading-relaxed">
                                      {sub.title}
                                    </h4>
                                    <span className={`px-1.5 py-0.5 rounded text-[7.5px] font-black ${
                                      sub.addedToTotal 
                                        ? 'bg-[#5b21b6]/30 text-purple-300 border border-purple-500/25' 
                                        : 'bg-slate-800 text-slate-300 border border-white/5'
                                    }`}>
                                      {sub.addedToTotal ? 'مضافة للمجموع' : 'خارج المجموع'}
                                    </span>
                                  </div>
                                  <span className="text-[9px] text-slate-400 leading-none text-right flex flex-row-reverse items-center justify-end gap-1 font-black">
                                    <span>{sub.track}</span>
                                    <span>•</span>
                                    <span>{sub.units.length > 0 ? `${sub.units.length} وحدات` : 'جاري تدقيق المنهج 📑'}</span>
                                    {sub.units.length > 0 && (
                                      <>
                                        <span>•</span>
                                        <span>{totalLes} درس</span>
                                      </>
                                    )}
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
                  selectedGrade={selectedGrade}
                  selectedTerm={selectedTerm}
                  currentTrack={currentTrack}
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
