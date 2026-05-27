/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Track = 'all' | 'مشترك' | 'علمي' | 'علمي علوم / علمي رياضة' | 'علمي علوم' | 'علمي رياضة' | 'أدبي';

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  quickTask: string;
  tags: string[]; // Keep for backwards compatibility
  keywords?: string[]; // New field
  slug: string; // Keep for navigation/routing
  order: number; // Order index
  sourcePage?: string; // New field
}

export interface Unit {
  title: string;
  lessons: Lesson[];
  slug: string;
  unitId?: string; // New field
  order?: number; // New field
}

export interface Subject {
  track: string; // Keep for legacy filters ('مشترك', 'علمي', 'أدبي', etc.)
  title: string;
  icon: string;
  color: string;
  units: Unit[];
  slug: string;
  gradeId?: string; // 'grade-1' | 'grade-2' | 'grade-3'
  termId?: string;  // 'term-1' | 'term-2' | 'full-year' | 'final-revision'
  subjectId?: string; // New field
  trackId?: string; // New field
  sourceStatus?: string; // "مؤكد من كتاب الوزارة" / "مطلوب تحديثه من كتاب الوزارة"
  sourceUrl?: string; // URL link to official PDF
  sourceNote?: string; // Minister guidelines notes
  category?: 'core_total' | 'pass_fail' | 'optional_activity' | 'vocational';
  addedToTotal?: boolean;
  visibleByDefault?: boolean;
}

export interface TrackData {
  trackId: string;
  trackTitle: string;
  subjects: Subject[];
}

export interface TermData {
  termId: string;
  termTitle: string;
  tracks: TrackData[];
}

export interface GradeData {
  gradeId: string;
  gradeTitle: string;
  terms: TermData[];
}

export interface ErrorRecord {
  id: string; // unique database / storage key
  lessonId: string;
  subject: string;
  unit: string;
  lesson: string;
  date: string;
  type: string;
  gradeId?: string;
  termId?: string;
  track?: string;
}

export interface StudyState {
  done: string[]; // List of completed lesson IDs
  errors: ErrorRecord[];
  points: number;
}

export interface Action {
  name: string;
  prompt: string;
  description: string;
}
