/* wf-site.v4.js — WRGB site enhancements: logo, clients strip, Cases tabs + thumbnails, Wanderlust skin on case pages, EN/ES/PT (footer switcher), pre-filled contact/WhatsApp/Calendly. Loaded from index.html, /services/, /eugene-marathon-hq/ and /wanderlust/. */
(function () {
  if (window.__wfSite) return; window.__wfSite = 1;
  var D = document, LS = window.localStorage;
  var ASSET = '/_components/v2/90980ec4ed9318ede77c88e6988c1b4246719960/';
  var LOGO = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 588 315"><path fill="#3cb54e" d="M225 281C214 263 173 192 154 159C112 87 115 94 122 81C127 70 153 26 154 27C154 27 156 30 158 33C160 37 178 67 197 100C224 146 233 160 234 159C235 157 279 82 293 57C308 30 311 26 324 24C326 24 385 24 455 24L582 24L570 45C548 86 546 88 537 90C533 91 507 91 445 91C360 92 359 92 355 94C348 97 343 102 334 119C313 157 243 276 236 287L232 293L225 281ZM110 288C105 279 25 143 9 114L2 102L2 92C2 83 2 82 5 75C10 65 33 27 34 27C35 27 116 166 129 189C147 222 148 233 138 254C133 262 114 291 113 291C113 291 112 290 110 288Z"/><path fill="#2e7b3e" d="M341 298C327 277 308 249 307 246C306 239 310 230 346 171C371 130 371 129 376 126L380 122L453 122C493 122 526 122 526 123C526 123 499 171 494 178C488 189 488 189 458 189C409 190 412 187 369 267C358 288 348 306 348 306C348 307 345 303 341 298Z"/></svg>');

  /* ---------- styles ---------- */
  var css = [
    'img.wf-logo{mix-blend-mode:normal!important;object-fit:contain}',
    '.wf-langbar{display:flex;align-items:center;gap:14px;flex-wrap:wrap}',
    '.wf-langbar>span{font:500 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#7d7d78}',
    '.wf-lang{display:inline-flex;align-items:center;gap:2px;padding:4px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.03)}',
    '.wf-lang button{background:none;border:0;border-radius:999px;color:#8a8a85;padding:7px 13px;cursor:pointer;font:500 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.14em;transition:background .2s,color .2s}',
    '.wf-lang button:hover{color:#f4f4f1;background:rgba(255,255,255,.06)}.wf-lang button.on{background:#c8f135;color:#080808}',
    '.wf-langbar-block{width:100%;display:flex;justify-content:flex-start;padding-top:18px;margin-top:18px;border-top:1px solid rgba(255,255,255,.06)}',
    /* clients strip */
    '.wf-clients{padding:56px 24px;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);background:#0b0b0b}',
    '.wf-clients h2{font:700 12px/1 Inter,system-ui,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#c8f135;text-align:center;margin:0 0 36px}',
    '.wf-clients ul{list-style:none;margin:0 auto;padding:0;max-width:1280px;display:grid;grid-template-columns:repeat(2,1fr);gap:28px 24px;align-items:center}',
    '@media(min-width:640px){.wf-clients ul{grid-template-columns:repeat(4,1fr)}}@media(min-width:1024px){.wf-clients ul{grid-template-columns:repeat(7,1fr)}}',
    '.wf-clients li{display:flex;align-items:center;justify-content:center;height:84px}',
    '.wf-clients img{max-height:52px;max-width:150px;width:auto;height:auto;opacity:.72;transition:opacity .2s}',
    '.wf-clients li:hover img{opacity:1}',
    '.wf-clients img.t{filter:brightness(0) invert(1)}','.wf-clients img.g{filter:grayscale(1) brightness(2.1) contrast(1.1)}',
    '.wf-clients img.o{filter:grayscale(1) invert(1) brightness(1.15) contrast(1.6);mix-blend-mode:screen}',
    /* cases */
    /* cases: pill tabs */
    '[data-wf-tabs]{display:inline-flex!important;width:max-content;max-width:100%;gap:4px!important;padding:6px;border:1px solid rgba(255,255,255,.09)!important;border-radius:999px;background:rgba(17,17,17,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 20px 50px -20px rgba(0,0,0,.8);position:sticky;top:92px;z-index:20;overflow-x:auto;scrollbar-width:none}',
    '[data-wf-tabs]::-webkit-scrollbar{display:none}',
    '[data-wf-tabs]>button{border:0!important;border-radius:999px!important;margin:0!important;padding:12px 22px!important;font:500 12px/1 "JetBrains Mono",ui-monospace,monospace!important;letter-spacing:.14em!important;color:#8a8a85!important;background:transparent;transition:background .25s,color .25s,box-shadow .25s}',
    '[data-wf-tabs]>button:hover{color:#f4f4f1!important;background:rgba(255,255,255,.06)}',
    '[data-wf-tabs]>button[data-wf-ux]{order:-1}',
    '[data-wf-tabs]>button[class*="border-[#c8f135]"]{background:#c8f135;color:#080808!important;box-shadow:0 10px 30px -8px rgba(200,241,53,.55)}',
    /* cases: cards */
    '[data-wf-card]{border-radius:16px!important;overflow:hidden;border-color:#232323!important;transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .25s,box-shadow .35s}',
    'a[data-wf-card]:hover{transform:translateY(-4px);border-color:rgba(200,241,53,.45)!important;box-shadow:0 30px 60px -30px rgba(0,0,0,.9)}',
    'a[data-wf-card] img{transition:transform .6s cubic-bezier(.2,.7,.2,1)}a[data-wf-card]:hover img{transform:scale(1.03)}',
    '[data-wf-hero]{overflow:hidden}',
    '[data-wf-hero]::before{content:"";display:block;aspect-ratio:var(--wf-ar,16/10);background:#080808 var(--wf-img) var(--wf-pos,center)/cover no-repeat;margin:calc(-1*var(--wf-pt,0px)) calc(-1*var(--wf-pr,0px)) 24px calc(-1*var(--wf-pl,0px));border-bottom:1px solid #1d1d1d}',
    /* case pages: Wanderlust skin */
    'body[data-wf-case] main h1{font-family:Syne,sans-serif!important;font-weight:800!important;letter-spacing:-.03em!important;line-height:1!important;font-size:clamp(40px,7vw,84px)!important;text-wrap:balance;max-width:100%!important}body[data-wf-case] h1.wf-long{font-size:clamp(34px,4.6vw,60px)!important;line-height:1.04!important}',
    'body[data-wf-case] main h2{font-family:Syne,sans-serif!important;font-weight:700!important;letter-spacing:-.02em!important;line-height:1.1!important;text-wrap:balance}',
    'body[data-wf-case] main h3,body[data-wf-case] main h4{font-family:Syne,sans-serif!important;font-weight:700!important;letter-spacing:-.01em!important}',
    'body[data-wf-case] main [class*="uppercase"]{font-family:"JetBrains Mono",ui-monospace,monospace!important;font-weight:500!important;letter-spacing:.16em!important}',
    'body[data-wf-case] main section+section{border-top:1px solid #232323}',
    'body[data-wf-case] main p{color:#c9c9c3}',
    'body[data-wf-case] main [class*="bg-[#1a1a1a]"],body[data-wf-case] main [class*="bg-[#111"],body[data-wf-case] main [class*="bg-[#141414]"]{background:#111!important;border-color:#232323!important}',
    'body[data-wf-case] main [class*="rounded"]{border-radius:12px}',
    'body[data-wf-case] main [class*="rounded-full"]{border-radius:999px}',
    'body[data-wf-case] main a[class*="bg-[#c8f135]"],body[data-wf-case] main button[class*="bg-[#c8f135]"]{border-radius:8px!important}',
    '.wf-cover{max-width:1280px;margin:8px auto 0;padding:0 24px 56px}@media(min-width:768px){.wf-cover{padding:0 48px 72px}}',
    '.wf-cover img{display:block;width:100%;height:auto;max-height:78vh;object-fit:contain;border-radius:16px;border:1px solid #232323;background:#080808;box-shadow:0 50px 90px -50px rgba(var(--wf-acc,200,241,53),.45)}',
    'body[data-wf-case] main img.wf-shot{box-sizing:border-box;padding:clamp(8px,1.6vw,20px);background:radial-gradient(130% 120% at 15% 0%,rgba(var(--wf-acc,200,241,53),.20),rgba(12,12,12,0) 55%),radial-gradient(1px 1px at 1px 1px,rgba(255,255,255,.07) 1px,transparent 0) 0 0/18px 18px,#0c0c0c!important;border:1px solid #242424!important;border-radius:16px!important;box-shadow:0 40px 80px -46px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.02) inset;transition:transform .5s cubic-bezier(.2,.7,.2,1),border-color .3s}',
    'body[data-wf-case] main img.wf-shot:hover{transform:translateY(-3px);border-color:rgba(var(--wf-acc,200,241,53),.45)!important}',
    '.wf-live{max-width:1280px;margin:0 auto;padding:8px 24px 72px}@media(min-width:768px){.wf-live{padding:8px 48px 96px}}',
    '.wf-live-hd{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;margin-bottom:22px}.wf-live-k{display:inline-flex;align-items:center;gap:9px;font:500 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase;color:#c8f135;border:1px solid rgba(200,241,53,.35);border-radius:999px;padding:8px 13px}',
    '.wf-live-k i{width:7px;height:7px;border-radius:50%;background:#c8f135;box-shadow:0 0 0 0 rgba(200,241,53,.7);animation:wfpulse 1.8s infinite}@keyframes wfpulse{70%{box-shadow:0 0 0 9px rgba(200,241,53,0)}100%{box-shadow:0 0 0 0 rgba(200,241,53,0)}}',
    '.wf-live-note{margin:0;flex:1 1 260px;color:#a9a9a3!important;font-size:14px}.wf-live-open{font:500 12px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.08em;color:#0b0b0b;background:#c8f135;border-radius:8px;padding:11px 15px;text-decoration:none;white-space:nowrap}',
    '.wf-live-stage{position:relative;border:1px solid #232323;border-radius:20px;padding:clamp(16px,3.4vw,48px);background:radial-gradient(90% 120% at 10% 0%,rgba(var(--wf-acc,200,241,53),.22),transparent 55%),radial-gradient(1px 1px at 1px 1px,rgba(255,255,255,.08) 1px,transparent 0) 0 0/22px 22px,#0a0a0a;display:flex;align-items:flex-end;justify-content:center;gap:clamp(16px,3vw,40px);overflow:hidden}',
    '.wf-scale{position:relative;overflow:hidden;width:100%}.wf-scale>iframe{position:absolute;left:0;top:0;border:0;transform-origin:0 0;background:#fff}',
    '.wf-browser{flex:1 1 auto;min-width:0;border-radius:12px;overflow:hidden;background:#151515;border:1px solid #2a2a2a;box-shadow:0 60px 100px -50px #000}.wf-bar{display:flex;align-items:center;gap:6px;height:34px;padding:0 12px;background:#161616;border-bottom:1px solid #262626}.wf-bar i{width:10px;height:10px;border-radius:50%;background:#ff5f57}.wf-bar i+i{background:#febc2e}.wf-bar i+i+i{background:#28c840}.wf-bar span{margin-left:12px;flex:1;max-width:340px;font:500 11px/22px "JetBrains Mono",monospace;color:#8a8a85;background:#0d0d0d;border-radius:6px;padding:0 10px}',
    '.wf-browser .wf-scale>iframe{width:1440px;height:860px}.wf-phone .wf-scale>iframe{width:390px;height:780px}',
    '.wf-phone{position:relative;flex:0 0 auto;width:clamp(220px,24vw,300px);padding:10px;border-radius:42px;background:linear-gradient(145deg,#2b2b2b,#0e0e0e);border:1px solid #333;box-shadow:0 60px 100px -45px #000,0 0 0 1px rgba(255,255,255,.04) inset}.wf-phone .wf-scale,.wf-phone .wf-scr{border-radius:32px;overflow:hidden}.wf-notch{position:absolute;z-index:2;top:18px;left:50%;width:30%;height:22px;margin-left:-15%;border-radius:20px;background:#050505}',
    '.wf-scr{position:relative;aspect-ratio:390/780;background:#fff;container-type:size}.wf-scr img{display:block;width:100%;height:auto;animation:wfscroll 46s cubic-bezier(.45,0,.55,1) infinite alternate}.wf-scr:hover img{animation-play-state:paused}@keyframes wfscroll{0%,6%{transform:translateY(0)}94%,100%{transform:translateY(calc(-100% + 100cqh))}}',
    '.wf-live-scroll .wf-phone-s:nth-child(2){transform:translateY(-34px)}',
    '@media(max-width:759px){.wf-live-frame .wf-browser{display:none}.wf-live-stage{padding:22px 14px;gap:12px}.wf-phone{width:min(78vw,300px)}.wf-live-scroll .wf-phone-s{width:min(39vw,220px);padding:7px;border-radius:30px}.wf-live-scroll .wf-phone-s .wf-scr{border-radius:24px}.wf-live-scroll .wf-phone-s:nth-child(2){transform:translateY(-18px)}.wf-notch{top:12px;height:14px}}',
    '@media(prefers-reduced-motion:reduce){.wf-scr{overflow-y:auto}.wf-scr img{animation:none}}',
    '@media(max-width:640px){[data-wf-tabs]{display:grid!important;grid-template-columns:1fr 1fr;width:100%!important;max-width:100%!important;border-radius:18px!important;padding:5px!important;gap:4px!important;top:84px}[data-wf-tabs]>button{padding:13px 6px!important;font-size:10.5px!important;letter-spacing:.1em!important;border-radius:13px!important;white-space:nowrap;text-align:center}main section.py-16{padding-top:48px!important;padding-bottom:48px!important}main section.wf-hero.py-16{padding-bottom:40px!important}main section.wf-hero,section.wf-hero{padding-top:24px!important;min-height:0!important}section.hero{padding-top:28px!important}.wrap.hero{padding-top:16px!important}body .sec{padding-top:64px!important;padding-bottom:64px!important}body[data-wf-case] main h1{font-size:34px!important;line-height:1.02!important}body[data-wf-case] main h1.wf-long{font-size:27px!important;line-height:1.08!important}}'
  ].join('');
  var st = D.createElement('style'); st.id = 'wf-site-css'; st.textContent = css; (D.head || D.documentElement).appendChild(st);

  /* ---------- i18n ---------- */
  var H = function (s) { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); };
  var norm = function (t) { return t.replace(/\s+/g, ' ').trim(); };
  var EXTRA = {
    'Selected clients': ['Clientes seleccionados', 'Clientes selecionados'],
    'Language': ['Idioma', 'Idioma'],
    'Web app': ['App web', 'Web app'],
    'Geofence': ['Geocerca', 'Geocerca'],
    'Social': ['Social', 'Social'],
    'Shopify Plus · Alchemy theme': ['Shopify Plus · theme Alchemy', 'Shopify Plus · tema Alchemy'],
    'Parchita — Passion Fruit / Maracuyá': ['Parchita — Maracuyá', 'Parchita — Maracujá'],
    'Óculos de Grau — Promotional Brochure': ['Óculos de Grau — Folleto promocional', 'Óculos de Grau — Folheto promocional'],
    'iOS + Android + Web': ['iOS + Android + Web', 'iOS + Android + Web']
  };
  var DICT = {};
  function loadDict() {
    var src = window.WF_I18N || {}; for (var k in src) DICT[k] = src[k];
    for (var e in EXTRA) DICT[H(e)] = EXTRA[e];
  }
  var LANGS = ['en', 'es', 'pt'];
  function pickLang() {
    var q = (location.search.match(/[?&]lang=(en|es|pt)\b/) || [])[1];
    if (q) { try { LS.setItem('wf-lang', q); } catch (e) {} return q; }
    try { var s = LS.getItem('wf-lang'); if (s && LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return n === 'pt' || n === 'es' ? n : 'en';
  }
  var lang = pickLang();
  var orig = new WeakMap();      // text node -> english
  var origAttr = new WeakMap();  // element -> {attr: english}
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  var busy = false;
  function skip(el) { return !el || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE)$/.test(el.tagName) || (el.closest && el.closest('.wf-lang,[translate="no"]')); }
  function trText(n) {
    var p = n.parentElement; if (skip(p)) return;
    var v = n.nodeValue; var en = orig.get(n);
    // node changed by the app since we touched it: treat current value as new english source
    if (en !== undefined && v !== en && !isOurs(n, v)) { en = undefined; }
    if (en === undefined) { var key = norm(v); if (!key || !DICT[H(key)]) { return; } en = v; orig.set(n, en); }
    var t = lang === 'en' ? null : DICT[H(norm(en))];
    var out = t ? keepSpace(en, t[lang === 'es' ? 0 : 1]) : en;
    if (n.nodeValue !== out) n.nodeValue = out;
  }
  function isOurs(n, v) { var en = orig.get(n); if (en === undefined) return false; var t = DICT[H(norm(en))]; return !!t && (v === keepSpace(en, t[0]) || v === keepSpace(en, t[1])); }
  function keepSpace(src, t) { var a = src.match(/^\s*/)[0], b = src.match(/\s*$/)[0]; return a + t + b; }
  function trAttrs(el) {
    if (skip(el)) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i]; if (!el.hasAttribute(a)) continue;
      var m = origAttr.get(el) || {}; var v = el.getAttribute(a); var en = m[a];
      if (en === undefined || (v !== en && !attrOurs(en, v))) { if (!DICT[H(norm(v))]) continue; en = v; m[a] = en; origAttr.set(el, m); }
      var t = lang === 'en' ? null : DICT[H(norm(en))]; var out = t ? t[lang === 'es' ? 0 : 1] : en;
      if (v !== out) el.setAttribute(a, out);
    }
  }
  function attrOurs(en, v) { var t = DICT[H(norm(en))]; return !!t && (v === t[0] || v === t[1]); }
  function translate(root) {
    if (!root) return; busy = true;
    try {
      if (root.nodeType === 3) { trText(root); return; }
      var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT), n; while ((n = w.nextNode())) trText(n);
      if (root.querySelectorAll) { if (root.nodeType === 1) trAttrs(root); var els = root.querySelectorAll('[placeholder],[aria-label],img[alt],[title]'); for (var i = 0; i < els.length; i++) trAttrs(els[i]); }
      if (!translate.t0) translate.t0 = D.title;
      var tt = DICT[H(norm(translate.t0))]; D.title = lang !== 'en' && tt ? tt[lang === 'es' ? 0 : 1] : translate.t0;
    } finally { busy = false; }
  }
  function setLang(l) {
    lang = l; try { LS.setItem('wf-lang', l); } catch (e) {}
    D.documentElement.lang = l === 'pt' ? 'pt-BR' : l;
    translate(D.body); paintSwitch();
    var lb = D.querySelector('.wf-langlab'); if (lb) lb.textContent = { en: 'Language', es: 'Idioma', pt: 'Idioma' }[l];
  }
  function paintSwitch() { var bs = D.querySelectorAll('.wf-lang button'); for (var i = 0; i < bs.length; i++) bs[i].className = bs[i].getAttribute('data-l') === lang ? 'on' : ''; }
  function makeSwitch(extra) {
    var w = D.createElement('div'); w.className = 'wf-lang ' + (extra || ''); w.setAttribute('translate', 'no'); w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Language');
    LANGS.forEach(function (l) { var b = D.createElement('button'); b.type = 'button'; b.textContent = l.toUpperCase(); b.setAttribute('data-l', l); b.setAttribute('lang', l); b.onclick = function (e) { e.preventDefault(); setLang(l); }; w.appendChild(b); });
    return w;
  }
  function mountSwitch() {
    var hdr = D.querySelectorAll('header .wf-lang, nav .wf-lang'); for (var i = 0; i < hdr.length; i++) hdr[i].remove();
    if (D.querySelector('footer .wf-langbar')) return;
    var f = D.querySelector('footer'); if (!f) return;
    var bar = D.createElement('div'); bar.className = 'wf-langbar'; bar.setAttribute('translate', 'no');
    var lab = D.createElement('span'); lab.textContent = { en: 'Language', es: 'Idioma', pt: 'Idioma' }[lang]; lab.className = 'wf-langlab'; bar.appendChild(lab); bar.appendChild(makeSwitch());
    var leaf = [].slice.call(f.querySelectorAll('p,span,div')).filter(function (e) { return !e.children.length && /©|All rights reserved|Todos los derechos|Todos os direitos/.test(e.textContent); })[0];
    var row = leaf; while (row && row !== f && getComputedStyle(row).display !== 'flex') row = row.parentElement;
    if (row && row !== f) { row.appendChild(bar); }
    else { var host = f.querySelector('.wrap') || f; var blk = D.createElement('div'); blk.className = 'wf-langbar-block'; blk.appendChild(bar); host.appendChild(blk); }
    paintSwitch();
  }

  /* ---------- logo ---------- */
  function swapLogos() {
    var imgs = D.querySelectorAll('img[src*="7b204dec7b0144332f268e7ce1a3559b1704b82c"]');
    for (var i = 0; i < imgs.length; i++) { var im = imgs[i]; im.src = LOGO; im.classList.add('wf-logo'); if (im.alt) im.alt = 'Wendel Freitas'; }
    var tl = D.querySelector('header a.logo:not([data-wf])');
    if (tl && !tl.querySelector('img')) { tl.setAttribute('data-wf', '1'); tl.innerHTML = '<img class="wf-logo" src="' + LOGO + '" alt="Wendel Freitas" style="height:34px;width:auto;display:block">'; }
  }

  /* ---------- clients strip (home) ---------- */
  var CLIENTS = [
    ['Marie Birdie', '/wf-assets/client-marie-birdie.png', 'g', 'max-height:82px;max-width:120px'],
    ['Mitchell Brands', '/wf-assets/client-mitchell-brands.png', 'o'],
    ['Fair & White', '/wf-assets/client-fair-and-white.png', 't'],
    ['Omic Skincare', '/wf-assets/client-omic.png', 't', 'max-width:118px'],
    ['Al Socio', '/wf-assets/client-al-socio-logo.png', 'o'],
    ['Prô Mundo Psicologia', '/wf-assets/client-pro-mundo.png', 't'],
    ['Yes Australia', '/wf-assets/client-yes-australia-logo.png', 'o', 'max-height:74px']
  ];
  function mountClients() {
    if (location.pathname !== '/' || D.querySelector('.wf-clients')) return;
    var hero = D.querySelector('main section, section'); if (!hero || !/We grow brands|Hacemos crecer|Fazemos marcas/.test(hero.textContent)) return;
    var s = D.createElement('section'); s.className = 'wf-clients'; s.setAttribute('aria-label', 'Selected clients');
    var h = D.createElement('h2'); h.textContent = 'Selected clients'; s.appendChild(h);
    var ul = D.createElement('ul');
    CLIENTS.forEach(function (c) { var li = D.createElement('li'); var im = D.createElement('img'); im.src = c[1]; im.alt = c[0]; im.title = c[0]; im.loading = 'lazy'; im.className = c[2]; if (c[3]) im.style.cssText = c[3]; li.appendChild(im); ul.appendChild(li); });
    s.appendChild(ul); hero.parentNode.insertBefore(s, hero.nextSibling); translate(s);
  }

  /* ---------- cases ---------- */
  var T = '/wf-assets/thumb-';
  var THUMB = {
    '/cases/marie-birdie-ux': T + 'ux-marie-birdie.v2.webp', '/cases/pro-mundo-ux': T + 'ux-pro-mundo.v2.webp',
    '/cases/yes-australia-ux': T + 'ux-yes-australia.v2.webp', '/cases/alsocio-ux': T + 'ux-al-socio.v2.webp',
    '/cases/al-socio': T + 'app-al-socio.v2.webp', '/cases/rundate-miami': T + 'app-rundate.v2.webp',
    '/eugene-marathon-hq/': T + 'app-eugene.webp', '/wanderlust/': T + 'app-wanderlust.webp', '/al-socio/': T + 'app-al-socio.v2.webp', '/cases/wanderlust-ux': T + 'app-wanderlust.webp',
    '/cases/book-covers': T + 'print-books.v2.webp', '/cases/print-collateral': T + 'print-collateral.v2.webp', '/cases/packaging': T + 'print-packaging.v2.webp',
    '/cases/marie-birdie': T + 'data-marie-birdie.v2.webp', '/cases/mitchell-brands': T + 'data-mitchell.v2.webp', '/cases/alsocio': T + 'data-alsocio.v2.webp'
  };
  var C = '/wf-assets/cover-';
  var COVER = { '/cases/marie-birdie-ux': 'ux-marie-birdie', '/cases/pro-mundo-ux': 'ux-pro-mundo', '/cases/yes-australia-ux': 'ux-yes-australia', '/cases/alsocio-ux': 'ux-al-socio', '/cases/marie-birdie': 'data-marie-birdie', '/cases/mitchell-brands': 'data-mitchell', '/cases/alsocio': 'data-alsocio', '/cases/book-covers': 'print-books', '/cases/print-collateral': 'print-collateral', '/cases/packaging': 'print-packaging' };
  var ACC = { 'ux-marie-birdie': '230,0,126', 'ux-pro-mundo': '122,92,255', 'ux-yes-australia': '208,57,43', 'ux-al-socio': '241,86,44', 'data-marie-birdie': '230,0,126', 'data-mitchell': '193,39,45', 'data-alsocio': '241,86,44', 'print-books': '212,162,76', 'print-collateral': '233,78,27', 'print-packaging': '89,168,61' };
  var LIVE = {
    '/cases/pro-mundo-ux': { kind: 'frame', url: 'https://psicopromundo.com.br/', host: 'psicopromundo.com.br' },
    '/cases/marie-birdie-ux': { kind: 'scroll', url: 'https://mariebirdie.com/', host: 'mariebirdie.com', shots: ['/wf-assets/live-mb-home.webp', '/wf-assets/live-mb-pdp.webp'] }
  };
  var LIVE_TX = {
    en: { k: 'Live preview', frame: 'The real site, running inside this page. Scroll and tap it.', scroll: 'The real storefront, captured from the live site. Hover to pause.', open: 'Open live site' },
    es: { k: 'Vista en vivo', frame: 'El sitio real, funcionando dentro de esta página. Desplázate y tócalo.', scroll: 'La tienda real, capturada del sitio en vivo. Pasa el cursor para pausar.', open: 'Abrir sitio en vivo' },
    pt: { k: 'Prévia ao vivo', frame: 'O site real, rodando dentro desta página. Role e toque nele.', scroll: 'A loja real, capturada do site no ar. Passe o mouse para pausar.', open: 'Abrir site no ar' }
  };
  function lng() { var l = (D.documentElement.lang || 'en').slice(0, 2).toLowerCase(); return LIVE_TX[l] ? l : 'en'; }
  function setTx(el, t) { if (el && el.textContent !== t) el.textContent = t; }
  function fitFrames(box) {
    [].forEach.call((box || D).querySelectorAll('.wf-scale'), function (w) {
      var f = w.firstElementChild; if (!f) return; var bw = +w.getAttribute('data-w'), s = w.clientWidth / bw;
      f.style.transform = 'scale(' + s + ')'; w.style.height = (+w.getAttribute('data-h') * s) + 'px';
    });
  }
  window.addEventListener('resize', function () { fitFrames(); });
  function liveBlock(p, after) {
    var cfg = LIVE[p], ex = D.querySelector('.wf-live');
    if (ex && ex.getAttribute('data-p') !== p) { ex.remove(); ex = null; }
    if (!cfg) return;
    var t = LIVE_TX[lng()];
    if (!ex) {
      ex = D.createElement('section'); ex.className = 'wf-live wf-live-' + cfg.kind; ex.setAttribute('data-p', p);
      var h = '<div class="wf-live-hd"><span class="wf-live-k"><i></i><b></b></span><p class="wf-live-note"></p><a class="wf-live-open" target="_blank" rel="noopener" href="' + cfg.url + '"><span></span> \u2197</a></div><div class="wf-live-stage">';
      if (cfg.kind === 'frame') {
        h += '<div class="wf-browser"><div class="wf-bar"><i></i><i></i><i></i><span>' + cfg.host + '</span></div><div class="wf-scale" data-w="1440" data-h="860"><iframe loading="lazy" title="' + cfg.host + '" src="' + cfg.url + '"></iframe></div></div>';
        h += '<div class="wf-phone"><div class="wf-notch"></div><div class="wf-scale" data-w="390" data-h="780"><iframe loading="lazy" title="' + cfg.host + ' mobile" src="' + cfg.url + '"></iframe></div></div>';
      } else {
        cfg.shots.forEach(function (u, i) { h += '<div class="wf-phone wf-phone-s"><div class="wf-notch"></div><div class="wf-scr"><img src="' + u + '" alt="' + cfg.host + '" loading="lazy" style="animation-delay:-' + (i * 9) + 's"></div></div>'; });
      }
      ex.innerHTML = h + '</div>';
      after.parentNode.insertBefore(ex, after.nextSibling);
      setTimeout(function () { fitFrames(ex); }, 30);
    }
    setTx(ex.querySelector('.wf-live-k b'), t.k); setTx(ex.querySelector('.wf-live-note'), t[cfg.kind]); setTx(ex.querySelector('.wf-live-open span'), t.open);
  }
  function tagShots() {
    var m = D.querySelector('main'); if (!m) return;
    [].forEach.call(m.querySelectorAll('img'), function (im) {
      if (im.classList.contains('wf-shot') || im.closest('.wf-cover,.wf-live,a,button,nav,header,footer')) return;
      if (!im.complete) { if (!im.getAttribute('data-wf-w')) { im.setAttribute('data-wf-w', '1'); im.addEventListener('load', tagShots, { once: true }); } return; }
      if (im.naturalWidth >= 480 && im.getBoundingClientRect().width >= 220) im.classList.add('wf-shot');
    });
  }
  var DATA_HERO = { 'Marie Birdie': T + 'data-marie-birdie.v2.webp', 'Mitchell Brands (MB USA)': T + 'data-mitchell.v2.webp', 'AlSocio': T + 'data-alsocio.v2.webp' };
  function heroize(el, url, ar) {
    if (el.getAttribute('data-wf-hero') === url) return;
    var cs = getComputedStyle(el);
    el.style.setProperty('--wf-img', 'url("' + url + '")'); el.style.setProperty('--wf-pos', 'center'); if (ar) el.style.setProperty('--wf-ar', ar);
    el.style.setProperty('--wf-pt', cs.paddingTop); el.style.setProperty('--wf-pr', cs.paddingRight); el.style.setProperty('--wf-pl', cs.paddingLeft);
    el.setAttribute('data-wf-hero', url);
  }
  function enhanceCases() {
    if (location.pathname !== '/cases' && location.pathname !== '/cases/') return;
    var tabs = [].slice.call(D.querySelectorAll('button')).filter(function (b) { return /^(data & analytics|datos y analítica|dados e analytics|app|ux|print|impresos|impressos)$/i.test(norm(b.textContent)); });
    if (tabs.length) {
      var bar = tabs[0].parentElement;
      tabs.forEach(function (b) { if (/^ux$/i.test(norm(b.textContent))) b.setAttribute('data-wf-ux', '1'); });
      if (!bar.getAttribute('data-wf-tabs')) {
        bar.setAttribute('data-wf-tabs', '1');
        var ux = bar.querySelector('[data-wf-ux]'); if (ux && !/c8f135/.test(ux.className)) setTimeout(function () { ux.click(); }, 0);
      }
    }
    var cards = D.querySelectorAll('main a[href^="/cases/"], main a[href^="/eugene"], main a[href^="/wanderlust"], main a[href^="/al-socio"]');
    for (var i = 0; i < cards.length; i++) {
      var a = cards[i], href = a.getAttribute('href'), u = THUMB[href]; a.setAttribute('data-wf-card', '1');
      if (!u) continue;
      var im = a.querySelector('img');
      if (im) { if (im.getAttribute('src') !== u) { im.src = u; im.removeAttribute('srcset'); im.style.objectFit = 'cover'; im.style.objectPosition = 'center'; im.style.width = '100%'; im.style.height = '100%'; } }
      else heroize(a, u, '16/10');
    }
    var leaves = D.querySelectorAll('section div');
    for (var j = 0; j < leaves.length; j++) {
      var e = leaves[j]; if (e.children.length) continue; var t = norm(e.textContent); if (!DATA_HERO[t]) continue;
      var c = e; while (c.parentElement && !/max-w-7xl/.test(c.parentElement.className)) c = c.parentElement;
      if (!c.parentElement || c.style.display === 'none') continue;
      c.setAttribute('data-wf-card', '1'); heroize(c, DATA_HERO[t], '1200/456');
    }
  }
  function alsocioCta(p) {
    var ex = D.getElementById('wf-as-cta');
    if (p !== '/cases/al-socio') { if (ex) ex.remove(); return; }
    var l = (D.documentElement.lang || 'en').slice(0, 2);
    var tx = { en: ['Live prototype', 'Try the interactive Al Socio app and ops dashboard', 'Open →'], es: ['Prototipo en vivo', 'Prueba la app interactiva de Al Socio y el panel de operaciones', 'Abrir →'], pt: ['Protótipo ao vivo', 'Teste o app interativo do Al Socio e o painel de operações', 'Abrir →'] }[l] || null;
    if (!tx) tx = ['Live prototype', 'Try the interactive Al Socio app and ops dashboard', 'Open →'];
    if (ex && ex.getAttribute('data-l') === l) return;
    if (ex) ex.remove();
    var h1 = D.querySelector('main h1'); if (!h1) return;
    var a = D.createElement('a'); a.id = 'wf-as-cta'; a.href = '/al-socio/'; a.setAttribute('data-l', l); a.setAttribute('translate', 'no');
    a.style.cssText = 'display:flex;align-items:center;gap:14px;margin:22px 0 6px;padding:14px 18px;border:1px solid #c8f135;border-radius:12px;background:rgba(200,241,53,.06);color:#f4f4f1;text-decoration:none;max-width:640px;font-family:Inter,system-ui,sans-serif';
    a.innerHTML = '<span style="font:500 11px JetBrains Mono,monospace;letter-spacing:.14em;text-transform:uppercase;color:#c8f135;white-space:nowrap">● ' + tx[0] + '</span><span style="flex:1;font-weight:600;font-size:15px">' + tx[1] + '</span><span style="font-weight:700;color:#c8f135;white-space:nowrap">' + tx[2] + '</span>';
    h1.insertAdjacentElement('afterend', a);
  }
  var FONTS_DONE = false;
  function casePage() {
    if (D.documentElement.hasAttribute('data-as-static') || D.documentElement.hasAttribute('data-rd-static')) return;
    var p = location.pathname.replace(/\/$/, '');
    if (p === '/cases/al-socio' || p === '/cases/rundate-miami') { var k = 'wf-as-reload', t = +(sessionStorage.getItem(k) || 0); if (Date.now() - t > 8000) { sessionStorage.setItem(k, Date.now()); location.reload(); return; } }
    var on = /^\/cases\/[^/]+$/.test(p);
    if (on) D.body.setAttribute('data-wf-case', '1'); else D.body.removeAttribute('data-wf-case');
    if (!on) return;
    var _h = D.querySelector('main h1'); if (_h && norm(_h.textContent).length > 40 && !_h.classList.contains('wf-long')) _h.classList.add('wf-long');
    if (!FONTS_DONE) { FONTS_DONE = true; var l = D.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'; D.head.appendChild(l); }
    var ck = COVER[p]; if (ck) D.body.style.setProperty('--wf-acc', ACC[ck]); else D.body.style.removeProperty('--wf-acc');
    tagShots();
    var u = ck ? C + ck + '.webp' : THUMB[p]; var ex = D.querySelector('.wf-cover');
    if (ex && ex.getAttribute('data-p') === p) { liveBlock(p, ex); return; }
    var oldLive = D.querySelector('.wf-live'); if (oldLive && oldLive.getAttribute('data-p') !== p) oldLive.remove();
    if (ex) ex.remove();
    if (!u) return;
    var main = D.querySelector('main'); if (!main) return;
    var h1 = main.querySelector('h1'); if (!h1) return;
    var sec = h1.closest('section') || h1.parentElement; if (!sec || !sec.parentNode) return;
    var cv = D.createElement('div'); cv.className = 'wf-cover'; cv.setAttribute('data-p', p);
    var im = D.createElement('img'); im.src = u; im.alt = ''; im.loading = 'eager'; cv.appendChild(im);
    sec.parentNode.insertBefore(cv, sec.nextSibling);
    liveBlock(p, cv); setTimeout(tagShots, 600); setTimeout(tagShots, 1800);
    try { sessionStorage.setItem('wf-last-case', norm(h1.textContent).slice(0, 80)); if (norm(h1.textContent).length > 40) h1.classList.add('wf-long'); } catch (x) {}
  }

  /* ---------- contact: pre-filled form, WhatsApp, Calendly ---------- */
  var LEAD_KEYS = ['name', 'email', 'company', 'website', 'service', 'revenue', 'message'];
  function lead() { try { return JSON.parse(LS.getItem('wf-lead') || '{}'); } catch (e) { return {}; } }
  function saveLead(o) { try { LS.setItem('wf-lead', JSON.stringify(o)); } catch (e) {} }
  function setVal(el, v) {
    if (!el || v == null || v === '') return;
    if (el.tagName === 'SELECT' && ![].some.call(el.options, function (o) { return o.value === v; })) return;
    var proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  var MSG = {
    en: { caseMsg: 'Hi Wendel, I just read your "{c}" case study and I would like something similar for my brand.', hi: 'Hi Wendel! ', page: "I'm on wendelfreitas.com ({p}) and I'd like to talk about growing my brand.", from: 'I sent the form on wendelfreitas.com. Here are my details:', name: 'Name', email: 'Email', company: 'Company', website: 'Website', service: 'Interested in', revenue: 'Monthly revenue', message: 'Goals' },
    es: { caseMsg: 'Hola Wendel, acabo de leer tu caso "{c}" y me gustaría algo similar para mi marca.', hi: '¡Hola Wendel! ', page: 'Estoy en wendelfreitas.com ({p}) y me gustaría hablar sobre cómo hacer crecer mi marca.', from: 'Vengo del formulario de wendelfreitas.com. Estos son mis datos:', name: 'Nombre', email: 'Email', company: 'Empresa', website: 'Sitio web', service: 'Me interesa', revenue: 'Ingresos mensuales', message: 'Objetivos' },
    pt: { caseMsg: 'Olá Wendel, acabei de ler o seu case "{c}" e gostaria de algo parecido para a minha marca.', hi: 'Olá Wendel! ', page: 'Estou no wendelfreitas.com ({p}) e gostaria de conversar sobre o crescimento da minha marca.', from: 'Vim pelo formulário do wendelfreitas.com. Seguem meus dados:', name: 'Nome', email: 'E-mail', company: 'Empresa', website: 'Site', service: 'Tenho interesse em', revenue: 'Faturamento mensal', message: 'Objetivos' }
  };
  function formData() {
    var f = D.querySelector('form [name="email"]'); f = f && f.form; var o = lead();
    if (f) LEAD_KEYS.forEach(function (k) { var el = f.querySelector('[name="' + k + '"]'); if (el && el.value) { o[k] = el.value; if (el.tagName === 'SELECT') o[k + 'Label'] = el.options[el.selectedIndex].text; } });
    return o;
  }
  function summary(o, m) {
    var lines = [];
    ['name', 'email', 'company', 'website'].forEach(function (k) { if (o[k]) lines.push(m[k] + ': ' + o[k]); });
    if (o.service) lines.push(m.service + ': ' + (o.serviceLabel || o.service));
    if (o.revenue) lines.push(m.revenue + ': ' + (o.revenueLabel || o.revenue));
    if (o.message) lines.push(m.message + ': ' + o.message);
    return lines;
  }
  function pageName() { var h = D.querySelector('main h1, h1'); return norm(h ? h.textContent : D.title).slice(0, 70); }
  function fillContact() {
    if (!/^\/contact\/?$/.test(location.pathname)) return;
    var em = D.querySelector('form [name="email"]'); if (!em) return; var f = em.form;
    if (f.getAttribute('data-wf-filled')) return; f.setAttribute('data-wf-filled', '1');
    var q = new URLSearchParams(location.search), o = lead(), m = MSG[lang];
    LEAD_KEYS.forEach(function (k) { var el = f.querySelector('[name="' + k + '"]'); if (el && !el.value) setVal(el, q.get(k) || o[k]); });
    var msg = f.querySelector('[name="message"]'), lc = null; try { lc = sessionStorage.getItem('wf-last-case'); } catch (e) {}
    if (msg && !msg.value && lc) setVal(msg, m.caseMsg.replace('{c}', lc));
    f.addEventListener('input', function () { var d = formData(); var keep = {}; LEAD_KEYS.forEach(function (k) { if (d[k]) keep[k] = d[k]; }); saveLead(keep); });
  }
  function onLinkClick(ev) {
    var a = ev.target.closest && ev.target.closest('a[href]'); if (!a) return;
    var href = a.getAttribute('href'); if (!/wa\.me|calendly\.com/.test(href)) return;
    var o = formData(), m = MSG[lang], u;
    try { u = new URL(href, location.href); } catch (e) { return; }
    var det = summary(o, m);
    if (/wa\.me/.test(href)) {
      var txt = det.length ? m.hi + m.from + '\n' + det.join('\n') : m.hi + m.page.replace('{p}', pageName());
      u.searchParams.set('text', txt);
    } else {
      if (o.name) u.searchParams.set('name', o.name);
      if (o.email) u.searchParams.set('email', o.email);
      var note = det.filter(function (l) { return !/^(Name|Nombre|Nome|Email|E-mail):/.test(l); }).join(' · ');
      u.searchParams.set('a1', note || m.page.replace('{p}', pageName()));
      if (!u.searchParams.get('utm_source')) { u.searchParams.set('utm_source', 'website'); u.searchParams.set('utm_medium', location.pathname.replace(/\//g, '') || 'home'); }
    }
    a.setAttribute('href', u.toString());
  }
  D.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return; var h = a.getAttribute('href'); var m = /^\/(cases\/)?al-socio\/?$/.test(h) ? '/cases/al-socio' : /^\/(cases\/rundate-miami|rundate)\/?$/.test(h) ? '/cases/rundate-miami' : ''; if (m) { e.preventDefault(); e.stopImmediatePropagation(); location.href = m; } }, true);
  D.addEventListener('click', onLinkClick, true);
  D.addEventListener('auxclick', onLinkClick, true);

  function markHero() { if (innerWidth > 640) return; var h = D.querySelector('main h1') || D.querySelector('h1'); if (!h) return; var sc = h.closest('section'); if (sc && !sc.classList.contains('wf-hero')) sc.classList.add('wf-hero'); }
  /* ---------- run ---------- */
  var queued = false;
  function tick() {
    queued = false;
    try { swapLogos(); } catch (e) {}
    try { mountSwitch(); } catch (e) {}
    try { mountClients(); } catch (e) {}
    try { enhanceCases(); } catch (e) {}
    try { casePage(); } catch (e) {}
    try { fillContact(); } catch (e) {}
    try { markHero(); } catch (e) {}
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(tick); } }
  var pending = [];
  function onMut(ms) {
    if (busy) return;
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i];
      if (m.type === 'characterData') pending.push(m.target);
      else if (m.type === 'attributes') pending.push(m.target);
      else for (var k = 0; k < m.addedNodes.length; k++) pending.push(m.addedNodes[k]);
    }
    schedule();
    if (lang !== 'en' && pending.length) { var p = pending; pending = []; requestAnimationFrame(function () { for (var q = 0; q < p.length; q++) translate(p[q]); }); } else pending = [];
  }
  function start() {
    loadDict();
    D.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    tick(); if (lang !== 'en') translate(D.body);
    new MutationObserver(onMut).observe(D.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'alt', 'title'] });
    var ps = history.pushState; history.pushState = function () { var r = ps.apply(this, arguments); schedule(); return r; };
    addEventListener('popstate', schedule);
  }
  function boot() {
    if (window.WF_I18N) return start();
    var s = D.createElement('script'); s.src = '/wf-i18n.v2.js'; s.onload = s.onerror = start; (D.head || D.body).appendChild(s);
  }
  if (D.body) boot(); else D.addEventListener('DOMContentLoaded', boot);
})();
