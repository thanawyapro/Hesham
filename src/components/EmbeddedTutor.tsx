/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Copy, ExternalLink, Sparkles, Send, RefreshCw, AlertCircle, HelpCircle, Check, BookOpen } from 'lucide-react';
import { Subject, Lesson, Action } from '../types.ts';
import { ACTIONS, LESSON_DATA } from '../data.ts';
import { motion, AnimatePresence } from 'motion/react';

interface EmbeddedTutorProps {
  initialPrompt?: string;
  initialSubject?: Subject;
  initialLesson?: Lesson;
  onClearInitial?: () => void;
}

export default function EmbeddedTutor({ initialPrompt, initialSubject, initialLesson, onClearInitial }: EmbeddedTutorProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [tutorOutput, setTutorOutput] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<string>('');
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);
  const [mode, setMode] = useState<'embedded' | 'chatgpt'>('embedded');

  const outputEndRef = useRef<HTMLDivElement>(null);

  // Load initial contextual triggers from lesson actions
  useEffect(() => {
    if (initialPrompt) {
      setCustomPrompt(initialPrompt);
    }
    if (initialSubject) {
      setSelectedSubject(initialSubject);
    }
    if (initialLesson) {
      setSelectedLesson(initialLesson);
    }
  }, [initialPrompt, initialSubject, initialLesson]);

  // Handle active selections
  useEffect(() => {
    if (selectedSubject && !selectedLesson) {
      // Auto select first lesson
      const firstUnit = selectedSubject.units[0];
      if (firstUnit && firstUnit.lessons[0]) {
        setSelectedLesson(firstUnit.lessons[0]);
      }
    }
  }, [selectedSubject]);

  // Format HTML preview parses
  const renderFormattedOutput = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith('###')) {
        return (
          <h4 key={idx} className="text-sm font-bold text-accent-blue mt-4 mb-2 border-r-2 border-accent-blue pr-2 leading-relaxed">
            {trimmed.replace(/^###\s*/, '')}
          </h4>
        );
      }
      // Heading 2
      if (trimmed.startsWith('##')) {
        return (
          <h3 key={idx} className="text-sm font-black text-accent-blue mt-5 mb-2 border-r-4 border-accent-blue pr-2 leading-loose">
            {trimmed.replace(/^##\s*/, '')}
          </h3>
        );
      }
      // Heading 1
      if (trimmed.startsWith('#')) {
        return (
          <h2 key={idx} className="text-base font-black text-text-primary mt-6 mb-3 border-r-4 border-accent-yellow pr-3 leading-loose pb-1">
            {trimmed.replace(/^#\s*/, '')}
          </h2>
        );
      }
      // Bullet points
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const itemContent = trimmed.replace(/^[\*\-]\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1.5 text-xs text-text-secondary pr-3">
            <span className="text-accent-yellow font-bold shrink-0 mt-1">•</span>
            <span className="leading-relaxed">{parseBoldAndInlines(itemContent)}</span>
          </div>
        );
      }
      if (trimmed.startsWith('>') && trimmed.length > 1) {
        return (
          <blockquote key={idx} className="bg-bg-secondary border-r-4 border-purple-500 rounded-lg p-3 my-3 text-xs italic text-text-muted leading-relaxed">
            {parseBoldAndInlines(trimmed.slice(1).trim())}
          </blockquote>
        );
      }

      // Default paragraph (supports inline bolding)
      if (trimmed === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-xs text-text-secondary leading-relaxed my-1.5 pr-1 text-justify">
          {parseBoldAndInlines(trimmed)}
        </p>
      );
    });
  };

  // Inline bold parsing
  const parseBoldAndInlines = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    if (parts.length === 1) return text;

    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-accent-yellow font-bold">{part}</strong>;
      }
      return part;
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(customPrompt);
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const triggerChatGPTFlow = () => {
    copyToClipboard();
    const chatUrl = `https://chatgpt.com/?q=${encodeURIComponent(customPrompt)}`;
    window.open(chatUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGeminiTutorAPI = async () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);
    setErrorStatus('');
    setTutorOutput('');

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: customPrompt,
          systemInstruction: selectedSubject
            ? `أنت مدرس متخصص قدير في مادة ${selectedSubject.title} لطلاب الثانوية العامة في مصر. اشرح بالتبسيط والنظام وتجنب التعقيد الحسابي، وأجب عن التساؤلات باحترافية وبشكل مفصل ومقسم بالنقاط.`
            : "أنت مدرس ومساعد تعليمي لطلاب الثانوية العامة في مصر."
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'NO_API_KEY') {
          setErrorStatus('NO_API_KEY');
          setTutorOutput(data.message || 'مفتاح الذكاء الاصطناعي غير متوفر.');
        } else {
          throw new Error(data.error || 'فشل الاتصال بالخادم الأكاديمي للذكاء الاصطناعي.');
        }
      } else {
        setTutorOutput(data.output);
      }
    } catch (err: any) {
      setErrorStatus('COMPILE_ERROR');
      setTutorOutput(`عذرًا، حدث خطأ أثناء صياغة المادة العلمية بالذكاء الاصطناعي:\n${err.message || 'تأكد من اتصالك بالإنترنت والعودة لاحقًا.'}`);
    } finally {
      setIsGenerating(false);
      if (onClearInitial) onClearInitial();
    }
  };

  const applyActionTemplate = (action: Action) => {
    if (!selectedSubject || !selectedLesson) {
      alert("الرجاء اختيار مادة ودرس أولاً لتخصيص برومبت المدرس!");
      return;
    }
    const compiled = `أنت مدرس متخصص في مادة (${selectedSubject.title}) للثانوية العامة المصرية. وحدة: (${selectedSubject.units[0].title}). درس: (${selectedLesson.title}).\n\nالبرومبت المطلوب:\n${action.prompt}`;
    setCustomPrompt(compiled);
  };

  return (
    <div className="flex-grow flex flex-col gap-4 bg-bg-primary text-right glow-primary font-sans overflow-y-auto p-4 w-full" dir="rtl">
      
      {/* Top Welcome Title */}
      <div className="flex items-center gap-3 border-b border-border-card pb-3 flex-row-reverse">
        <div className="w-10 h-10 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green shrink-0">
          <Bot className="w-5 h-5 animate-bounce" />
        </div>
        <div className="flex-1 text-right">
          <h2 className="text-sm font-black text-text-primary">المعلم الخصوصي الذكي (سوبر فلكس)</h2>
          <p className="text-[10px] text-text-muted font-bold mt-1">مساعد متصل بذكاء صنعي فوري لشرح دروس المقرر ومساعدتك بالتحضير</p>
        </div>
      </div>

      {/* Select context configuration */}
      <div className="grid grid-cols-2 gap-3 bg-bg-card border border-border-card p-3 rounded-2xl">
        <div className="flex flex-col gap-1 text-right">
          <label className="text-[10px] text-text-muted font-bold mr-1">المادة المطلوبة</label>
          <select 
            className="bg-bg-secondary border border-border-card text-xs text-text-primary rounded-xl py-2 px-2.5 focus:border-accent-blue outline-none"
            value={selectedSubject?.slug || ''}
            onChange={(e) => {
              const sub = LESSON_DATA.find(s => s.slug === e.target.value);
              setSelectedSubject(sub || null);
              setSelectedLesson(null);
            }}
          >
            <option value="">-- اختر المادة --</option>
            {LESSON_DATA.map(s => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <label className="text-[10px] text-text-muted font-bold mr-1">الدرس النشط</label>
          <select 
            className="bg-bg-secondary border border-border-card text-xs text-text-primary rounded-xl py-2 px-2.5 disabled:opacity-40 focus:border-accent-blue outline-none"
            disabled={!selectedSubject}
            value={selectedLesson?.id || ''}
            onChange={(e) => {
              const allLessons = selectedSubject?.units.flatMap(u => u.lessons) || [];
              const les = allLessons.find(l => l.id === e.target.value);
              setSelectedLesson(les || null);
            }}
          >
            <option value="">-- اختر الدرس --</option>
            {selectedSubject?.units.map(u => (
              <optgroup key={u.title} label={u.title}>
                {u.lessons.map(l => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* Prompt actions catalog */}
      {selectedSubject && selectedLesson && (
        <div className="flex flex-col gap-1.5 text-right shrink-0">
          <label className="text-[10px] text-text-muted font-bold mr-1">كبسولات المدرس الفورية (كبسة وحدة للتعديل):</label>
          <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1">
            {ACTIONS.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyActionTemplate(action)}
                className="bg-bg-card hover:bg-bg-card-light border border-border-card text-text-secondary hover:text-text-primary text-right py-2 px-2.5 rounded-xl cursor-pointer transition-all flex flex-col gap-0.5"
              >
                <div className="flex items-center gap-1.5 flex-row-reverse">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                  <span className="text-[11px] font-black text-accent-blue">{action.name}</span>
                </div>
                <span className="text-[9px] text-text-muted truncate max-w-[140px]">{action.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Select run mode toggler */}
      <div className="flex bg-bg-card border border-border-card rounded-xl p-1 shrink-0">
        <button
          type="button"
          onClick={() => setMode('embedded')}
          className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${mode === 'embedded' ? 'bg-accent-blue text-white shadow' : 'text-text-muted hover:text-text-primary'}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>توليد بالذكاء الاصطناعي (Gemini)</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('chatgpt')}
          className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${mode === 'chatgpt' ? 'bg-accent-blue text-white shadow' : 'text-text-muted hover:text-text-primary'}`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>فتح في ChatGPT الخارجي</span>
        </button>
      </div>

      {/* Custom Prompt Box to edit */}
      <div className="flex flex-col gap-1 text-right">
        <label className="text-[10px] text-text-muted font-bold mr-1">صياغة البرومبت (التعليمات الموجهة للـ AI)</label>
        <div className="relative">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="اكتب طلبك الخاص هنا أو انقر على أحد الكبسولات التعليمية بالأعلى لصياغة التعليمات التلقائية المباشرة..."
            className="w-full bg-bg-card border border-border-card rounded-2xl p-3.5 pb-12 text-xs text-text-primary outline-none focus:border-accent-blue min-h-[96px] placeholder-text-muted leading-relaxed resize-none text-right"
          />

          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 flex-row-reverse">
            {mode === 'chatgpt' ? (
              <button
                type="button"
                onClick={triggerChatGPTFlow}
                className="bg-accent-yellow hover:bg-yellow-500 text-slate-950 font-black text-[10px] py-1.5 px-3 rounded-xl flex items-center gap-1 cursor-pointer transition-all"
              >
                <span>نسخ وفتح ChatGPT</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isGenerating || !customPrompt.trim()}
                onClick={handleGeminiTutorAPI}
                className="bg-accent-green hover:bg-emerald-500 disabled:opacity-45 text-white font-black text-[10px] py-1.5 px-3 rounded-xl flex items-center gap-1 cursor-pointer transition-all"
              >
                {isGenerating ? (
                  <>
                    <span>جاري التفكير...</span>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>توليد الإجابة</span>
                    <Send className="w-3 h-3 rotate-180" />
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={copyToClipboard}
              className="p-1.5 rounded-lg bg-bg-secondary hover:bg-bg-card-light text-text-muted hover:text-text-primary border border-border-card cursor-pointer transition-all"
              title="نسخ البرومبت"
            >
              {copiedStatus ? (
                <Check className="w-4 h-4 text-accent-green" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tutor Output Stream Panel */}
      <div className="flex-1 min-h-[180px] bg-bg-card border border-border-card rounded-2xl p-4 flex flex-col relative overflow-hidden text-right">
        
        {/* Ambient Pulsing Glow relative when generating */}
        {isGenerating && (
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[40px] bg-accent-blue/10 pointer-events-none animate-pulse" />
        )}

        <div className="flex items-center justify-between border-b border-border-card pb-2 shrink-0 mb-3 flex-row-reverse">
          <div className="flex items-center gap-1.5 flex-row-reverse">
            <Bot className="w-4 h-4 text-accent-blue" />
            <h3 className="text-xs font-black text-text-primary">الشرح والمخرجات التعليمية</h3>
          </div>
          {isGenerating && (
            <span className="text-[10px] text-accent-blue font-bold flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>جاري صياغة الرد التوضيحي...</span>
            </span>
          )}
        </div>

        {/* Dynamic Inner Panel View Scrolling Area */}
        <div className="flex-1 overflow-y-auto max-h-[380px] bg-bg-secondary/40 rounded-xl p-2.5 custom-scroll text-right">
          {errorStatus === 'NO_API_KEY' ? (
            /* Custom alert panel when credentials are raw example default */
            <div className="p-4 rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 flex flex-col gap-2.5 text-right my-2">
              <div className="flex items-center gap-2 text-accent-yellow flex-row-reverse">
                <AlertCircle className="w-4.5 h-4.5" />
                <span className="text-xs font-black">مفتاح الذكاء الاصطناعي (Gemini Key) غير مفعّل بعد</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
                لم يتم تعريف الـ <code className="bg-bg-secondary px-1.5 py-0.5 rounded text-accent-red font-mono font-bold">GEMINI_API_KEY</code> في إعدادات التطبيق الخلفية لطلب الذكاء السحابي المباشر.
              </p>
              <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
                <strong>الحل الأسرع:</strong> اضغط في الأسفل لنسخ تساؤلك بالرموز والبرومبت المطلوب ثوانٍ، وسيتم فتحه مباشرة في موقع ChatGPT لتلقي الجواب التبييني فوراً!
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode('chatgpt');
                  triggerChatGPTFlow();
                }}
                className="bg-accent-yellow text-slate-950 font-black text-xs py-2 px-3 rounded-xl cursor-pointer hover:bg-yellow-500 transition-all text-center self-start"
              >
                التحويل إلى ChatGPT للحصول على الشرح
              </button>
            </div>
          ) : tutorOutput ? (
            /* Render parsing formatted Markdown styled blocks */
            <div className="space-y-1 font-sans select-text text-right">
              {renderFormattedOutput(tutorOutput)}
              <div ref={outputEndRef} />
            </div>
          ) : (
            /* Idle tutor state instructions */
            <div className="h-full flex flex-col items-center justify-center text-center text-text-muted gap-2 py-8 my-auto">
              <HelpCircle className="w-8 h-8 text-text-muted/40 animate-pulse" />
              <p className="text-xs font-black text-text-secondary">بانتظار بناء البرومبت أو إرسال استفسارك...</p>
              <p className="text-[10px] max-w-[280px] text-text-muted mt-1 leading-relaxed">اختر المادة والدرس والكبسولة المطلوبة من الأعلى واضغط توليد لمشاهدة التفصيل.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
