/* ════════════════════════════════════════════════════════════
   پوستهٔ سایت — نوارِ بالا، «کجایم»، اشتراک‌گذاری، زبان، کشو، جست‌وجو.
   دوزبانه: زبان از <html lang> خوانده می‌شود، مسیر از window.SHELL_BASE.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var LANG = (document.documentElement.getAttribute("lang") || "fa").slice(0, 2);
  var EN = LANG === "en";
  var BASE = window.SHELL_BASE || "";          /* ریشهٔ همین زبان (نسبی) */
  var ASSETS = window.SHELL_ASSETS || "assets/";
  var OTHER = window.SHELL_OTHER || null;      /* همین صفحه در زبانِ دیگر */
  var here = (location.pathname.split("/").pop() || "index.html");

  var T = EN ? {
    all: "All content", close: "Close", theme: "Theme", map: "Site map",
    search: "Search everything — try “Zahhak”, “cost”, “referendum”",
    none: "Nothing found.",
    noIndex: "The search index isn’t available. If you opened this file straight from disk, search only works on the published site.",
    share: "Share", copied: "Link copied", copyFail: "Could not copy — select the address bar instead.",
    shareSec: "Copy a link to this section", youAre: "You are here",
    lang: "فارسی", langTitle: "خواندن به فارسی", faOnly: "Persian only",
    foot: "No party, state or religious emblem appears anywhere in this collection; every symbol is drawn from the Shahnameh and Iranian myth. No quotation is attributed to a real person without a source. Cost figures are <b>models</b>, not forecasts."
  } : {
    all: "همهٔ مطالب", close: "بستن", theme: "تم", map: "نقشهٔ سایت",
    search: "جست‌وجو در همهٔ مطالب — مثلاً «ضحاک»، «هزینه»، «رفراندوم»",
    none: "چیزی پیدا نشد.",
    noIndex: "فهرستِ جست‌وجو در دسترس نیست. اگر فایل را مستقیم از دیسک باز کرده‌اید، جست‌وجو فقط روی نسخهٔ منتشرشده کار می‌کند.",
    share: "اشتراک", copied: "نشانی کپی شد", copyFail: "کپی نشد — نشانیِ بالای مرورگر را دستی بردارید.",
    shareSec: "کپیِ نشانیِ این بخش", youAre: "اینجایید",
    lang: "EN", langTitle: "Read in English", faOnly: "فقط فارسی",
    foot: "هیچ نمادِ حزبی، دولتی یا دینی در این مجموعه به کار نرفته؛ همهٔ نمادها از شاهنامه و اسطوره‌های ایرانی‌اند. هیچ نقلِ‌قولی به شخصِ واقعی نسبت داده نشده مگر با منبع. برآوردهای هزینه <b>مدل</b> هستند، نه پیش‌بینی."
  };

  /* ══ ستونِ روایت: پنج پله سرِ میز ══
     هر صفحه دقیقاً روی یکی از این‌ها می‌نشیند، تا خواننده همیشه بداند کجاست. */
  var SPINE = EN ? [
    { n: 1, k: "table",   t: "The Table",    h: "index.html",  d: "What this is, and why a game" },
    { n: 2, k: "rules",   t: "The Rules",    h: "rules.html",  d: "How the table works — in ten minutes" },
    { n: 3, k: "players", t: "The Players",  h: "players.html",d: "Who is sitting here" },
    { n: 4, k: "nights",  t: "Seven Nights", h: "nights.html", d: "Every round played so far" },
    { n: 5, k: "card",    t: "Your Card",    h: "gam.html",    d: "What you can do tonight" }
  ] : [
    { n: 1, k: "table",   t: "میز",          h: "index.html",  d: "این چیست، و چرا به شکلِ بازی" },
    { n: 2, k: "rules",   t: "قاعده‌ها",      h: "rules.html",  d: "میز چطور کار می‌کند — در ده دقیقه" },
    { n: 3, k: "players", t: "بازیکن‌ها",     h: "players.html",d: "چه کسی این‌جا نشسته" },
    { n: 4, k: "nights",  t: "هفت شب",       h: "nights.html", d: "هر دوری که تا حالا بازی شده" },
    { n: 5, k: "card",    t: "کارتِ تو",      h: "gam.html",    d: "امشب چه می‌توانی بکنی" }
  ];

  /* کدام فایل روی کدام پله می‌نشیند */
  var ON_STEP = {
    "index.html": "table", "": "table",
    "rules.html": "rules", "game.html": "rules",
    "players.html": "players", "map.html": "players", "roles.html": "players",
    "nights.html": "nights",
    "gam.html": "card"
  };

  /* ══ بقیهٔ مطالب — بیرون از پنج پله ══ */
  var OFF = EN ? [
    { g: "Behind the cards", items: [
      { h: "library.html", t: "Library", d: "Where every claim comes from — including what contradicts us" },
      { h: "shared.html", t: "Iranians & Israelis", d: "47 years of enmity, 2,600 years of contact" },
      { h: "../europe.html", t: "The Europe talk", d: "Bilingual, with slide mode and speaker notes" }
    ]},
    { g: "Persian only", items: [
      { h: "../game.html", t: "The full game", d: "12 chapters, 37 characters, 44 comic panels", fa: 1 },
      { h: "../story.html", t: "A House in Afsariyeh", d: "The novel — three Maryams, three migrations", fa: 1 },
      { h: "../roles.html", t: "47 social roles", d: "The expanded role book", fa: 1 },
      { h: "../map.html", t: "The Venn map", d: "74 nodes — the diagram reads without Persian", fa: 1 },
      { h: "../downloads.html", t: "Downloads", d: "Slides, QA documents, tools", fa: 1 }
    ]}
  ] : [
    { g: "پشتِ کارت‌ها", items: [
      { h: "library.html", t: "کتابخانه", d: "هر ادعا از کجا آمده — از جمله آنچه ما را رد می‌کند" },
      { h: "shared.html", t: "ایرانیان و اسرائیلی‌ها", d: "۴۷ سال دشمنی، ۲۶۰۰ سال رابطه" },
      { h: "europe.html", t: "ارائهٔ اروپا", d: "دوزبانه، با حالتِ اسلاید و یادداشتِ گوینده" }
    ]},
    { g: "متنِ کامل", items: [
      { h: "game.html", t: "بازیِ کامل", d: "۱۲ دفتر، ۳۷ شخصیت، ۴۴ کادرِ کمیک" },
      { h: "map.html", t: "نقشهٔ میز — نمودارِ ون", d: "۷۴ گره، هفت ناحیه، دو لایه" },
      { h: "game.html#comic", t: "دفترچهٔ کمیک", d: "۴۴ کادر در ۸ پرده، کشیده‌شده" },
      { h: "game.html#hazine", t: "برآوردِ هزینه", d: "جانی و مالی — مدل، نه پیش‌بینی" },
      { h: "game.html#naghd", t: "میزِ نقد", d: "نُه جناح این سند را نقد می‌کنند" },
      { h: "roles.html", t: "۴۷ نقشِ جامعه‌شناختی", d: "نسخهٔ گسترده‌ترِ نقش‌ها" },
      { h: "story.html", t: "خانه‌ای در افسریه", d: "رمانِ رئالیسم جادویی — سه مریم" },
      { h: "downloads.html", t: "دانلود و منابع", d: "پاورپوینت، سندهای QA، ابزارها" }
    ]}
  ];

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var step = ON_STEP[here] || null;
  var cur = null;
  for (var i = 0; i < SPINE.length; i++) if (SPINE[i].k === step) cur = SPINE[i];

  /* ══════════ نوارِ بالا ══════════ */
  var bar = el("header", { id: "topbar" });
  var crumbs = cur
    ? '<a class="crumb" href="' + BASE + 'index.html">' + (EN ? "Home" : "خانه") + '</a>' +
      '<span class="sep" aria-hidden="true">›</span>' +
      '<span class="crumb now" aria-current="page"><i>' + cur.n + '</i>' + esc(cur.t) + '</span>'
    : '<a class="crumb" href="' + BASE + 'index.html">' + (EN ? "Home" : "خانه") + '</a>' +
      '<span class="sep" aria-hidden="true">›</span>' +
      '<span class="crumb now" aria-current="page">' + esc(document.title.split("—")[0].trim()) + '</span>';

  bar.innerHTML =
    '<button id="tb-menu" type="button" aria-label="' + esc(T.map) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
      '<path d="M4 7h16M4 12h16M4 17h10"/></svg><span>' + esc(T.all) + '</span></button>' +
    '<nav id="tb-crumbs" aria-label="' + esc(T.youAre) + '">' + crumbs + '</nav>' +
    '<div id="tb-act">' +
      '<button id="tb-share" type="button" title="' + esc(T.share) + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/>' +
        '<circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' +
        '<path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>' +
        '<span>' + esc(T.share) + '</span></button>' +
      (OTHER ? '<a id="tb-lang" href="' + OTHER + '" title="' + esc(T.langTitle) + '" ' +
               'lang="' + (EN ? "fa" : "en") + '">' + esc(T.lang) + '</a>' : '') +
    '</div>';
  document.body.insertBefore(bar, document.body.firstChild);
  document.body.classList.add("has-topbar");

  /* ══════════ نوارِ پله‌ها ══════════ */
  if (cur) {
    var sp = el("nav", { id: "spine", "aria-label": EN ? "Where you are" : "کجای مسیرید" });
    sp.innerHTML = '<div class="in">' + SPINE.map(function (s) {
      var on = s.k === cur.k;
      return '<a href="' + BASE + s.h + '"' + (on ? ' aria-current="step" class="on"' : '') +
        ' title="' + esc(s.d) + '"><i>' + s.n + '</i><b>' + esc(s.t) + '</b></a>';
    }).join("") + '</div>';
    bar.parentNode.insertBefore(sp, bar.nextSibling);
  }

  /* ══════════ کشو ══════════ */
  var groups = '<div class="grp"><h3>' + (EN ? "The five steps" : "پنج پله") + '</h3><div class="links">' +
    SPINE.map(function (s) {
      var on = (s.h.split("#")[0] === here) ? ' aria-current="page"' : '';
      return '<a href="' + BASE + s.h + '"' + on + '><b><i class="num">' + s.n + '</i>' +
        esc(s.t) + '</b><span>' + esc(s.d) + '</span></a>';
    }).join("") + '</div></div>' +
    OFF.map(function (g) {
      return '<div class="grp"><h3>' + esc(g.g) + '</h3><div class="links">' +
        g.items.map(function (it) {
          var on = (it.h.split("#")[0] === here) ? ' aria-current="page"' : '';
          return '<a href="' + BASE + it.h + '"' + on + '><b>' + esc(it.t) +
            (it.fa ? ' <em class="faonly">' + esc(T.faOnly) + '</em>' : '') +
            '</b><span>' + esc(it.d) + '</span></a>';
        }).join("") + '</div></div>';
    }).join("");

  var box = el("div", { id: "shell", role: "dialog", "aria-label": T.map });
  box.innerHTML =
    '<div class="in">' +
      '<div class="top">' +
        '<span class="brand">' + (EN ? "Par-e Simorgh" : "پَرِ سیمرغ") + '</span>' +
        '<button class="x" id="shelltheme" type="button">◐ ' + esc(T.theme) + '</button>' +
        (OTHER ? '<a class="x" href="' + OTHER + '" lang="' + (EN ? "fa" : "en") + '">' +
                 esc(T.lang) + '</a>' : '') +
        '<button class="x" id="shellclose" type="button">' + esc(T.close) + ' ✕</button>' +
      '</div>' +
      '<input id="shellq" type="search" autocomplete="off" placeholder="' + esc(T.search) + '">' +
      '<div id="shellhits"></div>' + groups +
      '<div class="foot">' + T.foot + '</div>' +
    '</div>';
  document.body.appendChild(box);

  var q = document.getElementById("shellq"), hits = document.getElementById("shellhits");
  function open() { document.body.classList.add("shell-open"); setTimeout(function () { q.focus(); }, 40); }
  function close() { document.body.classList.remove("shell-open"); }
  document.getElementById("tb-menu").addEventListener("click", open);
  document.getElementById("shellclose").addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("shell-open")) close();
    else if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey)))
             && !e.target.closest("input,textarea,select")) { e.preventDefault(); open(); }
  });

  document.getElementById("shelltheme").addEventListener("click", function () {
    var c = document.documentElement.getAttribute("data-theme");
    var dark = c ? c === "dark"
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
    try { localStorage.setItem("simorgh_theme", dark ? "light" : "dark"); } catch (e) {}
  });
  try {
    var saved = localStorage.getItem("simorgh_theme");
    if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved);
  } catch (e) {}

  /* ══════════ اشتراک‌گذاری ══════════ */
  function toast(msg) {
    var t = document.getElementById("tb-toast");
    if (!t) { t = el("div", { id: "tb-toast", role: "status", "aria-live": "polite" }); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, 2400);
  }
  function copy(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { toast(T.copied); },
                                             function () { toast(T.copyFail); });
    } else {
      var i = el("input", { value: url, "aria-hidden": "true" });
      i.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(i); i.select();
      try { document.execCommand("copy"); toast(T.copied); } catch (e) { toast(T.copyFail); }
      document.body.removeChild(i);
    }
  }
  function shareUrl(url, title) {
    if (navigator.share) {
      navigator.share({ title: title || document.title, url: url })
        .catch(function () { /* کاربر منصرف شد — کاری نکن */ });
    } else copy(url);
  }
  document.getElementById("tb-share").addEventListener("click", function () {
    shareUrl(location.href.split("#")[0], document.title);
  });

  /* دکمهٔ کپیِ نشانی کنارِ هر عنوانِ شناسه‌دار */
  var heads = document.querySelectorAll(
    "section[id] > .wrap > h2, h2[id], .steps article[id] > .who, .finds article[id] > h3");
  Array.prototype.forEach.call(heads, function (h) {
    var own = h.closest("article[id]");
    var id = h.id || (own && own.id) || (h.closest("section[id]") || {}).id;
    if (!id) return;
    var b = el("button", { type: "button", "class": "anchor-copy", title: T.shareSec,
                           "aria-label": T.shareSec + ": " + (h.textContent || "").trim() },
               '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
               'stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/>' +
               '<path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>');
    b.addEventListener("click", function () {
      copy(location.href.split("#")[0] + "#" + id);
    });
    h.appendChild(b);
  });

  /* ══════════ جست‌وجو ══════════ */
  var INDEX = null, loading = false;
  function norm(s) {
    return String(s)
      .replace(/[ً-ْٰـ]/g, "")
      .replace(/ك/g, "ک").replace(/[يى]/g, "ی")
      .replace(/ة/g, "ه").replace(/[آأإؤ]/g, "ا")
      .replace(/[​-‏­]/g, " ")
      .replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); })
      .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/\s+/g, " ").toLowerCase();
  }
  function load() {
    if (INDEX) return Promise.resolve(INDEX);
    if (loading) return loading;
    loading = fetch(ASSETS + "search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (j) {
        j = j.filter(function (x) { return (x.lang || "fa") === LANG; });
        for (var i = 0; i < j.length; i++) { j[i]._t = norm(j[i].title); j[i]._b = norm(j[i].body); }
        INDEX = j; loading = false; return j;
      })
      .catch(function () { loading = false; INDEX = []; return []; });
    return loading;
  }
  function render(out) {
    hits.innerHTML = out.slice(0, 25).map(function (o) {
      var body = o.pre === null
        ? '<div class="sn">' + esc(o.it.body.slice(0, 120)) + '…</div>'
        : '<div class="sn">' + esc(o.pre) + '<em>' + esc(o.hit) + '</em>' + esc(o.post) + '</div>';
      return '<a href="' + BASE + o.it.url + '"><span class="pg">' + esc(o.it.page) +
        '</span><b>' + esc(o.it.title) + '</b>' + body + '</a>';
    }).join("");
  }
  function search(term) {
    term = term.trim();
    if (term.length < 2) { hits.innerHTML = ""; return; }
    load().then(function (idx) {
      if (!idx.length) { hits.innerHTML = '<div id="shellnone">' + T.noIndex + '</div>'; return; }
      var t = norm(term), out = [];
      for (var i = 0; i < idx.length && out.length < 40; i++) {
        var it = idx[i], pos = it._b.indexOf(t), inTitle = it._t.indexOf(t) >= 0;
        if (pos < 0 && !inTitle) continue;
        if (pos >= 0) {
          var a = Math.max(0, pos - 55), b = Math.min(it._b.length, pos + t.length + 80);
          out.push({ it: it, score: inTitle ? 0 : 1,
                     pre: (a > 0 ? "…" : "") + it._b.slice(a, pos),
                     hit: it._b.slice(pos, pos + t.length),
                     post: it._b.slice(pos + t.length, b) + (b < it._b.length ? "…" : "") });
        } else out.push({ it: it, score: 0, pre: null, hit: "", post: "" });
      }
      out.sort(function (x, y) { return x.score - y.score; });
      if (!out.length) { hits.innerHTML = '<div id="shellnone">' + T.none + '</div>'; return; }
      render(out);
    });
  }
  var tmr = null;
  q.addEventListener("input", function () {
    clearTimeout(tmr); var v = q.value;
    tmr = setTimeout(function () { search(v); }, 130);
  });
  q.addEventListener("focus", load);
})();
