/* ═══════════════════════════════════════════════════════
   BEHIND THE QPS · app.js
   Mr. Olivera 10/23: "Shouldn't we do a Behind the QPS similar to the Behind the LAB to fully explain how each child's
   plan came to be and what they are being given."
     The QPS in one page · The Path (every stop and reading course, click for the details) · Who gets what (the rules)
     🔒 My Students (teacher PIN): where each child started and why, where they are now, what comes next
   PRIVACY: no student name is written in this file. Names come from the hub's own track list (login.js) and the
   results sheet, shown only after the PIN, as "First L." (Mr. Olivera 10/22) until the teacher switches on full names
   — the switch is off again on every visit. This site only READS; it never writes to the sheet.
═══════════════════════════════════════════════════════ */
(function () {
'use strict';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzv8CWv1yyi8NeH04now9UxVL4IZm5yMqqsEGMcgGdrcAOWVB-aSp5siTvSSJXIUpzFMA/exec';
const TRACKS_URL = '../qps-literacy-hub/login.js';    // the hub's track list: where each child STARTS
const TEACHER_PIN = '9377';
const C = window.BTQ_CATALOG, E = window.BTQ_EXPLAIN, P = window.BTQPath;
const RULES = C.rules;
// ⚡ a Check finished faster than it can be read — the same floors as the dashboard's 📖 QPS page (10/21)
const FAST_SECONDS = { phonics: 40, reading: 60 };

const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stopOf = id => C.stops.find(s => s.id === id);
const courseOf = id => C.courses.find(c => c.id === id);
const stopIds = C.stops.map(s => s.id);
const stopLabel = s => `Stop ${s.num} · ${s.name}`;
const day = t => { const d = new Date(t); return isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); };
const pts = n => (Number.isInteger(n) ? String(n) : `${Math.floor(n)}½`);
const passBoxes = (n, of) => '✅'.repeat(n) + '⬜'.repeat(Math.max(0, of - n));
// the three bands of the path (the screener's own order)
const BANDS = [
  { key: 'sounds', name: 'Sounds and short words', ids: ['1', '2', '3', '4'] },
  { key: 'vowels', name: 'Vowel patterns', ids: ['5', '6', '7', '8'] },
  { key: 'big', name: 'Big words', ids: ['9a', '9b', '9c', '10'] }
];
const bandOf = id => (BANDS.find(b => b.ids.includes(id)) || BANDS[2]).key;

/* a lesson line as the hub writes it: /sh/ = the SOUND (his recording), {sh} = the letter names */
// (sounds first: the <b> tags added for letter names have slashes of their own)
const lessonLine = t => esc(t).replace(/\/([^/\s][^/]*)\//g, '<span class="snd" title="Mr. Olivera\'s recording of the sound">🔊 /$1/</span>').replace(/\{([^}]+)\}/g, '<b>$1</b>');
const example = w => esc(w).replace(/&gt;/g, ' → ');

/* ── the explanations behind the buttons on the first page ── */
const checkWhat = s => s.check === 'letters' ? `${RULES.checkN} letters, taking turns: read the letter's sound, then find the letter for a sound`
  : s.check === 'big' ? `${RULES.checkN} real words: ${RULES.checkMix.big.first} to ${RULES.checkMix.big.a.toLowerCase()} into parts and ${RULES.checkN - RULES.checkMix.big.first} to ${RULES.checkMix.big.b.toLowerCase()}`
  : `${RULES.checkN} made-up words: ${RULES.checkMix.made.first} to ${RULES.checkMix.made.a.toLowerCase()} and ${RULES.checkN - RULES.checkMix.made.first} to ${RULES.checkMix.made.b.toLowerCase()}`;
const need = Math.ceil(RULES.checkN * RULES.pass / 100);
const TOPICS = {
  'why-qps': ['About the screener', [
    'The Wonders Quick Phonics Screener (QPS) is given on the district\'s mCLASS system three times a year: in the fall, in January and in May–June.',
    'A child reads each section in order — 1. Letters, 2. VC and CVC, 3. Consonant Digraphs, up to 10. Prefixes and Suffixes. The screener stops at the first section they have not mastered; a child who gets through every section is marked "11. Passed all sections".',
    'Only "Passed all sections" counts as passed (Mr. Olivera 10/19). A blank Phonics Indicator on mCLASS is Not Passed.',
    'On the fall screener (mCLASS data meeting, 10/14), 16 of the 22 students screened stopped at a section, 8 of them at 5. Silent e. Six passed every section.',
    'The hub\'s stops are numbered like the screener — 1 to 8, then 9a, 9b, 9c and 10 — so the section a child stopped at IS their stop.']],
  'part-learn': ['📖 Learn', [
    'The pattern, taught in a few short lines with example words to tap and hear. Sounds are Mr. Olivera\'s own recordings.',
    'The lesson is read aloud and must be heard to the end before the example words and the next step open.']],
  'part-practice': ['🧩 Practice steps', [
    'One job per screen, with one Next button. Which steps a stop has depends on the pattern: Blend (tap each sound, then the word), Listen (sort words by the sound heard), Change (one part makes a new word), Build (put the parts in order), Read (which recording says this made-up word?), Spell (which spelling?), Sentences.',
    'Big-word stops (9a–10) have Chop (split the word into its parts), Blend and Build.',
    'Practice is not scored. A wrong pick says "Not that one", often names the part to look at or listen for, and the child tries again.']],
  'part-check': ['✅ The Check', [
    `${RULES.checkN} items with no hints. The site does not say what is right until the end.`,
    `${RULES.pass}% passes (${need} of ${RULES.checkN}). The score is sent to Mr. Olivera's results sheet with every item missed.`,
    'The Check uses practice words, never the screener\'s test words, and the words the child has not had in a Check lately come first, so a retry cannot pass on remembered answers.']],
  'part-twice': ['✅✅ Pass it twice', [
    `A stop is passed only after ${RULES.passes} passed Checks (Mr. Olivera 10/20: "make them do the entire level twice with a required 80% check every time to guarantee mastery before testing with Mr. O").`,
    'After any Check, the practice steps come first again: a child cannot take the Check over and over without practicing.',
    'A Check under 80% does not count as a pass, and the child practices the stop again.']],
  'part-test': ['📝 Mr. Olivera\'s test', [
    'After two passes, the child moves on and the stop goes on Mr. Olivera\'s "test them" list on his dashboard.',
    `His test is the screener's own section, given one-on-one in the hub's Assessment: the child reads the section's test words while he taps right or wrong. Mastery is ${RULES.mastery}%.`,
    'The result is saved with the teacher PIN and shows on the child\'s row on his dashboard. If the child does not pass his test, he can send them back to that stop.']],
  readpath: ['How the reading path works', [
    'Who: students the screener marked "Passed all sections".',
    `The courses come one at a time, in order: ${C.courses.map(c => c.name).join(' → ')}. The child sees one card — the course they are on — and the others as "finished" or "opens when you finish …".`,
    `Every course has ${RULES.comp.maxLevel} levels, and everyone starts at Level ${RULES.comp.startLevel} to earn each level (Mr. Olivera 10/21).`,
    `A level: Learn (the first time) → Practice → Check. Words in context: Practice is ${RULES.comp.practiceN} passages, the Check ${RULES.comp.checkN} passages worth 10 points (${RULES.comp.checkPass} to pass). Maze: Practice is one story with no timer; the Check is one story, silent, ${RULES.maze.minutes} minutes, scored like DIBELS (a right word 1 point, a wrong word −½), with a goal for each level.`,
    `${RULES.comp.passes} passed Checks move the child up a level. The level moves ONLY on a Check. Passing Level ${RULES.comp.maxLevel} twice finishes the course, and Mr. Olivera is told to check them.`]],
  test: ['Is this teaching to the test?', [
    'Teaching to the test means drilling a test\'s own items or its tricks until the score rises without the skill. The hub does the opposite: it teaches the skill each screener section measures, with different words, and then checks that skill on words the child has never practiced.',
    `The test words are never practiced. None of the hub's ${RULES.words.practice} practice words is one of the screener's ${RULES.words.test} test words (${RULES.words.same} the same, counted from the hub's files when this site was built). A checker runs before every push of the hub and stops it if a test word, or an answer choice that spells one, gets into practice.`,
    'The screener\'s words are used once, by Mr. Olivera, one-on-one, as his test. Because the child never practiced them, a pass on his test shows the skill carries over to new words — which is what the screener is meant to find out.',
    'Made-up words cannot be memorized. The screener uses them so a child has to decode, and so does the hub; every Check puts first the words the child has not had lately, and a stop must be passed twice.',
    'The practice goes past the screener. The screener has a child read words and sentences aloud. The hub also has them hear and sort sounds (Listen), change one sound to make a new word (Change), put words together from their parts (Build), spell (Spell), and, in stop 10, learn what each prefix and suffix means.',
    'The screener\'s sections are the phonics standards. The QPS is the Wonders program\'s own screener, and its sections follow the order phonics is taught: short vowels, digraphs, blends, silent e, r-controlled vowels, vowel teams, syllables, prefixes and suffixes. Each stop\'s page names its Common Core Foundational Skills standard. Teaching what the screener found missing is teaching those standards.',
    'A screener exists to show where teaching should start. Starting a child at the section where it stopped them is the use it was made for.',
    'It is practice time, beside the reading lessons. Students work on the hub on their own while Mr. Olivera teaches a small group; it does not replace the class\'s reading lessons.',
    `Where the question is fair: Maze. The Maze course copies the DIBELS Maze on purpose (silent, ${RULES.maze.minutes} minutes, a wrong word costs half a point), and its goals are the mCLASS benchmark scores. The answer: all ${C.courses.filter(c => c.kind === 'maze').reduce((n, c) => n + c.levels.reduce((k, L) => k + L.practice + L.check, 0), 0)} stories are new, written for the hub, so no story can be remembered; the skill — reading a story for meaning and using context to catch a word that does not fit — is the Grade 4 standard RF.4.4c; and knowing the format keeps a child from losing points to surprise.`,
    'What we watch: practice with a test\'s format can lift a score a little without lifting reading. So Maze growth on the hub is read beside the child\'s oral reading fluency and their classroom reading, never alone.']],
  moving: ['Moving on by itself', [
    'Mr. Olivera 10/21: "Let\'s allow them to move without me but flag me to remind to test them."',
    'Two passed Checks on a child\'s own stop open the next stop at once. The child does not wait for the teacher.',
    'The stop they finished goes on his "test them" list. His dashboard has ✓ Tested (take it off the list) and ↩ Back to stop … (if they did not pass his test). Both ask first and can be undone.',
    'Progress is one row per child on the results sheet, so it follows them to any Chromebook.',
    'The last stop (10) is the end of the phonics path: the child stays there, and what comes next is Mr. Olivera\'s call.']],
  madeup: ['Made-up words', [
    'The screener uses made-up words (like "zade") so a child has to sound the word out; a word they already know by sight would hide the gap.',
    'The site does the same in Read and Spell, with its own made-up words. None of them is a screener test word.',
    'Big-word stops (9a–10) use real words broken into parts.']],
  voice: ['Mr. Olivera\'s voice', [
    'Every single sound — letters, vowels, chunks like "ate" or "tion" — is Mr. Olivera\'s own recording.',
    'Whole words are read by the computer voice, made-up words through a respelling so the computer says them right (zade → "zayd").',
    'His students had caught some wrong sounds, so he listened to every word and every answer choice the site says and voted on each one; the ones he heard as wrong were replaced (10/20–10/21).']],
  aloud: ['Read aloud', [
    'Most students in the class read below grade level, so the directions never get in the way of the skill.',
    'Directions and lessons are read aloud with each word lit as it is read, and must be heard to the end before the step opens.',
    'Leaving a stop ends the reading at once.',
    'Maze stories are never read aloud, in Practice or the Check, because the real DIBELS Maze is silent.']],
  records: ['Records', [
    'Every Check is a row on the results sheet: the score, the time it took, every item missed and in which step.',
    'One row per child holds where they are now (stop, passes, stops waiting for his test); one row per reading-path child holds their level in each course.',
    'Mr. Olivera\'s dashboard (📖 QPS page) shows each child\'s stop, passes, last Check, the stops waiting for his test, his own test results, and a ⚡ flag on a Check finished faster than the words can be read.']],
  privacy: ['Privacy', [
    'No student\'s name is written in this site\'s code. Where each child starts is the hub\'s own track list; this site reads it when the page opens and shows only counts until the teacher PIN.',
    'After the PIN, names show as "First L." until the teacher switches on full names, and the switch is off again on every visit.',
    'Each child\'s screener results and scores (mCLASS, DIBELS) are not on the web at all: they stay on the teacher\'s computer.',
    'This site only reads the results sheet. It never writes to it.']]
};

/* ── the drawer ── */
function openDrawer(html, back) {
  $('#drawer-body').innerHTML = (back ? `<button class="more back" id="drawer-back">← ${esc(back.label)}</button>` : '') + html;
  $('#drawer').hidden = false;
  const b = $('#drawer-back');
  if (b) b.onclick = () => back.open();
  $('#drawer-close').focus();
}
function closeDrawer() { $('#drawer').hidden = true; if (/^#(stop|course)-/.test(location.hash)) linkHere('#' + currentView); }
function topicHTML(key) {
  const [title, lines] = TOPICS[key];
  return `<h2 id="drawer-title">${esc(title)}</h2>` + lines.map(l => `<p>${esc(l)}</p>`).join('');
}

/* ── live counts: where the class started (the track list) and where they are now (the progress rows) ── */
let TRACKS = null, SINCE = {}, NOWROWS = null;
const startCount = id => TRACKS ? Object.values(TRACKS).filter(t => t.start === id).length : null;
const nowCount = id => {
  if (!TRACKS) return null;
  return Object.entries(TRACKS).filter(([n, t]) => {
    if (!stopIds.includes(t.start)) return false;
    const row = NOWROWS && NOWROWS.find(r => r.name === n);
    return P.stopNow(stopIds, t.start, row ? P.parseProgress(row.form, RULES.passes) : null, SINCE[n]) === id;
  }).length;
};
const countLine = id => {
  const s = startCount(id), n = nowCount(id);
  if (s == null) return '';
  return `${s} started here on the fall screener${NOWROWS ? ` · ${n} working here now` : ''}.`;
};

/* one stop, in full */
function stopHTML(id) {
  const s = stopOf(id), x = E.stops[id] || {}, next = C.stops[s.order];
  const steps = s.steps.map(st => `<span class="step-chip${st.key === 'check' ? ' check' : ''}">${esc(st.name)}${st.items ? ` <small>${st.items}</small>` : ''}</span>`).join('<span class="arrow">→</span>');
  const words = s.words.letters ? `${s.words.letters} letter sounds (qu counts as one)`
    : `${s.words.real} real words${s.words.made ? `, ${s.words.made} made-up words` : ''}${s.words.sentences ? `, ${s.words.sentences} sentences` : ''}`;
  const test = s.tasks.map(t => `${esc(t.name)} (${t.items} ${t.sentences ? 'sentences' : 'items'})`).join(' + ');
  const sample = s.words.letters
    ? `<p><b>Letters:</b> ${s.sampleLetters.map(esc).join(' ')}</p>`
    : `<p><b>Real words:</b> ${s.sampleReal.map(esc).join(', ')}</p>${s.sampleMade.length ? `<p><b>Made-up words:</b> ${s.sampleMade.map(esc).join(', ')}</p>` : ''}${s.sampleSentence ? `<p><b>A sentence:</b> ${esc(s.sampleSentence)}</p>` : ''}`;
  const live = countLine(id);
  return `<h2 id="drawer-title">${esc(stopLabel(s))}</h2>
    <p class="muted">Screener section ${esc(x.section || s.num)} · stop ${s.order} of ${C.stops.length} · example: ${esc(s.example)}</p>
    <div class="kid-view"><span class="lbl">What the child sees</span>
      <p><b>"Your stop is number ${esc(s.num)}, ${esc(s.sayName || s.name)}. Tap Start."</b></p>
      ${s.learn.map(l => `<p>${lessonLine(l)}</p>`).join('')}
      <p class="muted">Example words to tap and hear: ${s.examples.map(example).join(' · ')}</p></div>
    <dl class="facts-list">
      <dt>Reviews</dt><dd>${esc(x.reviews || s.name)}</dd>
      <dt>Standard</dt><dd>${esc(x.standard || '—')}</dd>
      <dt>Level</dt><dd>${esc(x.level || '')}</dd>
      <dt>On screen</dt><dd class="step-row">${steps}</dd>
      <dt>Practice words</dt><dd>${esc(words)}${s.words.letters ? '' : ' — none of them a screener test word'}.</dd>
      <dt>The Check</dt><dd>${esc(checkWhat(s))}, no hints.</dd>
      <dt>To pass</dt><dd>${RULES.pass}% on the Check (${need} of ${RULES.checkN}), ${RULES.passes} times. After any Check, the practice steps come first again.</dd>
      <dt>Then</dt><dd>${next ? `The child moves to <button class="more inline" data-stop="${next.id}">${esc(stopLabel(next))}</button> at once, and this stop goes on Mr. Olivera's test list.` : 'This is the last stop. The child stays here; what comes next is Mr. Olivera\'s call.'}</dd>
      <dt>Mr. Olivera's test</dt><dd>${test ? `${test} — the screener's own words, scored by him as the child reads; mastery ${RULES.mastery}%.` : '—'}</dd>
    </dl>
    <h4>Real practice words from this stop</h4><div class="sample">${sample}</div>
    <h4>Why this stop matters</h4><p>${esc(x.why || '')}</p>
    <h4>Who starts here</h4><p>Students the fall screener stopped at section ${esc(x.section || s.num)}. ${esc(x.screened || '')}${live ? ` <span class="live">${esc(live)}</span>` : ''}</p>`;
}

/* one reading course, in full */
function courseHTML(id) {
  const c = courseOf(id), x = E.courses[id] || {}, maze = c.kind === 'maze';
  const levels = `<table class="levels"><thead><tr><th>Level</th><th>What makes it harder</th><th>To pass the Check</th><th>${maze ? 'Stories' : 'Passages'}</th></tr></thead><tbody>` +
    c.levels.map(L => `<tr><td>${L.level}</td><td>${esc(L.note.replace(/^Round 2: /, '').replace(/ Goal: .*$/, ''))}</td>
      <td>${maze ? `${pts(L.goal)} points in ${RULES.maze.minutes} minutes` : `${RULES.comp.checkPass} of 10 points`}</td>
      <td>${L.practice} practice · ${L.check} check</td></tr>`).join('') + '</tbody></table>';
  let sample;
  if (maze) {
    const text = esc(c.sample.text).replace(/\{([^|}]+)\|([^|}]+)\|([^}]+)\}/g, (m, a, b, d) => `<span class="box"><b class="right">${a}</b> / ${b} / ${d}</span>`);
    sample = `<div class="sample"><p><b>"${esc(c.sample.title)}"</b> — the beginning. The child sees the 3 words in each box shuffled; the right one is in green here.</p><p>${text} …</p></div>`;
  } else {
    const p = esc(c.sample.passage).replace(/\*([^*]+)\*/g, '<b>$1</b>');
    const word = (/\*([^*]+)\*/.exec(c.sample.passage) || [])[1] || 'the word';
    const list = (arr, right) => `<ul>${arr.map(v => `<li class="${v === right ? 'right' : ''}">${esc(v)}</li>`).join('')}</ul>`;
    sample = `<div class="sample"><p>${p}</p><p><b>What does "${esc(word)}" mean in this passage?</b></p>${list(c.sample.choices, c.sample.answer)}
      <p><b>Which words in the passage helped you know?</b></p>${list(c.sample.clues, c.sample.clue)}</div>`;
  }
  const how = maze
    ? `Learn (the first time) → Practice: one story, no timer, one more try after a miss → Check: one story, silent, ${RULES.maze.minutes} minutes; a right word is 1 point, a wrong word takes away ½; a box skipped before the last one answered counts as wrong.`
    : `Learn (the first time) → Practice: ${RULES.comp.practiceN} passages, a second try, the clue words lit after an answer → Check: ${RULES.comp.checkN} passages, no hints, 10 points (meaning + clue for each).`;
  const prev = C.courses[c.order - 2];
  return `<h2 id="drawer-title">${esc(c.icon)} ${esc(c.name)}</h2>
    <p class="muted">Reading path · course ${c.order} of ${C.courses.length}${prev ? ` · opens when ${esc(prev.name)} is finished` : ' · the first course'}</p>
    <div class="kid-view"><span class="lbl">What the child hears first (Learn)</span>${c.learn.map(l => `<p>${esc(l)}</p>`).join('')}</div>
    <dl class="facts-list">
      <dt>Reviews</dt><dd>${esc(x.reviews || '')}</dd>
      <dt>Standard</dt><dd>${esc(x.standard || '—')}</dd>
      <dt>Level</dt><dd>${esc(x.level || '')}</dd>
      <dt>A level</dt><dd>${esc(how)}</dd>
      <dt>To move up</dt><dd>${RULES.comp.passes} passed Checks at a level. The level moves only on a Check. Passing Level ${RULES.comp.maxLevel} twice finishes the course${C.courses[c.order] ? ` and opens ${esc(C.courses[c.order].name)}` : ''}; Mr. Olivera is told to check the child.</dd>
    </dl>
    <h4>The four levels</h4>${levels}
    <h4>A real ${maze ? 'story' : 'passage'} from Level 1</h4>${sample}
    <h4>Why this course</h4><p>${esc(x.why || '')}</p>
    <h4>Who gets it</h4><p>Students the screener marked "11. Passed all sections", in the order of the path.${TRACKS ? ` <span class="live">${startCount('comp')} students are on the reading path.</span>` : ''}</p>
    <h4>Decided</h4><p>${esc(x.decided || '')}</p>`;
}

/* ── The Path ── */
function renderMap() {
  $('#n-stops').textContent = String(C.stops.length);
  const tile = s => `<button class="tile" data-stop="${s.id}" id="tile-${s.id}"><span class="code">Stop ${esc(s.num)}</span><span class="t">${esc(s.name)}</span><span class="ex">${esc(s.example)}</span>${TRACKS && startCount(s.id) ? `<span class="cnt">${startCount(s.id)} started here</span>` : ''}</button>`;
  $('#map').innerHTML = BANDS.map((b, k) => `<section class="lane ${b.key}" aria-label="${esc(b.name)}">
      <div class="lane-head"><h3>${esc(b.name)}</h3><span class="gate">${k ? 'continues from ' + esc(BANDS[k - 1].name.toLowerCase()) : 'the start of the screener'}</span></div>
      <div class="tiles">${b.ids.map(stopOf).filter(Boolean).map((s, i) => `${i ? '<span class="arrow" aria-hidden="true">→</span>' : ''}${tile(s)}`).join('')}</div>
    </section>`).join('') +
    `<section class="lane reading" aria-label="Reading path">
      <div class="lane-head"><h3>Reading path</h3><span class="gate">for students who passed every section · one course at a time</span></div>
      <div class="tiles">${C.courses.map((c, i) => `${i ? '<span class="arrow" aria-hidden="true">→</span>' : ''}<button class="tile" data-course="${c.id}" id="tile-${c.id}"><span class="code">Course ${c.order}</span><span class="t">${esc(c.icon)} ${esc(c.name)}</span><span class="ex">Levels 1–${RULES.comp.maxLevel}</span></button>`).join('')}</div>
    </section>`;
  $('#course-steps').innerHTML = C.courses.map(c => `<li><button data-course="${c.id}"><span class="si">${esc(c.icon)}</span><b>${esc(c.name)}</b><small>Levels 1–${RULES.comp.maxLevel}, 2 passes each</small></button></li>`).join('');
}

/* ── Who gets what ── */
function renderWho() {
  const startRows = C.stops.map(s => [stopLabel(s), startCount(s.id), s.id]).filter(r => r[1] !== 0)
    .concat([['Reading path (passed all sections)', startCount('comp'), 'comp']]);
  const table = TRACKS
    ? `<table class="start-table"><thead><tr><th>Where they start</th><th>Students</th></tr></thead><tbody>${startRows.map(([l, n, id]) => `<tr><td>${id === 'comp' ? esc(l) : `<button class="more inline" data-stop="${id}">${esc(l)}</button>`}</td><td>${n}</td></tr>`).join('')}</tbody></table>`
    : '<p class="muted">The hub\'s track list could not be read right now.</p>';
  const card = (title, rows, cls = '') => `<article class="card who-card ${cls}"><h3>${title}</h3><dl>${rows.map(([t, d]) => `<dt>${esc(t)}</dt><dd>${d}</dd>`).join('')}</dl></article>`;
  $('#who').innerHTML =
    card('Where each child starts', [
      ['The rule', 'A child starts at the stop with the same number as the screener section where they stopped. A child marked "11. Passed all sections" starts the reading path.'],
      ['Passed means', 'Only "Passed all sections" counts as passed. A blank Phonics Indicator on mCLASS is Not Passed (Mr. Olivera 10/19).'],
      ['From', 'The fall Wonders Quick Phonics Screener, on the district\'s mCLASS data-meeting screen (10/14). The starting stops are one list in the hub (its track list), which Mr. Olivera\'s dashboard reads too, so the two always agree.'],
      ['Joined later', 'For a student who joined the class after the screener, Mr. Olivera picks the starting stop (10/21: "start the new student at stop 2 for now").'],
      ['The class', table]], 'sounds') +
    card('Moving along the phonics stops', [
      ['Passing a stop', `${RULES.pass}% on the ${RULES.checkN}-item Check, ${RULES.passes} times, with the practice steps done again before each Check.`],
      ['Moving on', 'Two passes open the next stop at once (Mr. Olivera 10/21: "allow them to move without me but flag me to remind to test them").'],
      ['Mr. Olivera\'s test', `The finished stop goes on his test list. He gives the screener's own section in the hub's Assessment (mastery ${RULES.mastery}%) and saves it with his PIN.`],
      ['If they do not pass his test', 'He can send them back to that stop from his dashboard: they practice it and pass its Check twice again.'],
      ['The end of the path', 'After stop 10, the child stays on stop 10 until Mr. Olivera decides what comes next.']], 'vowels') +
    card('The reading path', [
      ['Who', 'Students the screener marked "11. Passed all sections".'],
      ['Order', C.courses.map(c => `<button class="more inline" data-course="${c.id}">${esc(c.icon)} ${esc(c.name)}</button>`).join(' → ') + ' — one at a time; the next opens when one is finished.'],
      ['Levels', `${RULES.comp.maxLevel} levels a course; everyone starts at Level ${RULES.comp.startLevel} and earns each one (Mr. Olivera 10/21).`],
      ['Moving up', `${RULES.comp.passes} passed Checks at a level. The level never moves in the middle of Practice.`],
      ['Finishing', `Passing Level ${RULES.comp.maxLevel} twice finishes a course; Mr. Olivera's dashboard lists the child to check.`]], 'reading') +
    card('When a plan is redone', [
      ['Each screening', 'The QPS is given three times a year (fall, January, May–June). New results set new starting stops, and a child who now passes every section moves to the reading path.'],
      ['By hand', 'Mr. Olivera can move any child to another stop at any time; the hub then follows his move, not the older progress.'],
      ['A plan is not a reading group', 'The reading group is who meets with Mr. Olivera at his table. The plan is what a child practices on the hub while they are not with him. A child can be in a comprehension group and still have a phonics stop, if the screener stopped them at one.']], 'big') +
    `<article class="card who-card"><h3>Decided</h3><ul class="decided">${E.decisions.map(([d, t]) => `<li><b>${esc(d)}</b> ${esc(t)}</li>`).join('')}</ul></article>`;
}

/* ── the sheet and the track list (read only) ── */
async function readTab(game) {
  const res = await fetch(`${SHEET_URL}?action=leaderboard&game=${encodeURIComponent(game)}`, { cache: 'no-store' });
  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
}
async function loadTracks() {
  const src = await fetch(TRACKS_URL, { cache: 'no-store' }).then(r => (r.ok ? r.text() : ''));
  TRACKS = P.parseTracks(src);
  SINCE = P.parseSince(src);
  if (!TRACKS) throw new Error('no track list');
}

/* the test-words line on the first page (counted from the hub's files by tools/build-catalog.js) */
function renderTestWords() {
  $('#test-words').textContent = `None of the hub's ${RULES.words.practice} practice words is one of the screener's ${RULES.words.test} test words.`;
}

/* live counts on the first page (no names shown) */
async function renderCounts() {
  const box = $('#live-counts');
  try {
    await loadTracks();
    try { NOWROWS = await readTab('qps-progress'); } catch (e) { NOWROWS = null; }
    const all = Object.values(TRACKS);
    const phon = all.filter(t => stopIds.includes(t.start)).length;
    box.innerHTML = `<span class="n">${all.length}</span> students have a plan: <b>${phon}</b> on phonics stops, <b>${startCount('comp')}</b> on the reading path.` +
      `<span class="counts">${C.stops.filter(s => startCount(s.id) || (NOWROWS && nowCount(s.id))).map(s => `<span class="count-chip">Stop ${esc(s.num)} ${esc(s.name)}: ${startCount(s.id)} started${NOWROWS ? ` · ${nowCount(s.id)} now` : ''}</span>`).join('')}</span>`;
  } catch (e) { box.textContent = 'The live counts could not be loaded right now.'; }
  renderMap();
  renderWho();
}

/* ── 🔒 My Students ── */
let ROWS = { progress: [], levels: [] }, DASH = null, SHORT = {};
function displayName(n) { return $('#full-names').checked ? n : (SHORT[n] || n); }
const lastSession = (game, name) => { const st = DASH && (DASH[game] || []).find(s => s.name === name); const ss = (st && st.sessions) || []; return ss.length ? ss[ss.length - 1] : null; };
function progressForm(name) { const s = lastSession('qps-progress', name); if (s) return s.form; const r = ROWS.progress.find(x => x.name === name); return r ? r.form : ''; }
function levelsForm(name) { const s = lastSession('qps-levels', name); if (s) return s.form; const r = ROWS.levels.find(x => x.name === name); return r ? r.form : ''; }
function finishedRows(name, keep) {
  if (!DASH) return [];
  const out = [];
  Object.keys(DASH).filter(keep).forEach(g => {
    const st = DASH[g].find(s => s.name === name);
    ((st && st.sessions) || []).filter(s => s.status === 'complete').forEach(s => out.push({ ...s, game: g }));
  });
  return out.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}
const isStopGame = g => /^qps-(\d+|9[abc])$/.test(g);
const isCourseGame = g => /^qps-c-/.test(g);
function myTests(name) {
  return finishedRows(name, g => g === 'qps-tests').map(s => {
    const f = String(s.form || '');
    return { task: f.split(' · ')[0], stop: (/· stop (\w+) ·/.exec(f) || [])[1] || '', passed: /✅/.test(f), percent: s.percent, timestamp: s.timestamp };
  });
}
function testedCourses(name) { const s = lastSession('qps-tested', name); return new Set(String(s ? s.form : '').split(',').filter(Boolean)); }

function childState(name) {
  const t = TRACKS[name];
  if (t.start === 'comp') {
    const course = P.parseCourse(levelsForm(name), { ...RULES.comp });
    return { name, t, comp: true, read: P.reading(C, course, testedCourses(name)),
             checks: finishedRows(name, g => isCourseGame(g)).filter(s => /^Check/.test(s.form || '')) };
  }
  const pf = progressForm(name);
  const prog = pf ? P.parseProgress(pf, RULES.passes) : null;
  const checks = finishedRows(name, isStopGame).map(s => ({ ...s, stop: s.game.slice(4) }));
  return { name, t, comp: false, path: P.phonics(C, t.start, prog && prog.stop ? prog : null, SINCE[name], checks, myTests(name)), checks, tests: myTests(name) };
}

const fast = x => { const sec = Number(x.elapsed) || 0; return sec && sec < (isCourseGame(x.game) ? FAST_SECONDS.reading : FAST_SECONDS.phonics) ? ` <span class="fast" title="Finished in ${sec} seconds: faster than the words can be read">⚡ ${sec} s</span>` : ''; };
const checkScore = x => (/^qps-c-maze/.test(x.game || '') ? ((/· ([\d½]+ points)/.exec(x.form || '') || [])[1] || `${x.score} points`) : `${x.percent}%`);
const checkWhere = x => (isStopGame(x.game) ? `Stop ${x.game.slice(4)}` : (courseOf(x.game.slice(6)) || { name: x.game }).name);

function renderRoster() {
  const names = Object.keys(TRACKS).sort((a, b) => a.localeCompare(b));
  SHORT = P.shortNames(names);
  $('#roster').innerHTML = `<table class="roster"><thead><tr><th>Student</th><th>Started at</th><th>Working on now</th><th>Passes</th><th>Waiting for your test</th><th>Last Check</th></tr></thead><tbody>` +
    names.map(n => {
      const c = childState(n);
      let started, now, passes, waiting;
      if (c.comp) {
        const cur = c.read.courses.find(x => x.id === c.read.current), co = courseOf(cur.id);
        started = '<span class="chip reading">Reading path</span>';
        now = c.read.allDone ? '🎉 Every course finished' : `${esc(co.icon)} ${esc(co.name)} · Level ${cur.level}${cur.started ? '' : ' <small class="muted">(not started)</small>'}`;
        passes = c.read.allDone ? '' : `${passBoxes(cur.passes, RULES.comp.passes)} ${cur.passes} of ${RULES.comp.passes}`;
        waiting = c.read.waiting.map(id => esc(courseOf(id).name)).join(', ');
      } else {
        const s0 = stopOf(c.t.start), s1 = stopOf(c.path.now);
        started = s0 ? `<span class="chip ${bandOf(s0.id)}">${esc(stopLabel(s0))}</span>` : '<span class="no-plan">Any stop</span>';
        now = s1 ? (c.path.now !== c.t.start ? `⭐ ${esc(stopLabel(s1))}` : esc(stopLabel(s1))) + (c.path.nodes.find(x => x.id === c.path.now).state === 'done' ? ' <small>(end of the path)</small>' : '') : '—';
        passes = s1 ? `${passBoxes(c.path.passes, RULES.passes)} ${c.path.passes} of ${RULES.passes}` : '';
        waiting = c.path.waiting.map(id => `Stop ${esc(id)}`).join(', ');
      }
      const last = c.checks[0];
      return `<tr class="kid" data-kid="${esc(n)}"><td><button class="kid-name" data-kid="${esc(n)}">${esc(displayName(n))}</button></td>
        <td>${started}</td><td>${now}</td><td class="nowrap">${passes}</td><td>${waiting ? `📝 ${waiting}` : ''}</td>
        <td>${last ? `${esc(checkScore(last))} <small class="muted">${esc(checkWhere(last))}, ${esc(day(last.timestamp))}</small>${fast(last)}` : (DASH ? '<span class="muted">none yet</span>' : '<span class="muted">…</span>')}</td></tr>`;
    }).join('') + '</tbody></table>';
}

const STATE_MARK = { screener: '✓', passed: '✅', now: '⭐', done: '🏁', ahead: '🔒' };
function childHTML(name) {
  const c = childState(name);
  const head = `<h2 id="drawer-title">${esc(displayName(name))}</h2>`;
  const note = c.t.note ? `<p><b>Note on the hub's track list:</b> "${esc(c.t.note)}"</p>` : '';
  const hand = SINCE[name] ? `<p>Mr. Olivera moved this child by hand on ${esc(day(SINCE[name]))}; the hub follows that move.</p>` : '';
  const recent = c.checks.slice(0, 6);
  const checks = recent.length ? `<ul class="checks">${recent.map(x => `<li>${esc(day(x.timestamp))} · ${esc(checkWhere(x))} · <b>${esc(checkScore(x))}</b>${fast(x)}${x.wrongQuestions ? `<br><small class="muted">Missed: ${esc(String(x.wrongQuestions).slice(0, 160))}</small>` : ''}</li>`).join('')}</ul>`
    : `<p class="muted">${DASH ? 'No Check yet.' : 'Reading every Check…'}</p>`;
  const evidence = '<p class="evidence-note">This child\'s screener result and scores (the mCLASS data behind the starting stop) are in your local copy: <b>Behind the QPS - Evidence.html</b> in Student Data (local only)/qps-docs. They are never put on the web.</p>';

  if (c.comp) {
    const r = c.read, cur = r.courses.find(x => x.id === r.current), co = courseOf(cur.id);
    const goal = co.kind === 'maze' ? `${pts(co.levels[cur.level - 1].goal)} points in ${RULES.maze.minutes} minutes` : `${RULES.comp.checkPass} of 10 points`;
    const lanes = r.courses.map(x => {
      const cc = courseOf(x.id);
      const mark = x.state === 'finished' ? '✅' : x.state === 'now' ? '⭐' : '🔒';
      return `<div class="route-strand reading"><h4>${mark} ${esc(cc.icon)} ${esc(cc.name)}${x.tested ? ' · ✓ you tested this' : x.finished ? ' · 📝 finished — test them' : ''}</h4><div class="nodes">${x.levels.map(L => `<button class="node ${L.state}" data-course="${x.id}">${L.state === 'passed' ? '✅' : L.state === 'now' ? '⭐' : '🔒'} Level ${L.level}<br><small>${L.state === 'passed' ? 'passed twice' : L.state === 'now' ? `${passBoxes(L.passes, RULES.comp.passes)} ${L.passes} of ${RULES.comp.passes} passes` : 'still to come'}</small></button>`).join('')}</div></div>`;
    }).join('');
    return head + `<div class="why-box"><b>How this plan came to be:</b> the screener marked this child "11. Passed all sections", so instead of a phonics stop they get the reading path, one course at a time. Everyone on it started at Level ${RULES.comp.startLevel} (10/21).</div>${note}${hand}
      <h4>What they are given now</h4>
      <p>${r.allDone ? `Every course is finished. ${esc(co.name)} stays open for review.` : `<button class="more inline" data-course="${co.id}">${esc(co.icon)} ${esc(co.name)}</button> · Level ${cur.level} of ${RULES.comp.maxLevel} · ${passBoxes(cur.passes, RULES.comp.passes)} ${cur.passes} of ${RULES.comp.passes} passes${cur.started ? '' : ' (not started yet)'}. To pass this level's Check: ${esc(goal)}.`}</p>
      <h4>The reading path</h4>${lanes}
      <h4>Recent Checks</h4>${checks}${evidence}`;
  }

  const p = c.path, s0 = stopOf(p.start), sNow = stopOf(p.now);
  if (!s0) return head + note + '<p class="no-plan">No starting stop on the track list: this child sees every stop and picks one.</p>' + evidence;
  const nodeTip = n => n.state === 'screener' ? 'passed on the screener'
    : n.state === 'passed' ? `passed twice${n.movedOn ? ` · ${day(n.movedOn)}` : ''}`
    : n.state === 'now' ? `${passBoxes(n.passes, RULES.passes)} ${n.passes} of ${RULES.passes} passes${n.tries ? ` · ${n.tries} Check${n.tries === 1 ? '' : 's'}, best ${n.best}%` : ''}`
    : n.state === 'done' ? 'passed twice · end of the path'
    : n.tries ? `${n.tries} Check${n.tries === 1 ? '' : 's'} before, best ${n.best}%` : 'still to come';
  const testTip = n => n.tests.length ? `<br><small>📝 your test: ${n.tests[0].percent}% ${n.tests[0].passed ? '✅' : '⚠️'}</small>` : n.waitingForTest ? '<br><small>📝 waiting for your test</small>' : '';
  const lanes = BANDS.map(b => `<div class="route-strand ${b.key}"><h4>${esc(b.name)}</h4><div class="nodes">${b.ids.map(id => p.nodes.find(n => n.id === id)).map(n => {
    const s = stopOf(n.id);
    return `<button class="node ${n.state}" data-stop="${n.id}">${STATE_MARK[n.state]} ${esc(stopLabel(s))}<br><small>${esc(nodeTip(n))}</small>${testTip(n)}</button>`;
  }).join('')}</div></div>`).join('');
  const before = C.stops.slice(0, s0.order - 1);
  const why = c.t.note ? `the hub's track list starts this child at <b>${esc(stopLabel(s0))}</b> (see the note below)`
    : `the fall screener stopped this child at section <b>${esc((E.stops[s0.id] || {}).section || s0.num)}</b>, so they start at <b>${esc(stopLabel(s0))}</b> (the placement rule, 10/14)`;
  const nowNode = p.nodes.find(n => n.id === p.now), next = C.stops[sNow.order];
  const nowLine = nowNode.state === 'done'
    ? `${esc(stopLabel(sNow))} is passed twice — the end of the phonics path. What comes next is your call.`
    : `<button class="more inline" data-stop="${sNow.id}">${esc(stopLabel(sNow))}</button> · ${passBoxes(p.passes, RULES.passes)} ${p.passes} of ${RULES.passes} passes. ${sNow.steps.map(st => esc(st.name)).join(' → ')}. ${p.passes >= RULES.passes ? '' : `${RULES.passes - p.passes} more passed Check${RULES.passes - p.passes === 1 ? '' : 's'} (${RULES.pass}%) ${next ? `move them to ${esc(stopLabel(next))}, and this stop goes on your test list` : 'finish the phonics path'}.`}`;
  const tests = c.tests.length ? `<ul class="checks">${c.tests.slice(0, 5).map(t => `<li>${esc(day(t.timestamp))} · ${esc(t.task)} · <b>${esc(t.percent)}%</b> ${t.passed ? '✅ mastery' : '⚠️ needs practice'}</li>`).join('')}</ul>` : `<p class="muted">${DASH ? 'No test saved yet.' : 'Reading your tests…'}</p>`;
  return head + `<div class="why-box"><b>How this plan came to be:</b> ${why}.${before.length ? ` Stops 1–${esc(before[before.length - 1].num)} were passed on the screener, so they are not practiced here.` : ''}</div>${note}${hand}
    <h4>What they are given now</h4><p>${nowLine}</p>
    ${p.waiting.length ? `<p>📝 <b>Waiting for your test:</b> ${p.waiting.map(id => { const s = stopOf(id); return s ? `${esc(stopLabel(s))} (${s.tasks.map(t => esc(t.name)).join(' + ')})` : esc(id); }).join('; ')}.</p>` : ''}
    <h4>The phonics path</h4><p class="muted">✓ passed on the screener · ✅ passed twice here · ⭐ now · 🔒 still to come</p>${lanes}
    <h4>Your tests</h4>${tests}
    <h4>Recent Checks</h4>${checks}${evidence}`;
}

async function openStudents() {
  $('#pin-box').hidden = true;
  $('#students').hidden = false;
  $('#full-names').checked = false;   // off on every visit
  $('#students-status').textContent = 'Reading the plans…';
  try {
    if (!TRACKS) await loadTracks();
    const [progress, levels] = await Promise.all([readTab('qps-progress'), readTab('qps-levels')]);
    ROWS = { progress, levels };
    renderRoster();
    $('#students-status').textContent = 'Plans loaded. Reading every Check and test (about a minute)…';
    const res = await fetch(`${SHEET_URL}?action=dashboard`, { cache: 'no-store' });
    const raw = await res.json();
    DASH = {};
    Object.entries(raw).forEach(([k, v]) => { if (/^qps-/.test(k.toLowerCase())) DASH[k.toLowerCase()] = v; });
    renderRoster();
    const k = $('#drawer-body').dataset.kid;
    if (k && !$('#drawer').hidden) openKid(k);
    $('#students-status').textContent = `Up to date at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}.`;
  } catch (e) {
    $('#students-status').textContent = TRACKS ? 'The results sheet could not be reached. Try again in a minute.' : 'The hub\'s track list could not be read. Try again in a minute.';
  }
}

/* ── views ── */
let currentView = 'overview';
const VIEWS = ['overview', 'map', 'who', 'students'];
function show(view, keepHash) {
  currentView = view;
  VIEWS.forEach(v => {
    $(`#view-${v}`).hidden = v !== view;
    $(`#tab-${v}`).setAttribute('aria-selected', String(v === view));
  });
  if (!keepHash && location.hash !== '#' + view) history.replaceState(null, '', '#' + view);
}

/* ── a link for every stop and course (as on Behind the LAB): #stop-5 opens that stop's explanation over the Path,
   #course-maze a course's. While one is open, the address bar holds its link; closing it puts the view back. */
function openFromHash() {
  const m = /^#(stop|course)-([A-Za-z0-9]+)$/.exec(location.hash);
  if (!m) return false;
  const id = m[1] === 'stop' ? m[2].toLowerCase() : m[2].toLowerCase();
  if (m[1] === 'stop' ? !stopOf(id) : !courseOf(id)) return false;
  show('map', true);
  $('#drawer-body').dataset.kid = '';
  openDrawer(m[1] === 'stop' ? stopHTML(id) : courseHTML(id));
  return true;
}
const linkHere = hash => history.replaceState(null, '', hash);

document.addEventListener('click', e => {
  const t = e.target.closest('[data-view],[data-explain],[data-stop],[data-course],[data-kid]');
  if (!t) { if (e.target === $('#drawer')) closeDrawer(); return; }
  if (t.dataset.view) return show(t.dataset.view);
  if (t.dataset.explain) { openDrawer(topicHTML(t.dataset.explain)); return linkHere('#' + currentView); }
  const inKid = $('#drawer').hidden ? null : $('#drawer-body').dataset.kid;
  const back = inKid ? { label: displayName(inKid), open: () => openKid(inKid) } : null;
  if (t.dataset.stop) { $('#drawer-body').dataset.kid = ''; openDrawer(stopHTML(t.dataset.stop), back); return linkHere('#stop-' + t.dataset.stop); }
  if (t.dataset.course) { $('#drawer-body').dataset.kid = ''; openDrawer(courseHTML(t.dataset.course), back); return linkHere('#course-' + t.dataset.course); }
  if (t.dataset.kid) return openKid(t.dataset.kid);
});
function openKid(name) { openDrawer(childHTML(name)); $('#drawer-body').dataset.kid = name; linkHere('#' + currentView); }
$('#drawer-close').onclick = closeDrawer;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
$('#pin-form').addEventListener('submit', e => {
  e.preventDefault();
  if ($('#pin-input').value === TEACHER_PIN) { $('#pin-msg').textContent = ''; $('#pin-input').value = ''; openStudents(); }
  else $('#pin-msg').textContent = 'That PIN is not right.';
});
$('#full-names').addEventListener('change', () => { renderRoster(); const k = $('#drawer-body').dataset.kid; if (k && !$('#drawer').hidden) openKid(k); });

renderMap();
renderWho();
renderTestWords();
renderCounts();
if (!openFromHash()) show(VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'overview');
window.addEventListener('hashchange', openFromHash);
})();
