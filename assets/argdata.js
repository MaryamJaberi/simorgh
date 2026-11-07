/* ════════════════════════════════════════════════════════════
   دادهٔ نقشهٔ استدلال — یک منبع برای سه جا:
   argmap.html (گراف)، inspect.html (این ادعا کجای استدلال است)،
   و shell.js (نوارِ «مسیرِ استدلال» پایینِ صفحه‌ها).
   اگر گرهی عوض شد، فقط همین فایل.

   claims: یا فهرستِ شناسه‌ها، یا یکی از کلیدهای محاسبه‌ای:
     "all" · "tier:3" · "contested" · "topic:model" · "page:gam.html"
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* پنج پلهٔ مسیر: استعاره → ادعا → شواهد → ممیزی → کنش */
  var STAGES = [
    { k: "estare", t: "استعاره", d: "میز، شب و روز، پَر — زبانی که در یاد می‌ماند", href: "game.html#qavaed", page: "game.html" },
    { k: "edea",   t: "ادعا",    d: "پنج گزاره‌ای که کلِ پروژه رویشان ایستاده", href: "index.html#kholase", page: "index.html" },
    { k: "shahed", t: "شواهد",   d: "۸۴ سطر، با منبع، رده و شرطِ ابطال", href: "data.html", page: "data.html" },
    { k: "momayezi", t: "ممیزی", d: "کجای خودش سست است، و از کِی عقب مانده", href: "audit.html", page: "audit.html" },
    { k: "konesh", t: "کنش",     d: "برای هجده قشر، کوچک‌ترین قدمِ ممکن", href: "gam.html", page: "gam.html" }
  ];

  /* لایه‌ها، همان رنگ‌بندیِ پیشنهادیِ گراف */
  var LAYERS = [
    { n: 0, t: "قلاب — استعاره و ادعا" },
    { n: 1, t: "پنج گزاره — شواهد" },
    { n: 2, t: "زیرساختِ روش‌شناختی" },
    { n: 3, t: "کنش و روایت" },
    { n: 4, t: "وضعیتِ سند" }
  ];

  /* est: گرهی که برآورد/مدل است و نباید هم‌وزنِ ادعای قطعی دیده شود */
  var NODES = [
    { id: "M", L: 3, st: "estare", x: 540, y: 52,  t: "اسطورهٔ شاهنامه", s: "نمادهای غیرحزبی",
      d: "سیمرغ، پَر، ضحاک: زبانی که از هیچ حزبی وام گرفته نشده و برای همه آشناست. کارش بسیج و به‌یادماندن است، نه اثبات.",
      href: "game.html#par", claims: ["secularism-survey"] },
    { id: "A", L: 0, st: "estare", x: 540, y: 142, t: "میزِ مافیا", s: "بازیِ هماهنگی",
      d: "ایرانِ امروز به‌مثابهٔ یک میزِ مافیا: عده‌ای شب بیدارند و همدیگر را می‌شناسند؛ بقیه روز بیدارند و نمی‌دانند چند نفر مثلِ خودشان فکر می‌کنند.",
      href: "game.html#qavaed", claims: ["preference-falsification", "coordination-game"] },
    { id: "B", L: 0, st: "edea", x: 540, y: 236, t: "ادعای مرکزی", s: "مسئله نبودِ گزینهٔ بعدی است",
      d: "مسئله متقاعدکردنِ مردم نیست؛ سمتِ تقاضا حل شده. آنچه کم است گزینه‌ای است که همه بدانند بقیه هم پشتش هستند.",
      href: "index.html#kholase", claims: ["secularism-survey", "coordination-game"] },
    { id: "C", L: 1, st: "shahed", x: 190, y: 352, t: "تقاضا حل شده", s: "۷۲٫۹٪ جدایی دین از حکومت",
      d: "از پیمایشِ خودِ حاکمیت، و در هشت سال از ۳۰٫۷٪ به این‌جا رسیده. قوی‌ترین عددِ پروژه چون از منبعِ مخالف می‌آید — ولی پشتیبانِ «تقاضا» است، نه «آمادگی برای عمل».",
      href: "data.html#c-secularism-survey", claims: ["secularism-survey", "preference-falsification"] },
    { id: "D", L: 1, st: "edea", x: 540, y: 352, t: "بازیِ هماهنگی", s: "نه مجموع‌صفر",
      d: "هر کس وقتی عمل می‌کند که مطمئن باشد بقیه هم عمل می‌کنند. پس منابع باید صرفِ ساختنِ باورِ مشترک شود، نه متقاعدکردنِ بیشتر.",
      href: "data.html#c-coordination-game", claims: ["coordination-game", "preference-falsification", "coalition-size"] },
    { id: "G", L: 1, st: "momayezi", x: 890, y: 352, t: "آنچه سند نمی‌داند", s: "۳۷٪ برآورد + عقب‌ماندگی", est: true,
      d: "بیش از یک‌سومِ ادعاها برآورد یا مدل‌اند، و متنِ اصلی پیش از رویدادهای ۱۴۰۴–۱۴۰۵ نوشته شده. سند این را پنهان نمی‌کند — اعلامش می‌کند.",
      href: "audit.html", claims: ["tier:3"] },
    { id: "F", L: 1, st: "shahed", x: 420, y: 474, t: "خشونت‌پرهیزی", s: "۵۳٪ در برابر ۲۶٪",
      d: "در ۳۲۳ خیزشِ ۱۹۰۰–۲۰۰۶. دلیلش عملی است: ورودِ آسان‌تر یعنی شرکت‌کنندهٔ بیشتر، و لحظهٔ تعیین‌کننده ریزشِ نیروهای امنیتی است.",
      href: "data.html#c-navco-success", claims: ["navco-success", "rule-35", "rule-35-inverse", "defection", "success-declining"] },
    { id: "E", L: 1, st: "edea", x: 660, y: 474, t: "هزینهٔ ماندن", s: "۴۰۰–۶۰۰ میلیارد دلار", est: true,
      d: "هزینهٔ فرصتِ ادامهٔ وضعِ موجود — بی‌هیچ رخدادِ واحد، فقط با فرسایش. مدل است، نه پیش‌بینی؛ و کف است، نه سقف.",
      href: "data.html#c-cost-status-quo", claims: ["cost-status-quo", "braindrain", "gdp-capita", "inflation", "population"] },
    { id: "O", L: 4, st: "momayezi", x: 975, y: 474, t: "وضعیتِ سند", s: "تاریخِ بازبینی",
      d: "سند تا کجا را می‌بیند، چه رویدادی را پوشش نداده، و کدام بخش‌ها روی فرضِ قدیمی سوارند.",
      href: "status.html", claims: ["war-1404"] },
    { id: "L", L: 3, st: "konesh", x: 190, y: 600, t: "صفحهٔ کنش", s: "۱۸ قشر",
      d: "برای هر قشر، کوچک‌ترین قدمِ ممکن و خطرِ نسبی‌اش. پلِ میانِ تحلیل و عمل — و جایی که کلی‌گویی بیشترین خطر را دارد.",
      href: "gam.html#who", claims: ["page:gam.html"] },
    { id: "N", L: 3, st: "edea", x: 655, y: 596, t: "سناریوهای چهارگانه", s: "میثاقی · گسست · خشونت · ماندن", est: true,
      d: "چهار راه با هزینهٔ جانی و مالیِ هرکدام. مرتبهٔ بزرگی‌اند، نه رقم؛ ارزششان در مقایسهٔ نسبیِ ستون‌هاست.",
      href: "game.html#rah", claims: ["cost-covenant", "cost-rupture", "cost-violence", "cost-status-quo", "deaths", "transition-models", "plan-90-9-600"] },
    { id: "I", L: 2, st: "momayezi", x: 880, y: 612, t: "دفترِ ممیزی", s: "اعتراف به ضعف‌ها",
      d: "فهرستِ چیزهایی که سست است، به قلمِ خودِ پروژه — از شدیدترین.",
      href: "audit.html#yafteha", claims: ["contested"] },
    { id: "H", L: 2, st: "shahed", x: 500, y: 722, t: "دیتاستِ باز", s: "۸۴ ادعا · منبع · رده · شرطِ ابطال",
      d: "هر عددِ پروژه یک سطر است، با منبع، ردهٔ اعتبار و شرطی که ردش می‌کند. کلِ دیتاست JSON است و دانلودشدنی.",
      href: "data.html#jadval", claims: ["all"] },
    { id: "K", L: 2, st: "momayezi", x: 905, y: 742, t: "بی‌طرف نه، بازرسی‌پذیر", s: "دو چیزِ متفاوت",
      d: "سند ادعای بی‌طرفی نمی‌کند. ادعا می‌کند هر حرفش را می‌شود سطربه‌سطر بررسی کرد — و ابزارِ بررسی را هم کنارش می‌گذارد.",
      href: "inspect.html", claims: [] },
    { id: "J", L: 2, st: "shahed", x: 215, y: 800, t: "مدل ≠ پیش‌بینی", s: "تفکیکِ برچسب‌ها",
      d: "هر سطر می‌گوید اندازه‌گیری است، پژوهش است، یا مدلِ خودِ پروژه. رده دربارهٔ نوعِ شاهد است، نه درست‌بودنِ ادعا.",
      href: "data.html#rahnama", claims: ["topic:model"] }
  ];

  /* انواعِ یال — همان پیشنهادِ طراحی:
     ev شاهد (خط‌چین) · inf استنتاج (ضخیم) · aud ممیزی (نقطه‌چین) · nar روایت · act کنش */
  var EDGE_TYPES = {
    nar: "روایت", inf: "استنتاج", ev: "شاهد", aud: "ممیزی", act: "کنش"
  };
  var EDGES = [
    ["M", "A", "nar", "اسطوره → استعاره"],
    ["A", "B", "nar", "استعاره → ادعا"],
    ["B", "C", "ev",  "ادعا → شاهدِ تقاضا"],
    ["B", "D", "inf", "ادعا → چارچوبِ نظری"],
    ["B", "G", "aud", "ادعا → آنچه نمی‌داند"],
    ["C", "H", "ev",  "شاهد → سطرِ دیتاست"],
    ["D", "F", "inf", "نظریهٔ بازی → شاهدِ تجربی"],
    ["D", "E", "inf", "نظریهٔ بازی → مدلِ هزینه"],
    ["E", "N", "inf", "مدلِ هزینه → سناریوها"],
    ["F", "L", "act", "شاهد → قدمِ کنش (قشرِ امنیتی)"],
    ["C", "L", "act", "شاهد → قدمِ کنش (قشرِ عمومی)"],
    ["G", "I", "aud", "اعتراف → دفترِ ممیزی"],
    ["G", "O", "aud", "اعتراف → وضعیتِ سند"],
    ["H", "I", "aud", "دیتاست → ممیزی"],
    ["J", "H", "ev",  "تفکیکِ مدل → برچسب‌گذاریِ دیتاست"],
    ["K", "I", "aud", "بازرسی‌پذیری → ممیزی"],
    ["M", "L", "nar", "اسطوره → روایتِ کنش"],
    ["O", "H", "aud", "وضعیتِ سند → به‌روزرسانیِ دیتاست"]
  ];

  /* استعاره کجا جای استدلال را نمی‌گیرد — برای هر استعاره:
     معنای لفظی، سطرِ داده‌ای که بارش را می‌کشد، و جایی که می‌شکند. */
  var LIMITS = [
    { node: "A", t: "میزِ مافیا",
      plain: "اقلیتی هماهنگ که اطلاعاتِ کامل دارد، در برابرِ اکثریتی که نمی‌داند چند نفر مثلِ خودش فکر می‌کنند.",
      rows: ["preference-falsification", "coordination-game"],
      breaks: "جامعه دو تیمِ ثابت نیست — خودِ متن می‌گوید «نقش‌ها بازتعریف شدند». و تصویرِ «شبی هماهنگ با رأسِ مشخص» پس از ۱۴۰۴–۱۴۰۵ دیگر بدیهی نیست.",
      audit: "audit.html#f-2" },
    { node: "M", t: "سیمرغ و پَر",
      plain: "پَر یعنی نشانهٔ پرهزینه (costly signal): نشانه‌ای از پیش توافق‌شده که وقتی روشن شد، همه بدانند بقیه هم می‌دانند.",
      rows: ["secularism-survey"],
      breaks: "اسطوره بسیج می‌کند، ولی چیزی را ثابت نمی‌کند. «سیمرغ می‌آید» پیش‌بینی نیست؛ و اگر آستانهٔ آمدنش به قاعدهٔ ۳٫۵٪ گره بخورد، باید قیدِ مناقشه‌دارِ همان سطر را هم با خود ببرد.",
      audit: "data.html#c-rule-35" },
    { node: "D", t: "بازیِ هماهنگی",
      plain: "هر کس فقط وقتی عمل می‌کند که مطمئن باشد بقیه هم عمل می‌کنند؛ مسئله دانشِ مشترک است، نه قانع‌شدن.",
      rows: ["coordination-game", "coalition-size"],
      breaks: "اگر مسئله فقط هماهنگی بود، هر نشانهٔ مشترکی کافی بود. خطرِ نسبیِ بسیار متفاوتِ قشرها در «قدمِ تو» نشان می‌دهد بخشی از بازی ترس و چانه‌زنی است، نه فقط هماهنگی.",
      audit: "gam.html#khatar" }
  ];

  /* کارت‌های قدمِ تو — برای سنجشِ پوشش در health.html */
  var GAM_CARDS = [
    ["kasb", "کاسب و بازاری"], ["kargar", "کارگر"], ["moallem", "معلم"], ["darman", "کادرِ درمان"],
    ["daneshjoo", "دانشجو"], ["ranande", "راننده"], ["karmand", "کارمندِ دولت"], ["niroo", "نیروی امنیتی"],
    ["pooldar", "کسی که پول دارد"], ["faghir", "کسی که دستش تنگ است"], ["bisavad", "کم‌سواد"],
    ["khanedar", "زنِ خانه"], ["rohani", "اهلِ منبر"], ["vakil", "وکیل"], ["honar", "هنرمند"],
    ["mohajer", "مهاجر"], ["motekhases", "متخصص"], ["natars", "کسی که می‌ترسد"]
  ];

  /* حلِ کلیدِ ادعاهای یک گره روی دیتاست */
  function resolve(spec, claims) {
    var out = [];
    (spec || []).forEach(function (k) {
      var m;
      if (k === "all") out = out.concat(claims);
      else if (k === "contested") out = out.concat(claims.filter(function (c) { return c.contested; }));
      else if ((m = /^tier:(\d)$/.exec(k))) out = out.concat(claims.filter(function (c) { return String(c.tier) === m[1]; }));
      else if ((m = /^topic:(.+)$/.exec(k))) out = out.concat(claims.filter(function (c) { return c.topic === m[1]; }));
      else if ((m = /^page:(.+)$/.exec(k))) out = out.concat(claims.filter(function (c) {
        return (c.where || []).some(function (w) { return w[0] === m[1]; }); }));
      else { var c = claims.filter(function (x) { return x.id === k; })[0]; if (c) out.push(c); }
    });
    var seen = {};
    return out.filter(function (c) { if (seen[c.id]) return false; seen[c.id] = 1; return true; });
  }

  /* این ادعا در کدام گره‌ها بار می‌کشد (فقط ارجاعِ صریح، نه کلیدهای جمعی) */
  function nodesFor(claim) {
    return NODES.filter(function (n) {
      return (n.claims || []).some(function (k) {
        if (k === claim.id) return true;
        if (k === "tier:3" && claim.tier === 3) return n.id === "G";
        if (k === "contested" && claim.contested) return true;
        if (k === "topic:model" && claim.topic === "model") return true;
        if (k === "page:gam.html") return (claim.where || []).some(function (w) { return w[0] === "gam.html"; });
        return false;
      });
    });
  }

  function fa(n) { return String(n).replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }

  window.SimorghArg = {
    STAGES: STAGES, LAYERS: LAYERS, NODES: NODES, EDGES: EDGES, EDGE_TYPES: EDGE_TYPES,
    LIMITS: LIMITS, GAM_CARDS: GAM_CARDS, resolve: resolve, nodesFor: nodesFor, fa: fa,
    DATA_URL: "files/claims-dataset.json",
    REPO: "maryamjaberi/simorgh",
    TIER: { 1: "ردهٔ ۱ — دادهٔ اولیه یا سندِ نهادی", 2: "ردهٔ ۲ — پژوهشِ منتشرشده", 3: "ردهٔ ۳ — برآورد، گزارش، یا مدل" },
    TOPIC: { resistance: "مقاومتِ مدنی", economy: "اقتصاد", demography: "جمعیت", politics: "سیاست و افکارِ عمومی",
             "iran-israel": "ایران و اسرائیل", history: "تاریخ", model: "مدلِ خودِ پروژه",
             security: "امنیت و اروپا", war: "جنگِ ۱۴۰۴–۱۴۰۵" },
    load: function (base) {
      return fetch((base || "") + "files/claims-dataset.json").then(function (r) {
        if (!r.ok) throw new Error(r.status); return r.json(); });
    }
  };
})();
