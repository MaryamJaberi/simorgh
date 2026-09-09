/* ════════════════════════════════════════════════════════════
   پوستهٔ سایت: دکمهٔ شناور + کشوی نقشهٔ سایت + جست‌وجوی سراسری.
   در هر صفحه‌ای تزریق می‌شود و با چیدمانِ آن صفحه کاری ندارد.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var NAV = [
    { g: "شروع", items: [
      { h: "index.html", t: "خانه", d: "از کجا شروع کنم — بر اساس اینکه چه کسی هستید" },
      { h: "gam.html#who", t: "قدمِ تو چیست؟", d: "برای هر جور آدمی، یک کارت با کارهای مشخص" },
      { h: "game.html#qavaed", t: "قواعد بازی", d: "در ده دقیقه بفهمید این چیست" }
    ]},
    { g: "یک قدم", items: [
      { h: "gam.html", t: "چهار یافتهٔ پژوهش", d: "چرا حکومت‌ها ناگهان می‌افتند — و چرا تضمینی نیست" },
      { h: "gam.html#amar", t: "آمار به زبانِ ساده", d: "۵۳٪ در برابر ۲۶٪ · ۳٫۵ درصد یعنی چند نفر" },
      { h: "gam.html#khatar", t: "خطر", d: "آنچه این صفحه دربارهٔ وضعِ شما نمی‌داند" },
      { h: "library.html", t: "کتابخانه", d: "از کجا می‌دانیم — همهٔ منابع، دسته‌بندی‌شده" },
      { h: "shared.html", t: "ایرانیان و اسرائیلی‌ها", d: "۴۷ سال دشمنی، ۲۶۰۰ سال رابطه — با منبع" }
    ]},
    { g: "بازی", items: [
      { h: "game.html#tarikh", t: "هفت شبی که گذشت", d: "۱۳۵۷ تا امروز، هر دور با اسطورهٔ خودش" },
      { h: "map.html", t: "نقشهٔ میز", d: "نمودار ون — چه کسی کجا ایستاده" },
      { h: "game.html#ashkhas", t: "کتابِ شخصیت‌ها", d: "۳۷ نقش، با توصیفِ آمادهٔ تصویرسازی" },
      { h: "roles.html", t: "۴۷ نقشِ جامعه‌شناختی", d: "نسخهٔ گسترده‌ترِ نقش‌ها" },
      { h: "game.html#naghsh-e-nou", t: "ده نقشِ نساخته", d: "آنچه شهر برای بردن لازم دارد" }
    ]},
    { g: "استدلال", items: [
      { h: "game.html#par", t: "پَر", d: "سیمرغ نمادِ چیست و چه باید بسوزد" },
      { h: "game.html#rah", t: "سه راه", d: "سه سناریو و آنکه توصیه می‌شود" },
      { h: "game.html#hazine", t: "برآوردِ هزینه", d: "جانی و مالی — مدل، نه پیش‌بینی" },
      { h: "game.html#naghd", t: "میزِ نقد", d: "نُه جناح این سند را نقد می‌کنند" },
      { h: "game.html#proposal", t: "پروپوزال", d: "همه‌چیز در قالبِ نظریهٔ بازی" }
    ]},
    { g: "روایت و تصویر", items: [
      { h: "game.html#comic", t: "دفترچهٔ کمیک", d: "۴۴ کادر در ۸ پرده، کشیده‌شده" },
      { h: "story.html", t: "خانه‌ای در افسریه", d: "رمانِ رئالیسم جادویی — سه مریم" }
    ]},
    { g: "برای اروپا", items: [
      { h: "europe.html", t: "ارائهٔ اروپا", d: "دوزبانه، با حالتِ اسلاید و یادداشتِ گوینده" },
      { h: "europe.html#sl-asks", t: "شش کارِ مشخص", d: "درخواست‌های عملی از مخاطبِ اروپایی" }
    ]},
    { g: "بایگانی", items: [
      { h: "downloads.html", t: "دانلود و منابع", d: "پاورپوینت، سند QA، ابزارها، فهرست منابع" }
    ]}
  ];

  var here = (location.pathname.split("/").pop() || "index.html");
  var base = (window.SHELL_BASE || "./");

  /* ── دکمه ── */
  var btn = document.createElement("button");
  btn.id = "shellbtn"; btn.type = "button";
  btn.setAttribute("aria-label", "نقشهٔ سایت و جست‌وجو");
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
    '<path d="M4 7h16M4 12h16M4 17h10"/></svg><span>همهٔ مطالب</span>';
  document.body.appendChild(btn);

  /* ── کشو ── */
  var groups = NAV.map(function (g) {
    return '<div class="grp"><h3>' + g.g + '</h3><div class="links">' +
      g.items.map(function (i) {
        var cur = (i.h.split("#")[0] === here) ? ' aria-current="page"' : '';
        return '<a href="' + base + i.h + '"' + cur + '><b>' + i.t + '</b><span>' + i.d + '</span></a>';
      }).join("") + '</div></div>';
  }).join("");

  var box = document.createElement("div");
  box.id = "shell";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "نقشهٔ سایت");
  box.innerHTML =
    '<div class="in">' +
      '<div class="top">' +
        '<span class="brand">پَرِ سیمرغ</span>' +
        '<button class="x" id="shelltheme" type="button">◐ تم</button>' +
        '<button class="x" id="shellclose" type="button">بستن ✕</button>' +
      '</div>' +
      '<input id="shellq" type="search" autocomplete="off" ' +
        'placeholder="جست‌وجو در همهٔ مطالب — مثلاً «ضحاک»، «هزینه»، «رفراندوم»">' +
      '<div id="shellhits"></div>' +
      groups +
      '<div class="foot">هیچ نمادِ حزبی، دولتی یا دینی در این مجموعه به کار نرفته؛ همهٔ نمادها از شاهنامه و اسطوره‌های ایرانی‌اند. ' +
        'هیچ نقلِ‌قولی به شخصِ واقعی نسبت داده نشده مگر با منبع. برآوردهای هزینه <b>مدل</b> هستند، نه پیش‌بینی.</div>' +
    '</div>';
  document.body.appendChild(box);

  var q = document.getElementById("shellq"), hits = document.getElementById("shellhits");

  function open() { document.body.classList.add("shell-open"); setTimeout(function () { q.focus(); }, 40); }
  function close() { document.body.classList.remove("shell-open"); }
  btn.addEventListener("click", open);
  document.getElementById("shellclose").addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("shell-open")) { close(); }
    else if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey)))
             && !e.target.closest("input,textarea,select")) {
      e.preventDefault(); open();
    }
  });

  document.getElementById("shelltheme").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var dark = cur ? cur === "dark"
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
    try { localStorage.setItem("simorgh_theme", dark ? "light" : "dark"); } catch (e) {}
  });
  try {
    var saved = localStorage.getItem("simorgh_theme");
    if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved);
  } catch (e) {}

  /* ════ جست‌وجو ════ */
  var INDEX = null, loading = false;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ── هم‌سان‌سازیِ فارسی ──
     بدونِ این، «ضحاک» هرگز «ضحّاک» را پیدا نمی‌کند، و «كتاب» با کافِ عربی
     با «کتاب» یکی شمرده نمی‌شود. تشدید و اعراب، کاف و یای عربی، همزه،
     نیم‌فاصله، و ارقامِ فارسی/عربی. تابع طولِ رشته را تغییر می‌دهد،
     پس برشِ نمایشی هم از همین متنِ هم‌سان‌شده گرفته می‌شود. */
  function norm(s) {
    return String(s)
      .replace(/[ً-ٰٕـ]/g, "")
      .replace(/ك/g, "ک")
      .replace(/[يى]/g, "ی")
      .replace(/ة/g, "ه")
      .replace(/[آأإؤ]/g, "ا")
      .replace(/[​-‏­]/g, " ")
      .replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); })
      .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function load() {
    if (INDEX) return Promise.resolve(INDEX);
    if (loading) return loading;
    loading = fetch(base + "assets/search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (j) {
        for (var i = 0; i < j.length; i++) {
          j[i]._t = norm(j[i].title);
          j[i]._b = norm(j[i].body);
        }
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
      return '<a href="' + base + o.it.url + '">' +
        '<span class="pg">' + esc(o.it.page) + '</span>' +
        '<b>' + esc(o.it.title) + '</b>' + body + '</a>';
    }).join("");
  }

  function search(term) {
    term = term.trim();
    if (term.length < 2) { hits.innerHTML = ""; return; }
    load().then(function (idx) {
      if (!idx.length) {
        hits.innerHTML = '<div id="shellnone">فهرستِ جست‌وجو در دسترس نیست. ' +
          'اگر فایل را مستقیم از دیسک باز کرده‌اید، جست‌وجو فقط روی نسخهٔ منتشرشده کار می‌کند.</div>';
        return;
      }
      var t = norm(term), out = [];
      for (var i = 0; i < idx.length && out.length < 40; i++) {
        var it = idx[i];
        var pos = it._b.indexOf(t);
        var inTitle = it._t.indexOf(t) >= 0;
        if (pos < 0 && !inTitle) continue;
        if (pos >= 0) {
          var a = Math.max(0, pos - 55);
          var b = Math.min(it._b.length, pos + t.length + 80);
          out.push({
            it: it, score: inTitle ? 0 : 1,
            pre: (a > 0 ? "…" : "") + it._b.slice(a, pos),
            hit: it._b.slice(pos, pos + t.length),
            post: it._b.slice(pos + t.length, b) + (b < it._b.length ? "…" : "")
          });
        } else {
          out.push({ it: it, score: 0, pre: null, hit: "", post: "" });
        }
      }
      out.sort(function (x, y) { return x.score - y.score; });
      if (!out.length) { hits.innerHTML = '<div id="shellnone">چیزی پیدا نشد.</div>'; return; }
      render(out);
    });
  }

  var tmr = null;
  q.addEventListener("input", function () {
    clearTimeout(tmr);
    var v = q.value;
    tmr = setTimeout(function () { search(v); }, 130);
  });
  q.addEventListener("focus", load);
})();
