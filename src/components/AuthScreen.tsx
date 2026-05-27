/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured, SUPABASE_SQL_SCHEMA } from '../lib/supabase.ts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Lock, Mail, Key, ShieldAlert, Sparkles, 
  Code, Copy, Check, LogIn, UserPlus, HelpCircle, GraduationCap, 
  Flame, HardDrive, Wifi, WifiOff 
} from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: { id: string; email: string }, isMock: boolean) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  // Copy SQL script tool
  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('فضلاً قم بملء كافة الحقول المطلوبة');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!isSupabaseConfigured) {
      // Demo Mode fallbacks
      setTimeout(() => {
        setLoading(false);
        const mockUserId = `local-user-${email.split('@')[0] || 'student'}`;
        
        if (isRegister) {
          setSuccessMsg('تم تسجيل حساب محلي مؤقت بنجاح في متصفحك!');
          setTimeout(() => {
            onAuthSuccess({ id: mockUserId, email }, true);
          }, 1200);
        } else {
          onAuthSuccess({ id: mockUserId, email }, true);
        }
      }, 800);
      return;
    }

    try {
      if (isRegister) {
        const { data, error } = await supabase!.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data?.user) {
          setSuccessMsg('تم إنشاء الحساب بنجاح! فضلاً تحقق من بريدك الإلكتروني للتأكيد أو سجل الدخول مباشرة.');
          if (data.session) {
            onAuthSuccess({ id: data.user.id, email: data.user.email || email }, false);
          } else {
            setIsRegister(false);
          }
        }
      } else {
        const { data, error } = await supabase!.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data?.user) {
          onAuthSuccess({ id: data.user.id, email: data.user.email || email }, false);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'تعدى الاتصال الوقت المسموح، يرجى التحقق من الشبكة.');
    } finally {
      setLoading(false);
    }
  };

  const handleBypassWithDemo = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    onAuthSuccess({ 
      id: `visitor-${randomSuffix}`, 
      email: `student_${randomSuffix}@thanaweya.ai` 
    }, true);
  };

  return (
    <div className="flex-1 p-6 flex flex-col justify-between bg-bg-primary select-none text-right overflow-y-auto w-full" dir="rtl">
      
      {/* Dynamic Status Indicator Header */}
      <div className="flex items-center justify-between bg-bg-card border border-border-card p-3 rounded-2xl shrink-0 flex-row-reverse">
        <div className="flex items-center gap-1.5 flex-row-reverse">
          <Database className="w-3.5 h-3.5 text-accent-blue" />
          <span className="text-[10px] text-text-secondary font-black">بوابة الدخول الذكية</span>
        </div>

        <div className="flex items-center gap-2">
          {isSupabaseConfigured ? (
            <div className="flex items-center gap-1.5 bg-accent-green/10 border border-accent-green/20 py-1 px-3 rounded-full text-[10px] text-accent-green font-extrabold">
              <Wifi className="w-3.5 h-3.5 animate-pulse" />
              <span>خادم السحاب نشط (Supabase)</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-accent-yellow/10 border border-accent-yellow/20 py-1 px-3 rounded-full text-[10px] text-accent-yellow font-extrabold">
              <WifiOff className="w-3.5 h-3.5" />
              <span>وضع تجريبي (بدون سحاب)</span>
            </div>
          )}
        </div>
      </div>

      {/* Hero Visual Area */}
      <div className="flex flex-col items-center text-center my-6 shrink-0">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-accent-blue/10 blur-md animate-pulse" />
          <div className="w-16 h-16 bg-bg-card border border-accent-blue/20 rounded-3xl flex items-center justify-center text-accent-blue relative">
            <GraduationCap className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-sm font-black text-text-primary mt-4">نظام المذاكرة الذكي للثانوية العامة</h1>
        <p className="text-[10px] text-text-secondary font-semibold max-w-[280px] mt-2 leading-relaxed">
          سجل دخولك لمزامنة دروسك المنجزة، تتبع نقاط الضعف، وحفظ بنك الأخطاء سحابياً
        </p>
      </div>

      {/* Main Form Fields */}
      <div className="bg-bg-card border border-border-card rounded-[26px] p-5.5 shadow-subtle flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h2 className="text-xs font-black text-text-primary border-b border-border-card pb-2.5 mb-4 text-right">
          {isRegister ? 'إنشاء حساب طالب جديد' : 'الدخول إلى ملفك الدراسي'}
        </h2>

        {errorMsg && (
          <div className="mb-3.5 p-3 rounded-xl bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px] font-bold leading-relaxed text-right">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-3.5 p-3 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green text-[10px] font-bold leading-relaxed text-right">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-right">
            <label className="block text-[10px] text-text-secondary font-bold mb-1.5 mr-1">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-secondary border border-border-card rounded-xl py-2.5 pr-10 pl-3.5 text-xs text-text-primary outline-none focus:border-accent-blue text-left placeholder-text-muted transition-all font-semibold"
              />
              <Mail className="w-4 h-4 text-text-muted absolute top-3 right-3.5" />
            </div>
          </div>

          <div className="text-right">
            <label className="block text-[10px] text-text-secondary font-bold mb-1.5 mr-1">كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-secondary border border-border-card rounded-xl py-2.5 pr-10 pl-3.5 text-xs text-text-primary outline-none focus:border-accent-blue text-left placeholder-text-muted transition-all font-semibold"
              />
              <Lock className="w-4 h-4 text-text-muted absolute top-3 right-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white font-black text-xs py-3 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isRegister ? (
              <>
                <UserPlus className="w-4 h-4 text-white/80" />
                <span>إنشاء حساب</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-white/80" />
                <span>تسجيل الدخول</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle option code */}
        <div className="mt-4 flex flex-col gap-2 items-center text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[10px] text-accent-blue hover:underline font-extrabold cursor-pointer transition-all"
          >
            {isRegister ? 'لديك حساب بالفعل؟ سجل الدخول هنا' : 'لا تملك حساباً؟ أنشئ حساباً جديداً هنا'}
          </button>

          <button
            onClick={handleBypassWithDemo}
            className="text-[10px] text-text-muted hover:text-text-primary font-bold cursor-pointer underline transition-all mt-1"
          >
            التخطي والمذاكرة الفورية بدون ربط (وضع زائر محلي)
          </button>
        </div>
      </div>

      {/* Informative setup helper section */}
      <div className="mt-8 border-t border-border-card pt-4 flex flex-col gap-3 shrink-0 text-right">
        <div className="flex items-center justify-between flex-row-reverse">
          <span className="text-[9px] text-text-muted font-medium leading-none">
            هل تريد تهيئة Supabase بنفسك؟
          </span>

          <button
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="text-[10px] font-bold text-text-secondary hover:text-text-primary flex items-center gap-1.5 cursor-pointer bg-bg-card border border-border-card px-3 py-1.5 rounded-xl transition-all"
          >
            <Code className="w-3.5 h-3.5 text-accent-blue" />
            <span>{showSqlGuide ? 'إخفاء دليل تهيئة Supabase' : 'عرض كود تهيئة قاعدة البيانات'}</span>
          </button>
        </div>

        <AnimatePresence>
          {showSqlGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden space-y-2 bg-slate-950 p-3.5 rounded-2xl border border-white/5 text-left font-mono text-[9px]"
              dir="ltr"
            >
              <div className="flex items-center justify-between text-slate-400 font-sans border-b border-white/5 pb-1.5 mb-2" dir="rtl">
                <span className="text-[10px] font-black text-slate-300">أمر الـ SQL لإنشاء الجدول وسياسات الأمان:</span>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="p-1 rounded bg-slate-900 border border-white/10 hover:border-slate-400 text-slate-300 cursor-pointer flex items-center gap-1 text-[9px]"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-indigo-400" />
                      <span>نسخ الكود</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-slate-200 overflow-x-auto p-1 leading-relaxed max-h-[140px] invisible-scroll">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
