/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GradeData, Subject } from '../types.ts';

export const SECONDARY_SUBJECTS_PATCH_META = {
  "version": "2025-2026-secondary-subjects-egypt-v1",
  "generatedAt": "2026-05-27T20:41:54.626436Z",
  "scope": "Subjects/materials only with restructured 2025-2026 guidelines.",
  "sources": {
    "moe_restructure": "https://moe.gov.eg/what-s-on/news/plan-to-restructure/",
    "student_books": "https://studentbooks.moe.gov.eg/",
    "student_books_assessments": "https://studentbooks.moe.gov.eg/cha/",
    "grade1_ai_programming_pdf": "https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026/Secondry/Secondry1/Term1/StudentBook/ICT_Ar_Sec1_T1.pdf",
    "grade2_2025_2026_science_history_note": "https://gate.ahram.org.eg/News/5269122.aspx",
    "ministerial_decision_report": "https://www.youm7.com/story/2024/8/15/وزارة-التعليم-توضح-المواد-الأساسية-وغير-المضافة-للمجموع-بالثانوية-العامة/6675376"
  }
};

// Subject templates definition
const TEMP = {
  arabic: { title: "اللغة العربية", icon: "ع", color: "#F59E0B" },
  english: { title: "اللغة الأجنبية الأولى / English", icon: "EN", color: "#22C55E" },
  history: { title: "التاريخ", icon: "⏳", color: "#92400E" },
  geography: { title: "الجغرافيا", icon: "🌍", color: "#0EA5E9" },
  math: { title: "الرياضيات", icon: "∑", color: "#6366F1" },
  integrated_science: { title: "العلوم المتكاملة", icon: "⚛", color: "#10B981" },
  philosophy: { title: "الفلسفة والمنطق", icon: "ف", color: "#7C3AED" },
  religion: { title: "التربية الدينية", icon: "☪", color: "#16A34A" },
  second_lang: { title: "اللغة الأجنبية الثانية", icon: "2L", color: "#14B8A6" },
  citizenship: { title: "التربية الوطنية", icon: "🏛", color: "#DC2626" },
  programming: { title: "البرمجة والذكاء الاصطناعي", icon: "AI", color: "#2563EB" },
  sports: { title: "التربية الرياضية", icon: "⚽", color: "#0EA5E9" },
  physics: { title: "الفيزياء", icon: "Φ", color: "#38BDF8" },
  chemistry: { title: "الكيمياء", icon: "⚗", color: "#A855F7" },
  biology: { title: "الأحياء", icon: "DNA", color: "#10B981" },
  geology: { title: "الجيولوجيا وعلوم البيئة", icon: "⛰", color: "#84CC16" },
  psychology_g2: { title: "علم النفس والاجتماع", icon: "ن", color: "#EC4899" },
  psychology_g3: { title: "علم النفس", icon: "ن", color: "#EC4899" },
  statistics: { title: "الإحصاء", icon: "%", color: "#64748B" }
};

const OPTIONAL_ACTIVITIES = [
  { title: "التربية الفنية", icon: "🎨", color: "#94A3B8" },
  { title: "التربية الموسيقية", icon: "🎵", color: "#94A3B8" },
  { title: "الاقتصاد المنزلي", icon: "🏠", color: "#94A3B8" },
  { title: "الكشافة والمرشدات", icon: "🏕", color: "#94A3B8" },
  { title: "المسرح والتمثيل", icon: "🎭", color: "#94A3B8" },
  { title: "الصحافة والإذاعة", icon: "📰", color: "#94A3B8" },
  { title: "خدمة المجتمع وتنمية البيئة", icon: "🌱", color: "#94A3B8" },
  { title: "النشاط العلمي الإبداعي", icon: "🔬", color: "#94A3B8" },
  { title: "المطالعة والمكتبات", icon: "📚", color: "#94A3B8" }
];

const VOCATIONALS = [
  { title: "تكنولوجيا الصناعة", icon: "🏭", color: "#475569" },
  { title: "تكنولوجيا الزراعة", icon: "🌾", color: "#475569" },
  { title: "تكنولوجيا إدارة الأعمال والمشروعات", icon: "💼", color: "#475569" }
];

// Helper to compile a subject structure
function createSub(
  id: string,
  tmpl: { title: string; icon: string; color: string },
  category: "core_total" | "pass_fail" | "optional_activity" | "vocational",
  addedToTotal: boolean,
  visibleByDefault: boolean,
  note: string,
  url: string,
  grade: string,
  term: string,
  track: string
): Subject {
  return {
    subjectId: id,
    title: tmpl.title,
    icon: tmpl.icon,
    color: tmpl.color,
    track: track === 'common' ? 'مشترك' : track,
    category,
    addedToTotal,
    visibleByDefault,
    sourceStatus: "official_structure",
    sourceNote: note,
    sourceUrl: url,
    gradeId: grade,
    termId: term,
    trackId: track,
    units: [],
    slug: id
  };
}

const url_plan = "https://moe.gov.eg/what-s-on/news/plan-to-restructure/";
const url_decision = "https://www.youm7.com/story/2024/8/15/وزارة-التعليم-توضح-المواد-الأساسية-وغير-المضافة-للمجموع-بالثانوية-العامة/6675376";

// Optional/Vocational builder
function buildSecondaryClutter(grade: string, term: string, track: string): Subject[] {
  const result: Subject[] = [];
  OPTIONAL_ACTIVITIES.forEach((act, idx) => {
    result.push(createSub(
      `${grade}-${term}-${track}-optional-act-${idx}`,
      act,
      "optional_activity",
      false,
      false,
      "نشاط تربوي اختياري غير مضاف للمجموع؛ يختار الطالب نشاطًا واحدًا.",
      url_decision,
      grade,
      term,
      track
    ));
  });
  VOCATIONALS.forEach((voc, idx) => {
    result.push(createSub(
      `${grade}-${term}-${track}-vocational-${idx}`,
      voc,
      "vocational",
      false,
      false,
      "مادة تربية مهنية اختيارية غير مضافة للمجموع؛ يختار الطالب مادة واحدة.",
      url_decision,
      grade,
      term,
      track
    ));
  });
  return result;
}

export const EDUCATION_DATA_RAW: GradeData[] = [
  {
    gradeId: "grade-1",
    gradeTitle: "الصف الأول الثانوي",
    terms: ["term-1", "term-2"].map(termId => ({
      termId,
      termTitle: termId === 'term-1' ? 'الترم الأول' : 'الترم الثاني',
      tracks: [
        {
          trackId: "common",
          trackTitle: "مشترك",
          subjects: [
            createSub(`${termId}-g1-arabic`, TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الأول الثانوي وفق هيكلة الوزارة.", url_plan, "grade-1", termId, "common"),
            createSub(`${termId}-g1-first-foreign`, TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الأول الثانوي وفق هيكلة الوزارة.", url_plan, "grade-1", termId, "common"),
            createSub(`${termId}-g1-history`, TEMP.history, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الأول الثانوي وفق هيكلة الوزارة.", url_plan, "grade-1", termId, "common"),
            createSub(`${termId}-g1-math`, TEMP.math, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الأول الثانوي وفق هيكلة الوزارة.", url_plan, "grade-1", termId, "common"),
            createSub(`${termId}-g1-integrated-science`, TEMP.integrated_science, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الأول الثانوي وفق هيكلة الوزارة.", url_plan, "grade-1", termId, "common"),
            createSub(`${termId}-g1-philosophy`, TEMP.philosophy, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الأول الثانوي وفق هيكلة الوزارة.", url_plan, "grade-1", termId, "common"),
            
            createSub(`${termId}-g1-religion`, TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-1", termId, "common"),
            createSub(`${termId}-g1-second-foreign`, TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-1", termId, "common"),
            createSub(`${termId}-g1-national`, TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-1", termId, "common"),
            createSub(`${termId}-g1-programming`, TEMP.programming, "pass_fail", false, true, "أضيفت للصف الأول الثانوي في 2025-2026 كمادة خارج المجموع، ولها كتاب وزارة/محتوى إلكتروني.", "https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026/Secondry/Secondry1/Term1/StudentBook/ICT_Ar_Sec1_T1.pdf", "grade-1", termId, "common"),
            createSub(`${termId}-g1-sports`, TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-1", termId, "common"),
            ...buildSecondaryClutter("grade-1", termId, "common")
          ]
        }
      ]
    }))
  },
  {
    gradeId: "grade-2",
    gradeTitle: "الصف الثاني الثانوي",
    terms: ["term-1", "term-2"].map(termId => ({
      termId,
      termTitle: termId === 'term-1' ? 'الترم الأول' : 'الترم الثاني',
      tracks: [
        {
          trackId: "science",
          trackTitle: "علمي",
          subjects: [
            createSub(`science-${termId}-g2-arabic`, TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الثاني الثانوي.", url_plan, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-first-foreign`, TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الثاني الثانوي.", url_plan, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-math`, TEMP.math, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة العلمية.", url_plan, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-physics`, TEMP.physics, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة العلمية.", url_plan, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-chemistry`, TEMP.chemistry, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة العلمية.", url_plan, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-history`, TEMP.history, "core_total", true, true, "في 2025-2026 تُدرّس للشعبة العلمية بدل الأحياء حسب تطبيق الهيكلة المعلنة ومصادر الوزارة الصحفية.", "https://gate.ahram.org.eg/News/5269122.aspx", "grade-2", termId, "science"),
            
            createSub(`science-${termId}-g2-religion`, TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-second-foreign`, TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-national`, TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-2", termId, "science"),
            createSub(`science-${termId}-g2-sports`, TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-2", termId, "science"),
            ...buildSecondaryClutter("grade-2", termId, "science")
          ]
        },
        {
          trackId: "literary",
          trackTitle: "أدبي",
          subjects: [
            createSub(`literary-${termId}-g2-arabic`, TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الثاني الثانوي.", url_plan, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-first-foreign`, TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع للصف الثاني الثانوي.", url_plan, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-history`, TEMP.history, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-geography`, TEMP.geography, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-psychology-sociology`, TEMP.psychology_g2, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-math`, TEMP.math, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-2", termId, "literary"),
            
            createSub(`literary-${termId}-g2-religion`, TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-second-foreign`, TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-national`, TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-2", termId, "literary"),
            createSub(`literary-${termId}-g2-sports`, TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-2", termId, "literary"),
            ...buildSecondaryClutter("grade-2", termId, "literary")
          ]
        }
      ]
    }))
  },
  {
    gradeId: "grade-3",
    gradeTitle: "الصف الثالث الثانوي",
    terms: [
      {
        termId: "full-year",
        termTitle: "المنهج الكامل",
        tracks: [
          {
            trackId: "science-bio",
            trackTitle: "علمي علوم",
            subjects: [
              createSub("g3-bio-arabic", TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-english", TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-biology", TEMP.biology, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-chemistry", TEMP.chemistry, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-physics", TEMP.physics, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "full-year", "science-bio"),
              
              createSub("g3-bio-religion", TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-second-foreign", TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع حسب الهيكلة.", url_plan, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-national", TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-sports", TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "full-year", "science-bio"),
              createSub("g3-bio-geology", TEMP.geology, "pass_fail", false, true, "أصبحت نجاح ورسوب غير مضافة للمجموع في شعبة علمي علوم حسب الهيكلة.", url_plan, "grade-3", "full-year", "science-bio"),
              ...buildSecondaryClutter("grade-3", "full-year", "science-bio")
            ]
          },
          {
            trackId: "science-math",
            trackTitle: "علمي رياضة",
            subjects: [
              createSub("g3-math-arabic", TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "full-year", "science-math"),
              createSub("g3-math-english", TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "full-year", "science-math"),
              createSub("g3-math-mathematics", TEMP.math, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة، بعد إعادة تصميم الرياضيات كمادة واحدة.", url_plan, "grade-3", "full-year", "science-math"),
              createSub("g3-math-chemistry", TEMP.chemistry, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "full-year", "science-math"),
              createSub("g3-math-physics", TEMP.physics, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "full-year", "science-math"),
              
              createSub("g3-math-religion", TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-3", "full-year", "science-math"),
              createSub("g3-math-second-foreign", TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع حسب الهيكلة.", url_plan, "grade-3", "full-year", "science-math"),
              createSub("g3-math-national", TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "full-year", "science-math"),
              createSub("g3-math-sports", TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "full-year", "science-math"),
              ...buildSecondaryClutter("grade-3", "full-year", "science-math")
            ]
          },
          {
            trackId: "literary",
            trackTitle: "أدبي",
            subjects: [
              createSub("g3-literary-arabic", TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "full-year", "literary"),
              createSub("g3-literary-english", TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "full-year", "literary"),
              createSub("g3-literary-history", TEMP.history, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "full-year", "literary"),
              createSub("g3-literary-geography", TEMP.geography, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "full-year", "literary"),
              createSub("g3-literary-statistics", TEMP.statistics, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "full-year", "literary"),
              
              createSub("g3-literary-religion", TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-3", "full-year", "literary"),
              createSub("g3-literary-second-foreign", TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع حسب الهيكلة.", url_plan, "grade-3", "full-year", "literary"),
              createSub("g3-literary-national", TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "full-year", "literary"),
              createSub("g3-literary-sports", TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "full-year", "literary"),
              createSub("g3-literary-psychology", TEMP.psychology_g3, "pass_fail", false, true, "أصبح نجاح ورسوب غير مضاف للمجموع في الشعبة الأدبية حسب الهيكلة.", url_plan, "grade-3", "full-year", "literary"),
              ...buildSecondaryClutter("grade-3", "full-year", "literary")
            ]
          }
        ]
      },
      {
        termId: "final-revision",
        termTitle: "المراجعة النهائية",
        tracks: [
          {
            trackId: "science-bio",
            trackTitle: "علمي علوم",
            subjects: [
              createSub("g3-bio-arabic-rev", TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-english-rev", TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-biology-rev", TEMP.biology, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-chemistry-rev", TEMP.chemistry, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-physics-rev", TEMP.physics, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي علوم.", url_plan, "grade-3", "final-revision", "science-bio"),
              
              createSub("g3-bio-religion-rev", TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-second-foreign-rev", TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع حسب الهيكلة.", url_plan, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-national-rev", TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-sports-rev", TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "final-revision", "science-bio"),
              createSub("g3-bio-geology-rev", TEMP.geology, "pass_fail", false, true, "أصبحت نجاح ورسوب غير مضافة للمجموع في شعبة علمي علوم حسب الهيكلة.", url_plan, "grade-3", "final-revision", "science-bio")
            ]
          },
          {
            trackId: "science-math",
            trackTitle: "علمي رياضة",
            subjects: [
              createSub("g3-math-arabic-rev", TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "final-revision", "science-math"),
              createSub("g3-math-english-rev", TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "final-revision", "science-math"),
              createSub("g3-math-mathematics-rev", TEMP.math, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة، بعد إعادة تصميم الرياضيات كمادة واحدة.", url_plan, "grade-3", "final-revision", "science-math"),
              createSub("g3-math-chemistry-rev", TEMP.chemistry, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "final-revision", "science-math"),
              createSub("g3-math-physics-rev", TEMP.physics, "core_total", true, true, "مادة أساسية مضافة للمجموع لعلمي رياضة.", url_plan, "grade-3", "final-revision", "science-math"),
              
              createSub("g3-math-religion-rev", TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-3", "final-revision", "science-math"),
              createSub("g3-math-second-foreign-rev", TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع حسب الهيكلة.", url_plan, "grade-3", "final-revision", "science-math"),
              createSub("g3-math-national-rev", TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "final-revision", "science-math"),
              createSub("g3-math-sports-rev", TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "final-revision", "science-math")
            ]
          },
          {
            trackId: "literary",
            trackTitle: "أدبي",
            subjects: [
              createSub("g3-literary-arabic-rev", TEMP.arabic, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-english-rev", TEMP.english, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-history-rev", TEMP.history, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-geography-rev", TEMP.geography, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-statistics-rev", TEMP.statistics, "core_total", true, true, "مادة أساسية مضافة للمجموع للشعبة الأدبية.", url_plan, "grade-3", "final-revision", "literary"),
              
              createSub("g3-literary-religion-rev", TEMP.religion, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع.", url_decision, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-second-foreign-rev", TEMP.second_lang, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع حسب الهيكلة.", url_plan, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-national-rev", TEMP.citizenship, "pass_fail", false, true, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-sports-rev", TEMP.sports, "pass_fail", false, false, "مادة نجاح ورسوب غير مضافة للمجموع بحسب القرار الوزاري المنشور.", url_decision, "grade-3", "final-revision", "literary"),
              createSub("g3-literary-psychology-rev", TEMP.psychology_g3, "pass_fail", false, true, "أصبح نجاح ورسوب غير مضاف للمجموع في الشعبة الأدبية حسب الهيكلة.", url_plan, "grade-3", "final-revision", "literary")
            ]
          }
        ]
      }
    ]
  }
];

// Re-expose helpers requested in user structure
export function getVisibleSubjects(gradeId: string, termId: string, trackId: string, includeHidden = false) {
  const grade = EDUCATION_DATA_RAW.find(g => g.gradeId === gradeId);
  if (!grade) return [];
  const term = grade.terms.find(t => t.termId === termId);
  if (!term) return [];
  // For G1, track is always "common"
  const actualTrackId = gradeId === 'grade-1' ? 'common' : trackId;
  const track = term.tracks.find(tr => tr.trackId === actualTrackId);
  if (!track) return [];
  return track.subjects.filter(s => includeHidden || s.visibleByDefault !== false);
}

export function getAllSubjectsFlat(includeHidden = true) {
  const out: any[] = [];
  for (const grade of EDUCATION_DATA_RAW) {
    for (const term of grade.terms) {
      for (const track of term.tracks) {
        for (const subject of track.subjects) {
          if (includeHidden || subject.visibleByDefault !== false) {
            out.push({
              gradeId: grade.gradeId,
              gradeTitle: grade.gradeTitle,
              termId: term.termId,
              termTitle: term.termTitle,
              trackId: track.trackId,
              trackTitle: track.trackTitle,
              ...subject
            });
          }
        }
      }
    }
  }
  return out;
}

// Bind to window to satisfy user's constraint
if (typeof window !== 'undefined') {
  (window as any).SECONDARY_SUBJECTS_PATCH_META = SECONDARY_SUBJECTS_PATCH_META;
  (window as any).EDUCATION_DATA = EDUCATION_DATA_RAW;
  (window as any).getVisibleSubjects = getVisibleSubjects;
  (window as any).getAllSubjectsFlat = getAllSubjectsFlat;
}
