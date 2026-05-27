/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Subject, Action, GradeData } from './types.ts';
import { GRADE1_LESSON_DATA } from './data/grade1.ts';
import { GRADE2_LESSON_DATA } from './data/grade2.ts';
import { GRADE3_LESSON_DATA } from './data/grade3.ts';

export const ACTIONS: Action[] = [
  {
    name: "شرح الدرس",
    description: "شرح شامل ومنظم بالفكرة والقانون والأمثلة",
    prompt: "اشرح هذا الدرس شرحًا شاملًا وسلسًا ومنظمًا للمرحلة المحددة: الفكرة، القاعدة، خطوات الحل، أمثلة محلولة، أخطاء شائعة، ملخص سريع."
  },
  {
    name: "تبسيط الشرح",
    description: "تبسيط الدرس من الصفر مستعينًا بأبسط الأمثلة",
    prompt: "بسّط هذا الدرس كأني مش فاهم خالص. ابدأ من الصفر، استخدم أمثلة سهلة، ثم ارفع المستوى تدريجيًا."
  },
  {
    name: "ملخص آخر دقيقة",
    description: "أهم القوانين والخلاصات وأشهر كمائن الامتحان",
    prompt: "اعمل ملخص آخر دقيقة لهذا الدرس: أهم القواعد/القوانين/الكلمات، أشهر الفخاخ، 5 نقاط للحفظ، و5 أسئلة متوقعة بإجابات مختصرة."
  },
  {
    name: "أسئلة شبه الامتحان",
    description: "أسئلة من واقع امتحانات الثانوية العامة وصياغاتها الملتوية",
    prompt: "اصنع أسئلة شبه امتحان على الدرس: سؤال مباشر، سؤال بفكرة ملتوية، سؤال اختيارين قريبين، سؤال طويل، وسؤال تحدي. لا تعرض الإجابات إلا بعد محاولتي."
  },
  {
    name: "اختبرني تفاعليًا",
    description: "اختبار بـ 15 سؤال اختيار من متعدد مع التصحيح الفوري",
    prompt: "اختبرني في هذا الدرس بــ 15 سؤال MCQ متدرجة: أفهم، أطبق، أتحدى. بعد إجابتي صحح وفسر سبب الخطأ."
  },
  {
    name: "خريطة ذهنية",
    description: "خريطة ذهنية بصرية وجدول مقارنة بين الأفكار",
    prompt: "اعمل خريطة ذهنية نصية منظمة لهذا الدرس مع جدول مقارنة وقواعد ربط بين الأفكار."
  },
  {
    name: "صحح إجابتي",
    description: "توجيه إجابتك والحصول على تقييم بالرقم وسبب الخطأ",
    prompt: "اسألني عن إجابتي في هذا الدرس، ثم صححها بالدرجة، ووضح الصحيح والخطأ وسبب الخطأ وقاعدة تذكر وسؤال مشابه."
  },
  {
    name: "أضف أخطائي كتحليل",
    description: "تحليل أي فخ وقعت به ووضع قاعدة تذكر ذكية",
    prompt: "عوّل أي خطأ أقوله لك في هذا الدرس إلى سجل بنك أخطاء: السؤال، إجابتي، الصحيح، سبب الخطأ، نوع الخطأ، قاعدة التذكر، تدريب مشابه."
  }
];

export const SPECIAL_PROMPTS = {
  diagnostic: "اعمل اختبار تحديد مستوى سريع في هذه المادة للمرحلة المحددة. اسألني 10 أسئلة متدرجة، ثم حلل مستواي وحدد أبدأ من أي وحدة ودرس، وضع خطة علاج مختصرة.",
  smart_path: "اعمل لي مسار مذاكرة ذكي لهذه المادة: ترتيب الدروس من الأسهل للأصعب، ماذا أذاكر أولًا، وكيف أراجع، مع تقسيم: فهم - حل - تصحيح - بنك أخطاء - اختبار.",
  tomorrow: "عندي امتحان بكرة في هذه المادة. اعمل خطة إنقاذ في 6 ساعات: أهم الدروس، أهم القوانين/الأفكار، الأسئلة المتوقعة، بنك أخطاء سريع، ومتى أنام.",
  plan: "اعمل خطة مذاكرة شخصية لهذه المادة حسب الوقت المتاح. اسألني عن عدد الأيام والساعات ومستواي، ثم قسم الخطة يوميًا بمهام واضحة.",
  weakness: "اسألني 7 أسئلة عن نقاط ضعفي في هذه المادة، ثم حدد نوع الضعف: فهم/حفظ/تطبيق/تسرع/قراءة السؤال، واقترح علاجًا عمليًا."
};

import { EDUCATION_DATA_RAW } from './data/education-data-2025-2026.ts';

const ORIGINAL_SUBJECTS = [
  ...GRADE1_LESSON_DATA,
  ...GRADE2_LESSON_DATA,
  ...GRADE3_LESSON_DATA
];

function findMatchingOriginalSubject(rawSub: Subject): Subject | undefined {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9أ-ي]/g, '');
  const rTitle = clean(rawSub.title);
  
  return ORIGINAL_SUBJECTS.find(orig => {
    // 1. Check gradeId
    if (orig.gradeId && orig.gradeId !== rawSub.gradeId) return false;
    
    // 2. Check termId
    if (orig.termId && rawSub.termId && orig.termId !== rawSub.termId) return false;

    // 3. Align and check track
    const getNormTrack = (t?: string) => {
      if (!t) return 'مشترك';
      const cleanT = t.toLowerCase();
      if (cleanT.includes('science') || cleanT.includes('bio') || cleanT.includes('math') || cleanT.includes('علمي')) {
        return 'علمي';
      }
      if (cleanT.includes('literary') || cleanT.includes('أدبي')) {
        return 'أدبي';
      }
      return 'مشترك';
    };

    const oTrack = getNormTrack(orig.track);
    const rTrack = getNormTrack(rawSub.track || rawSub.trackId);
    
    // If the original subject has a specific track, verify it is compatible with the raw subject track
    if (oTrack !== 'مشترك' && rTrack !== 'مشترك' && oTrack !== rTrack) return false;
    
    const oTitle = clean(orig.title);
    if (oTitle === rTitle) return true;
    if (rTitle.includes(oTitle) || oTitle.includes(rTitle)) return true;
    
    if (rTitle.includes('english') && oTitle.includes('english')) return true;
    if (rTitle.includes('arabic') && oTitle.includes('arabic')) return true;
    if (rTitle.includes('فرنسي') && oTitle.includes('ثانية')) return true;
    if (rTitle.includes('فرنسي') && oTitle.includes('french')) return true;
    if (rTitle.includes('وطنية') && oTitle.includes('national')) return true;
    if (rTitle.includes('وطنية') && oTitle.includes('مواطنة')) return true;
    if (rTitle.includes('كيمياء') && oTitle.includes('كيمياء')) return true;
    if (rTitle.includes('فيزياء') && oTitle.includes('فيزياء')) return true;
    if (rTitle.includes('أحياء') && oTitle.includes('أحياء')) return true;
    if (rTitle.includes('جيولوجيا') && oTitle.includes('جيولوجيا')) return true;
    if (rTitle.includes('جغرافيا') && oTitle.includes('جغرافيا')) return true;
    if (rTitle.includes('تاريخ') && oTitle.includes('تاريخ')) return true;
    if (rTitle.includes('فلسفة') && oTitle.includes('فلسفة')) return true;
    if (rTitle.includes('رياضيات') && oTitle.includes('رياضيات')) return true;
    if (rTitle.includes('رياضيات') && oTitle.includes('math')) return true;
    if (rTitle.includes('برمجة') && (oTitle.includes('ict') || oTitle.includes('computer') || oTitle.includes('برمج'))) return true;
    if (rTitle.includes('نفس') && oTitle.includes('نفس')) return true;
    if (rTitle.includes('إحصاء') && oTitle.includes('إحصاء')) return true;
    
    return false;
  });
}

export const EDUCATION_DATA: GradeData[] = EDUCATION_DATA_RAW.map(grade => {
  return {
    ...grade,
    terms: grade.terms.map(term => {
      return {
        ...term,
        tracks: term.tracks.map(track => {
          return {
            ...track,
            subjects: track.subjects.map(rawSub => {
              const matched = findMatchingOriginalSubject(rawSub);
              if (matched && matched.units && matched.units.length > 0) {
                return {
                  ...rawSub,
                  units: matched.units,
                  slug: matched.slug || rawSub.slug
                };
              }
              return rawSub;
            })
          };
        })
      };
    })
  };
});

// Flat list of all subjects across all grades/tracks/terms
export const LESSON_DATA: Subject[] = [];
EDUCATION_DATA.forEach(grade => {
  grade.terms.forEach(term => {
    term.tracks.forEach(track => {
      track.subjects.forEach(sub => {
        // Keep them localized by their distinct IDs to prevent collision in flat lookups
        LESSON_DATA.push(sub);
      });
    });
  });
});

