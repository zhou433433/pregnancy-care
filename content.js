// All text shown in the app, in English and Urdu.
// Medical content follows two WHO documents:
//   [ANC]   WHO recommendations on antenatal care for a positive pregnancy experience (2016)
//   [PCPNC] WHO Pregnancy, childbirth, postpartum and newborn care: a guide for essential practice
// The Urdu text is a first draft and has not been reviewed by an Urdu speaker yet.
// The medical text has not been reviewed by a physician yet.

window.CONTENT = {
  ui: {
    app_name: { en: 'Pregnancy Care', ur: 'حمل کی دیکھ بھال' },
    choose_language: { en: 'Choose your language', ur: 'اپنی زبان منتخب کریں' },
    next: { en: 'Next', ur: 'آگے' },
    start: { en: 'Start', ur: 'شروع کریں' },
    back: { en: 'Back', ur: 'واپس' },
    how_far: { en: 'How many months pregnant are you?', ur: 'آپ کو کتنے مہینے کا حمل ہے؟' },
    know_month: { en: 'I know the month', ur: 'مجھے مہینہ معلوم ہے' },
    know_date: { en: 'I know the date of my last period', ur: 'مجھے آخری ماہواری کی تاریخ معلوم ہے' },
    last_period: { en: 'First day of your last period', ur: 'آخری ماہواری کا پہلا دن' },
    not_sure: { en: 'Not sure? Pick the closest month. You can change it later.', ur: 'یقین نہیں؟ قریب ترین مہینہ منتخب کریں۔ آپ اسے بعد میں بدل سکتی ہیں۔' },
    privacy: { en: 'No account needed. Your information stays on this phone only.', ur: 'اکاؤنٹ کی ضرورت نہیں۔ آپ کی معلومات صرف اسی فون میں رہتی ہیں۔' },
    month_n: { en: 'Month {n}', ur: '{o} مہینہ' },
    month_word: { en: 'month', ur: '{o} مہینہ' },
    show_all: { en: 'Show all {n}', ur: 'تمام {n} دکھائیں' },
    week_n: { en: 'Week {n}', ur: 'ہفتہ {n}' },
    due_about: { en: 'Baby due around {date}', ur: 'پیدائش کی متوقع تاریخ: {date}' },
    past_due: { en: 'Your due date has passed. Please see a health worker now.', ur: 'آپ کی متوقع تاریخ گزر چکی ہے۔ ابھی ہیلتھ ورکر سے ملیں۔' },

    tab_home: { en: 'Home', ur: 'ہوم' },
    tab_danger: { en: 'Danger signs', ur: 'خطرے کی علامات' },
    tab_visits: { en: 'Check-ups', ur: 'چیک اپ' },
    tab_care: { en: 'Nearby care', ur: 'قریبی ہسپتال' },

    next_visit: { en: 'Next check-up', ur: 'اگلا چیک اپ' },
    see_all: { en: 'See all check-ups', ur: 'تمام چیک اپ دیکھیں' },
    in_days: { en: 'in {n} days', ur: '{n} دن بعد' },
    tomorrow: { en: 'tomorrow', ur: 'کل' },
    today: { en: 'today', ur: 'آج' },
    days_ago: { en: '{n} days ago', ur: '{n} دن پہلے' },
    all_done: { en: 'All check-ups are marked done.', ur: 'تمام چیک اپ مکمل ہو چکے ہیں۔' },
    go_checkup_now: { en: 'Go for a check-up as soon as you can.', ur: 'جتنی جلدی ہو سکے چیک اپ کے لیے جائیں۔' },
    happening: { en: 'What is happening', ur: 'کیا ہو رہا ہے' },
    do_now: { en: 'What to do now', ur: 'ابھی کیا کریں' },
    danger_cta: { en: 'Danger signs', ur: 'خطرے کی علامات' },
    danger_cta_sub: { en: 'Know when to go to a hospital', ur: 'جانیں کہ ہسپتال کب جانا ہے' },
    care_cta: { en: 'Nearby hospitals and clinics', ur: 'قریبی ہسپتال اور کلینک' },
    care_cta_sub: { en: 'Works without internet', ur: 'انٹرنیٹ کے بغیر بھی چلتا ہے' },
    disclaimer: { en: 'This app gives general information. It does not replace a doctor or a Lady Health Worker.', ur: 'یہ ایپ عام معلومات دیتی ہے۔ یہ ڈاکٹر یا لیڈی ہیلتھ ورکر کا متبادل نہیں ہے۔' },
    prototype: { en: 'Prototype. The content has not been reviewed by a doctor yet.', ur: 'یہ ابتدائی نمونہ ہے۔ مواد کا ابھی ڈاکٹر نے جائزہ نہیں لیا۔' },

    danger_title: { en: 'Danger signs', ur: 'خطرے کی علامات' },
    danger_intro: { en: 'If you have any of these signs, do not wait. Tap a sign to see what to do.', ur: 'اگر ان میں سے کوئی علامت ہو تو انتظار نہ کریں۔ علامت کو دبائیں اور دیکھیں کہ کیا کرنا ہے۔' },
    level_now: { en: 'Go now', ur: 'فوراً جائیں' },
    level_soon: { en: 'Go soon', ur: 'جلد جائیں' },
    act_now: { en: 'Go to a hospital now, day or night. Do not wait.', ur: 'ابھی ہسپتال جائیں، دن ہو یا رات۔ انتظار نہ کریں۔' },
    act_soon: { en: 'Go to a health centre as soon as possible.', ur: 'جتنی جلدی ہو سکے مرکزِ صحت جائیں۔' },
    tell_family: { en: 'Tell someone at home and take your health card with you.', ur: 'گھر میں کسی کو بتائیں اور اپنا ہیلتھ کارڈ ساتھ لے جائیں۔' },
    find_care: { en: 'Find a hospital nearby', ur: 'قریبی ہسپتال دیکھیں' },
    call_ambulance: { en: 'Call ambulance', ur: 'ایمبولینس بلائیں' },
    all_signs: { en: 'All danger signs', ur: 'تمام علامات' },

    visits_title: { en: 'Your check-ups', ur: 'آپ کے چیک اپ' },
    visits_intro: { en: 'The World Health Organization recommends 8 check-ups in pregnancy. At each one the health worker checks you and your baby.', ur: 'عالمی ادارۂ صحت حمل کے دوران 8 چیک اپ کی سفارش کرتا ہے۔ ہر چیک اپ میں ہیلتھ ورکر آپ کا اور بچے کا معائنہ کرتی ہے۔' },
    visit_n: { en: 'Check-up {n}', ur: 'چیک اپ {n}' },
    before_week: { en: 'Before week {n}', ur: 'ہفتہ {n} سے پہلے' },
    around_week: { en: 'Around week {n}', ur: 'ہفتہ {n} کے قریب' },
    st_done: { en: 'Done', ur: 'ہو گیا' },
    st_missed: { en: 'Missed', ur: 'رہ گیا' },
    st_next: { en: 'Next', ur: 'اگلا' },
    mark_done: { en: 'I went', ur: 'میں گئی تھی' },
    undo: { en: 'Undo', ur: 'واپس کریں' },
    my_appt: { en: 'My appointment', ur: 'میری اپائنٹمنٹ' },
    set_appt: { en: 'Date and time the clinic gave you', ur: 'کلینک کی دی ہوئی تاریخ اور وقت' },
    save: { en: 'Save', ur: 'محفوظ کریں' },
    saved: { en: 'Saved. You will see it on the home screen.', ur: 'محفوظ ہو گیا۔ یہ ہوم اسکرین پر نظر آئے گا۔' },
    add_calendar: { en: 'Add reminder to phone calendar', ur: 'فون کے کیلنڈر میں یاد دہانی لگائیں' },
    calendar_title: { en: 'Check-up', ur: 'چیک اپ' },
    remove: { en: 'Remove', ur: 'ہٹائیں' },

    care_title: { en: 'Nearby hospitals and clinics', ur: 'قریبی ہسپتال اور کلینک' },
    emergency: { en: 'Ambulance', ur: 'ایمبولینس' },
    use_location: { en: 'Use my location', ur: 'میرا مقام استعمال کریں' },
    locating: { en: 'Finding your location…', ur: 'آپ کا مقام تلاش ہو رہا ہے…' },
    loc_demo: { en: 'Distances are from Gulshan-e-Hadeed, Bin Qasim Town (sample location).', ur: 'فاصلے گلشنِ حدید، بن قاسم ٹاؤن سے ہیں (نمونہ مقام)۔' },
    loc_mine: { en: 'Distances are from your location.', ur: 'فاصلے آپ کے مقام سے ہیں۔' },
    loc_far: { en: 'You are far from Karachi, so the sample location is used.', ur: 'آپ کراچی سے دور ہیں، اس لیے نمونہ مقام استعمال ہو رہا ہے۔' },
    loc_denied: { en: 'Location is off. The sample location is used.', ur: 'لوکیشن بند ہے۔ نمونہ مقام استعمال ہو رہا ہے۔' },
    f_all: { en: 'All', ur: 'سب' },
    f_hospital: { en: 'Hospitals', ur: 'ہسپتال' },
    f_clinic: { en: 'Clinics', ur: 'کلینک' },
    f_maternity: { en: 'Maternity', ur: 'زچہ خانہ' },
    kind_hospital: { en: 'Hospital', ur: 'ہسپتال' },
    kind_clinic: { en: 'Clinic', ur: 'کلینک' },
    km: { en: '{n} km', ur: '{n} کلومیٹر' },
    call: { en: 'Call', ur: 'کال کریں' },
    directions: { en: 'Directions', ur: 'راستہ' },
    no_phone: { en: 'No phone number listed', ur: 'فون نمبر درج نہیں' },
    care_source: { en: 'List from OpenStreetMap ({date}). Not yet checked by our team. Call before you go if you can.', ur: 'فہرست اوپن اسٹریٹ میپ سے لی گئی ہے ({date})۔ ابھی ہماری ٹیم نے تصدیق نہیں کی۔ ممکن ہو تو جانے سے پہلے کال کر لیں۔' },
    offline: { en: 'No internet. The app still works.', ur: 'انٹرنیٹ نہیں ہے۔ ایپ پھر بھی کام کرتی ہے۔' },

    settings: { en: 'Settings', ur: 'ترتیبات' },
    language: { en: 'Language', ur: 'زبان' },
    change_month: { en: 'Change my pregnancy month', ur: 'حمل کا مہینہ تبدیل کریں' },
    delete_data: { en: 'Delete my information', ur: 'میری معلومات مٹا دیں' },
    delete_confirm: { en: 'Delete everything saved on this phone?', ur: 'کیا اس فون میں محفوظ تمام معلومات مٹا دی جائیں؟' },
    yes_delete: { en: 'Yes, delete', ur: 'ہاں، مٹا دیں' },
    cancel: { en: 'No, keep it', ur: 'نہیں، رہنے دیں' },
    about: { en: 'About', ur: 'ایپ کے بارے میں' },
    about_text: { en: 'Class project prototype, INFO 4505, Cornell University. Health information follows World Health Organization guidance.', ur: 'یہ کورنیل یونیورسٹی کے کورس INFO 4505 کا ابتدائی نمونہ ہے۔ صحت کی معلومات عالمی ادارۂ صحت کی ہدایات کے مطابق ہیں۔' }
  },

  ordinalsUr: ['پہلا', 'دوسرا', 'تیسرا', 'چوتھا', 'پانچواں', 'چھٹا', 'ساتواں', 'آٹھواں', 'نواں'],

  stages: {
    1: {
      en: 'Your baby is just starting to grow. You may feel tired or sick in the morning. This is common.',
      ur: 'آپ کا بچہ ابھی بننا شروع ہوا ہے۔ آپ کو تھکن یا صبح کے وقت متلی ہو سکتی ہے۔ یہ عام بات ہے۔'
    },
    2: {
      en: 'Your baby is growing fast. You may start to feel the baby move.',
      ur: 'آپ کا بچہ تیزی سے بڑھ رہا ہے۔ آپ کو بچے کی حرکت محسوس ہونا شروع ہو سکتی ہے۔'
    },
    3: {
      en: 'Your baby is getting ready to be born. Check-ups come more often now.',
      ur: 'آپ کا بچہ پیدائش کے لیے تیار ہو رہا ہے۔ اب چیک اپ زیادہ بار ہوں گے۔'
    }
  },

  // from/to are completed weeks of pregnancy. Lower "order" is shown first.
  tips: [
    { id: 'first_visit', from: 0, to: 12, order: 1, icon: 'calendar', src: 'ANC',
      en: 'Go for your first check-up before the end of month 3.',
      ur: 'تیسرا مہینہ ختم ہونے سے پہلے پہلا چیک اپ کروائیں۔' },
    { id: 'movement', from: 28, to: 45, order: 1, icon: 'heart', src: 'ANC',
      en: 'Notice your baby\'s movements every day. If the baby moves less than usual, go for a check-up.',
      ur: 'روزانہ بچے کی حرکت پر دھیان دیں۔ اگر بچہ معمول سے کم حرکت کرے تو چیک اپ کے لیے جائیں۔' },
    { id: 'birth_plan', from: 28, to: 45, order: 2, icon: 'bag', src: 'PCPNC',
      en: 'Plan for the birth: choose the hospital, save money, arrange transport, and decide who will go with you.',
      ur: 'پیدائش کی تیاری کریں: ہسپتال چنیں، پیسے بچائیں، سواری کا انتظام کریں، اور طے کریں کہ آپ کے ساتھ کون جائے گا۔' },
    { id: 'labour', from: 32, to: 45, order: 3, icon: 'clock', src: 'PCPNC',
      en: 'Go to the hospital when pains come every 20 minutes or less, when your water breaks, or when you see bloody sticky discharge.',
      ur: 'ہسپتال جائیں جب درد ہر 20 منٹ یا اس سے کم وقفے سے آئے، پانی کی تھیلی پھٹ جائے، یا خون ملا چپچپا مواد آئے۔' },
    { id: 'iron', from: 0, to: 45, order: 4, icon: 'pill', src: 'ANC',
      en: 'Take your iron and folic acid tablet every day.',
      ur: 'آئرن اور فولک ایسڈ کی گولی روزانہ لیں۔' },
    { id: 'tetanus', from: 0, to: 36, order: 5, icon: 'syringe', src: 'ANC',
      en: 'Ask the health worker about the tetanus injection.',
      ur: 'ہیلتھ ورکر سے تشنج (ٹیٹنس) کے ٹیکے کے بارے میں پوچھیں۔' },
    { id: 'scan', from: 0, to: 23, order: 6, icon: 'scan', src: 'ANC',
      en: 'Ask for one ultrasound scan in the first 5 months.',
      ur: 'پہلے 5 مہینوں میں ایک الٹراساؤنڈ کروانے کا پوچھیں۔' },
    { id: 'food', from: 0, to: 45, order: 7, icon: 'food', src: 'PCPNC',
      en: 'Eat more, and eat different foods: lentils, vegetables, eggs, milk, fruit.',
      ur: 'زیادہ کھائیں اور مختلف غذائیں کھائیں: دال، سبزی، انڈا، دودھ، پھل۔' },
    { id: 'rest', from: 14, to: 45, order: 8, icon: 'rest', src: 'PCPNC',
      en: 'Rest when you can. Do not lift heavy things.',
      ur: 'جب موقع ملے آرام کریں۔ بھاری چیزیں نہ اٹھائیں۔' },
    { id: 'medicine', from: 0, to: 45, order: 9, icon: 'nomed', src: 'PCPNC',
      en: 'Do not take any medicine unless a health worker gave it to you.',
      ur: 'کوئی دوا نہ لیں جب تک ہیلتھ ورکر نے نہ دی ہو۔' },
    { id: 'smoke', from: 0, to: 45, order: 10, icon: 'nosmoke', src: 'ANC',
      en: 'Stay away from tobacco smoke.',
      ur: 'تمباکو کے دھوئیں سے دور رہیں۔' }
  ],
  tipsShown: 5,

  // level "now": go immediately. level "soon": go as soon as possible. [PCPNC C15]
  // "movement" comes from a remark in [ANC] on reporting reduced fetal movements.
  danger: [
    { id: 'bleeding', level: 'now', src: 'PCPNC',
      title: { en: 'Bleeding', ur: 'خون آنا' },
      text: { en: 'Any bleeding from the vagina during pregnancy.', ur: 'حمل کے دوران نیچے سے خون آنا۔' } },
    { id: 'fits', level: 'now', src: 'PCPNC',
      title: { en: 'Fits', ur: 'دورے پڑنا' },
      text: { en: 'The body shakes and you cannot control it.', ur: 'جسم کو جھٹکے لگیں جو قابو میں نہ آئیں۔' } },
    { id: 'headache', level: 'now', src: 'PCPNC',
      title: { en: 'Bad headache, blurred vision', ur: 'شدید سر درد، دھندلا نظر آنا' },
      text: { en: 'A very bad headache, and things look blurry.', ur: 'سر میں بہت تیز درد ہو اور چیزیں دھندلی نظر آئیں۔' } },
    { id: 'fever', level: 'now', src: 'PCPNC',
      title: { en: 'Fever and very weak', ur: 'بخار اور شدید کمزوری' },
      text: { en: 'Fever, and too weak to get out of bed.', ur: 'بخار ہو اور اتنی کمزوری ہو کہ بستر سے نہ اٹھ سکیں۔' } },
    { id: 'pain', level: 'now', src: 'PCPNC',
      title: { en: 'Severe belly pain', ur: 'پیٹ میں شدید درد' },
      text: { en: 'Very strong pain in the belly.', ur: 'پیٹ میں بہت تیز درد۔' } },
    { id: 'breathing', level: 'now', src: 'PCPNC',
      title: { en: 'Hard to breathe', ur: 'سانس لینے میں مشکل' },
      text: { en: 'Breathing is fast, or it is hard to breathe.', ur: 'سانس تیز چل رہی ہو یا سانس لینا مشکل ہو۔' } },
    { id: 'swelling', level: 'soon', src: 'PCPNC',
      title: { en: 'Swelling', ur: 'سوجن' },
      text: { en: 'Fingers, face or legs are swollen.', ur: 'انگلیاں، چہرہ یا ٹانگیں سوج جائیں۔' } },
    { id: 'movement', level: 'soon', src: 'ANC',
      title: { en: 'Baby moves less', ur: 'بچے کی حرکت کم ہونا' },
      text: { en: 'In the last months, the baby moves less than usual or stops moving.', ur: 'آخری مہینوں میں بچہ معمول سے کم حرکت کرے یا حرکت بند ہو جائے۔' } }
  ],

  // Ambulance numbers reported for Karachi. To be confirmed before any real use.
  ambulance: [
    { name: { en: 'Rescue 1122', ur: 'ریسکیو 1122' }, number: '1122' },
    { name: { en: 'Edhi', ur: 'ایدھی' }, number: '115' },
    { name: { en: 'Chhipa', ur: 'چھیپا' }, number: '1020' }
  ],

  // Sample location used when the phone is not in Karachi (Gulshan-e-Hadeed, Bin Qasim Town).
  demoLocation: { lat: 24.868, lon: 67.356 },
  facilitiesShown: 8,
  maxKmFromDemo: 60
};
