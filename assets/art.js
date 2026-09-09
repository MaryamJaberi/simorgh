/* ════════════════════════════════════════════════════════════
   نکته: رنگ‌ها باید با متغیرهای --s-* در shell.css یکی باشند.
   اگر --zar بنویسید (بدونِ s-) خطوط نامرئی می‌شوند و خطایی هم نمی‌دهد.
   تصویرهای سایت — SVG خطی، بدونِ فایلِ بیرونی، سازگار با تم.
   استفاده:  <div data-art="feather"></div>
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var G = 'var(--s-zar)', T = 'var(--s-text)', M = 'var(--s-muted)',
      R = 'var(--s-shangarf)', B = 'var(--s-lajvard)', F = 'var(--s-firuze)';

  function svg(w, h, inner, label) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (label || '') + '" ' +
      'preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">' + inner + '</svg>';
  }
  var A = {};

  /* ── پَرِ سیمرغ ── */
  A.feather = function () {
    var b = '';
    for (var i = 0; i < 9; i++) {
      var y = 46 + i * 26, s = 1 - i * 0.055, sp = 62 * s;
      b += '<path d="M150 ' + y + ' C' + (150 - sp * .55) + ' ' + (y + 12) + ' ' + (150 - sp * .9) + ' ' + (y + 34) + ' ' + (150 - sp) + ' ' + (y + 62) + '"/>' +
           '<path d="M150 ' + y + ' C' + (150 + sp * .55) + ' ' + (y + 12) + ' ' + (150 + sp * .9) + ' ' + (y + 34) + ' ' + (150 + sp) + ' ' + (y + 62) + '"/>';
    }
    return svg(300, 340,
      '<g fill="none" stroke="' + G + '" stroke-width="1.5" stroke-linecap="round">' +
      '<path d="M150 322V18" stroke-width="2.2"/>' + b + '</g>' +
      '<circle cx="150" cy="14" r="3.4" fill="' + G + '"/>', 'پَرِ سیمرغ');
  };

  /* ── سه دایره: مافیا · شهر · مستقل‌ها ── */
  A.venn = function () {
    return svg(340, 300,
      '<g fill="none" stroke-width="1.6">' +
      '<circle cx="126" cy="118" r="86" stroke="' + R + '" fill="' + R + '" fill-opacity=".08"/>' +
      '<circle cx="214" cy="118" r="86" stroke="' + F + '" fill="' + F + '" fill-opacity=".08"/>' +
      '<circle cx="170" cy="196" r="86" stroke="' + G + '" fill="' + G + '" fill-opacity=".08"/>' +
      '<circle cx="170" cy="150" r="140" stroke="' + G + '" stroke-dasharray="5 8" opacity=".55"/>' +
      '</g>' +
      '<g font-size="12" font-weight="700" text-anchor="middle">' +
      '<text x="86" y="86" fill="' + R + '">مافیا</text>' +
      '<text x="254" y="86" fill="' + F + '">شهر</text>' +
      '<text x="170" y="252" fill="' + G + '">مستقل</text>' +
      '</g>', 'نمودار ون سه گروه');
  };

  /* ── پشت‌بام‌های شهر ── */
  A.city = function () {
    var b = '', x = 8, seed = 7;
    while (x < 332) {
      seed = (seed * 9301 + 49297) % 233280;
      var w = 20 + (seed / 233280) * 34, h = 42 + ((seed >> 3) % 90);
      b += '<rect x="' + x.toFixed(0) + '" y="' + (232 - h) + '" width="' + w.toFixed(0) + '" height="' + h + '" fill="' + T + '" opacity=".1"/>';
      b += '<path d="M' + (x + w / 2).toFixed(0) + ' ' + (232 - h) + 'v-16" stroke="' + T + '" stroke-width="1" opacity=".35"/>';
      b += '<path d="M' + (x + w / 2 - 7).toFixed(0) + ' ' + (232 - h - 12) + 'h14" stroke="' + T + '" stroke-width="1" opacity=".35"/>';
      x += w + 6;
    }
    return svg(340, 240,
      '<circle cx="266" cy="52" r="26" fill="' + G + '" opacity=".16"/>' +
      '<circle cx="266" cy="52" r="10" fill="' + G + '" opacity=".5"/>' +
      b + '<path d="M0 232h340" stroke="' + T + '" stroke-width="1.2" opacity=".4"/>', 'پشت‌بام‌های شهر');
  };

  /* ── سه مهاجرت: ۱۲ · ۳۰۰ · ۴۰۰۰ کیلومتر ── */
  A.three = function () {
    function door(x, y, s, op) {
      return '<g opacity="' + op + '"><rect x="' + x + '" y="' + y + '" width="' + (26 * s) + '" height="' + (44 * s) + '" rx="2" ' +
        'fill="none" stroke="' + T + '" stroke-width="1.4"/>' +
        '<circle cx="' + (x + 20 * s) + '" cy="' + (y + 24 * s) + '" r="1.6" fill="' + T + '"/></g>';
    }
    return svg(340, 200,
      '<path d="M20 150h300" stroke="' + T + '" stroke-width="1" opacity=".3" stroke-dasharray="3 6"/>' +
      door(28, 106, 1, '.9') + door(150, 100, 1.15, '.62') + door(288, 92, 1.35, '.34') +
      '<g fill="' + G + '" font-size="10.5" font-weight="700" text-anchor="middle">' +
      '<text x="41" y="172">۱۲ کیلومتر</text>' +
      '<text x="165" y="172">۳۰۰</text>' +
      '<text x="306" y="172">۴۰۰۰</text></g>' +
      '<path d="M62 128q40-26 78 0" fill="none" stroke="' + G + '" stroke-width="1.2" opacity=".7"/>' +
      '<path d="M186 122q52-32 96 0" fill="none" stroke="' + G + '" stroke-width="1.2" opacity=".7"/>' +
      '<circle cx="41" cy="86" r="3" fill="' + G + '"/><circle cx="165" cy="80" r="3" fill="' + G + '"/>' +
      '<circle cx="306" cy="72" r="3" fill="' + G + '"/>', 'سه مهاجرت');
  };

  /* ── سی مرغ که سیمرغ می‌شوند ── */
  A.thirty = function () {
    var pts = [[170,26],[150,40],[190,40],[132,58],[208,58],[116,80],[224,80],[104,106],[236,106],
      [120,122],[220,122],[140,132],[200,132],[158,140],[182,140],[170,152],[152,166],[188,166],
      [136,182],[204,182],[122,200],[218,200],[112,220],[228,220],[148,214],[192,214],[170,196],
      [160,232],[180,232],[170,246]];
    var b = pts.map(function (p, i) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (3.4 - (i % 3) * .5) + '" fill="' + G + '" opacity="' + (0.5 + (i % 5) * 0.1) + '"/>';
    }).join('');
    return svg(340, 270,
      '<path d="M170 26C120 60 96 110 112 220M170 26c50 34 74 84 58 194" fill="none" stroke="' + G + '" ' +
      'stroke-width="1" opacity=".2"/>' + b, 'سی مرغ');
  };

  /* ── میزِ نقد ── */
  A.table = function () {
    var b = '';
    for (var i = 0; i < 9; i++) {
      var a = (i / 9) * Math.PI * 2 - Math.PI / 2;
      var x = 170 + Math.cos(a) * 104, y = 130 + Math.sin(a) * 78;
      b += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="13" fill="none" stroke="' + T + '" stroke-width="1.3" opacity=".55"/>';
      b += '<path d="M170 130L' + x.toFixed(1) + ' ' + y.toFixed(1) + '" stroke="' + G + '" stroke-width=".8" opacity=".28"/>';
    }
    return svg(340, 260,
      '<ellipse cx="170" cy="130" rx="62" ry="44" fill="' + G + '" fill-opacity=".1" stroke="' + G + '" stroke-width="1.5"/>' +
      b + '<path d="M148 130h44M170 116v28" stroke="' + G + '" stroke-width="1.2" opacity=".6"/>', 'میز نقد');
  };

  /* ── اروپا و یک رشته ── */
  A.europe = function () {
    return svg(340, 240,
      '<g fill="none" stroke="' + T + '" stroke-width="1.3" opacity=".45">' +
      '<path d="M52 74q26-16 52-6t34 26 44 4 40 18-14 34-44 16-56-6-42-22-20-30 6-34z"/>' +
      '<path d="M96 62q10-14 26-12M212 46q16 4 20 18M258 152q18 10 12 26"/>' +
      '</g>' +
      '<circle cx="120" cy="96" r="4" fill="' + B + '"/><circle cx="196" cy="82" r="4" fill="' + B + '"/>' +
      '<circle cx="164" cy="140" r="4" fill="' + B + '"/><circle cx="240" cy="126" r="4" fill="' + B + '"/>' +
      '<path d="M296 210C250 196 214 176 196 82" fill="none" stroke="' + R + '" stroke-width="1.6" stroke-dasharray="4 5"/>' +
      '<circle cx="298" cy="212" r="6" fill="' + R + '" opacity=".8"/>' +
      '<text x="298" y="232" fill="' + M + '" font-size="10" text-anchor="middle">ایران</text>', 'اروپا و ایران');
  };

  /* ── شخصیت‌ها ── */
  A.faces = function () {
    var b = '', i = 0;
    for (var r = 0; r < 3; r++) for (var c = 0; c < 6; c++, i++) {
      var x = 30 + c * 52, y = 44 + r * 62;
      var col = i % 3 === 0 ? R : (i % 3 === 1 ? F : G);
      b += '<g opacity="' + (0.35 + (i % 4) * 0.18) + '">' +
        '<circle cx="' + x + '" cy="' + y + '" r="11" fill="none" stroke="' + col + '" stroke-width="1.4"/>' +
        '<path d="M' + (x - 15) + ' ' + (y + 34) + 'q15-18 30 0" fill="none" stroke="' + col + '" stroke-width="1.4"/></g>';
    }
    return svg(340, 220, b, 'شخصیت‌ها');
  };

  /* ── کمیک ── */
  A.comic = function () {
    var cells = [[16,16,140,84],[164,16,160,84],[16,110,100,110],[124,110,100,110],[232,110,92,110]];
    var b = cells.map(function (c, i) {
      return '<rect x="' + c[0] + '" y="' + c[1] + '" width="' + c[2] + '" height="' + c[3] + '" ' +
        'fill="' + T + '" fill-opacity=".045" stroke="' + T + '" stroke-width="1.6"/>' +
        '<circle cx="' + (c[0] + c[2] / 2) + '" cy="' + (c[1] + c[3] / 2 + 6) + '" r="8" fill="none" stroke="' + G + '" stroke-width="1.3" opacity=".8"/>' +
        '<path d="M' + (c[0] + c[2] / 2 - 11) + ' ' + (c[1] + c[3] - 10) + 'q11-16 22 0" fill="none" stroke="' + G + '" stroke-width="1.3" opacity=".55"/>';
    }).join('');
    return svg(340, 240, b, 'صفحه‌های کمیک');
  };

  /* ── ترازو / هزینه ── */
  A.scales = function () {
    return svg(340, 230,
      '<g fill="none" stroke="' + T + '" stroke-width="1.6">' +
      '<path d="M170 190V52M120 62h100" stroke-width="2"/>' +
      '<path d="M120 62l-30 44h60z" fill="' + R + '" fill-opacity=".12" stroke="' + R + '"/>' +
      '<path d="M220 62l-30 62h60z" fill="' + F + '" fill-opacity=".12" stroke="' + F + '"/>' +
      '<path d="M140 190h60" stroke-width="2"/>' +
      '</g><circle cx="170" cy="48" r="4" fill="' + G + '"/>', 'ترازوی هزینه');
  };

  /* ── قواعد / کارت ── */
  A.rules = function () {
    var b = '';
    for (var i = 0; i < 5; i++) {
      var x = 40 + i * 12, y = 40 + i * 8, o = 0.25 + i * 0.15;
      b += '<rect x="' + x + '" y="' + y + '" width="150" height="110" rx="8" fill="var(--s-surface)" ' +
        'stroke="' + T + '" stroke-width="1.4" opacity="' + o + '"/>';
    }
    return svg(340, 220, b +
      '<g stroke="' + G + '" stroke-width="1.4" fill="none" opacity=".85">' +
      '<path d="M112 104h96M112 122h72M112 140h84"/></g>', 'کارت‌های قواعد');
  };

  /* ════════════════════════════════════════════════════════════
     تصویرها و نمودارهای صفحهٔ «یک قدم» و «کتابخانه»
     همهٔ اعداد از منابعِ نام‌برده در خودِ صفحه‌اند؛ هیچ عددی ساختگی نیست.
     ════════════════════════════════════════════════════════════ */
  function fa(s) {
    return String(s).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[+d]; });
  }
  var FONT = 'font-family="Vazirmatn,IRANSans,Tahoma,sans-serif"';

  /* ── پله‌ها: یک قدم ── */
  A.step = function () {
    var p = 'M312 196 h-54 v-28 h-54 v-28 h-54 v-28 h-54 v-28 h-54';
    return svg(340, 220,
      '<path d="' + p + '" fill="none" stroke="' + T + '" stroke-width="1.8" ' +
      'stroke-linejoin="round" stroke-linecap="round" opacity=".45"/>' +
      '<path d="M312 196h-54v-28h-54" fill="none" stroke="' + G + '" stroke-width="2.6" ' +
      'stroke-linejoin="round" stroke-linecap="round"/>' +
      '<circle cx="286" cy="150" r="7.5" fill="none" stroke="' + G + '" stroke-width="2"/>' +
      '<path d="M286 158v20M276 190l10-12 10 12" fill="none" stroke="' + G + '" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      'پله‌هایی که یکی‌یکی بالا می‌روند');
  };

  /* ── جمعیت: چند نفر فکر می‌کنند، چند نفر می‌گویند ──
     تصویرِ «پنهان‌سازیِ ترجیح»: همه یک چیز فکر می‌کنند، کمی می‌گویند. */
  A.crowd = function () {
    var b = '', spoken = { 2: 1, 9: 1, 13: 1, 18: 1, 20: 1, 5: 1 }, k = 0;
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 8; c++, k++) {
        var x = 316 - c * 40, y = 54 + r * 60, on = !!spoken[k];
        b += '<g stroke="' + (on ? G : M) + '" stroke-width="1.6" fill="none" ' +
             'opacity="' + (on ? 1 : .55) + '">' +
             '<circle cx="' + x + '" cy="' + y + '" r="7"/>' +
             '<path d="M' + (x - 11) + ' ' + (y + 23) + ' q11 -14 22 0" stroke-linecap="round"/>' +
             '<circle cx="' + x + '" cy="' + (y - 17) + '" r="4.2"' +
             (on ? '' : ' stroke-dasharray="2 2.4"') + '/></g>';
      }
    }
    return svg(340, 210, b, 'بیست‌وچهار نفر که همه یک چیز فکر می‌کنند و شش نفر آن را می‌گویند');
  };

  /* ── نمودار: نرخِ موفقیت ──
     دادهٔ NAVCO، ۳۲۳ کارزار، ۱۹۰۰ تا ۲۰۰۶ (چنووث و استفان). */
  A.chartSuccess = function () {
    var rows = [
      { t: "خیزشِ خشونت‌پرهیز", v: 53, on: 1 },
      { t: "خیزشِ مسلحانه", v: 26, on: 0 }
    ];
    var X = 306, MAXW = 236, b = '';
    /* شبکهٔ پس‌زمینه — پس‌رونده */
    [0, 25, 50, 75, 100].forEach(function (g) {
      var x = X - g / 100 * MAXW;
      b += '<line x1="' + x + '" y1="34" x2="' + x + '" y2="150" stroke="' + M +
           '" stroke-width="1" opacity=".18"/>' +
           '<text x="' + x + '" y="166" ' + FONT + ' font-size="10" fill="' + M +
           '" text-anchor="middle">' + fa(g) + '٪</text>';
    });
    /* در متنِ راست‌به‌چپ، text-anchor="start" یعنی لبهٔ راست.
       اگر "end" بگذاریم متن به راست سرریز می‌کند و بریده می‌شود. */
    rows.forEach(function (r, i) {
      var y = 48 + i * 56, h = 30, w = r.v / 100 * MAXW, col = r.on ? B : M;
      b += '<text x="' + X + '" y="' + (y - 7) + '" ' + FONT + ' font-size="13" ' +
           'font-weight="700" fill="' + T + '" text-anchor="start" direction="rtl">' +
           r.t + '</text>' +
           '<path d="M' + X + ' ' + y + ' h' + -(w - 4) + ' a4 4 0 0 0 -4 4 v' + (h - 8) +
           ' a4 4 0 0 0 4 4 h' + (w - 4) + ' z" fill="' + col + '" opacity="' +
           (r.on ? 1 : .42) + '"/>' +
           '<text x="' + (X - w - 10) + '" y="' + (y + 20) + '" ' + FONT + ' font-size="14" ' +
           'font-weight="700" fill="' + T + '" text-anchor="start" direction="rtl">' +
           fa(r.v) + '٪</text>';
    });
    return svg(340, 178, b,
      'نمودار: خیزش‌های خشونت‌پرهیز ۵۳ درصد و خیزش‌های مسلحانه ۲۶ درصد به هدفشان رسیده‌اند');
  };

  /* ── ۳٫۵٪ چقدر است؟ هزار نقطه، سی‌وپنج‌تاش پررنگ ──
     پررنگ‌ها به‌شکلِ یک بلوکِ ۷×۵ در گوشهٔ بالا-راست جمع شده‌اند
     تا چشم «مقدار» را ببیند، نه یک نوارِ پخش‌شده. */
  A.dots35 = function () {
    var COLS = 40, ROWS = 25, P = 7, b = '';
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var x = 296 - c * P, y = 16 + r * P, on = (c < 7 && r < 5);
        b += '<circle cx="' + x + '" cy="' + y + '" r="' + (on ? 2.8 : 2) + '" fill="' +
             (on ? G : M) + '" opacity="' + (on ? 1 : .22) + '"/>';
      }
    }
    b += '<rect x="' + (296 - 6 * P - 5) + '" y="11" width="' + (6 * P + 10) +
         '" height="' + (4 * P + 10) + '" rx="5" fill="none" stroke="' + G +
         '" stroke-width="1.4" opacity=".65"/>';
    return svg(310, 205, b,
      'هزار نقطه که سی‌وپنج‌تای آن پررنگ و در یک کادر جمع شده — یعنی سه و نیم درصد');
  };

  /* ── موج‌های اعتراض: فاصله‌ها کوتاه‌تر می‌شود ── */
  A.waves = function () {
    var YS = [1285, 1357, 1378, 1388, 1396, 1398, 1401, 1404],
        A0 = 1285, A1 = 1406, X0 = 24, W = 296, Y = 74, b = '';
    function px(y) { return X0 + (A1 - y) / (A1 - A0) * W; }
    b += '<line x1="' + X0 + '" y1="' + Y + '" x2="' + (X0 + W) + '" y2="' + Y +
         '" stroke="' + M + '" stroke-width="1.4" opacity=".4"/>';
    YS.forEach(function (y) {
      b += '<circle cx="' + px(y) + '" cy="' + Y + '" r="4.6" fill="' + G + '"/>';
    });
    [[1285, "مشروطه"], [1357, "انقلاب"], [1388, "سبز"]].forEach(function (d) {
      var x = px(d[0]);
      b += '<line x1="' + x + '" y1="' + (Y - 8) + '" x2="' + x + '" y2="' + (Y - 26) +
           '" stroke="' + M + '" stroke-width="1" opacity=".5"/>' +
           '<text x="' + x + '" y="' + (Y - 32) + '" ' + FONT + ' font-size="11.5" ' +
           'font-weight="700" fill="' + T + '" text-anchor="middle">' + d[1] + '</text>' +
           '<text x="' + x + '" y="' + (Y + 22) + '" ' + FONT + ' font-size="10" fill="' +
           M + '" text-anchor="middle">' + fa(d[0]) + '</text>';
    });
    /* هشدار: «·» میانِ ارقامِ فارسی در رندرِ دوجهته جابه‌جا می‌شود
       («۷ · ۲» شبیهِ «۷۲» می‌شود). این‌جا اصلاً عدد پشتِ‌هم نمی‌گذاریم. */
    /* برچسبِ خوشه از راست لنگر می‌شود، وگرنه از لبهٔ چپ بیرون می‌زند و بریده می‌شود. */
    var xa = px(1404), xb = px(1396);
    b += '<path d="M' + xa + ' ' + (Y + 14) + ' v8 H' + xb + ' v-8" fill="none" stroke="' +
         M + '" stroke-width="1.2" opacity=".6"/>' +
         '<path d="M' + ((xa + xb) / 2) + ' ' + (Y + 22) + ' v12" stroke="' + M +
         '" stroke-width="1.2" opacity=".6" fill="none"/>' +
         '<text x="' + (X0 + W) + '" y="' + (Y + 40) + '" ' + FONT + ' font-size="10.5" ' +
         'font-weight="700" fill="' + T + '" text-anchor="start" direction="rtl">' +
         'چهار موج در هشت سالِ آخر</text>' +
         '<text x="' + (X0 + W) + '" y="' + (Y + 58) + '" ' + FONT + ' font-size="10.5" fill="' +
         M + '" text-anchor="start" direction="rtl">فاصلهٔ موج‌ها کوتاه‌تر شده است</text>';
    return svg(340, 152, b,
      'خط زمانِ موج‌های اعتراضی ایران از مشروطه تا امروز؛ فاصله‌ها پیوسته کوتاه‌تر شده');
  };

  /* ── قفسهٔ کتاب ── */
  A.shelf = function () {
    var b = '', ws = [16, 22, 13, 26, 18, 15, 24, 12, 20, 17];
    for (var s = 0; s < 3; s++) {
      var y = 46 + s * 58, x = 306;
      for (var i = 0; i < 8; i++) {
        var w = ws[(s * 8 + i) % ws.length], h = 40 - (i % 3) * 5;
        x -= w + 3;
        b += '<rect x="' + x + '" y="' + (y - h) + '" width="' + w + '" height="' + h +
             '" rx="2" fill="none" stroke="' + (i % 3 === 0 ? G : T) + '" stroke-width="1.5" ' +
             'opacity="' + (i % 3 === 0 ? .95 : .5) + '"/>';
      }
      b += '<line x1="34" y1="' + y + '" x2="308" y2="' + y + '" stroke="' + T +
           '" stroke-width="1.8" opacity=".6"/>';
    }
    return svg(340, 200, b, 'قفسه‌ای از کتاب‌ها');
  };

  /* ── نصب ── */
  function mount() {
    var els = document.querySelectorAll("[data-art]");
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute("data-art");
      if (A[k]) els[i].innerHTML = A[k]();
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
  window.SiteArt = A;
})();
