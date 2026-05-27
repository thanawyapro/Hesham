/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Track = 'all' | 'مشترك' | 'علمي علوم / علمي رياضة' | 'علمي علوم' | 'علمي رياضة' | 'أدبي';

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  quickTask: string;
  tags: string[];
  slug: string;
  order: number;
}

export interface Unit {
  title: string;
  lessons: Lesson[];
  slug: string;
}

export interface Subject {
  track: string;
  title: string;
  icon: string;
  color: string;
  units: Unit[];
  slug: string;
}

export interface ErrorRecord {
  id: string; // unique database / storage key
  lessonId: string;
  subject: string;
  unit: string;
  lesson: string;
  date: string;
  type: string;
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
