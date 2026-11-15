// Inline SVG icons so the app needs no image downloads.
(function () {
  var NAVY = '#1f2a44';
  var RED = '#d92d20';
  var SOFT = '#fde4e1';

  // Small line icons (24 x 24), drawn with the current text colour.
  var line = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    warning: '<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5"/><path d="M12 18v.01"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    settings: '<path d="M4 6h8M16 6h4M4 12h2M10 12h10M4 18h10M18 18h2"/><circle cx="14" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    phone: '<path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
    route: '<path d="M12 2l9 9-9 9-9-9z"/><path d="M9 14v-3h5"/><path d="M12 9l2 2-2 2"/>',
    pill: '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>',
    syringe: '<path d="M17 3l4 4M19 5l-3 3M13 5l6 6M16.5 7.5L7 17l-3 1 1-3 9.5-9.5M5 19l-2 2"/>',
    scan: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10.5" r="3"/>',
    food: '<path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 4v4M12 3v5M16 4v4"/>',
    rest: '<path d="M3 18v-8M3 14h18v4M21 18v-4a4 4 0 0 0-4-4h-6v4"/><circle cx="7" cy="11" r="2"/>',
    nomed: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/><rect x="8" y="10" width="8" height="4" rx="2"/>',
    nosmoke: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/><path d="M7 13h7M16 13h1"/>',
    heart: '<path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9z"/>',
    bag: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    hospital: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8v8M15 8v8M9 12h6"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };

  // Danger sign pictures (64 x 64). Red marks the problem.
  var s = 'fill="none" stroke="' + NAVY + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  var r = 'fill="none" stroke="' + RED + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';
  var danger = {
    bleeding:
      '<path d="M32 6C32 6 13 29 13 41a19 19 0 0 0 38 0C51 29 32 6 32 6z" fill="' + RED + '"/>' +
      '<path d="M22 42a10 10 0 0 0 8 9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
    fits:
      '<circle cx="32" cy="13" r="7" ' + s + '/>' +
      '<path d="M32 21v18M32 26l-12-6M32 26l12 6M32 39l-10 15M32 39l11 14" ' + s + '/>' +
      '<path d="M12 28l-6 6 7 2-6 7" ' + r + '/><path d="M52 14l6 6-7 2 6 7" ' + r + '/>',
    headache:
      '<circle cx="32" cy="37" r="19" ' + s + '/>' +
      '<path d="M21 32l7 3-7 3M43 32l-7 3 7 3M24 48q4-4 8 0t8 0" ' + s + '/>' +
      '<path d="M18 3l-4 7h6l-4 7" ' + r + '/><path d="M34 1l-4 7h6l-4 7" ' + r + '/><path d="M50 3l-4 7h6l-4 7" ' + r + '/>',
    fever:
      '<rect x="26" y="5" width="12" height="38" rx="6" ' + s + '/>' +
      '<circle cx="32" cy="49" r="10" fill="' + RED + '" stroke="' + NAVY + '" stroke-width="3"/>' +
      '<path d="M32 46V18" fill="none" stroke="' + RED + '" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M44 12h7M44 21h7M44 30h7" ' + s + '/>',
    pain:
      '<path d="M20 4c-3 16-3 38 2 56" ' + s + '/>' +
      '<path d="M31 4c0 8 3 12 6 16 16 5 17 26 2 31-2 3-2 6-2 9" ' + s + '/>' +
      '<circle cx="40" cy="35" r="9" fill="' + SOFT + '" stroke="none"/>' +
      '<path d="M42 26l-5 8h6l-5 9" ' + r + '/>',
    breathing:
      '<path d="M32 6v18" ' + s + '/>' +
      '<path d="M29 24c-10-3-19 10-19 23 0 9 11 9 17 2 2-2 2-8 2-25z" fill="' + SOFT + '" stroke="' + NAVY + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M35 24c10-3 19 10 19 23 0 9-11 9-17 2-2-2-2-8-2-25z" fill="' + SOFT + '" stroke="' + NAVY + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M14 8h8M10 15h10M42 8h8M44 15h10" ' + r + '/>',
    swelling:
      '<path d="M24 4v30c0 8-4 11-10 13-5 2-5 11 2 11h28c7 0 8-9 1-13-5-3-7-6-7-11V4" fill="' + SOFT + '" stroke="' + NAVY + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M16 22H5M5 22l5-5M5 22l5 5" ' + r + '/><path d="M46 22h11M57 22l-5-5M57 22l-5 5" ' + r + '/>',
    movement:
      '<circle cx="30" cy="36" r="23" fill="' + SOFT + '" stroke="' + NAVY + '" stroke-width="3"/>' +
      '<circle cx="36" cy="27" r="7" fill="' + NAVY + '"/>' +
      '<path d="M30 33c-9 3-11 14-2 18 8 3 13-3 11-8" fill="none" stroke="' + NAVY + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M56 3v15M56 18l-6-6M56 18l6-6" ' + r + '/>'
  };

  window.Icons = {
    line: function (name, size) {
      var px = size || 24;
      return '<svg class="ic" width="' + px + '" height="' + px + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (line[name] || '') + '</svg>';
    },
    danger: function (name, size) {
      var px = size || 64;
      return '<svg class="dic" width="' + px + '" height="' + px + '" viewBox="0 0 64 64" aria-hidden="true">' + (danger[name] || '') + '</svg>';
    }
  };
})();
