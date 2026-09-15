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

  /* ══ نمایهٔ تخت ══
     پنج‌پلهٔ قبلی برداشته شد. سلسله‌مراتبی نیست: یک فهرست، و وجه‌هایی که
     غربال می‌کنند نه گروه‌بندی. یک مدخل می‌تواند چند وجه داشته باشد. */
  var FACETS = EN ? {
    shavahed: "Evidence", tarikh: "History", konesh: "Action", ravayat: "Narrative"
  } : {
    shavahed: "شواهد", tarikh: "تاریخ", konesh: "کنش", ravayat: "روایت"
  };
  var NAV = EN ? [
    { h: "index.html",  t: "Index",              d: "Everything, flat", f: [] },
    { h: "../data.html",   t: "The Data Table",     d: "76 claims, each with source and tier", f: ["shavahed"], fa: 1 },
    { h: "../problems.html", t: "Problem Map",  d: "Prevalence against lived severity", f: ["shavahed","konesh"], fa: 1 },
    { h: "../audit.html",  t: "The Audit Log",      d: "What is weak here, in our own words", f: ["shavahed"], fa: 1 },
    { h: "../timeline.html", t: "Timeline",         d: "The same claims, placed on time", f: ["shavahed","tarikh"], fa: 1 },
    { h: "library.html", t: "Library",           d: "50 sources, including those that contradict us", f: ["shavahed"] },
    { h: "shared.html", t: "Iranians & Israelis", d: "47 years of enmity, 2,600 years of contact", f: ["tarikh","shavahed"] },
    { h: "gam.html",    t: "Your Card",          d: "18 cards — the smallest possible step", f: ["konesh"] },
    { h: "../two-irans.html", t: "Two Irans",    d: "500 years of clerical ascent", f: ["tarikh","ravayat"], fa: 1 },
    { h: "../game.html", t: "The Full Game",     d: "12 chapters, unabridged", f: ["ravayat","konesh","tarikh"], fa: 1 },
    { h: "../map.html", t: "The Venn Map",       d: "The diagram reads without Persian", f: ["konesh"], fa: 1 },
    { h: "../roles.html", t: "47 Social Roles",  d: "The expanded role book", f: ["konesh"], fa: 1 },
    { h: "../story.html", t: "A House in Afsariyeh", d: "The novel", f: ["ravayat"], fa: 1 },
    { h: "../europe.html", t: "The Europe Talk", d: "Slide mode and speaker notes", f: ["ravayat","shavahed"] },
    { h: "../downloads.html", t: "Downloads",    d: "Slides, QA documents, tools", f: ["shavahed"], fa: 1 }
  ] : [
    { h: "index.html",  t: "نمایه",               d: "همه‌چیز، تخت و بی‌سلسله‌مراتب", f: [] },
    { h: "data.html",   t: "میزِ داده",            d: "۷۶ ادعا، هر کدام با منبع و ردهٔ اعتبار", f: ["shavahed"] },
    { h: "problems.html", t: "نقشهٔ مشکل‌ها",       d: "دو محور: فراوانی و شدتِ زیسته", f: ["shavahed","konesh"] },
    { h: "audit.html",  t: "دفترِ ممیزی",          d: "چه چیزی این‌جا سست است — به قلمِ خودمان", f: ["shavahed"] },
    { h: "timeline.html", t: "خطِ زمان",           d: "همان ادعاها، این بار روی زمان", f: ["shavahed","tarikh"] },
    { h: "library.html", t: "کتابخانه",           d: "۵۰ منبع، از جمله آن‌ها که ما را رد می‌کنند", f: ["shavahed"] },
    { h: "shared.html", t: "ایرانیان و اسرائیلی‌ها", d: "۴۷ سال دشمنی، ۲۶۰۰ سال رابطه", f: ["tarikh","shavahed"] },
    { h: "two-irans.html", t: "دو ایران",          d: "پانصد سال بالا رفتنِ روحانیت", f: ["tarikh","ravayat"] },
    { h: "gam.html",    t: "قدمِ تو",              d: "۱۸ کارت — کوچک‌ترین قدمِ ممکن", f: ["konesh"] },
    { h: "map.html",    t: "نقشهٔ میز",            d: "نمودارِ ون — سه دایره، هفت ناحیه", f: ["konesh"] },
    { h: "roles.html",  t: "۴۷ نقشِ اجتماعی",      d: "نسخهٔ گسترده‌ترِ نقش‌ها", f: ["konesh"] },
    { h: "game.html",   t: "متنِ کاملِ بازی",       d: "۱۲ دفتر، بی‌خلاصه", f: ["ravayat","konesh","tarikh"] },
    { h: "story.html",  t: "خانه‌ای در افسریه",     d: "رمانِ رئالیسمِ جادویی", f: ["ravayat"] },
    { h: "europe.html", t: "ارائهٔ اروپا",          d: "دوزبانه، با حالتِ اسلاید", f: ["ravayat","shavahed"] },
    { h: "downloads.html", t: "دانلود و منابع",    d: "پاورپوینت، سندهای QA، ابزارها", f: ["shavahed"] }
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


  /* ══════════ نوارِ بالا ══════════ */
  var bar = el("header", { id: "topbar" });
  /* عنوانِ صفحه، و — اگر با لنگر آمده‌ایم — نامِ همان بخش به‌عنوان پلهٔ سوم.
     بدونِ این، کلیک روی «میزِ نقد» آدم را وسطِ یک سندِ ۳۳۶ کیلوبایتی رها می‌کرد
     بی‌آنکه بگوید کجاست. */
  var PAGE_T = document.title.split("\u2014")[0].trim();
  function sectionName(id) {
    if (!id) return null;
    var el = document.getElementById(id);
    if (!el) return null;
    var h = el.matches("h1,h2,h3,h4") ? el
          : el.querySelector("h1,h2,h3,h4")
            || (el.closest("section,article") || el).querySelector("h2,h3");
    var t = h && h.textContent ? h.textContent.replace(/\s+/g, " ").trim() : "";
    if (!t) {
      var b = document.querySelector('[data-go="' + id + '"]');
      t = b && b.textContent ? b.textContent.trim() : "";
    }
    return t && t.length < 60 ? t : null;
  }
  var crumbs =
    '<a class="crumb" href="' + BASE + 'index.html">' + (EN ? "Index" : "نمایه") + '</a>' +
    '<span class="sep" aria-hidden="true">\u203a</span>' +
    '<span class="crumb now" aria-current="page">' + esc(PAGE_T) + '</span>' +
    '<span class="sep sec" aria-hidden="true" hidden>\u203a</span>' +
    '<span class="crumb sec" id="tb-sec" hidden></span>';

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

  /* ══════════ کشو — یک فهرستِ تخت، با غربالِ وجه ══════════ */
  var groups =
    '<div class="grp"><div class="fsieve" role="group" aria-label="' +
      (EN ? "Filter by facet" : "غربالِ وجه") + '">' +
      Object.keys(FACETS).map(function (k) {
        return '<button class="fchip" type="button" data-fc="' + k + '">' +
               esc(FACETS[k]) + '</button>';
      }).join("") +
      '<button class="fchip clear on" type="button" data-fc="">' +
      (EN ? "All" : "همه") + '</button>' +
    '</div><div class="links" id="navlinks">' +
      NAV.map(function (it) {
        var on = (it.h.split("#")[0].replace("../", "") === here) ? ' aria-current="page"' : '';
        return '<a href="' + BASE + it.h + '"' + on + ' data-fc="' + it.f.join(" ") + '">' +
          '<b>' + esc(it.t) +
          (it.fa ? ' <em class="faonly">' + esc(T.faOnly) + '</em>' : '') + '</b>' +
          '<span>' + esc(it.d) + '</span>' +
          (it.f.length ? '<span class="fl">' + it.f.map(function (f) {
            return '<i class="f-' + f + '">' + esc(FACETS[f]) + '</i>'; }).join("") + '</span>' : '') +
        '</a>';
      }).join("") +
    '</div></div>';

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



  /* پلهٔ سوم: بخشی که کاربر واقعاً در آن ایستاده */
  (function () {
    var slot = document.getElementById("tb-sec");
    var sep = document.querySelector("#tb-crumbs .sep.sec");
    if (!slot) return;
    function show(name) {
      if (name) { slot.textContent = name; slot.hidden = false; if (sep) sep.hidden = false; }
      else { slot.hidden = true; if (sep) sep.hidden = true; }
    }
    function fromHash() {
      var id = (location.hash || "").replace(/^#/, "");
      return id ? sectionName(decodeURIComponent(id)) : null;
    }
    show(fromHash());
    window.addEventListener("hashchange", function () { show(fromHash()); });

    /* و وقتی کاربر اسکرول می‌کند، همان بخشی که روی صفحه است */
    var marks = [].slice.call(document.querySelectorAll("section[id], article[id]"))
      .filter(function (el) { return sectionName(el.id); });
    if (marks.length > 2 && "IntersectionObserver" in window) {
      var seen = {};
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { seen[e.target.id] = e.isIntersecting ? e.boundingClientRect.top : null; });
        var best = null, bestTop = Infinity;
        for (var k in seen) {
          if (seen[k] == null) continue;
          if (seen[k] < bestTop) { bestTop = seen[k]; best = k; }
        }
        if (best) show(sectionName(best));
      }, { rootMargin: "-25% 0px -65% 0px" });
      marks.forEach(function (m) { io.observe(m); });
    }
  })();


  /* ══ صفحه‌های قدیمی: لنگر باید واقعاً فرود بیاید ══
     این صفحه‌ها اسکریپتِ خودشان را دارند که بعد از بارگذاری صفحه را
     جابه‌جا می‌کند، پس پرشِ مرورگر به لنگر از بین می‌رفت و کاربر
     بالای سند رها می‌شد — دقیقاً همان «یهو وارد جای دیگری شدم». */
  (function () {
    var rail = document.querySelector(".toc");
    function land() {
      var id = (location.hash || "").replace(/^#/, "");
      if (!id) return;
      id = decodeURIComponent(id);
      var el = document.getElementById(id);
      if (!el) return;
      /* این صفحه‌ها خواننده‌ی فصل‌به‌فصل‌اند: یازده فصل از دوازده فصل
         display:none اند. پس اول باید با ناوبریِ خودشان فصل را عوض کرد،
         وگرنه هر لینکِ عمیق روی فصلِ یکم فرود می‌آید. */
      if (getComputedStyle(el).display === "none") {
        var go = document.querySelector('[data-go="' + id + '"]');
        if (go) { go.click(); return; }
        var p = el.closest("section,article");
        while (p && getComputedStyle(p).display === "none") {
          var g2 = p.id && document.querySelector('[data-go="' + p.id + '"]');
          if (g2) { g2.click(); return; }
          p = p.parentElement && p.parentElement.closest("section,article");
        }
      }
      el.scrollIntoView({ block: "start" });
    }
    if (location.hash) {
      land();
      setTimeout(land, 120);
      setTimeout(land, 420);
      window.addEventListener("load", function () { setTimeout(land, 60); });
    }

    /* و ریلِ فصل‌ها باید بگوید در کدام فصلیم */
    if (!rail) return;
    var btns = [].slice.call(rail.querySelectorAll("button[data-go]"));
    if (!btns.length) return;
    function mark(id) {
      btns.forEach(function (b) {
        var on = b.getAttribute("data-go") === id;
        b.classList.toggle("on", on);
        if (on) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
      var cur = rail.querySelector("button.on");
      if (cur && cur.scrollIntoView) {
        var box = rail.getBoundingClientRect(), cb = cur.getBoundingClientRect();
        if (cb.left < box.left || cb.right > box.right)
          cur.scrollIntoView({ block: "nearest", inline: "center" });
      }
    }
    var targets = btns.map(function (b) {
      return document.getElementById(b.getAttribute("data-go"));
    }).filter(Boolean);
    if ("IntersectionObserver" in window && targets.length) {
      var vis = {};
      var io2 = new IntersectionObserver(function (es) {
        es.forEach(function (e) { vis[e.target.id] = e.isIntersecting ? e.boundingClientRect.top : null; });
        var best = null, top = Infinity;
        for (var k in vis) if (vis[k] != null && vis[k] < top) { top = vis[k]; best = k; }
        if (best) mark(best);
      }, { rootMargin: "-20% 0px -70% 0px" });
      targets.forEach(function (t) { io2.observe(t); });
    }
    rail.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-go]");
      if (b) mark(b.getAttribute("data-go"));
    });
  })();

  /* غربالِ وجه در کشو */
  (function () {
    var sieve = document.querySelector("#shell .fsieve");
    if (!sieve) return;
    sieve.addEventListener("click", function (e) {
      var b = e.target.closest(".fchip"); if (!b) return;
      var f = b.getAttribute("data-fc");
      Array.prototype.forEach.call(sieve.querySelectorAll(".fchip"), function (x) {
        x.classList.toggle("on", x === b);
      });
      Array.prototype.forEach.call(document.querySelectorAll("#navlinks a"), function (a) {
        a.hidden = !!f && (" " + a.getAttribute("data-fc") + " ").indexOf(" " + f + " ") < 0;
      });
    });
  })();

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
    "section[id] > .wrap > h2, h2[id], .steps article[id] > .who, .finds article[id] > h3, .essay section[id] > h3");
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

/* ════════════════════════════════════════════════════════════
   غربالِ صفحه‌ای — میزِ داده و نمایه.
   یک موتور برای هر دو: چیپ‌های data-f/data-v و یک جست‌وجوی متنی.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[ً-ْٰـ]/g, "")
      .replace(/ك/g, "ک").replace(/[يى]/g, "ی")
      .replace(/ة/g, "ه").replace(/[أإآ]/g, "ا")
      .replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x6f0); })
      .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x660); })
      .replace(/‌/g, " ").replace(/\s+/g, " ").trim();
  }
  function wire(opts) {
    var box = document.getElementById(opts.q);
    var items = document.querySelectorAll(opts.items);
    if (!items.length) return;
    var chips = document.querySelectorAll(opts.chips + " .chip[data-f]");
    var clear = document.getElementById(opts.clear);
    var count = document.getElementById(opts.count);
    var none = opts.none ? document.getElementById(opts.none) : null;
    var active = {};

    function apply() {
      var term = norm(box && box.value);
      var shown = 0;
      Array.prototype.forEach.call(items, function (el) {
        var ok = true;
        for (var f in active) {
          if (!active[f]) continue;
          var v = el.getAttribute("data-" + f) || "";
          if ((" " + v + " ").indexOf(" " + active[f] + " ") < 0) { ok = false; break; }
        }
        if (ok && term) ok = norm(el.getAttribute("data-q")).indexOf(term) >= 0;
        el.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = opts.label(shown, items.length);
      if (none) none.hidden = shown !== 0;
    }
    Array.prototype.forEach.call(chips, function (c) {
      c.addEventListener("click", function () {
        var f = c.getAttribute("data-f"), v = c.getAttribute("data-v");
        var off = active[f] === v;
        active[f] = off ? null : v;
        Array.prototype.forEach.call(chips, function (x) {
          if (x.getAttribute("data-f") === f) x.classList.remove("on");
        });
        if (!off) c.classList.add("on");
        apply();
      });
    });
    if (clear) clear.addEventListener("click", function () {
      active = {}; if (box) box.value = "";
      Array.prototype.forEach.call(chips, function (x) { x.classList.remove("on"); });
      apply();
    });
    if (box) box.addEventListener("input", apply);
    apply();
  }
  var EN = (document.documentElement.getAttribute("lang") || "fa") === "en";
  function fa(n) { return EN ? String(n) : String(n).replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }

  wire({ q: "cq", items: ".claims .cl", chips: ".filters", clear: "cclear",
         count: "ccount", none: "cnone",
         label: function (n, t) {
           return EN ? n + " of " + t + " claims shown"
                     : fa(n) + " ادعا از " + fa(t) + " نشان داده می‌شود"; } });
  wire({ q: "pq", items: ".pmap .dot, .claims .pr", chips: ".filters", clear: "pclear",
         count: "pcount", none: "pnone",
         label: function (n, t) {
           var d = document.querySelectorAll(".claims .pr").length || 1;
           return fa(Math.round(n / (n && t ? (t / d) : 1))) + " مشکل از " + fa(d); } });
  wire({ q: "ixq", items: ".ixgrid .ix", chips: ".ixf", clear: "ixclear",
         count: "ixcount",
         label: function (n, t) {
           return EN ? n + " of " + t + " entries"
                     : fa(n) + " مدخل از " + fa(t); } });
})();
