import { Subject } from '../types.ts';

export const GRADE1_LESSON_DATA: Subject[] = [
  // ==========================================
  // 1- الصف الأول الثانوي - الترم الأول
  // ==========================================
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "اللغة العربية",
    icon: "ع",
    color: "#f59e0b",
    slug: "g1-t1-arabic",
    units: [
      {
        title: "الوحدة الأولى: البلاغة والأدب والنحو",
        slug: "g1-t1-arabic-u1",
        lessons: [
          { id: "G1T1L01", title: "الحقيقة والمجاز والتعبير الإنساني", summary: "التفريق بين التعبيرات الحقيقية والخيالية والمجازية وأسرار الجمال.", quickTask: "استخرج 3 تعبيرات مجازية من جمل مطروحة.", tags: ["مشترك", "اللغة العربية", "البلاغة"], slug: "g1-t1-arabic-u1-l1", order: 1 },
          { id: "G1T1L02", title: "الأدب في العصر الجاهلي وسماته", summary: "خصائص الشعر والنثر في البيئة الجاهلية والمعلقات السبع الكبرى وتأثير البيئة الجغرافية.", quickTask: "اكتب أهم سمات القصيدة الجاهلية من حيث البناء والأغراض.", tags: ["مشترك", "اللغة العربية", "الأدب"], slug: "g1-t1-arabic-u1-l2", order: 2 },
          { id: "G1T1L03", title: "الأفعال الناقصة والتامة (كان وأخواتها)", summary: "شروط عمل تاء التمام والنقصان لكان وأخواتها وضوابط إعراب المرفوع والمنصوب.", quickTask: "ميز كان التامة من الناقصة في الأمثلة واكتب الإعراب الدقيق لاسمها.", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "g1-t1-arabic-u1-l3", order: 3 }
        ]
      },
      {
        title: "الوحدة الثانية: القراءة والنصوص والبلاغة المتقدمة",
        slug: "g1-t1-arabic-u2",
        lessons: [
          { id: "G1T1L16", title: "قصيدة سماحة الإسلام والعهود", summary: "قراءة نقدية للقيم الإسلامية في الشعر الجاهلي والعهود والأخلاق الإنسانية.", quickTask: "لخص في سطرين المغزى القيمي لبييتين مرويين.", tags: ["مشترك", "اللغة العربية", "نصوص"], slug: "g1-t1-arabic-u2-l1", order: 1 },
          { id: "G1T1L17", title: "التشبيه وأنواعه (المفرد والتمثيلي والضمني)", summary: "شرح أركان التشبيه الأربعة والتمييز بين التشبيه البليغ والتمثيلي وسر جمال التشخيص والتوضيح.", quickTask: "بين نوع التشبيه وسر جماله في قوله: (العمر مثل الضيف ليس له إقامة).", tags: ["مشترك", "اللغة العربية", "بلاغة"], slug: "g1-t1-arabic-u2-l2", order: 2 },
          { id: "G1T1L18", title: "أفعال المقاربة والرجاء والشروع (كاد وأخواتها)", summary: "فهم ضوابط عمل كاد وأخواتها وأحكام اقتران خبرها بـ (أن) المصدرية الفعالة.", quickTask: "اضبط جملة: (بدأ الطالب يذاكر) وحولها إلى فعل رجاء مع ضبط الخبر.", tags: ["مشترك", "اللغة العربية", "نحو"], slug: "g1-t1-arabic-u2-l3", order: 3 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "اللغة الإنجليزية",
    icon: "EN",
    color: "#22c55e",
    slug: "g1-t1-english",
    subjectId: "g1-t1-english",
    trackId: "مشترك",
    sourceStatus: "مؤكد من كتاب الوزارة",
    sourceUrl: "https://studentbooks.moe.gov.eg/",
    units: [
      {
        title: "Unit 1: Getting Away",
        unitId: "g1-t1-english-u1",
        order: 1,
        slug: "g1-t1-english-u1",
        lessons: [
          { id: "G1T1L04", title: "Past Simple vs Past Continuous", summary: "Mastering action sequence, continuous background actions, and state verbs in past contexts.", quickTask: "Create 3 compound sentences using While and When properly.", tags: ["مشترك", "English", "Grammar"], keywords: ["Past Simple", "Past Continuous", "Grammar"], slug: "g1-t1-english-u1-l1", order: 1, sourcePage: "p. 4-7" },
          { id: "G1T1L05", title: "Eco-tourism and Vocabulary", summary: "Contextual vocabulary relating to wildlife preservation, travel effects, and sustainable tourism.", quickTask: "Match vocabulary definitions for biodiversity and eco-friendly.", tags: ["مشترك", "English", "Vocabulary"], keywords: ["Eco-tourism", "Environment", "Vocabulary"], slug: "g1-t1-english-u1-l2", order: 2, sourcePage: "p. 8-11" }
        ]
      },
      {
        title: "Unit 2: Supporting the Community",
        unitId: "g1-t1-english-u2",
        order: 2,
        slug: "g1-t1-english-u2",
        lessons: [
          { id: "G1T1L19", title: "Present Perfect Simple & Continuous", summary: "Understand the transition from past events to present outcomes, using keywords like since, for, and already.", quickTask: "Complete sentences testing since vs for and state verbs in present perfect.", tags: ["مشترك", "English", "Grammar"], keywords: ["Present Perfect", "Grammar"], slug: "g1-t1-english-u2-l1", order: 1, sourcePage: "p. 14-17" },
          { id: "G1T1L20", title: "Supporting Local Communities", summary: "Explore concepts of donations, global charities, and youth voluntary programs across Egyptian villages.", quickTask: "Write a short 5-sentence paragraph on how you can support your village's primary school.", tags: ["مشترك", "English", "Vocabulary"], keywords: ["Community", "Volunteering", "Vocabulary"], slug: "g1-t1-english-u2-l2", order: 2, sourcePage: "p. 18-21" }
        ]
      },
      {
        title: "Unit 3: Improving Lives",
        unitId: "g1-t1-english-u3",
        order: 3,
        slug: "g1-t1-english-u3",
        lessons: [
          { id: "G1T1L41", title: "Present Perfect vs Past Simple & Future Forms", summary: "Contrast perfect and past tenses, and understand the syntax of will, going to, and present continuous for future actions.", quickTask: "Differentiate prediction with evidence vs spontaneous intention in 3 sentences.", tags: ["مشترك", "English", "Grammar"], keywords: ["Future Forms", "Present Perfect", "Grammar"], slug: "g1-t1-english-u3-l1", order: 1, sourcePage: "p. 24-27" },
          { id: "G1T1L42", title: "Social Justice & Creative Careers", summary: "Vocabulary centered around micro-finance, human rights, and entrepreneurial roles that improve Egyptian quality of life.", quickTask: "Write a short summary on how micro-loans help local craftsmen expand.", tags: ["مشترك", "English", "Vocabulary"], keywords: ["Social Justice", "Careers", "Vocabulary"], slug: "g1-t1-english-u3-l2", order: 2, sourcePage: "p. 28-31" }
        ]
      },
      {
        title: "Review A (Review 1)",
        unitId: "g1-t1-english-r1",
        order: 4,
        slug: "g1-t1-english-r1",
        lessons: [
          { id: "G1T1L43", title: "Units 1-3 Grammatical Synthesis", summary: "Comprehensive synthesis of narrative past simple/continuous, perfect tenses, and future intent.", quickTask: "Solve 10 error correction exam questions covering Units 1-3 grammar.", tags: ["مشترك", "English", "Grammar"], keywords: ["Review", "Grammar", "Revision"], slug: "g1-t1-english-r1-l1", order: 1, sourcePage: "p. 34-37" }
        ]
      },
      {
        title: "Unit 4: Making New Friends",
        unitId: "g1-t1-english-u4",
        order: 5,
        slug: "g1-t1-english-u4",
        lessons: [
          { id: "G1T1L44", title: "Countable & Uncountable Nouns & Articles", summary: "Deep dive into countable/uncountable rules, quantifiers (much, many, few, little), and definite/indefinite articles.", quickTask: "Complete sentences requiring 'a', 'an', 'the', or 'no article'.", tags: ["مشترك", "English", "Grammar"], keywords: ["Nouns", "Articles", "Grammar"], slug: "g1-t1-english-u4-l1", order: 1, sourcePage: "p. 40-43" },
          { id: "G1T1L45", title: "Interpersonal Connections & Dialogue", summary: "Vocabulary and idioms of friendship, active listening, conflict resolution, and digital communication safety.", quickTask: "Draft a model email inviting a friend to a local Egyptian cultural exhibition.", tags: ["مشترك", "English", "Vocabulary"], keywords: ["Friendship", "Communication", "Vocabulary"], slug: "g1-t1-english-u4-l2", order: 2, sourcePage: "p. 44-47" }
        ]
      },
      {
        title: "Unit 5: Communication",
        unitId: "g1-t1-english-u5",
        order: 6,
        slug: "g1-t1-english-u5",
        lessons: [
          { id: "G1T1L46", title: "Verb Patterns: Gerunds vs Infinitives", summary: "Perfecting grammar with verbs followed by -ing, to-infinitive, or base infinitive, and those that change meaning.", quickTask: "Identify meaning differences in: 'remember to do' vs 'remember doing' in Context.", tags: ["مشترك", "English", "Grammar"], keywords: ["Gerunds", "Infinitives", "Grammar"], slug: "g1-t1-english-u5-l1", order: 1, sourcePage: "p. 50-53" },
          { id: "G1T1L47", title: "Digital Security & Smart Communication", summary: "Essential expressions, cybersecurity terms, phishing protection, and ethical netiquette standards.", quickTask: "State 3 actions you must take if you receive a suspicious web link.", tags: ["مشترك", "English", "Vocabulary"], keywords: ["Cybersecurity", "Ethics", "Communication"], slug: "g1-t1-english-u5-l2", order: 2, sourcePage: "p. 54-57" }
        ]
      },
      {
        title: "Unit 6: Learning from Literature",
        unitId: "g1-t1-english-u6",
        order: 7,
        slug: "g1-t1-english-u6",
        lessons: [
          { id: "G1T1L48", title: "Relative Clauses & Pronouns", summary: "Mastering defining and non-defining clauses using who, whom, which, that, where, whose, when, and preposition placement.", quickTask: "Combine two separate sentences into one single sentence using a relative pronoun.", tags: ["مشترك", "English", "Grammar"], keywords: ["Relative Clauses", "Grammar"], slug: "g1-t1-english-u6-l1", order: 1, sourcePage: "p. 60-63" },
          { id: "G1T1L49", title: "Treasure Island Literature Analysis", summary: "Critical analysis of Robert Louis Stevenson's classic adventure (theme, character studies, moral loyalty).", quickTask: "Write a 3-sentence character review of Jim Hawkins' courage.", tags: ["مشترك", "English", "Literature"], keywords: ["Literature", "Stevenson", "Analysis"], slug: "g1-t1-english-u6-l2", order: 2, sourcePage: "p. 64-67" }
        ]
      },
      {
        title: "Review B (Review 2)",
        unitId: "g1-t1-english-r2",
        order: 8,
        slug: "g1-t1-english-r2",
        lessons: [
          { id: "G1T1L50", title: "Units 4-6 Comprehensive Synthesis", summary: "Grammar synthesis of gerund/infinitives, articles, and relative structures, plus academic reading review.", quickTask: "Draft a 120-word cohesive descriptive paragraph detailing an Eco-lodge vacation.", tags: ["مشترك", "English", "Grammar"], keywords: ["Review", "Synthesis", "Revision"], slug: "g1-t1-english-r2-l1", order: 1, sourcePage: "p. 70-73" }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "اللغة الأجنبية الثانية",
    icon: "FR",
    color: "#ec4899",
    slug: "g1-t1-second-lang",
    units: [
      {
        title: "الوحدة الأولى: أساسيات التواصل والأفعال",
        slug: "g1-t1-second-lang-u1",
        lessons: [
          { id: "G1T1L06", title: "أدوات المعرفة والنكرة والتأنيث", summary: "ترتيب الأسماء المذكرة والمؤنثة وصور الجمع والاستخدام في الحوارات البسيطة.", quickTask: "ضع الأداة المناسبة للكلمات المقترحة بالمؤنث والمذكر.", tags: ["مشترك", "اللغة الثانية", "القواعد"], slug: "g1-t1-second-lang-u1-l1", order: 1 },
          { id: "G1T1L21", title: "تقديم النفس ومصطلحات التعارف (Présentation)", summary: "كيف تقدم نفسك وتعرف عائلتك واهتماماتك الشخصية مستعملاً فعل S'appeler و Etre.", quickTask: "اكتب حواراً تعارفياً قصيراً من 4 أسطر مع صديق جديد بالفرنسية.", tags: ["مشترك", "اللغة الثانية", "محادثة"], slug: "g1-t1-second-lang-u1-l2", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "الرياضيات",
    icon: "∑",
    color: "#6366f1",
    slug: "g1-t1-math",
    units: [
      {
        title: "الوحدة الأولى: الجبر وحساب المثلثات",
        slug: "g1-t1-math-u1",
        lessons: [
          { id: "G1T1L07", title: "مقدمة عن الأعداد المركبة", summary: "تعريف العدد التخيلي (ت)، قوى ت المتتالية، وتبسيط المقادير الجبرية المعقدة والحلول في ك.", quickTask: "أوجد القيمة الحقيقية لكل من ت^43 وت^(-15).", tags: ["مشترك", "الرياضيات", "الجبر"], slug: "g1-t1-math-u1-l1", order: 1 },
          { id: "G1T1L22", title: "حل معادلات الدرجة الثانية وتحديد طبيعة الجذرين", summary: "استعمال المميز (ب^2 - 4أج) لتحديد الأعداد الحقيقية والمركبة والمستندات الجبرية لجذرين.", quickTask: "حدد طبيعة جذري المعادلة: 2س^2 - 5س + 4 = 0 بدون حلها.", tags: ["مشترك", "الرياضيات", "الجبر"], slug: "g1-t1-math-u1-l2", order: 2 },
          { id: "G1T1L23", title: "الزاوية الموجهة والقياس الدائري والستيني", summary: "التحويل بين التقدير الستيني والدائري، حساب طول قوس الدائرة ومفهوم الزوايا المتكافئة.", quickTask: "أوجد القياس الدائري لزاوية ستينية قياسها 120 درجة بدلالة ط (باي).", tags: ["مشترك", "الرياضيات", "مثلثات"], slug: "g1-t1-math-u1-l3", order: 3 }
        ]
      },
      {
        title: "الوحدة الثانية: الهندسة التشابهية والتناسب",
        slug: "g1-t1-math-u2",
        lessons: [
          { id: "G1T1L08", title: "تشابه المضلعات والمثلثات", summary: "شروط تشابه مضلعين، حالات تشابه المثلثات، واستنتاج النسب والأطوال المجهولة في الأشكال الهندسية.", quickTask: "برهن التشابه في مثلث قائم بعد رسم العمود المستنتج من الزاوية القائمة.", tags: ["مشترك", "الرياضيات", "الهندسة"], slug: "g1-t1-math-u2-l1", order: 1 },
          { id: "G1T1L24", title: "العلاقة بين مساحتي مضلعين متشابهين والتناسب", summary: "النسبة بين مساحتي مضلعين متشابهين تساوي مربع النسبة بين ضلعين متناظرين ونظريات التناسب بالدائرة.", quickTask: "إذا كانت النسبة بين محيطي مضلعين متشابهين 3:4 فاحسب مساحة الأكبر إذا كانت مساحة الأصغر 45 سم².", tags: ["مشترك", "الرياضيات", "الهندسة"], slug: "g1-t1-math-u2-l2", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "العلوم المتكاملة / العلوم",
    icon: "⚙",
    color: "#14b8a6",
    slug: "g1-t1-science",
    units: [
      {
        title: "الوحدة الأولى: كوكب الأرض والبيئة المتكاملة",
        slug: "g1-t1-science-u1",
        lessons: [
          { id: "G1T1L09", title: "الغلاف الجوي وتوازن المناخ الكوني", summary: "طبقات الغلاف الجوي، توازن نسب الغازات، وحركة الكتل الهوائية وتغيرات الضغط الجوي الكوني وعلاقتها بالتغير الحراري.", quickTask: "حدد الخصائص الديناميكية لطبقة التروپوسفير مقارنة بالميزوسفير.", tags: ["مشترك", "العلوم المتكاملة", "البيئة"], slug: "g1-t1-science-u1-l1", order: 1 },
          { id: "G1T1L25", title: "الموارد المائية وحمايتها من التلوث", summary: "فحص مصادر المياه العذبة والدورة الهيدرولوجية، والأثر السلبي للصرف الصناعي والأسمدة الكيمياوية وعلاجات التنقية الحديثة.", quickTask: "وضح بمقالة موجزة كيف تعمل محطات تحلية المياه بالطاقة الشمسية التوطينية.", tags: ["مشترك", "العلوم المتكاملة", "البيئة"], slug: "g1-t1-science-u1-l2", order: 2 },
          { id: "G1T1L26", title: "التربة السطحية ودور الكائنات الدقيقة", summary: "دراسة طبقات التربة وتأثير العوامل الجيولولجية والبيولوجية على خصوبتها وسلوك تحلل المواد الطبيعية.", quickTask: "ارسم رسماً تخطيطياً لطبقات التربة وصنف دور النيتروجين في زيادة النماء.", tags: ["مشترك", "العلوم المتكاملة", "التربة"], slug: "g1-t1-science-u1-l3", order: 3 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "التاريخ",
    icon: "⏳",
    color: "#92400e",
    slug: "g1-t1-history",
    units: [
      {
        title: "الوحدة الأولى: مدخل لدراسة التاريخ والحضارة",
        slug: "g1-t1-history-u1",
        lessons: [
          { id: "G1T1L10", title: "مفهوم الحضارة والتاريخ والعصور الكبرى", summary: "الفرق بين الحضارة الكونية وبنية التاريخ، وانقسام العصور التاريخية من القديمة للمعاصرة وأثر الحضارات الشرقية.", quickTask: "ارسم جدولاً زمنياً يربط اختراع الكتابة ببداية العصور القديمة والأمجاد الأولى.", tags: ["مشترك", "التاريخ", "الحضارة"], slug: "g1-t1-history-u1-l1", order: 1 },
          { id: "G1T1L27", title: "مصادر دراسة الحضارات (الأولية والثانوية)", summary: "التمييز الدقيق بين البرديات، النقوش والأساطير، وصور المراجع والكتب التاريخية وسيكولوجية النقد التاريخي.", quickTask: "برهن أهمية (حجر باليرمو) كمصدر أولي تاريخي للأسرة الفرعونية الأولى.", tags: ["مشترك", "التاريخ", "المصادر"], slug: "g1-t1-history-u1-l2", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "الجغرافيا",
    icon: "🌍",
    color: "#0ea5e9",
    slug: "g1-t1-geography",
    units: [
      {
        title: "الوحدة الأولى: أدوات الجغرافيا والخرائط",
        slug: "g1-t1-geography-u1",
        lessons: [
          { id: "G1T1L11", title: "مبادئ الجغرافيا ونظام الخرائط والـ GPS", summary: "مفهوم الجغرافية الطبيعية والبشرية، أساسيات رسم الخريطة، والتطبيقات الحديثة لنظم الاستشعار عن بعد ونظام العالمي للتموضع.", quickTask: "حدد 5 عوامل أساسية تمثل شبكة الإحداثيات على الخريطة.", tags: ["مشترك", "الجغرافيا", "أدوات"], slug: "g1-t1-geography-u1-l1", order: 1 },
          { id: "G1T1L28", title: "موقع مصر العبقري وأهميته الجغرافية والتاريخية", summary: "تحليل الحدود السياسية لمصر (البحرية والبرية) وموقعها بين قارات العالم الثلاث ودور قناة السويس في نماء التجارة الكونية.", quickTask: "وضح كيف ساهم موقع مصر في اتصالها حضارياً بإفريقيا وآسيا.", tags: ["مشترك", "الجغرافيا", "موقع مصر"], slug: "g1-t1-geography-u1-l2", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "الفلسفة والمنطق",
    icon: "☯",
    color: "#8b5cf6",
    slug: "g1-t1-philosophy",
    units: [
      {
        title: "الوحدة الأولى: مبادئ التفكير الفلسفي",
        slug: "g1-t1-philosophy-u1",
        lessons: [
          { id: "G1T1L12", title: "مفهوم التفكير وأهميته وخصائصه المنهجية", summary: "كيف يفكر الإنسان، خصائص التفكير الإبداعي، والنقدي، والخرافي، وأساليب الإقناع والمنهج.", quickTask: "قارن بمثال واقعي بين الأسلوب الديني والأسلوب العلمي في تفسير ظاهرة المطر.", tags: ["مشترك", "الفلسفة", "التفكير"], slug: "g1-t1-philosophy-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "الالكترونيات والكمبيوتر مهارات",
    icon: "AI",
    color: "#2563eb",
    slug: "g1-t1-com-it",
    units: [
      {
        title: "الوحدة الأولى: البنى التكنولوجية والسحابية",
        slug: "g1-t1-com-it-u1",
        lessons: [
          { id: "G1T1L15", title: "أنظمة التشغيل ومفاهيم الحوسبة السحابية", summary: "مفهوم السحابة الرقمية، جوجل درايف ونظم تخزين البيانات والوصول الآمن لحمايه المعلومات الشخصية.", quickTask: "صنف ثلاث خدمات أساسية للمكتبات السحابية المشتركة.", tags: ["مشترك", "الكمبيوتر", "سحابة"], slug: "g1-t1-com-it-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "التربية الدينية",
    icon: "☪",
    color: "#10b981",
    slug: "g1-t1-religion",
    units: [
      {
        title: "الوحدة الأولى: عقيدتنا وسلوكنا الأكاديمي والمدني",
        slug: "g1-t1-religion-u1",
        lessons: [
          { id: "G1T1L13", title: "الإيمان بالله وعمارة الكون والحضارة", summary: "مفهوم الاستخلاف في الأرض والتكامل البيئي وسماحة الأديان السماوية المطروحة غاية ونتاجاً.", quickTask: "اكتب تلخيصاً لمفهوم الأمانة العلمية والعملية في الإسلام.", tags: ["مشترك", "التربية الدينية", "سلوك"], slug: "g1-t1-religion-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-1",
    track: "مشترك",
    title: "التربية الوطنية",
    icon: "✍",
    color: "#ef4444",
    slug: "g1-t1-national-ed",
    units: [
      {
        title: "الوحدة الأولى: الوطن والمواطنة الصالحة",
        slug: "g1-t1-national-ed-u1",
        lessons: [
          { id: "G1T1L14", title: "الدستور وأسس القانون العام والمصري", summary: "كيف تأسست القوانين، أنواع الدساتير، ودور المحكمة الدستورية العليا في حفظ حقوق المواطنين ونهضتهم الديمقراطية.", quickTask: "وضح بمذكرة موجزة الفروق الجوهرية بين القاعدة القانونية والعرف السوسيولوجي.", tags: ["مشترك", "التربية الوطنية", "قانون"], slug: "g1-t1-national-ed-u1-l1", order: 1 }
        ]
      }
    ]
  },

  // ==========================================
  // 2- الصف الأول الثانوي - الترم الثاني
  // ==========================================
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "اللغة العربية",
    icon: "ع",
    color: "#f59e0b",
    slug: "g1-t2-arabic",
    units: [
      {
        title: "الوحدة الأولى: البلاغة والأدب والنحو للترم الثاني",
        slug: "g1-t2-arabic-u1",
        lessons: [
          { id: "G1T2L01", title: "الكناية والمجاز المرسل البلاغي", summary: "فهم الكناية عن صفة، موصوف، ونسبة، وسر جمال التعبير وكثافة الدلالة وقواعد العلاقات البلاغية.", quickTask: "أعرب البلاغة المستخرجة من الآية الكريمة المحددة.", tags: ["مشترك", "اللغة العربية", "البلاغة"], slug: "g1-t2-arabic-u1-l1", order: 1 },
          { id: "G1T2L02", title: "الأدب في عصر صدر الإسلام", summary: "تغير سمات الأدب العربي بالدعوة والبيان النبوي الشريف والقرآن الكريم ونهضة الخطابة الفعالة.", quickTask: "برهن تأثير القرآن على لغة وأوزان قصائد شعراء الرسول.", tags: ["مشترك", "اللغة العربية", "الأدب"], slug: "g1-t2-arabic-u1-l2", order: 2 },
          { id: "G1T2L03", title: "عمل اسم الفاعل وعارضه الإعرابي", summary: "ضوابط عمل المشتقات وصور تفعيل اسم الفاعل مع رفع الفاعل ونصب مفعوله به في الجمل المباشرة والمحاكة.", quickTask: "ضع فاعلاً لاسم الفاعل العامل في الجملة التفاعلية المرفقة مع الضبط.", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "g1-t2-arabic-u1-l3", order: 3 }
        ]
      },
      {
        title: "الوحدة الثانية: النحو الأدبي وصيغ المبالغة",
        slug: "g1-t2-arabic-u2",
        lessons: [
          { id: "G1T2L14", title: "صيغ المبالغة وعملها واستنتاج دلالاتها", summary: "أوزان صيغ المبالغة الخمسة القياسية (فعال، مفعال، فعول، فعيل، فَعِل) وشروط عملها عمل فعل بذكاء.", quickTask: "استخرج صيغ المبالغة في النص واكشف عن عملها دقة ونقداً.", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "g1-t2-arabic-u2-l1", order: 1 },
          { id: "G1T2L15", title: "اسم المفعول وصوره وعمله النحوي", summary: "طريقة صياغة اسم المفعول من الثلاثي وغير الثلاثي وإعراب نائب الفاعل المرفوع بعده.", quickTask: "بين المشتق العامل وأعرب ما بعده في الجملة: (أمقبول رأي الكسول؟).", tags: ["مشترك", "اللغة العربية", "النحو"], slug: "g1-t2-arabic-u2-l2", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "اللغة الإنجليزية",
    icon: "EN",
    color: "#22c55e",
    slug: "g1-t2-english",
    units: [
      {
        title: "Unit 1: Active Structures & Writing",
        slug: "g1-t2-english-u1",
        lessons: [
          { id: "G1T2L04", title: "Modal Verbs: Permission & Ability", summary: "Correct application of Can, Could, May, and Might with contextual limitations and formal constraints.", quickTask: "Rewrite a polite request scenario using modal alternatives perfectly.", tags: ["مشترك", "English", "Grammar"], slug: "g1-t2-english-u1-l1", order: 1 },
          { id: "G1T2L16", title: "Adjectives & Comparisons in Context", summary: "Deep-dive into regular and irregular adjectives, comparing modern cities and environmental factors.", quickTask: "Write 3 comparative sentences outlining green technology vs traditional energies.", tags: ["مشترك", "English", "Grammar"], slug: "g1-t2-english-u1-l2", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "Language 2/اللغة الثانية",
    icon: "FR",
    color: "#ec4899",
    slug: "g1-t2-second-lang",
    units: [
      {
        title: "الوحدة الثانية: الحياة والمجتمع والتسوق",
        slug: "g1-t2-second-lang-u1",
        lessons: [
          { id: "G1T2L09", title: "الملابس وتعبيرات طلب المقاس والمأكولات", summary: "تعليم الأوصاف، الألوان، المقاسات، وصياغة الطلب المهذب في بيئات المتاجر المصرية والأجنبية بكفاءة.", quickTask: "صغ حوارًا بسيطًا تطلب فيه مقاساً مختلفاً لأحد الملابس باللغة الثانية.", tags: ["مشترك", "المحادثة", "اللغة الثانية"], slug: "g1-t2-second-lang-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "الرياضيات",
    icon: "∑",
    color: "#6366f1",
    slug: "g1-t2-math",
    units: [
      {
        title: "الوحدة الأولى: المصفوفات وتطبيقاتها الهندسية والتناسبية",
        slug: "g1-t2-math-u1",
        lessons: [
          { id: "G1T2L05", title: "المصفوفات والعمليات الأساسية عليها", summary: "جمع وطرح المصفوفات وضربها، رتبة المصفوفة والتماثل النمطي في العمليات لتسهيل البيانات المعقدة.", quickTask: "أوجد ناتج ضرب مصفوفتين من الرتبة (2x3) و (3x2).", tags: ["مشترك", "الرياضيات", "جبر"], slug: "g1-t2-math-u1-l1", order: 1 },
          { id: "G1T2L17", title: "المحددات وحل المعادلات الرياضية بطريقة كرامر", summary: "فهم المحددات الثنائية والثلاثية، حساب قيمة الرتب، واستخدام طريقة كرامر لحل نظم المعادلات المجهولة.", quickTask: "استخدم كرامر لحل النظام: 2س - ص = 5، س + 3ص = 6.", tags: ["مشترك", "الرياضيات", "جبر"], slug: "g1-t2-math-u1-l2", order: 2 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "العلوم المتكاملة / العلوم",
    icon: "⚙",
    color: "#14b8a6",
    slug: "g1-t2-science",
    subjectId: "g1-t2-science",
    trackId: "مشترك",
    sourceStatus: "مؤكد من كتاب الوزارة",
    sourceUrl: "https://studentbooks.moe.gov.eg/",
    units: [
      {
        title: "الوحدة الأولى: كيمياء التربة والتلوث البيئي",
        unitId: "g1-t2-science-u1",
        order: 1,
        slug: "g1-t2-science-u1",
        lessons: [
          { id: "G1T2L06", title: "مقاومة الآفات والمبيدات في الزراعة المستدامة", summary: "التأثير البيئي السلبي للأسمدة الكيماوية والمبيدات العشوائية وبناء بدائل عضوية مستدامة للأراضي الخضراء.", quickTask: "قارن مع المحاكاة بين المكافحة البيولوجية والكيميائية للآفات وحماية الحقل المصري.", tags: ["مشترك", "العلوم المتكاملة", "تربة"], keywords: ["كيمياء التربة", "المبيدات", "الزراعة المستدامة"], slug: "g1-t2-science-u1-l1", order: 1, sourcePage: "p. 82-87" }
        ]
      },
      {
        title: "الوحدة الثالثة: الطاقة والأنظمة البيئية",
        unitId: "g1-t2-science-u3",
        order: 3,
        slug: "g1-t2-science-u3",
        lessons: [
          { id: "G1T2L21", title: "مصادر الطاقة البديلة والمستدامة", summary: "التفاصيل العلمية والمقارنة الديناميكية بين الطاقة الشمسية، الرياح، والمياه وكفاءة ومميزات الخلايا الكهروضوئية التوطينية بمصر.", quickTask: "احسب كفاءة لوح شمسي ينتج 300 وات من أشعة شمسية بقدرة 1000 وات/م².", tags: ["مشترك", "العلوم المتكاملة", "الطاقة"], keywords: ["الطاقة البديلة", "الخلايا الشمسية", "توطين التكنولوجيا"], slug: "g1-t2-science-u3-l1", order: 1, sourcePage: "p. 112-118" },
          { id: "G1T2L22", title: "تدفق الطاقة في السلاسل والشبكات الغذائية", summary: "فهم انتقال الطاقة الكيميائية الكونية بين المنتجات والمستهلكات والمحللات ونسبة الفقد البالغة 90% في كل مستوى غذائي.", quickTask: "ارسم هرماً لطاقة نظام بيئي صحراوي يوضح انتقال السعرات الحرارية من العشب للثعبان.", tags: ["مشترك", "العلوم المتكاملة", "البيئة"], keywords: ["سلسلة الغذاء", "هرم الطاقة", "الديناميكا البيئية"], slug: "g1-t2-science-u3-l2", order: 2, sourcePage: "p. 119-125" }
        ]
      },
      {
        title: "الوحدة الرابعة: التكنولوجيا الحيوية وصحة الكوكب",
        unitId: "g1-t2-science-u4",
        order: 4,
        slug: "g1-t2-science-u4",
        lessons: [
          { id: "G1T2L23", title: "مبادئ الهندسة الوراثية وتطبيقاتها الخضراء", summary: "مفاهيم التعديل الجيني للنباتات لزيادة مقاومة الجفاف الجوي والملوحة الأرضية واستخدام بكتيريا تثبيت النيتروجين كبديل عضوي.", quickTask: "لخص في ورقة موجزة ميزات وعيوب استخدام المحاصيل المعدلة جينياً في حوض النيل.", tags: ["مشترك", "العلوم المتكاملة", "التكنولوجيا الحيوية"], keywords: ["هندسة وراثية", "جينات النباتات", "التسميد الحيوي"], slug: "g1-t2-science-u4-l1", order: 1, sourcePage: "p. 142-149" },
          { id: "G1T2L24", title: "الابتكارات المستدامة لمعالجة التغير المناخي", summary: "رصد تقنيات احتجاز وتخزين الكربون، المباني الخضراء صفرية الانبعاثات، والوقود الحيوي المستخرج من الطحالب لإصلاح حرارة غلاف الأرض.", quickTask: "اقترح فكرة مشروع بيئي مبتكر لمعالجة تلوث الهواء والتبريد الخارجي بالمدن المصرية الجديدة.", tags: ["مشترك", "العلوم المتكاملة", "تنمية مستدامة"], keywords: ["الاحتباس الحراري", "احتجاز الكربون", "طحالب الطاقة"], slug: "g1-t2-science-u4-l2", order: 2, sourcePage: "p. 150-158" }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "التاريخ",
    icon: "⏳",
    color: "#92400e",
    slug: "g1-t2-history",
    units: [
      {
        title: "الوحدة الأولى: حضارة اليونان والرومان وتأثيرها",
        slug: "g1-t2-history-u1",
        lessons: [
          { id: "G1T2L07", title: "الحضارات الإغريقية وامتدادها الكوني والفلسفي", summary: "تحليل تاريخ أثينا وإسبرطة، الفكر والأدب، الفلسفة اليونانية والصلات والتبادلات مع مصر وحماية المتوسط.", quickTask: "قارن بمقال من فقرتين بين التنظيم العسكري لإسبارطة والديمقراطي لأثينا وأسسه الفقهية.", tags: ["مشترك", "التاريخ", "الحضارة"], slug: "g1-t2-history-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "الجغرافيا",
    icon: "🌍",
    color: "#0ea5e9",
    slug: "g1-t2-geography",
    units: [
      {
        title: "الوحدة الأولى: مناخ القارة وتضاريسها السكانية في مصر",
        slug: "g1-t2-geography-u1",
        lessons: [
          { id: "G1T2L08", title: "المناخ المصري والأقاليم التضاريسية وسلوك الرياح", summary: "العوامل المؤثرة على مناخ مصر، تضاريس الدلتا والوادي والصحراء الغربية والشرقية وهضبة سيناء.", quickTask: "حدد الملامح الجيومورفولوجية المميزة لمنخفض القطارة المباشر وعلاقة الطقس بالتوزيع السكاني.", tags: ["مشترك", "الجغرافيا", "مناخ"], slug: "g1-t2-geography-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "الفلسفة والمنطق",
    icon: "☯",
    color: "#8b5cf6",
    slug: "g1-t2-philosophy",
    units: [
      {
        title: "الوحدة الأولى: الفكر والمنهج الاستدلالي الكوني",
        slug: "g1-t2-philosophy-u1",
        lessons: [
          { id: "G1T2L10", title: "الفلسفة والضمير الأخلاقي والمجتمع والنهضة", summary: "كيف تحفظ الفلسفة الضمير والقيم والسلوك الاجتماعي وتحارب صور الأساطير والتقاليد المهملة بالدولة العصرية.", quickTask: "لخص في ورقة فكرية دور الضمير الفردي في مواجهة المشكلات البيئية والصناعية.", tags: ["مشترك", "الفلسفة", "الضمير"], slug: "g1-t2-philosophy-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "الكمبيوتر تكنولوجيا المعلومات",
    icon: "AI",
    color: "#2563eb",
    slug: "g1-t2-com-it",
    units: [
      {
        title: "الوحدة الثانية: برمجة الويب بلغات الكود والأكواد الملتوية",
        slug: "g1-t2-com-it-u1",
        lessons: [
          { id: "G1T2L13", title: "مبادئ البرمجة وتصميم الويب بلغة HTML الميسرة", summary: "تصميم موقع شخصي، الهيكل الإنشائي والوسوم الأساسية لصفحات الويب والتحكم في المحتوى الهيدروليكي.", quickTask: "اكتب كود HTML كامل يحتوي على عنوان وفقرة وجدول لمواد الامتحان.", tags: ["مشترك", "البرمجة", "HTML"], slug: "g1-t2-com-it-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "التربية الدينية",
    icon: "☪",
    color: "#10b981",
    slug: "g1-t2-religion",
    units: [
      {
        title: "الوحدة الثانية: السيرة والقيم التاريخية للأخلاق والعمل",
        slug: "g1-t2-religion-u1",
        lessons: [
          { id: "G1T2L11", title: "دروس من سيرة الأنبياء والصالحين وحفظ السنّة", summary: "مفاهيم الصبر والعزم والعمل الصالح وبناء الفرد والمجتمع والتربية الشاملة المعتدلة الخالية من التطرف.", quickTask: "اكتب أهم فكرتين تطبيقتين من قصة نبي الله يوسف عليه السلام.", tags: ["مشترك", "التربية الدينية", "سلوك"], slug: "g1-t2-religion-u1-l1", order: 1 }
        ]
      }
    ]
  },
  {
    gradeId: "grade-1",
    termId: "term-2",
    track: "مشترك",
    title: "التربية الوطنية",
    icon: "✍",
    color: "#ef4444",
    slug: "g1-t2-national-ed",
    units: [
      {
        title: "الوحدة الثانية: العدالة الاجتماعية والمواطنة وتحديات العصر",
        slug: "g1-t2-national-ed-u1",
        lessons: [
          { id: "G1T2L12", title: "الهوية الوطنية المصرية وتحديات العولمة الرقمية", summary: "الملامح والحقب التاريخية المكونة للهوية المصرية وتأثير التبادل الثقافي في العصر الرقمي الحديث.", quickTask: "لخص ركائز الهوية الوطنية لمصر عبر مراحلها التاريخية السبع.", tags: ["مشترك", "التربية الوطنية", "هوية"], slug: "g1-t2-national-ed-u1-l1", order: 1 }
        ]
      }
    ]
  }
];
