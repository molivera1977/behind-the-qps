#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════
   BEHIND THE QPS · tools/build-catalog.js
   Builds data/catalog.js FROM THE QPS HUB'S OWN FILES, so this site can never describe a stop or a reading course
   the hub does not have (or miss one it does). It reads ../qps-literacy-hub:
     practice-data.js   PRACTICE_STOPS: every phonics stop, its lesson, its word lists
     practice.js        PASS, PASSES_NEEDED, CHECK_N, COUNTS, STEP_NAMES and buildSteps() (the steps of a stop)
     comp-data.js, maze-data.js, maze2-data.js   COMP_SKILLS: the reading path, its levels, goals and passages
     comp.js, maze.js   PRACTICE_N, CHECK_N, CHECK_PASS, PASSES_NEEDED, MAX_LEVEL, MINUTES
     index.html         the Assessment's Task list (names and how many items) — NEVER its test words
   No student data is read. Run:  node tools/build-catalog.js        (writes data/catalog.js)
                                  node tools/build-catalog.js --check (exit 1 if data/catalog.js is out of date
                                                                       or data/explain.js misses a stop or course)
═══════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const HERE = path.resolve(__dirname, '..');
const HUB = process.env.HUB_DIR ? path.resolve(process.env.HUB_DIR) : path.resolve(HERE, '..', 'qps-literacy-hub');
const read = rel => fs.readFileSync(path.join(HUB, rel), 'utf8');

/* a number constant: `const NAME = 80` (also inside `const A = 8, B = 2`) */
function num(src, name, file) {
  const m = new RegExp(`\\b${name} = (\\d+(?:\\.\\d+)?)`).exec(src);
  if (!m) throw new Error(`${file} has no "${name} = <number>"`);
  return Number(m[1]);
}
/* an object literal: `const NAME = { … };` on its own lines */
function obj(src, name, file) {
  const m = new RegExp(`const ${name} = (\\{[\\s\\S]*?\\});`).exec(src);
  if (!m) throw new Error(`${file} has no "const ${name} = {…};"`);
  return vm.runInNewContext('(' + m[1] + ')');
}

/* the hub's data files, run as the browser runs them (top-level consts, in one scope) */
function hubData() {
  const ctx = { window: {}, console };
  ctx.window = ctx;
  vm.createContext(ctx);
  const src = ['practice-data.js', 'comp-data.js', 'maze-data.js', 'maze2-data.js'].map(read).join('\n;\n') +
    '\n;this.__out = { PRACTICE_STOPS, COMP_SKILLS };';
  vm.runInContext(src, ctx);
  return ctx.__out;
}

const join = w => w.split('|').join('');
const bigWord = w => w.split('|').join('·');

function build() {
  const practice = read('practice.js'), comp = read('comp.js'), maze = read('maze.js'), index = read('index.html');
  const { PRACTICE_STOPS, COMP_SKILLS } = hubData();

  // the steps of a stop: the hub's own buildSteps(), cut out of practice.js and run here
  const fn = /function buildSteps\(st\) \{[\s\S]*?\n  \}/.exec(practice);
  if (!fn) throw new Error('practice.js has no function buildSteps(st)');
  const buildSteps = vm.runInNewContext('(' + fn[0] + ')');
  const STEP_NAMES = obj(practice, 'STEP_NAMES', 'practice.js');
  const COUNTS = obj(practice, 'COUNTS', 'practice.js');

  // the Assessment: Task id → its name and how many items (the words themselves are not copied)
  const bankSrc = /const wordBank = (\{[\s\S]*?\n    \});/.exec(index);
  if (!bankSrc) throw new Error('index.html has no "const wordBank = {…};"');
  const bank = vm.runInNewContext('(' + bankSrc[1] + ')');
  const names = obj(index, 'levelNames', 'index.html');
  const stopOfTask = t => (PRACTICE_STOPS.some(s => s.id === t) ? t : String(t).replace(/[ab]$/, ''));
  const tasks = Object.keys(names).filter(t => bank[t]).map(t => ({
    id: t, stop: stopOfTask(t), name: names[t], items: bank[t].length, sentences: bank[t].every(x => x.isSentence)
  }));
  // what a Check is made of (practice.js check()): big words → N to chop + the rest to build; others → N made-up
  // words to read + the rest to spell; letter sounds → read and listen, taking turns
  const mix = re => { const m = re.exec(practice); if (!m) throw new Error('practice.js check() has changed: ' + re); return { first: Number(m[1]), a: STEP_NAMES[m[2]], b: STEP_NAMES[m[3]] }; };
  const checkMix = {
    big: mix(/stop\.big\) items = shuffle\(words\.map\(\(w, i\) => \(\{ kind: i < (\d+) \? '(\w+)' : '(\w+)'/),
    made: mix(/else items = shuffle\(words\.map\(\(w, i\) => \(\{ kind: i < (\d+) \? '(\w+)' : '(\w+)'/)
  };
  // the screener's test words (single words, as the hub's tools/check-practice.js reads them) and the hub's practice
  // words (real + made-up): how many of each, and how many are the same — the "teaching to the test" answer
  const testWords = new Set(Object.values(bank).flat().map(x => x.w).filter(w => /^[a-z]+$/.test(w)));
  const practiceWords = PRACTICE_STOPS.flatMap(s => [...(s.real || []), ...(s.made || [])]).map(join);
  const words = { test: testWords.size, practice: practiceWords.length, same: practiceWords.filter(w => testWords.has(w)).length };
  const masteryInput = /id="masteryInput" value="(\d+)"/.exec(index);
  if (!masteryInput) throw new Error('index.html has no masteryInput value');

  const stops = PRACTICE_STOPS.map((s, i) => {
    const big = !!s.big;
    const real = s.real || [], made = s.made || [];
    return {
      id: s.id, num: s.num, order: i + 1, name: s.name, sayName: s.sayName || '', example: s.example,
      learn: s.learn.lines,
      examples: s.learn.examples.map(big ? bigWord : join),
      steps: buildSteps(s).map(k => ({ key: k, name: STEP_NAMES[k] || k, items: k === 'check' ? num(practice, 'CHECK_N', 'practice.js') : (COUNTS[k] || null) })),
      check: s.letters ? 'letters' : big ? 'big' : 'made',
      words: { letters: (s.letters || []).length, real: real.length, made: made.length, sentences: (s.sentences || []).length },
      sampleReal: real.slice(0, 6).map(big ? bigWord : join),
      sampleMade: made.slice(0, 6).map(join),
      sampleSentence: (s.sentences || [])[0] || '',
      sampleLetters: (s.letters || []).slice(0, 10),
      tasks: tasks.filter(t => t.stop === s.id).map(({ id, name, items, sentences }) => ({ id, name, items, sentences }))
    };
  });

  const courses = COMP_SKILLS.map((sk, i) => {
    const isMaze = sk.kind === 'maze';
    const levels = Object.keys(sk.levels).map(Number).sort((a, b) => a - b).map(L => {
      const all = sk.levels[L];
      return { level: L, note: sk.levelNotes[L] || '', goal: isMaze ? sk.goals[L] : null,
               practice: all.filter(p => p.use !== 'check').length, check: all.filter(p => p.use === 'check').length };
    });
    const first = sk.levels[Object.keys(sk.levels)[0]][0];
    const sample = isMaze
      ? { title: first.title, text: first.text.split(/(?<=[.!?])\s+/).slice(0, 4).join(' ') }
      : { passage: first.passage, choices: first.choices, answer: first.choices[0], clues: first.clues, clue: first.clues[0] };
    return { id: sk.id, order: i + 1, name: sk.name, icon: sk.icon, kind: isMaze ? 'maze' : 'context', learn: sk.learn, levels, sample };
  });

  return {
    rules: {
      pass: num(practice, 'PASS', 'practice.js'),
      passes: num(practice, 'PASSES_NEEDED', 'practice.js'),
      checkN: num(practice, 'CHECK_N', 'practice.js'),
      mastery: Number(masteryInput[1]),
      checkMix,
      words,
      comp: { practiceN: num(comp, 'PRACTICE_N', 'comp.js'), checkN: num(comp, 'CHECK_N', 'comp.js'),
              checkPass: num(comp, 'CHECK_PASS', 'comp.js'), passes: num(comp, 'PASSES_NEEDED', 'comp.js'),
              maxLevel: num(comp, 'MAX_LEVEL', 'comp.js'), startLevel: num(comp, 'DEFAULT_START', 'comp.js'),
              version: num(comp, 'COURSE_V', 'comp.js') },
      maze: { minutes: num(maze, 'MINUTES', 'maze.js') }
    },
    stops, courses
  };
}

function render(cat) {
  return `/* BUILT by tools/build-catalog.js from the QPS hub's own files (practice-data.js, practice.js, comp-data.js,
   maze-data.js, maze2-data.js, comp.js, maze.js, index.html). Do not edit by hand — run the tool again.
   No student data and none of the Assessment's test words are in this file. */
window.BTQ_CATALOG = ${JSON.stringify(cat, null, 1)};
`;
}

function explained() {
  const box = { window: {} };
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(HERE, 'data', 'explain.js'), 'utf8'), box);
  return box.window.BTQ_EXPLAIN;
}

const cat = build();
const out = render(cat);
const file = path.join(HERE, 'data', 'catalog.js');
const E = explained();
const missing = [
  ...cat.stops.filter(s => !E.stops[s.id] || !E.stops[s.id].standard).map(s => `stop ${s.id}`),
  ...cat.courses.filter(c => !E.courses[c.id] || !E.courses[c.id].standard).map(c => `course ${c.id}`)
];
const n = `${cat.stops.length} stops and ${cat.courses.length} reading courses`;
if (process.argv.includes('--check')) {
  const now = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (now !== out) { console.error('data/catalog.js is OUT OF DATE with the hub — run: node tools/build-catalog.js'); process.exit(1); }
  if (missing.length) { console.error('data/explain.js does not explain: ' + missing.join(', ')); process.exit(1); }
  console.log(`catalog up to date: ${n}, every one explained`);
} else {
  fs.writeFileSync(file, out);
  console.log(`wrote data/catalog.js: ${n}` + (missing.length ? ` — explain.js still misses ${missing.join(', ')}` : ', every one explained'));
}
