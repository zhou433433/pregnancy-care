// Date and schedule logic. No DOM access here so it can be tested with node.
(function (root) {
  var DAY = 24 * 60 * 60 * 1000;

  // WHO 2016 antenatal care model: 8 contacts, the first one up to week 12.
  var CONTACT_WEEKS = [12, 20, 26, 30, 34, 36, 38, 40];

  // First completed week of each pregnancy month (month 1 starts at week 0).
  var MONTH_START = [0, 5, 9, 14, 18, 23, 28, 32, 36];
  // Week we assume when the woman only knows her month.
  var MONTH_MID = [2, 6, 11, 15, 20, 25, 29, 33, 37];

  function startOfDay(d) {
    var x = new Date(d.getTime());
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function parseISODate(s) {
    var p = String(s).split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function toISODate(d) {
    var m = String(d.getMonth() + 1);
    var day = String(d.getDate());
    return d.getFullYear() + '-' + (m.length < 2 ? '0' + m : m) + '-' + (day.length < 2 ? '0' + day : day);
  }

  function addDays(d, n) {
    var x = new Date(d.getTime());
    x.setDate(x.getDate() + n);
    return x;
  }

  function daysBetween(a, b) {
    return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / DAY);
  }

  // Completed weeks since the first day of the last period.
  function weeksPregnant(lmp, today) {
    var days = daysBetween(lmp, today);
    if (days < 0) return 0;
    return Math.floor(days / 7);
  }

  function monthOfWeek(week) {
    var m = 1;
    for (var i = 0; i < MONTH_START.length; i++) {
      if (week >= MONTH_START[i]) m = i + 1;
    }
    return m;
  }

  function trimesterOfWeek(week) {
    if (week <= 13) return 1;
    if (week <= 27) return 2;
    return 3;
  }

  function lmpFromMonth(month, today) {
    var w = MONTH_MID[Math.min(Math.max(month, 1), 9) - 1];
    return addDays(startOfDay(today), -w * 7);
  }

  function lmpFromWeek(week, today) {
    return addDays(startOfDay(today), -week * 7);
  }

  function dueDate(lmp) {
    return addDays(lmp, 280);
  }

  // status: done | missed | next | later
  function schedule(lmp, today, doneIds) {
    var week = weeksPregnant(lmp, today);
    var done = doneIds || [];
    var nextFound = false;
    return CONTACT_WEEKS.map(function (w, i) {
      var id = i + 1;
      var date = addDays(lmp, w * 7);
      var status;
      if (done.indexOf(id) !== -1) {
        status = 'done';
      } else if (week > w + 1) {
        status = 'missed';
      } else if (!nextFound) {
        status = 'next';
        nextFound = true;
      } else {
        status = 'later';
      }
      return { id: id, week: w, date: date, status: status, daysAway: daysBetween(today, date) };
    });
  }

  function nextContact(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].status === 'next') return list[i];
    }
    return null;
  }

  function distanceKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var toRad = Math.PI / 180;
    var dLat = (lat2 - lat1) * toRad;
    var dLon = (lon2 - lon1) * toRad;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  // Calendar file for one appointment. The title is kept neutral on purpose
  // because the phone may be shared with family members.
  function buildICS(start, title, uid) {
    function stamp(d) {
      return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
    }
    var end = new Date(start.getTime() + 60 * 60 * 1000);
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Pregnancy Care Prototype//EN',
      'BEGIN:VEVENT',
      'UID:' + uid,
      'DTSTAMP:' + stamp(new Date()),
      'DTSTART:' + stamp(start),
      'DTEND:' + stamp(end),
      'SUMMARY:' + title,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:' + title,
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-PT2H',
      'ACTION:DISPLAY',
      'DESCRIPTION:' + title,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }

  var api = {
    CONTACT_WEEKS: CONTACT_WEEKS,
    startOfDay: startOfDay,
    parseISODate: parseISODate,
    toISODate: toISODate,
    addDays: addDays,
    daysBetween: daysBetween,
    weeksPregnant: weeksPregnant,
    monthOfWeek: monthOfWeek,
    trimesterOfWeek: trimesterOfWeek,
    lmpFromMonth: lmpFromMonth,
    lmpFromWeek: lmpFromWeek,
    dueDate: dueDate,
    schedule: schedule,
    nextContact: nextContact,
    distanceKm: distanceKm,
    buildICS: buildICS
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.Logic = api;
  }
})(typeof window !== 'undefined' ? window : this);
