/* ═══════════════════════════════════════════════════════
   BEHIND THE QPS · path.js — where a child started, where they are now, and what comes next.
   The SAME rules as the QPS hub (login.js effectiveStop / afterPass, comp.js fromRow and the guided reading path)
   and the teacher dashboard's 📖 QPS page, so all three always say the same thing about a child.
   Pure functions, no page: the site uses them, and the tests run them in Node.
═══════════════════════════════════════════════════════ */
(function (root) {
'use strict';

/* "Last, First" → "First L." (Mr. Olivera 10/22, as on Behind the LAB); two that would read the same get more letters */
function shortNames(names) {
  const parts = n => { const m = /^([^,]+),\s*(.+)$/.exec(String(n)); return m ? { first: m[2].trim(), last: m[1].trim() } : { first: String(n), last: '' }; };
  const out = {};
  const list = names.map(n => ({ n, ...parts(n) }));
  list.forEach(x => {
    let k = 1, label;
    for (;;) {
      label = x.last ? `${x.first} ${x.last.slice(0, k)}.` : x.first;
      const clash = list.some(y => y.n !== x.n && y.first === x.first && y.last.slice(0, k) === x.last.slice(0, k));
      if (!clash || k >= x.last.length) break;
      k++;
    }
    out[x.n] = label;
  });
  return out;
}

/* the hub's track list (login.js): one line per student —   "Last, First":  "5",   // a note
   start = the stop they START at ('5'), 'comp' (the reading path) or null (any stop). Read the same way as the
   teacher dashboard reads it. The note after // is kept: it is Mr. O's reason when there is one. */
function parseTracks(src) {
  const block = (/const TRACKS = \{([\s\S]*?)\};/.exec(String(src || '')) || [])[1];
  if (!block) return null;
  const out = {};
  block.split('\n').forEach(line => {
    const m = /^\s*"([^"]+)":\s*(?:"([^"]+)"|null)\s*,?\s*(?:\/\/\s*(.*))?$/.exec(line);
    if (m) out[m[1]] = { start: m[2] || null, note: (m[3] || '').trim() };
  });
  return out;
}
/* login.js TRACK_SINCE: name → the time Mr. O moved them by hand (an older progress row is then ignored) */
function parseSince(src) {
  const out = {};
  ((/const TRACK_SINCE = \{([\s\S]*?)\};/.exec(String(src || '')) || [])[1] || '').split('\n').forEach(line => {
    const m = /^\s*"([^"]+)":\s*(\d+)/.exec(line);
    if (m) out[m[1]] = Number(m[2]);
  });
  return out;
}

/* the 'qps-progress' row: "stop=6;passes=1;test=5|t=<ms>" — the stop now, passed Checks on it, stops waiting for
   Mr. O's test (login.js parseProgress) */
function parseProgress(form, passesNeeded) {
  const [pairs, t] = String(form || '').split('|t=');
  const p = { stop: '', passes: 0, test: [], t: Number(t) || 0 };
  pairs.split(';').forEach(kv => {
    const [k, v] = kv.split('=');
    if (k === 'stop') p.stop = v || '';
    if (k === 'passes') p.passes = Math.max(0, Math.min(passesNeeded, Number(v) || 0));
    if (k === 'test') p.test = String(v || '').split(',').filter(Boolean);
  });
  return p;
}

/* the 'qps-levels' row: "maze=2;context=1|t=…|p=maze:1|f=|l=maze|v=2|s=…" (comp.js fromRow). A row from before the
   10/21 restart (another v) counts as nothing, as on the hub. → { maze: { level, passes, finished, learned } } */
function parseCourse(form, rules) {
  const segs = String(form || '').split('|');
  const get = key => (segs.find(x => x.startsWith(key + '=')) || '').slice(key.length + 1);
  if (Number(get('v')) !== rules.version) return {};
  const passes = {};
  get('p').split(',').forEach(x => { const [k, n] = x.split(':'); if (k) passes[k] = Math.max(0, Math.min(rules.passes, Number(n) || 0)); });
  const finished = new Set(get('f').split(',').filter(Boolean)), learned = new Set(get('l').split(',').filter(Boolean));
  const out = {};
  segs[0].split(';').forEach(p => {
    const [k, v] = p.split('=');
    const lv = Number(v);
    if (k && lv >= 1 && lv <= rules.maxLevel) out[k] = { level: lv, passes: passes[k] || 0, finished: finished.has(k), learned: learned.has(k) };
  });
  return out;
}

/* the stop a child works on now: their progress row if it is newer than a hand move, else where they started
   (login.js effectiveStop) */
function stopNow(stopIds, start, prog, since) {
  if (!start || start === 'comp' || !stopIds.includes(start)) return start;
  if (prog && prog.stop && stopIds.includes(prog.stop) && prog.t > (since || 0)) return prog.stop;
  return start;
}

/* ONE child's phonics path. cat = the catalog; start = their stop in the track list; prog = their progress row
   (parsed) or null; since = a hand move's time; checks = their Check rows [{ stop, percent, timestamp, elapsed }];
   tests = Mr. O's tests [{ stop, task, percent, passed, timestamp }].
   Every stop gets a state:
     screener  before the start stop: passed on the fall screener (the screener stops a child at the first section
               they do not pass), not practiced here
     passed    passed twice on the site and moved on (between the start stop and the stop now)
     now       the stop they are on now (passes 0–2)
     done      the last stop, passed twice: the end of the phonics path (stays there until Mr. O decides)
     ahead     still to come */
function phonics(cat, start, prog, since, checks, tests) {
  const ids = cat.stops.map(s => s.id);
  const now = stopNow(ids, start, prog, since);
  const iStart = ids.indexOf(start), iNow = ids.indexOf(now);
  const passesNow = prog && prog.stop === now && prog.t > (since || 0) ? prog.passes
    : (checks || []).filter(c => c.stop === now && Number(c.percent) >= cat.rules.pass).length;
  const waiting = prog && prog.t > (since || 0) ? prog.test : [];
  const nodes = cat.stops.map((s, i) => {
    const mine = (checks || []).filter(c => c.stop === s.id).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const passedChecks = mine.filter(c => Number(c.percent) >= cat.rules.pass);
    const myTests = (tests || []).filter(t => t.stop === s.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    let state;
    if (iStart < 0) state = 'ahead';
    else if (i < iStart) state = 'screener';
    else if (i < iNow) state = 'passed';
    else if (i === iNow) state = i === ids.length - 1 && passesNow >= cat.rules.passes ? 'done' : 'now';
    else state = 'ahead';
    return {
      id: s.id, state, tries: mine.length, best: mine.reduce((m, c) => Math.max(m, Number(c.percent) || 0), -1),
      movedOn: passedChecks.length >= cat.rules.passes ? passedChecks[cat.rules.passes - 1].timestamp : '',
      passes: i === iNow ? passesNow : state === 'passed' || state === 'done' ? cat.rules.passes : 0,
      waitingForTest: waiting.includes(s.id), tests: myTests
    };
  });
  return { start, now, passes: passesNow, waiting, nodes, onPath: iStart >= 0 };
}

/* ONE child's reading path (the guided path, hub 10/21): the courses in order; the first one not finished is the
   one the child is given now; the ones after it open in turn. course = parseCourse(...); tested = Set of course ids
   Mr. O has marked tested. */
function reading(cat, course, tested) {
  const rules = cat.rules.comp;
  let current = cat.courses.findIndex(c => !(course[c.id] && course[c.id].finished));
  const allDone = current < 0;
  if (allDone) current = cat.courses.length - 1;     // all done: the last course stays as review (the hub's card)
  const courses = cat.courses.map((c, i) => {
    const st = course[c.id] || null;
    const state = st && st.finished ? 'finished' : i === current ? 'now' : i < current ? 'finished' : 'ahead';
    const level = st ? st.level : rules.startLevel;
    const levels = c.levels.map(L => ({
      level: L.level,
      state: state === 'finished' || (st && L.level < level) ? 'passed' : state === 'now' && L.level === level ? 'now' : 'ahead',
      passes: state === 'finished' || (st && L.level < level) ? rules.passes : state === 'now' && L.level === level && st ? st.passes : 0
    }));
    return { id: c.id, state, started: !!st, level, passes: st ? st.passes : 0, learned: !!(st && st.learned),
             finished: !!(st && st.finished), tested: !!(tested && tested.has(c.id)), levels };
  });
  return { current: cat.courses[current].id, allDone, courses,
           waiting: courses.filter(c => c.finished && !c.tested).map(c => c.id) };
}

const api = { shortNames, parseTracks, parseSince, parseProgress, parseCourse, stopNow, phonics, reading };
if (typeof module === 'object' && module.exports) module.exports = api;
else root.BTQPath = api;
})(typeof self !== 'undefined' ? self : this);
