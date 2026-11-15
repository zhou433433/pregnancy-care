(function () {
  var C = window.CONTENT;
  var L = window.Logic;
  var I = window.Icons;
  var KEY = 'pc_state_v1';
  var root = document.getElementById('app');

  // ---------- saved state (stays on this phone only) ----------
  function emptyState() {
    return { lang: null, lmp: null, done: [], appts: {} };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var s = JSON.parse(raw);
        return { lang: s.lang || null, lmp: s.lmp || null, done: s.done || [], appts: s.appts || {} };
      }
    } catch (e) { /* storage blocked: keep working in memory */ }
    return emptyState();
  }

  function saveState() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  var state = loadState();

  // things that are not saved
  var view = {
    setupMode: 'month',
    month: null,
    date: '',
    filter: 'all',
    showAll: false,
    origin: null,
    locNote: 'loc_demo',
    locating: false,
    confirmDelete: false,
    toast: null
  };

  function now() { return new Date(); }

  // Links such as ?lang=ur&week=20 open the app already set up. Used for testing and screenshots.
  (function readQuery() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { return; }
    var touched = false;
    if (q.get('reset')) {
      state = emptyState();
      touched = true;
    }
    var lang = q.get('lang');
    if (lang === 'en' || lang === 'ur') { state.lang = lang; touched = true; }
    var week = parseInt(q.get('week'), 10);
    if (week >= 0 && week <= 45) { state.lmp = L.toISODate(L.lmpFromWeek(week, now())); touched = true; }
    var month = parseInt(q.get('month'), 10);
    if (month >= 1 && month <= 9) { state.lmp = L.toISODate(L.lmpFromMonth(month, now())); touched = true; }
    if (q.get('done')) {
      state.done = q.get('done').split(',').map(Number).filter(function (n) { return n >= 1 && n <= 8; });
      touched = true;
    }
    if (touched) {
      saveState();
      try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) { /* ignore */ }
    }
  })();

  // ---------- helpers ----------
  function lang() { return state.lang || 'en'; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function t(key, vars) {
    var entry = C.ui[key];
    var s = entry ? (entry[lang()] || entry.en) : key;
    if (vars) {
      Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    }
    return s;
  }

  function tx(obj) { return obj[lang()] || obj.en; }

  function locale() { return lang() === 'ur' ? 'ur-PK-u-nu-latn' : 'en-GB'; }

  function fmtDay(d) {
    try { return new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'long' }).format(d); }
    catch (e) { return L.toISODate(d); }
  }

  function fmtDayTime(d) {
    if (lang() === 'ur') {
      // Urdu speakers say the part of the day instead of AM / PM.
      var h = d.getHours();
      var part = h >= 4 && h < 12 ? 'صبح' : h >= 12 && h < 16 ? 'دوپہر' : h >= 16 && h < 19 ? 'شام' : 'رات';
      var h12 = h % 12 === 0 ? 12 : h % 12;
      var mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : String(d.getMinutes());
      return fmtDay(d) + '، ' + part + ' ' + h12 + ':' + mm + ' بجے';
    }
    try { return new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' }).format(d); }
    catch (e) { return d.toString(); }
  }

  function relDays(n) {
    if (n === 0) return t('today');
    if (n === 1) return t('tomorrow');
    if (n > 1) return t('in_days', { n: n });
    return t('days_ago', { n: -n });
  }

  function monthLabel(m) {
    return t('month_n', { n: m, o: C.ordinalsUr[m - 1] });
  }

  function lmpDate() { return L.parseISODate(state.lmp); }

  function apptDate(id) {
    var v = state.appts[id];
    if (!v) return null;
    var d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }

  function go(path) { location.hash = '#/' + path; }

  function currentRoute() {
    var h = location.hash.replace(/^#\/?/, '');
    if (!state.lang) return 'welcome';
    if (!state.lmp) return 'setup';
    return h || 'home';
  }

  // ---------- shared pieces ----------
  function topBar(title, opts) {
    opts = opts || {};
    var left = opts.back
      ? '<a class="icon-btn" href="#/' + opts.back + '" aria-label="' + esc(t('back')) + '"><span class="flip">' + I.line('back') + '</span></a>'
      : '';
    var right = '';
    if (opts.tools) {
      right =
        '<button class="icon-btn lang-btn" data-act="toggle-lang" lang="' + (lang() === 'ur' ? 'en' : 'ur') + '">' + (lang() === 'ur' ? 'English' : 'اردو') + '</button>' +
        '<a class="icon-btn" href="#/settings" aria-label="' + esc(t('settings')) + '">' + I.line('settings') + '</a>';
    }
    var offline = navigator.onLine === false ? '<div class="offline" role="status">' + esc(t('offline')) + '</div>' : '';
    return '<header class="top' + (opts.red ? ' red' : '') + '">' + left + '<h1>' + esc(title) + '</h1>' + right + '</header>' + offline;
  }

  function navBar(active) {
    function item(route, icon, label, cls) {
      return '<a href="#/' + route + '"' + (cls ? ' class="' + cls + '"' : '') + (active === route ? ' aria-current="page"' : '') + '>' + I.line(icon, 26) + '<span>' + esc(label) + '</span></a>';
    }
    return '<nav class="nav" aria-label="Main">' +
      item('home', 'home', t('tab_home')) +
      item('danger', 'warning', t('tab_danger'), 'd') +
      item('visits', 'calendar', t('tab_visits')) +
      item('care', 'pin', t('tab_care')) +
      '</nav>';
  }

  var LOGO = '<svg class="logo" viewBox="0 0 96 96" aria-hidden="true"><rect width="96" height="96" rx="22" fill="#0f766e"/><path d="M48 76S22 60 22 40a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 20-26 36-26 36z" fill="#fff"/><circle cx="48" cy="46" r="7" fill="#0f766e"/><path d="M36 64c2-8 7-11 12-11s10 3 12 11" fill="none" stroke="#0f766e" stroke-width="5" stroke-linecap="round"/></svg>';

  // ---------- screens ----------
  function screenWelcome() {
    return '<main>' +
      '<div class="hero">' + LOGO +
      '<h1 lang="ur" dir="rtl" class="choice-title" style="font-family:\'Noto Nastaliq Urdu\',serif;line-height:2">' + esc(C.ui.app_name.ur) + '</h1>' +
      '<h1 lang="en" dir="ltr">' + esc(C.ui.app_name.en) + '</h1>' +
      '</div>' +
      '<p class="muted" style="text-align:center"><span lang="ur" dir="rtl" style="font-family:\'Noto Nastaliq Urdu\',serif;line-height:2.1">' + esc(C.ui.choose_language.ur) + '</span><br><span lang="en" dir="ltr">' + esc(C.ui.choose_language.en) + '</span></p>' +
      '<div class="choices">' +
      '<button class="choice ur" data-act="lang" data-lang="ur" lang="ur" dir="rtl">اردو</button>' +
      '<button class="choice" data-act="lang" data-lang="en" lang="en" dir="ltr">English</button>' +
      '</div>' +
      '</main>';
  }

  function screenSetup() {
    var editing = !!state.lmp;
    var months = '';
    for (var m = 1; m <= 9; m++) {
      months += '<button class="choice" data-act="month" data-month="' + m + '" aria-pressed="' + (view.month === m) + '" aria-label="' + esc(monthLabel(m)) + '">' +
        '<span class="mnum">' + m + '</span><span class="mlab">' + esc(t('month_word', { o: C.ordinalsUr[m - 1] })) + '</span></button>';
    }
    var today = L.toISODate(now());
    var minDate = L.toISODate(L.addDays(now(), -44 * 7));
    var body = view.setupMode === 'month'
      ? '<div class="months">' + months + '</div>'
      : '<div class="field"><label for="lmp">' + esc(t('last_period')) + '</label>' +
        '<input type="date" id="lmp" data-change="date" max="' + today + '" min="' + minDate + '" value="' + esc(view.date) + '"></div>';
    var ready = view.setupMode === 'month' ? !!view.month : !!view.date;
    return topBar(t('app_name'), { back: editing ? 'settings' : null }) +
      '<main>' +
      '<h2>' + esc(t('how_far')) + '</h2>' +
      '<div class="seg">' +
      '<button data-act="mode" data-mode="month" aria-pressed="' + (view.setupMode === 'month') + '">' + esc(t('know_month')) + '</button>' +
      '<button data-act="mode" data-mode="date" aria-pressed="' + (view.setupMode === 'date') + '">' + esc(t('know_date')) + '</button>' +
      '</div>' +
      body +
      '<p class="muted">' + esc(t('not_sure')) + '</p>' +
      '<button class="btn" data-act="start"' + (ready ? '' : ' disabled') + '>' + esc(t('start')) + '</button>' +
      '<div class="privacy">' + I.line('lock', 22) + '<span>' + esc(t('privacy')) + '</span></div>' +
      '</main>';
  }

  function nextVisitCard(list) {
    var next = L.nextContact(list);
    var allDone = list.every(function (v) { return v.status === 'done'; });
    var html = '<section class="card next"><div class="label">' + esc(t('next_visit')) + '</div>';
    if (allDone) {
      html += '<div class="when">' + esc(t('all_done')) + '</div>';
    } else if (!next) {
      html += '<div class="when">' + esc(t('go_checkup_now')) + '</div>';
    } else {
      var idx = next.id - 1;
      var behind = idx > 0 && list[idx - 1].status === 'missed';
      var appt = apptDate(next.id);
      var d = appt || next.date;
      var days = L.daysBetween(now(), d);
      if (behind && !appt) {
        html += '<div class="when">' + esc(t('go_checkup_now')) + '</div>';
      } else if (days < 0) {
        html += '<div class="when">' + esc(t('go_checkup_now')) + '</div>';
      } else {
        html += '<div class="when"><bdi>' + esc(appt ? fmtDayTime(d) : fmtDay(d)) + '</bdi> · <bdi>' + esc(relDays(days)) + '</bdi></div>';
      }
      html += '<div class="muted"><bdi>' + esc(t('visit_n', { n: next.id })) + '</bdi> · <bdi>' +
        esc(appt ? t('my_appt') : (next.id === 1 ? t('before_week', { n: next.week }) : t('around_week', { n: next.week }))) + '</bdi></div>';
    }
    html += '<a class="link" href="#/visits">' + esc(t('see_all')) + '</a></section>';
    return html;
  }

  function screenHome() {
    var week = L.weeksPregnant(lmpDate(), now());
    var month = L.monthOfWeek(week);
    var tri = L.trimesterOfWeek(week);
    var list = L.schedule(lmpDate(), now(), state.done);
    var pct = Math.max(3, Math.min(100, Math.round(week / 40 * 100)));

    var stage = '<section class="card stage">' +
      '<div class="big">' + esc(monthLabel(month)) + '</div>' +
      '<div class="sub">' + esc(t('week_n', { n: Math.max(1, week) })) + '</div>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '<div class="sub">' + esc(week > 42 ? t('past_due') : t('due_about', { date: fmtDay(L.dueDate(lmpDate())) })) + '</div>' +
      '</section>';

    var tips = C.tips
      .filter(function (tip) { return week >= tip.from && week <= tip.to; })
      .filter(function (tip) { return !(tip.id === 'first_visit' && state.done.indexOf(1) !== -1); })
      .sort(function (a, b) { return a.order - b.order; })
      .slice(0, C.tipsShown)
      .map(function (tip) {
        return '<li><span class="badge-ic">' + I.line(tip.icon) + '</span><span>' + esc(tx(tip)) + '</span></li>';
      }).join('');

    return topBar(t('app_name'), { tools: true }) +
      '<main>' +
      stage +
      nextVisitCard(list) +
      '<a class="row-btn danger" href="#/danger"><span class="badge-ic">' + I.line('warning', 28) + '</span>' +
      '<span class="txt"><span class="t">' + esc(t('danger_cta')) + '</span><span class="s">' + esc(t('danger_cta_sub')) + '</span></span>' +
      '<span class="chev">' + I.line('back', 20) + '</span></a>' +
      '<h2>' + esc(t('happening')) + '</h2>' +
      '<section class="card"><p>' + esc(tx(C.stages[tri])) + '</p></section>' +
      '<h2>' + esc(t('do_now')) + '</h2>' +
      '<ul class="tips">' + tips + '</ul>' +
      '<a class="row-btn" href="#/care"><span class="badge-ic">' + I.line('hospital', 26) + '</span>' +
      '<span class="txt"><span class="t">' + esc(t('care_cta')) + '</span><span class="s">' + esc(t('care_cta_sub')) + '</span></span>' +
      '<span class="chev">' + I.line('back', 20) + '</span></a>' +
      '<p class="note">' + esc(t('disclaimer')) + '</p>' +
      '</main>' + navBar('home');
  }

  function ambulanceTiles() {
    return '<div class="amb">' + C.ambulance.map(function (a) {
      return '<a href="tel:' + a.number + '"><span class="n">' + a.number + '</span><span class="l">' + esc(tx(a.name)) + '</span></a>';
    }).join('') + '</div>';
  }

  function screenDanger() {
    var cards = C.danger.map(function (d) {
      return '<a class="dcard ' + d.level + '" href="#/danger/' + d.id + '">' + I.danger(d.id, 72) +
        '<span class="t">' + esc(tx(d.title)) + '</span>' +
        '<span class="pill ' + d.level + '">' + esc(t(d.level === 'now' ? 'level_now' : 'level_soon')) + '</span></a>';
    }).join('');
    return topBar(t('danger_title'), { red: true }) +
      '<main>' +
      '<p>' + esc(t('danger_intro')) + '</p>' +
      '<div class="dgrid">' + cards + '</div>' +
      '<h2>' + esc(t('emergency')) + '</h2>' + ambulanceTiles() +
      '</main>' + navBar('danger');
  }

  function screenDangerDetail(id) {
    var d = null;
    C.danger.forEach(function (x) { if (x.id === id) d = x; });
    if (!d) return screenDanger();
    return topBar(t('danger_title'), { red: true, back: 'danger' }) +
      '<main>' +
      '<section class="card dhero">' + I.danger(d.id, 104) + '<h2>' + esc(tx(d.title)) + '</h2><p>' + esc(tx(d.text)) + '</p></section>' +
      '<div class="action ' + d.level + '" role="alert">' + esc(t(d.level === 'now' ? 'act_now' : 'act_soon')) + '</div>' +
      '<p>' + esc(t('tell_family')) + '</p>' +
      '<a class="btn" href="#/care">' + I.line('hospital') + '<span>' + esc(t('find_care')) + '</span></a>' +
      '<a class="btn red" href="tel:' + C.ambulance[0].number + '">' + I.line('phone') + '<span>' + esc(t('call_ambulance')) + ' <span class="ltr">' + C.ambulance[0].number + '</span></span></a>' +
      '<a class="link" href="#/danger" style="text-align:center">' + esc(t('all_signs')) + '</a>' +
      '</main>' + navBar('danger');
  }

  function screenVisits() {
    var list = L.schedule(lmpDate(), now(), state.done);
    var cards = list.map(function (v) {
      var appt = apptDate(v.id);
      var pill = '';
      if (v.status === 'done') pill = '<span class="pill done">' + esc(t('st_done')) + '</span>';
      if (v.status === 'missed') pill = '<span class="pill missed">' + esc(t('st_missed')) + '</span>';
      if (v.status === 'next') pill = '<span class="pill next">' + esc(t('st_next')) + '</span>';
      var html = '<section class="card visit ' + v.status + '">' +
        '<div class="head"><span class="num">' + (v.status === 'done' ? I.line('check', 20) : v.id) + '</span>' +
        '<span class="name">' + esc(t('visit_n', { n: v.id })) + '</span>' + pill + '</div>' +
        '<div class="muted"><bdi>' + esc(v.id === 1 ? t('before_week', { n: v.week }) : t('around_week', { n: v.week })) + '</bdi> · <bdi>' + esc(fmtDay(v.date)) + '</bdi></div>';
      if (v.status === 'next') {
        if (appt) {
          html += '<div class="toast"><strong>' + esc(t('my_appt')) + ':</strong> <bdi>' + esc(fmtDayTime(appt)) + '</bdi> · <bdi>' + esc(relDays(L.daysBetween(now(), appt))) + '</bdi></div>';
        }
        html += '<div class="field"><label for="appt-' + v.id + '">' + esc(t('set_appt')) + '</label>' +
          '<input type="datetime-local" id="appt-' + v.id + '" value="' + esc(state.appts[v.id] || '') + '"></div>' +
          '<div class="btns"><button class="btn" data-act="save-appt" data-id="' + v.id + '">' + esc(t('save')) + '</button>' +
          (appt ? '<button class="btn ghost" data-act="clear-appt" data-id="' + v.id + '">' + esc(t('remove')) + '</button>' : '') + '</div>';
        if (appt) {
          html += '<button class="btn ghost" data-act="ics" data-id="' + v.id + '">' + I.line('calendar') + '<span>' + esc(t('add_calendar')) + '</span></button>';
        }
        if (view.toast === 'saved') html += '<div class="toast" role="status">' + esc(t('saved')) + '</div>';
      }
      if (v.status === 'done') {
        html += '<div><button class="btn ghost small" data-act="toggle-done" data-id="' + v.id + '">' + esc(t('undo')) + '</button></div>';
      } else if (v.status !== 'later') {
        html += '<div><button class="btn ghost small" data-act="toggle-done" data-id="' + v.id + '">' + I.line('check', 20) + '<span>' + esc(t('mark_done')) + '</span></button></div>';
      }
      return html + '</section>';
    }).join('');
    return topBar(t('visits_title')) +
      '<main><p class="muted">' + esc(t('visits_intro')) + '</p>' + cards + '</main>' + navBar('visits');
  }

  function screenCare() {
    var origin = view.origin || C.demoLocation;
    var rows = window.FACILITIES.map(function (f) {
      return { f: f, km: L.distanceKm(origin.lat, origin.lon, f.lat, f.lon) };
    }).filter(function (r) {
      if (view.filter === 'hospital') return r.f.kind === 'hospital';
      if (view.filter === 'clinic') return r.f.kind === 'clinic';
      if (view.filter === 'maternity') return r.f.maternity;
      return true;
    }).sort(function (a, b) { return a.km - b.km; });

    function chip(id, label) {
      return '<button class="chip" data-act="filter" data-filter="' + id + '" aria-pressed="' + (view.filter === id) + '">' + esc(label) + '</button>';
    }

    // Start with the closest few so the page stays short.
    var total = rows.length;
    var shown = view.showAll ? rows : rows.slice(0, C.facilitiesShown);
    var more = total > shown.length
      ? '<button class="btn ghost" data-act="show-all">' + esc(t('show_all', { n: total })) + '</button>'
      : '';

    var list = shown.map(function (r) {
      var f = r.f;
      var name = lang() === 'ur' && f.nameUr ? f.nameUr : f.name;
      var second = lang() === 'ur' && f.nameUr ? '<div class="muted ltr">' + esc(f.name) + '</div>' : '';
      var km = r.km < 10 ? r.km.toFixed(1) : String(Math.round(r.km));
      var maps = 'https://www.google.com/maps/dir/?api=1&destination=' + f.lat + ',' + f.lon;
      return '<section class="card fac">' +
        '<div class="name">' + esc(name) + '</div>' + second +
        '<div class="meta"><span class="dist">' + esc(t('km', { n: km })) + '</span>' +
        '<span>' + esc(t(f.kind === 'hospital' ? 'kind_hospital' : 'kind_clinic')) + '</span>' +
        (f.maternity ? '<span class="pill done">' + esc(t('f_maternity')) + '</span>' : '') +
        (f.street ? '<span class="ltr">' + esc(f.street) + '</span>' : '') + '</div>' +
        '<div class="btns">' +
        (f.phone
          ? '<a class="btn small" href="tel:' + esc(f.phone) + '">' + I.line('phone', 20) + '<span>' + esc(t('call')) + '</span></a>'
          : '<span class="muted" style="flex:1;align-self:center">' + esc(t('no_phone')) + '</span>') +
        '<a class="btn ghost small" href="' + maps + '" target="_blank" rel="noopener">' + I.line('route', 20) + '<span>' + esc(t('directions')) + '</span></a>' +
        '</div></section>';
    }).join('');

    return topBar(t('care_title')) +
      '<main>' +
      '<h2>' + esc(t('emergency')) + '</h2>' + ambulanceTiles() +
      '<p class="muted">' + esc(view.locating ? t('locating') : t(view.locNote)) + '</p>' +
      (view.origin ? '' : '<button class="btn ghost" data-act="locate">' + I.line('pin') + '<span>' + esc(t('use_location')) + '</span></button>') +
      '<div class="chips">' + chip('all', t('f_all')) + chip('hospital', t('f_hospital')) + chip('clinic', t('f_clinic')) + chip('maternity', t('f_maternity')) + '</div>' +
      list + more +
      '<p class="note">' + esc(t('care_source', { date: window.FACILITY_META.fetched })) + '</p>' +
      '</main>' + navBar('care');
  }

  function screenSettings() {
    var del = view.confirmDelete
      ? '<section class="card confirm"><p><strong>' + esc(t('delete_confirm')) + '</strong></p><div class="btns">' +
        '<button class="btn red" data-act="do-delete">' + esc(t('yes_delete')) + '</button>' +
        '<button class="btn ghost" data-act="cancel-delete">' + esc(t('cancel')) + '</button></div></section>'
      : '<button class="row-btn" data-act="ask-delete"><span class="badge-ic">' + I.line('trash') + '</span><span class="txt"><span class="t">' + esc(t('delete_data')) + '</span></span></button>';
    return topBar(t('settings'), { back: 'home' }) +
      '<main>' +
      '<h2>' + esc(t('language')) + '</h2>' +
      '<div class="seg">' +
      '<button data-act="lang" data-lang="ur" lang="ur" aria-pressed="' + (lang() === 'ur') + '">اردو</button>' +
      '<button data-act="lang" data-lang="en" lang="en" aria-pressed="' + (lang() === 'en') + '">English</button>' +
      '</div>' +
      '<a class="row-btn" href="#/setup"><span class="badge-ic">' + I.line('calendar') + '</span><span class="txt"><span class="t">' + esc(t('change_month')) + '</span></span></a>' +
      del +
      '<div class="privacy">' + I.line('lock', 22) + '<span>' + esc(t('privacy')) + '</span></div>' +
      '<h2>' + esc(t('about')) + '</h2>' +
      '<section class="card"><p>' + esc(t('about_text')) + '</p><p class="muted" style="margin-top:8px">' + esc(t('prototype')) + '</p></section>' +
      '</main>' + navBar('');
  }

  // ---------- render ----------
  function render() {
    var route = currentRoute();
    var html;
    var hasNav = true;
    if (route === 'welcome') { html = screenWelcome(); hasNav = false; }
    else if (route === 'setup') { html = screenSetup(); hasNav = false; }
    else if (route === 'danger') html = screenDanger();
    else if (route.indexOf('danger/') === 0) html = screenDangerDetail(route.slice(7));
    else if (route === 'visits') html = screenVisits();
    else if (route === 'care') html = screenCare();
    else if (route === 'settings') html = screenSettings();
    else html = screenHome();

    var welcome = route === 'welcome';
    document.documentElement.lang = welcome ? 'en' : lang();
    document.documentElement.dir = !welcome && lang() === 'ur' ? 'rtl' : 'ltr';
    document.title = welcome ? C.ui.app_name.en : t('app_name');
    root.className = 'app' + (hasNav ? '' : ' no-nav');
    root.innerHTML = html;
  }

  // ---------- actions ----------
  var actions = {
    lang: function (el) {
      state.lang = el.getAttribute('data-lang');
      saveState();
      render();
    },
    'toggle-lang': function () {
      state.lang = lang() === 'ur' ? 'en' : 'ur';
      saveState();
      render();
    },
    mode: function (el) {
      view.setupMode = el.getAttribute('data-mode');
      render();
    },
    month: function (el) {
      view.month = Number(el.getAttribute('data-month'));
      render();
    },
    start: function () {
      var lmp = null;
      if (view.setupMode === 'month' && view.month) lmp = L.lmpFromMonth(view.month, now());
      if (view.setupMode === 'date' && view.date) lmp = L.parseISODate(view.date);
      if (!lmp || isNaN(lmp.getTime())) return;
      state.lmp = L.toISODate(lmp);
      saveState();
      view.month = null;
      view.date = '';
      if (location.hash === '#/home') render(); else go('home');
    },
    'toggle-done': function (el) {
      var id = Number(el.getAttribute('data-id'));
      var i = state.done.indexOf(id);
      if (i === -1) state.done.push(id); else state.done.splice(i, 1);
      saveState();
      view.toast = null;
      render();
    },
    'save-appt': function (el) {
      var id = el.getAttribute('data-id');
      var input = document.getElementById('appt-' + id);
      if (!input || !input.value) return;
      state.appts[id] = input.value;
      saveState();
      view.toast = 'saved';
      render();
    },
    'clear-appt': function (el) {
      delete state.appts[el.getAttribute('data-id')];
      saveState();
      view.toast = null;
      render();
    },
    ics: function (el) {
      var id = el.getAttribute('data-id');
      var d = apptDate(id);
      if (!d) return;
      var text = L.buildICS(d, t('calendar_title'), 'checkup-' + id + '-' + d.getTime() + '@pregnancy-care');
      var blob = new Blob([text], { type: 'text/calendar' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'check-up.ics';
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    filter: function (el) {
      view.filter = el.getAttribute('data-filter');
      render();
    },
    'show-all': function () {
      view.showAll = true;
      render();
    },
    locate: function () {
      if (!navigator.geolocation) {
        view.locNote = 'loc_denied';
        render();
        return;
      }
      view.locating = true;
      render();
      navigator.geolocation.getCurrentPosition(function (pos) {
        var here = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        var far = L.distanceKm(here.lat, here.lon, C.demoLocation.lat, C.demoLocation.lon) > C.maxKmFromDemo;
        view.origin = far ? null : here;
        view.locNote = far ? 'loc_far' : 'loc_mine';
        view.locating = false;
        if (currentRoute() === 'care') render();
      }, function () {
        view.locNote = 'loc_denied';
        view.locating = false;
        if (currentRoute() === 'care') render();
      }, { timeout: 10000, maximumAge: 600000 });
    },
    'ask-delete': function () { view.confirmDelete = true; render(); },
    'cancel-delete': function () { view.confirmDelete = false; render(); },
    'do-delete': function () {
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      state = emptyState();
      view.confirmDelete = false;
      view.origin = null;
      view.locNote = 'loc_demo';
      if (location.hash) location.hash = ''; else render();
    }
  };

  root.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-act]');
    if (!el || el.disabled) return;
    var fn = actions[el.getAttribute('data-act')];
    if (fn) fn(el);
  });

  root.addEventListener('change', function (ev) {
    if (ev.target.getAttribute('data-change') === 'date') {
      view.date = ev.target.value;
      render();
    }
  });

  window.addEventListener('hashchange', function () {
    view.toast = null;
    view.confirmDelete = false;
    render();
    window.scrollTo(0, 0);
  });
  window.addEventListener('online', render);
  window.addEventListener('offline', render);

  render();

  // Offline support. Only works when served over https or from localhost.
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* app still works online */ });
    });
  }
})();
