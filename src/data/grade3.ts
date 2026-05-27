import { Subject } from '../types.ts';

export const GRADE3_LESSON_DATA: Subject[] = [
  // ==========================================
  // 5- الصف الثالث الثانوي (الشهادة) - المنهج الكامل
  // ==========================================
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "مشترك",
    title: "اللغة العربية",
    icon: "ع",
    color: "#f59e0b",
    slug: "subject-01",
    units: [
      {
        title: "القراءة والفهم المتحرر",
        slug: "subject-01-unit-01",
        lessons: [
          { id: "L0001", title: "الفكرة الرئيسية والأفكار الفرعية", summary: "يدرب درس الفكرة الرئيسية والأفكار الفرعية الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "القراءة والفهم المتحرر"], slug: "subject-01-unit-01-lesson-01", order: 1 },
          { id: "L0002", title: "معنى الكلمة من السياق", summary: "يدرب درس معنى الكلمة من السياق الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "القراءة والفهم المتحرر"], slug: "subject-01-unit-01-lesson-02", order: 2 },
          { id: "L0003", title: "العلاقات بين الجمل والفقرات", summary: "يدرب درس العلاقات بين الجمل والفقرات الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "القراءة والفهم المتحرر"], slug: "subject-01-unit-01-lesson-03", order: 3 },
          { id: "L0004", title: "استنتاج الهدف والاتجاه", summary: "يدرب درس استنتاج الهدف والاتجاه الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "القراءة والفهم المتحرر"], slug: "subject-01-unit-01-lesson-04", order: 4 },
          { id: "L0005", title: "تحليل الرأي والحجة والدليل", summary: "يدرب درس تحليل الرأي والحجة والدليل الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "القراءة والفهم المتحرر"], slug: "subject-01-unit-01-lesson-05", order: 5 }
        ]
      },
      {
        title: "النصوص والبلاغة التطبيقية",
        slug: "subject-01-unit-02",
        lessons: [
          { id: "L0009", title: "تحليل العاطفة والفكرة", summary: "يدرب درس تحليل العاطفة والفكرة الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "النصوص والبلاغة التطبيقية"], slug: "subject-01-unit-02-lesson-01", order: 1 },
          { id: "L0010", title: "التشبيه وأنواعه", summary: "يدرب درس التشبيه وأنواعه الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "النصوص والبلاغة التطبيقية"], slug: "subject-01-unit-02-lesson-02", order: 2 },
          { id: "L0011", title: "الاستعارة المكنية والتصريحية", summary: "يدرب درس الاستعارة المكنية والتصريحية الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "النصوص والبلاغة التطبيقية"], slug: "subject-01-unit-02-lesson-03", order: 3 },
          { id: "L0012", title: "الكناية وسر الجمال", summary: "يدرب درس الكناية وسر الجمال الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "النصوص والبلاغة التطبيقية"], slug: "subject-01-unit-02-lesson-04", order: 4 },
          { id: "L0013", title: "المجاز المرسل والعلاقات", summary: "يدرب درس المجاز المرسل والعلاقات الطالب على الفهم والاستخدام الصحيح في السياق، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "النصوص والبلاغة التطبيقية"], slug: "subject-01-unit-02-lesson-05", order: 5 }
        ]
      },
      {
        title: "النحو وصياغة القواعد",
        slug: "subject-01-unit-03",
        lessons: [
          { id: "L0019", title: "الجملة الاسمية والفعلية", summary: "يدرب درس الجملة الاسمية والفعلية الطالب على الفهم والاستخدام النحوي، مع أمثلة وتطبيقات وأسئلة امتحانية قصيرة.", quickTask: "اقرأ المثال، استخرج القاعدة، ثم طبق على جملة جديدة.", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "subject-01-unit-03-lesson-01", order: 1 },
          { id: "L0020", title: "المبتدأ والخبر وأنواعهما", summary: "يدرب درس المبتدأ والخبر وأنواعهما الطالب على الإعراب الدقيق وتحديد نوع الخبر وصور تقدمه.", quickTask: "حدد ركني الجملة واستخرج المبتدأ المؤخر مع التعليل.", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "subject-01-unit-03-lesson-02", order: 2 },
          { id: "L0021", title: "كان وأخواتها وضوابط عملها", summary: "شرح الأفعال الناقصة والتامة وحالات عملها وتأثيرها على صياغة الجملة النحوية.", quickTask: "ميز كان التامة من الناقصة في الأمثلة المطروحة.", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "subject-01-unit-03-lesson-03", order: 3 },
          { id: "L0022", title: "إن وأخواتها ولا النافية للجنس", summary: "توضيح الحروف الناسخة وشروط عمل لا النافية للجنس وأحكام اسم الاسم وخبره.", quickTask: "أعرب الجملة بعد إدخال لا النافية للجنس العاملة.", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "subject-01-unit-03-lesson-04", order: 4 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "مشترك",
    title: "English",
    icon: "EN",
    color: "#22c55e",
    slug: "subject-02",
    units: [
      {
        title: "Grammar & Structure",
        slug: "subject-02-unit-01",
        lessons: [
          { id: "L0057", title: "Present Tenses & Usage", summary: "Comprehensive analysis of modern English present tenses, contextual rules, and common pitfalls.", quickTask: "Write 3 sentences highlighting state vs action verbs.", tags: ["مشترك", "English", "Grammar"], slug: "subject-02-unit-01-lesson-01", order: 1 },
          { id: "L0058", title: "Past Tenses & Narrative Styles", summary: "Understand past simple, continuous, perfect, and habitual actions in narrative contexts.", quickTask: "Differentiate between 'used to' and 'would' in writing.", tags: ["مشترك", "English", "Grammar"], slug: "subject-02-unit-01-lesson-02", order: 2 },
          { id: "L0059", title: "Future Forms & Intentions", summary: "Rules for will, going to, present continuous, and present simple in denoting future actions.", quickTask: "Match statements to spontaneous decisions vs pre-planned.", tags: ["مشترك", "English", "Grammar"], slug: "subject-02-unit-01-lesson-03", order: 3 }
        ]
      },
      {
        title: "Vocabulary & Context",
        slug: "subject-02-unit-02",
        lessons: [
          { id: "L0072", title: "Word Formation & Suffixes", summary: "Master patterns of nominal and adjectival shifts for exam vocabularies.", quickTask: "Derive noun, verb, and adverb from 'create'.", tags: ["مشترك", "English", "Vocabulary"], slug: "subject-02-unit-02-lesson-01", order: 1 },
          { id: "L0073", title: "Collocations & Idiom Usage", summary: "Familiarize yourself with natural English verb-noun pairings and contextually required idioms.", quickTask: "Compare the meaning of 'make an effort' vs 'do a favor'.", tags: ["مشترك", "English", "Vocabulary"], slug: "subject-02-unit-02-lesson-02", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "مشترك",
    title: "اللغة الأجنبية الثانية",
    icon: "FR",
    color: "#ec4899",
    slug: "g3-second-lang",
    units: [
      {
        title: "المحادثة والقنوات الأساسية",
        slug: "g3-second-lang-u1",
        lessons: [
          { id: "L0401", title: "المستقبل البسيط والضمائر الشخصية والمخاطبة", summary: "تصريفات تكرارية، واستعمال جمل الاستفهام بمواجهة أوزان الأسئلة للوزارة صياغاً.", quickTask: "صغ حوارًا تطلب فيه من المعلم إعادة شرح صيغ الشرط.", tags: ["مشترك", "اللغة الثانية", "قواعد"], slug: "g3-second-lang-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي علوم",
    title: "الفيزياء",
    icon: "Φ",
    color: "#38bdf8",
    slug: "subject-04-bio",
    units: [
      {
        title: "الكهربية والتيار المستمر",
        slug: "subject-04-unit-01-bio",
        lessons: [
          { id: "L0133", title: "التيار الكهربي وفرق الجهد", summary: "فهم حركة الشحنات وشدة التيار وفرق الجهد الكهربي وقانون أوم وسرعة الانجراف.", quickTask: "احسب عدد الإلكترونات المارة في مقطع سلك خلال دقيقة بتيار شدته 5 أمبير.", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "الكهربية والتيار المستمر"], slug: "subject-04-unit-01-lesson-01", order: 1 },
          { id: "L0134", title: "المقاومة الكهربية والنوعية", summary: "العوامل المؤثرة على مقاومة الموصل والمقاومة النوعية والتوصيلية ومقارنة بين سلكين.", quickTask: "ماذا يحدث لمقاومة سلك إذا سحب ليزداد طوله للضعف ويقل قطره للنصف؟", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "الكهربية والتيار المستمر"], slug: "subject-04-unit-01-lesson-02", order: 2 },
          { id: "L0135", title: "قانونا كيرشوف", summary: "دراسة قانون كيرشوف الأول (حفظ الشحنة) والثاني (حفظ الطاقة) لحل الدوائر المعقدة.", quickTask: "اكتب معادلات كيرشوف الثلاث لمسار مغلق يحتوي على بطاريتين ومقومات متوازية.", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "الكهربية والتيار المستمر"], slug: "subject-04-unit-01-lesson-03", order: 3 }
        ]
      },
      {
        title: "التأثير المغناطيسي للحمل",
        slug: "subject-04-unit-02-bio",
        lessons: [
          { id: "L0142", title: "المجال المغناطيسي لسلك مستقيم", summary: "قانون بيو-سافار، شكل خطوط الفيض، قاعدة أمبير لليد اليمنى ونقاط التعادل الكهربي.", quickTask: "حدد نقطة التعادل بين سلكين يمر بهما تياران في نفس الاتجاه.", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "التأثير المغناطيسي والحث"], slug: "subject-04-unit-02-lesson-01", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي رياضة",
    title: "الفيزياء",
    icon: "Φ",
    color: "#38bdf8",
    slug: "subject-04-math",
    units: [
      {
        title: "الكهربية والتيار المستمر",
        slug: "subject-04-unit-01-math",
        lessons: [
          { id: "L0133-m", title: "التيار الكهربي وفرق الجهد", summary: "فهم حركة الشحنات وشدة التيار وفرق الجهد الكهربي وقانون أوم وسرعة الانجراف للمهندسين.", quickTask: "احسب عدد الإلكترونات المارة في مقطع سلك خلال دقيقة بتيار شدته 5 أمبير.", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "الكهربية والتيار المستمر"], slug: "subject-04-unit-01-lesson-01-math", order: 1 },
          { id: "L0134-m", title: "المقاومة الكهربية والنوعية", summary: "العوامل المؤثرة على مقاومة الموصل والمقاومة النوعية والتوصيلية ومقارنة بين سلكين وفهم الأبعاد.", quickTask: "ماذا يحدث لمقاومة سلك إذا سحب ليزداد طوله للضعف ويقل قطره للنصف؟", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "الكهربية والتيار المستمر"], slug: "subject-04-unit-01-lesson-02-math", order: 2 },
          { id: "L0135-m", title: "قانونا كيرشوف", summary: "دراسة قانون كيرشوف الأول (حفظ الشحنة) والثاني (حفظ الطاقة) لحل الدوائر المعقدة بالكامل.", quickTask: "اكتب معادلات كيرشوف الثلاث لمسار مغلق يحتوي على بطاريتين ومقومات متوازية.", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "الكهربية والتيار المستمر"], slug: "subject-04-unit-01-lesson-03-math", order: 3 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي علوم",
    title: "الكيمياء",
    icon: "⚗",
    color: "#a855f7",
    slug: "subject-05-bio",
    units: [
      {
        title: "العناصر الانتقالية والتحليل",
        slug: "subject-05-unit-01-bio",
        lessons: [
          { id: "L0168", title: "التركيب الإلكتروني وحالات التأكسد", summary: "توزيع السلسلة الانتقالية الأولى وشذوذ الكروم والنحاس وأقصى حالات التأكسد الممكنة.", quickTask: "اكتب التوزيع الإلكتروني لأيون الحديد III وأيون المنجنيز II.", tags: ["علمي علوم / علمي رياضة", "الكيمياء", "العناصر الانتقالية"], slug: "subject-05-unit-01-lesson-01", order: 1 },
          { id: "L0169", title: "الحديد وخاماته واستخلاصه", summary: "مراحل تجهيز الخام والاختزال في الأفران العالية وفرن مدركس ثم إنتاج الصلب.", quickTask: "وضح بالمعادلات الكيميائية اختزال الهيماتيت في فرن مدركس.", tags: ["علمي علوم / علمي رياضة", "الكيمياء", "العناصر الانتقالية"], slug: "subject-05-unit-01-lesson-02", order: 2 }
        ]
      },
      {
        title: "التحليل الكيميائي",
        slug: "subject-05-unit-02-bio",
        lessons: [
          { id: "L0176", title: "الكشف عن الأنيونات (مجموعة HCl)", summary: "الكشف عن الكربونات، البيكربونات، الكبريتيت، الكبريتيد، الثيوكبريتات والنيتريت.", quickTask: "وضح كيف تفرق عملياً بين محاليل كربونات وبيكربونات الصوديوم.", tags: ["علمي علوم / علمي رياضة", "الكيمياء", "التحليل الكيميائي والكمي"], slug: "subject-05-unit-02-lesson-01", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي رياضة",
    title: "الكيمياء",
    icon: "⚗",
    color: "#a855f7",
    slug: "subject-05-math",
    units: [
      {
        title: "العناصر الانتقالية والهياكل للرياضيات",
        slug: "subject-05-unit-01-math",
        lessons: [
          { id: "L0168-m", title: "التركيب الإلكتروني وحالات التأكسد والروابط", summary: "توزيع السلسلة الانتقالية الأولى والموازنات العامة للمعادلات المعقدة كيميائياً.", quickTask: "اكتب التوزيع الإلكتروني لأيون الحديد III وأيون المنجنيز II.", tags: ["علمي علوم / علمي رياضة", "الكيمياء", "العناصر الانتقالية"], slug: "subject-05-unit-01-lesson-01-math", order: 1 },
          { id: "L0176-m", title: "الكشف عن الأنيونات وبنية الأحماض", summary: "الكشف عن الكربونات، البيكربونات، الكبريتيت، الكبريتيد، الثيوكبريتات والنيتريت.", quickTask: "وضح كيف تفرق عملياً بين محاليل كربونات وبيكربونات الصوديوم.", tags: ["علمي علوم / علمي رياضة", "الكيمياء", "التحليل الكيميائي والكمي"], slug: "subject-05-unit-02-lesson-01-math", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي علوم",
    title: "الأحياء",
    icon: "DNA",
    color: "#10b981",
    slug: "subject-06",
    units: [
      {
        title: "الوراثة الجزيئية (DNA)",
        slug: "subject-06-unit-01",
        lessons: [
          { id: "L0204", title: "أدلة إثبات أن DNA المادة الوراثية", summary: "تجارب التحول البكتيري لجريفث وأفيري، وتجربة لاقمات البكتيريا لهيرشي وتشيسمان.", quickTask: "وضح دور الأنزيم المحلل لـ DNA في إثبات المادة الوراثية قطعيًا.", tags: ["علمي علوم", "الأحياء", "الخلية والوراثة الجزيئية"], slug: "subject-06-unit-01-lesson-01", order: 1 },
          { id: "L0205", title: "تركيب الـ DNA وتضاعفه", summary: "نموذج واتسون وكريك، شريطا المكملين المتعاكسين، وآلية التضاعف بواسطة إنزيم البلمرة والربط واللولب.", quickTask: "ارسم نموذجًا مبسطًا لشوكة التضاعف محددًا اتجاه عمل إنزيم البلمرة.", tags: ["علمي علوم", "الأحياء", "الخلية والوراثة الجزيئية"], slug: "subject-06-unit-01-lesson-02", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي رياضة",
    title: "رياضيات بحتة",
    icon: "∫",
    color: "#6366f1",
    slug: "subject-07",
    units: [
      {
        title: "الجبر والهندسة الفراغية",
        slug: "subject-07-unit-01",
        lessons: [
          { id: "L0235", title: "الأعداد المركبة ونظرية ديموافر", summary: "الصورة الجبرية والمثلثية والأسية للعدد المركب، وإيجاد الجذور باستخدام نظرية ديموافر.", quickTask: "ضع العدد المركب (1 + ت) في الصورة المثلثية ثم أوجد الجذور التربيعية لـه.", tags: ["علمي رياضة", "رياضيات بحتة", "الجبر"], slug: "subject-07-unit-01-lesson-01", order: 1 },
          { id: "L0236", title: "المحددات وخواصها الأساسية", summary: "فك المحددات، الخواص الجبرية التسع لتسهيل الحساب والوصول للصيغة المثلثية.", quickTask: "بدون فك المحدد أثبت تساويه مع قيمة معادلة من الدرجة الثالثة.", tags: ["علمي رياضة", "رياضيات بحتة", "الجبر"], slug: "subject-07-unit-01-lesson-02", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي رياضة",
    title: "رياضيات تطبيقية",
    icon: "⚙",
    color: "#c084fc",
    slug: "g3-applied-math",
    units: [
      {
        title: "الاستاتيكا والديناميكا المتقدمة",
        slug: "g3-applied-math-u1",
        lessons: [
          { id: "L0501", title: "قوة الاحتكاك والاتزان على سطح مائل", summary: "حساب معامل الاحتكاك الساكن والحدي، شروط الاتزان للجسم المتماسك وصيغ القوى.", quickTask: "أوجد القيمة القصوى لقوة الاحتكاك الحدي لجسم وزنه 20 نيوتن.", tags: ["علمي رياضة", "الرياضيات التطبيقية", "استاتيكا"], slug: "g3-applied-math-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "أدبي",
    title: "التاريخ",
    icon: "⏳",
    color: "#92400e",
    slug: "subject-09",
    units: [
      {
        title: "مصر الحديثة والمعاصرة",
        slug: "subject-09-unit-01",
        lessons: [
          { id: "L0290", title: "مصر تحت الحكم العثماني", summary: "الحالة السياسية والاقتصادية والاجتماعية في مصر تحت السيطرة العثمانية قبيل الحملة الفرنسية.", quickTask: "قارن بين نظام الالتزام ونظام الالتزام الضريبي للمزارعين.", tags: ["أدبي", "التاريخ", "مصر الحديثة والمعاصرة"], slug: "subject-09-unit-01-lesson-01", order: 1 },
          { id: "L0291", title: "الحملة الفرنسية على مصر والشام", summary: "أسباب الحملة الفرنسية بقيادة نابليون بونابرت، المقاومة المجتمعية، والآثار العلمية والسياسية للحملة.", quickTask: "لخص أهم الآثار الفكرية والعلمية المترتبة على المجمع العلمي المصري.", tags: ["أدبي", "التاريخ", "مصر الحديثة والمعاصرة"], slug: "subject-09-unit-01-lesson-02", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "أدبي",
    title: "الجغرافيا السياسية",
    icon: "🌍",
    color: "#0ea5e9",
    slug: "subject-10",
    units: [
      {
        title: "الدولة والجغرافيا السياسية",
        slug: "subject-10-unit-01",
        lessons: [
          { id: "L0311", title: "مفهوم الدولة ومقوماتها الجغرافية", summary: "الفرق بين الدولة والأمة، أنواع الدول من حيث النظام السياسي والإداري (وحدوية، اتحادية).", quickTask: "استخرج ثلاثة فروق جوهرية بين تنظيم الدولة الكونفدرالية والدولة الفيدرالية.", tags: ["أدبي", "الجغرافيا السياسية", "الدولة والجغرافيا السياسية"], slug: "subject-10-unit-01-lesson-01", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "أدبي",
    title: "الفلسفة والمنطق",
    icon: "☯",
    color: "#8b5cf6",
    slug: "g3-philosophy",
    units: [
      {
        title: "الفلسفة البيئية والمنهج الاستقرائي",
        slug: "g3-philosophy-u1",
        lessons: [
          { id: "L0511", title: "الفلسفة البيئية وقضايا العصر الفكرية", summary: "مراحل علاقة الإنسان بالبيئة (التقديس، التفسير، القهر، والصون) وأخلاقيات الأرض.", quickTask: "صنف ثلاث خطوط عريضة لأخلاقيات الكوكب المستحدثة وفقاً لأرني نايس.", tags: ["أدبي", "الفلسفة", "البيئة"], slug: "g3-philosophy-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "أدبي",
    title: "علم النفس والاجتماع",
    icon: "🧠",
    color: "#f43f5e",
    slug: "g3-psy",
    units: [
      {
        title: "الذكاء والنمو والسلوك الإنساني",
        slug: "g3-psy-u1",
        lessons: [
          { id: "L0521", title: "الذكاءات المتعددة ونظريات التعلم الكبرى", summary: "رصد ذكاء غاردنر المتعدد، التعلم بالاشتراط الكلاسيكي ليفان بافلوف وقوانينه وعمقه السلوكي.", quickTask: "برهن أهمية التغذية الراجعة المعلوماتية لغاردنر بأسئلة الثانوية العامة.", tags: ["أدبي", "علم النفس", "ذكاء"], slug: "g3-psy-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "مشترك",
    title: "التربية الدينية",
    icon: "☪",
    color: "#10b981",
    slug: "g3-religion",
    units: [
      {
        title: "العقيدة والقيم وسلوك الإيمان",
        slug: "g3-religion-u1",
        lessons: [
          { id: "L0531", title: "الإعجاز العلمي والسمو الديني الإسلامي والروحي", summary: "التأمل في سنن الكوكب، سماحة الأحكام ومسؤوليات عمارة المجتمع في الشهادة الثانوية.", quickTask: "لخص ملامح الإيثار والاعتدال من سورة الإسراء.", tags: ["مشترك", "الدين", "عقيدة"], slug: "g3-religion-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "مشترك",
    title: "التربية الوطنية",
    icon: "✍",
    color: "#ef4444",
    slug: "g3-national-ed",
    units: [
      {
        title: "الحق الدستوري والأحزاب السياسية",
        slug: "g3-national-ed-u1",
        lessons: [
          { id: "L0541", title: "الأحزاب الدستورية والانتخابات والضمير السلمي", summary: "أشكال النظم الانتخابية، الدستور وتأثير الفرد والمشاركة الإيجابية بالانتخابات.", quickTask: "حدد ثلاث واجبات وطنية في حماية النظم الدستورية المصرية العريقة.", tags: ["مشترك", "الوطنية", "الحق"], slug: "g3-national-ed-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "مشترك",
    title: "الكمبيوتر وتكنولوجيا المعلومات",
    icon: "AI",
    color: "#2563eb",
    slug: "subject-14",
    units: [
      {
        title: "مهارات التكنولوجيا والبرمجة",
        slug: "subject-14-unit-01",
        lessons: [
          { id: "L0364", title: "الخوارزميات والتفكير المنطقي", summary: "أساسيات تصميم الخوارزميات، خرائط التدفق، وربطها بالتفكير العلمي المنظم لحل المشكلات.", quickTask: "ارسم خريطة تدفق مبسطة لإيجاد المجموع الحسابي للأرقام من 1 إلى 50.", tags: ["مشترك", "الكمبيوتر وتكنولوجيا المعلومات", "مهارات رقمية"], slug: "subject-14-unit-01-lesson-01", order: 1 },
          { id: "L0365", title: "الذكاء الاصطناعي في التعليم", summary: "تعريف شبكات التعلم العميق والشبكات العصبية، والذكاء الاصطناعي التوليدي ومستقبل الأنظمة المساعد رقمياً للطلبة.", quickTask: "كيف تستغل الروبوتات التعليمية ووكلاء الذكاء الاصطناعي في المراجعة الفعالة لمادة الفيزياء؟", tags: ["مشترك", "الكمبيوتر وتكنولوجيا المعلومات", "مهارات رقمية"], slug: "subject-14-unit-01-lesson-02", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي علوم",
    title: "الإحصاء",
    icon: "📉",
    color: "#f59e0b",
    slug: "g3-statistics-bio",
    units: [
      {
        title: "الوحدة الأولى: مقاييس التشتت والارتباط للعلوم",
        slug: "g3-statistics-bio-u1",
        lessons: [
          { id: "L0601", title: "معامل ارتباط بيرسون وسبيرمان للرتب", summary: "قوانين دقيقة لحساب قوة ونوع الارتباط بين متغيرين، والحل الحسابي للبيانات.", quickTask: "احسب معامل ارتباط سبيرمان لبيانات تقديرية مطروحة للطلاب.", tags: ["علمي علوم", "الإحصاء", "الارتباط"], slug: "g3-statistics-bio-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "علمي رياضة",
    title: "الإحصاء",
    icon: "📉",
    color: "#f59e0b",
    slug: "g3-statistics-math",
    units: [
      {
        title: "الوحدة الأولى: مقاييس الارتباط اللامع للرياضيات",
        slug: "g3-statistics-math-u1",
        lessons: [
          { id: "L0601-r", title: "معامل بيرسون وتطبيقات الارتباط والخطأ السكاني", summary: "رصد انحراف الانحدار وخطأ الصياغة والتوقع الإحصائي بالاستدلال الفعال.", quickTask: "احسب معامل ارتباط سبيرمان لبيانات تقديرية مطروحة للطلاب.", tags: ["علمي رياضة", "الإحصاء", "الارتباط"], slug: "g3-statistics-math-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "full-year",
    track: "أدبي",
    title: "الإحصاء",
    icon: "📉",
    color: "#f59e0b",
    slug: "g3-statistics-lit",
    subjectId: "g3-statistics-lit",
    trackId: "أدبي",
    sourceStatus: "مؤكد من كتاب الوزارة",
    sourceUrl: "https://studentbooks.moe.gov.eg/",
    units: [
      {
        title: "الوحدة الأولى: مبادئ الإحصاء للأدبي",
        unitId: "g3-statistics-lit-u1",
        order: 1,
        slug: "g3-statistics-lit-u1",
        lessons: [
          { id: "L0601-a", title: "الارتباط البسيط وتفسير المنحنيات التماثلية", summary: "فهم الجداول الإحصائية وترجمتها لنسب حقيقية وفهم المجموع الكلي الديمغرافي.", quickTask: "احسب معامل ارتباط سبيرمان لبيانات تقديرية مطروحة للطلاب.", tags: ["أدبي", "الإحصاء", "الارتباط"], keywords: ["الارتباط البسيط", "تفسير المنحنيات", "أدبي إحصاء"], slug: "g3-statistics-lit-u1-l1", order: 1, sourcePage: "p. 5-14" }
        ]
      }
    ]
  },
  // =========================================================
  // 6- الصف الثالث الثانوي (الشهادة) - المراجعات النهائية والامتحانات
  // =========================================================
  {
    gradeId: "grade-3",
    termId: "final-revision",
    track: "مشترك",
    title: "اللغة العربية (مراجعة)",
    icon: "ع",
    color: "#f59e0b",
    slug: "g3-rev-arabic",
    subjectId: "g3-rev-arabic",
    trackId: "مشترك",
    sourceStatus: "مؤكد من كتاب الوزارة",
    sourceUrl: "https://studentbooks.moe.gov.eg/",
    units: [
      {
        title: "كبسولة النحو والبلاغة الذهبية الشاملة",
        unitId: "g3-rev-arabic-u1",
        order: 1,
        slug: "g3-rev-arabic-u1",
        lessons: [
          { id: "G3RL01", title: "ثوابت الإعلال والإعراب المصيرية وأفخاخ MCQ", summary: "تفصيل لأبرز الثوابت النحوية والمشتقات والمرفوعات والمنصوبات، وأحكام إعراب الأدوات الملتوية في امتحان الثانوية العامة.", quickTask: "ميز بين أنواع (ما) و (لا) في 5 أمثلة امتحانية صعبة وحدد إعراب ما بعدها.", tags: ["مشترك", "العربية", "نحو ذهبي"], keywords: ["ثوابت الإعراب", "منصوبات", "أفخاخ النحو"], slug: "g3-rev-arabic-u1-l1", order: 1, sourcePage: "ملحق المراجعة ص. 2-15" },
          { id: "G3RL02", title: "التطبيقات الشاملة للبلاغة والنصوص المتحررة", summary: "التدريب السيكولوجي على تفكيك نصوص الشعر والفرائد النثرية، واستخراج الأدب والمحسنات البديعية وتجربتها الشعرية.", quickTask: "استنتج العاطفة المسيطرة على الشاعر في الأبيات التالية وحدد علاقة الشطر الثاني بالأول.", tags: ["مشترك", "العربية", "بلاغة متكاملة"], keywords: ["البلاغة الشاملة", "التجربة الشعرية", "نصوص متحررة"], slug: "g3-rev-arabic-u1-l2", order: 2, sourcePage: "ملحق المراجعة ص. 16-28" }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "final-revision",
    track: "مشترك",
    title: "English (Revision)",
    icon: "EN",
    color: "#22c55e",
    slug: "g3-rev-english",
    subjectId: "g3-rev-english",
    trackId: "مشترك",
    sourceStatus: "مؤكد من كتاب الوزارة",
    sourceUrl: "https://studentbooks.moe.gov.eg/",
    units: [
      {
        title: "Exam Grammar & Unseen MCQ Mastery",
        unitId: "g3-rev-english-u1",
        order: 1,
        slug: "g3-rev-english-u1",
        lessons: [
          { id: "G3RL03", title: "Advanced Grammar Synthesis & Active Voice", summary: "Intense synthesis of relatives, past/present/future aspect combinations, inversion rules, and reporting alternatives.", quickTask: "Solve 10 top-difficulty board questions testing inversion and reported speech.", tags: ["مشترك", "English", "Grammar Capsule"], keywords: ["Inversion", "Reported Speech", "Grammar Capsule"], slug: "g3-rev-english-u1-l1", order: 1, sourcePage: "Revision Section p. 4-12" },
          { id: "G3RL04", title: "MCQ Strategies for Reading & Translation", summary: "Tactical algorithms to target the correct answer in complex reading passages and distinguish very close Arabic-English options.", quickTask: "Translate a highly figurative 40-word paragraph avoiding literal traps.", tags: ["مشترك", "English", "Translation MCQ"], keywords: ["Translation", "Reading Passages", "Passage Algorithms"], slug: "g3-rev-english-u1-l2", order: 2, sourcePage: "Revision Section p. 13-24" }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "final-revision",
    track: "علمي علوم / علمي رياضة",
    title: "الفيزياء (مراجعة)",
    icon: "Φ",
    color: "#38bdf8",
    slug: "g3-rev-physics",
    subjectId: "g3-rev-physics",
    trackId: "علمي علوم / علمي رياضة",
    sourceStatus: "مؤكد من كتاب الوزارة",
    sourceUrl: "https://studentbooks.moe.gov.eg/",
    units: [
      {
        title: "منهجية حل كهرومغناطيسية وتطبيقات كيرشوف",
        unitId: "g3-rev-physics-u1",
        order: 1,
        slug: "g3-rev-physics-u1",
        lessons: [
          { id: "G3RL05", title: "عقليات كيرشوف والدينامو والمحولات الكهربية", summary: "كبسولة عملية لحساب مسارات كيرشوف المغلقة بـ 3 مجاهيل، وتفكيك قوانين الدينامو (الفعالة والعظمى والمتوسطة).", quickTask: "حدد كفاءة محول خافض للجهد إذا انخفض التيار بنسبة 15% وحرك الملفين.", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "قوانين الدينامو"], keywords: ["كيرشوف", "الدينامو المتوسط", "المحولات الكهربية"], slug: "g3-rev-physics-u1-l1", order: 1, sourcePage: "كراسة المفاهيم ص. 30-41" },
          { id: "G3RL06", title: "أسرار الحديثة وكومتون والانبثاق الإشعاعي", summary: "تلخيص ذكي لظاهرة كومتون، معادلة دي برولي، الخلية الكهروضوئية، وحل مسائل الطيف المستمر والمميز لأشعة إكس.", quickTask: "احسب الطول الموجي المصاحب لجسم يتحرك بنصف سرعة الضوء مستخدماً بلانك.", tags: ["علمي علوم / علمي رياضة", "الفيزياء", "الفيزياء الحديثة"], keywords: ["كومتون", "دي برولي", "أشعة إكس"], slug: "g3-rev-physics-u1-l2", order: 2, sourcePage: "كراسة المفاهيم ص. 42-50" }
        ]
      }
    ]
  },
  {
    gradeId: "grade-3",
    termId: "final-revision",
    track: "أدبي",
    title: "التاريخ (مراجعة)",
    icon: "⏳",
    color: "#92400e",
    slug: "g3-rev-history",
    subjectId: "g3-rev-history",
    trackId: "أدبي",
    sourceStatus: "مؤكد من كتاب الوزارة",
    sourceUrl: "https://studentbooks.moe.gov.eg/",
    units: [
      {
        title: "كبسولة التاريخ المصري والنقد الجغرافي",
        unitId: "g3-rev-history-u1",
        order: 1,
        slug: "g3-rev-history-u1",
        lessons: [
          { id: "G3RL07", title: "تحليل نقد الثورات والعهود (فرنسا ومحمد علي)", summary: "مهارات الربط والمقارنة بين أسباب ونتائج الثورة الفرنسية، عهد محمد علي، وثورة عاصم للثانوية العامة المصرية.", quickTask: "أوجد 3 قواسم مشتركة بين الإصلاح الزراعي لمحمد علي والخديوي إسماعيل.", tags: ["أدبي", "التاريخ", "الحداثة المصرية"], keywords: ["محمد علي", "الثورة الفرنسية", "التحليل المقارن"], slug: "g3-rev-history-u1-l1", order: 1, sourcePage: "كتيب المفاهيم ص. 10-22" }
        ]
      }
    ]
  }
];
