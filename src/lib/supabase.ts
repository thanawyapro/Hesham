/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';
import { ErrorRecord } from '../types.ts';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

// Check if credentials are set
export const isSupabaseConfigured = 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' && 
  !supabaseUrl.includes('YOUR_') && 
  !supabaseAnonKey.includes('YOUR_');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

/**
 * SQL Schema required for database data sync.
 * Provide this transparently for the user's reference.
 */
export const SUPABASE_SQL_SCHEMA = `-- 1. أنشئ جدول بيانات الطلاب لمزامنة الإنجاز والنقاط
create table if not exists public.student_states (
  user_id uuid references auth.users on delete cascade not null primary key,
  done_lessons text[] default '{}'::text[],
  errors jsonb default '[]'::jsonb,
  points integer default 100,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. تفعيل الحماية على مستوى الصفوف (Row Level Security)
alter table public.student_states enable row level security;

-- 3. إنشاء سياسات الحماية للمستخدمين على بياناتهم الخاصة فقط
create policy "الطلاب يقرأون بياناتهم الخاصة فقط"
  on public.student_states for select
  using (auth.uid() = user_id);

create policy "الطلاب يحدثون بياناتهم الخاصة فقط"
  on public.student_states for insert
  with check (auth.uid() = user_id);

create policy "الطلاب يعدلون بياناتهم الخاصة فقط"
  on public.student_states for update
  using (auth.uid() = user_id);
`;

export interface SupabaseSyncState {
  done: string[];
  errors: ErrorRecord[];
  points: number;
}

/**
 * Sync status helper for easy visual indicators
 */
export async function syncPushState(userId: string, state: SupabaseSyncState): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) return false;

  try {
    const { error } = await supabase
      .from('student_states')
      .upsert({
        user_id: userId,
        done_lessons: state.done,
        errors: state.errors,
        points: state.points,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Supabase state sync push failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Network error during Supabase sync push:', err);
    return false;
  }
}

/**
 * Sync pull status helper on load or initial login
 */
export async function syncPullState(userId: string): Promise<SupabaseSyncState | null> {
  if (!supabase || !isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('student_states')
      .select('done_lessons, errors, points')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Supabase state sync pull failed:', error);
      return null;
    }

    if (data) {
      return {
        done: data.done_lessons || [],
        errors: Array.isArray(data.errors) ? data.errors : [],
        points: typeof data.points === 'number' ? data.points : 100
      };
    }
    return null;
  } catch (err) {
    console.error('Network error during Supabase sync pull:', err);
    return null;
  }
}
