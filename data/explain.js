/* ═══════════════════════════════════════════════════════
   BEHIND THE QPS · data/explain.js — the WHY behind every stop and reading course (written by hand)
   The stop and course LIST comes from the QPS hub itself (data/catalog.js, built by tools/build-catalog.js); this
   file only explains it. tools/build-catalog.js --check fails if the hub has a stop or course this file does not
   explain.
   CLASS-LEVEL facts only. No student is named here or anywhere in this site's code: where each child starts is
   read from the hub's own track list at run time, behind the teacher PIN. Each child's scores stay on Mr. O's
   computer.
   Standards: Common Core ELA Foundational Skills (RF) and Language (L). Screener counts: the fall Wonders Quick
   Phonics Screener on the district's mCLASS data-meeting screen (shared 10/14/2026), 22 students screened.
═══════════════════════════════════════════════════════ */
window.BTQ_EXPLAIN = {

/* ── each phonics stop: the screener section it matches, what it reviews, the standard, the level of the work,
      why a 4th grader needs it, and who starts there ── */
stops: {
  '1': {
    section: '1. Letters',
    reviews: 'The sound each letter makes (not its name), including qu.',
    standard: 'RF.K.3a, RF.K.3b — the most common sound for each letter, and the short and long sounds of the vowels.',
    level: 'Kindergarten skill.',
    why: 'Every other stop is built from these sounds. A child who says a letter\'s name instead of its sound cannot blend a word.',
    screened: 'No student in the class stopped here on the fall screener.'
  },
  '2': {
    section: '2. VC and CVC',
    reviews: 'Short vowel sounds in three-letter words: cat, bed, pig, hot, sun.',
    standard: 'RF.1.3b — decode regularly spelled one-syllable words (and RF.K.3b, short vowel sounds).',
    level: 'Kindergarten–Grade 1 skill.',
    why: 'The vowel is where most reading mistakes happen. One wrong vowel turns pin into pen or hot into hut, and the sentence stops making sense.',
    screened: '1 student stopped here on the fall screener.'
  },
  '3': {
    section: '3. Consonant Digraphs',
    reviews: 'Two letters that make ONE sound: sh, ch, th, wh, ck, ng.',
    standard: 'RF.1.3a — know the spelling-sound patterns for common consonant digraphs.',
    level: 'Grade 1 skill.',
    why: 'A child who reads s-h as two sounds breaks words like ship, which and back — and these letter pairs are in almost every line of a 4th-grade text.',
    screened: '1 student stopped here on the fall screener.'
  },
  '4': {
    section: '4. Blends',
    reviews: 'Two consonants side by side where you hear BOTH sounds: fr, st, cl, -mp, -nd.',
    standard: 'RF.1.2b and RF.1.3b — blend sounds, including consonant blends, to read one-syllable words.',
    level: 'Grade 1 skill.',
    why: 'Skipping one sound of a blend turns frog into fog and stamp into stap. Readers who drop sounds lose whole words.',
    screened: 'No student in the class stopped here on the fall screener.'
  },
  '5': {
    section: '5. Silent e',
    reviews: 'A quiet e at the end makes the vowel say its name: cap → cape, kit → kite, hop → hope.',
    standard: 'RF.1.3c — know final -e conventions for long vowel sounds (RF.2.3a: tell long from short vowels).',
    level: 'Grade 1 skill.',
    why: 'Without it, a child reads cape as cap and hope as hop. Long-vowel words like these are everywhere in 4th-grade reading.',
    screened: '8 of the 22 students screened stopped here — more than at any other section.'
  },
  '6': {
    section: '6. R-controlled vowels',
    reviews: '"Bossy R": a vowel followed by r makes a new sound — ar (car), or (for), er, ir, ur (her, bird, turn).',
    standard: 'RF.1.3 and RF.2.3 — grade-level phonics for one-syllable words. The standards do not name r-controlled vowels; phonics programs teach them in Grades 1–2.',
    level: 'Grade 1–2 skill.',
    why: 'A child who reads the vowel and the r as two separate sounds garbles common words: bird, first, turn, short.',
    screened: '2 students stopped here on the fall screener.'
  },
  '7': {
    section: '7. Advanced Consonants',
    reviews: 'Letter groups that play tricks: tch (catch), dge (badge), qu, x, and silent letters in kn, wr, gn.',
    standard: 'RF.2.3e — words with inconsistent but common spelling-sound patterns.',
    level: 'Grade 2 skill.',
    why: 'Silent letters and spellings like -tch and -dge show up in everyday 4th-grade words: knife, write, bridge, sign, watch.',
    screened: '1 student stopped here on the fall screener.'
  },
  '8': {
    section: '8. Vowel Teams',
    reviews: 'Two letters that make one vowel sound: ai/ay (rain, day), oa/oe (boat, toe), ea, igh, oo, ew, ou, oi/oy, au/aw.',
    standard: 'RF.1.3c and RF.2.3b — know the spelling-sound patterns for common vowel teams.',
    level: 'Grade 1–2 skill.',
    why: 'Vowel teams are the biggest family of long-vowel spellings. A child who sounds out each letter of b-o-a-t cannot read them.',
    screened: 'No student in the class stopped here on the fall screener.'
  },
  '9a': {
    section: '9a. 2-syllable words',
    reviews: 'Reading a two-part word one part (syllable) at a time, then putting it together: con + tent = content.',
    standard: 'RF.1.3e and RF.2.3c — decode two-syllable words by breaking them into syllables.',
    level: 'Grade 1–2 skill.',
    why: 'Most new words a 4th grader meets have two or more syllables. Breaking a word into parts is the step from short words to grade-level text.',
    screened: 'No student in the class stopped here on the fall screener.'
  },
  '9b': {
    section: '9b. 3-syllable words',
    reviews: 'Three-part words, one part at a time: com + pu + ter.',
    standard: 'RF.3.3c — decode multisyllable words.',
    level: 'Grade 3 skill.',
    why: 'Science and social studies words (habitat, energy, important) are three parts long. Reading them part by part keeps a child from guessing from the first letters.',
    screened: '1 student stopped here on the fall screener.'
  },
  '9c': {
    section: '9c. 4-syllable words',
    reviews: 'Four-part words, slowly, one part at a time: in + fi + ni + ty.',
    standard: 'RF.4.3a — use letter-sound patterns and syllable patterns to read unfamiliar multisyllable words (the Grade 4 standard itself).',
    level: 'Grade 3–4 skill.',
    why: 'This is the Grade 4 decoding standard. Long words are where a reader who is fine on short words still loses meaning.',
    screened: '2 students stopped here on the fall screener.'
  },
  '10': {
    section: '10. Prefixes and Suffixes',
    reviews: 'Word parts at the start and end, and what they mean: un-, re-, pre-, dis-, non-, -ful, -less, -ness, -est, -able.',
    standard: 'RF.2.3d, RF.3.3a and RF.4.3a — read words with prefixes and suffixes, and know what the common ones mean.',
    level: 'Grade 2–4 skill.',
    why: 'Word parts let a child read AND understand a new word: unhelpful = not + help + full of. It is the bridge from decoding to vocabulary.',
    screened: 'The last section of the screener. No student in the class stopped here.'
  }
},

/* ── the reading path (students who passed every section): what each course works on and why ── */
courses: {
  maze: {
    reviews: 'Reading a story silently and picking, in each box, the one word of three that makes sense.',
    standard: 'RF.4.4 and RF.4.4c — read with enough accuracy and fluency to understand, using context to check each word.',
    level: 'Levels 1–4: short, easy stories up to Grade 4 stories like the DIBELS test. Level 4\'s goal (16½ points in 3 minutes) is the mCLASS Grade 4 middle-of-year At Benchmark score; Levels 1–3 step up to it.',
    why: 'Maze is one of the two DIBELS 8 measures in Grade 4 (with Oral Reading Fluency). A child who can decode every word can still read without following the meaning; Maze shows it. The Check works like the real one: silent, 3 minutes, a right word is 1 point and a wrong word takes away half a point.',
    decided: '10/21 — first on the reading path; the Check is like DIBELS (silent, timed, right − ½ wrong). The stories are never read aloud, in Practice or the Check ("The real test won\'t have read aloud").'
  },
  context: {
    reviews: 'Working out what a hard word means from the words around it (context clues), and finding the clue that proves it.',
    standard: 'L.4.4a — use context (definitions, examples, restatements) as a clue to the meaning of a word or phrase.',
    level: 'Level 1: the meaning is right next to the word · 2: an example or nearby sentence shows it · 3: an opposite shows it, or the clue is in another sentence · 4: words with two meanings, harder words, longer passages.',
    why: 'It is the first skill of the district\'s Wonders Unit 2 order. Every passage asks two questions — what the word means, and which words in the passage helped — so the child has to show the evidence, the way SBAC asks.',
    decided: '10/15 — the first reading course; 10/21 — a course the site walks the child through, level by level, with the level moving only on the Check.'
  },
  maze2: {
    reviews: 'A second round of Maze with new stories and higher goals.',
    standard: 'RF.4.4 and RF.4.4c — read with enough accuracy and fluency to understand, using context to check each word.',
    level: 'Levels 1–4 again, with new stories. Level 4\'s goal (17 points) is the mCLASS Grade 4 end-of-year At Benchmark score.',
    why: 'After Words in context, the child goes back to Maze to show the growth holds — new stories, so nothing is remembered from round 1, and goals that rise toward the end-of-year benchmark.',
    decided: '10/21 — Mr. Olivera asked for a second Maze round after Words in context. 48 new stories; goals 9 / 12 / 15 / 17.'
  }
},

/* ── when each rule was decided (Mr. Olivera's words where he gave them) ── */
decisions: [
  ['10/14', 'Placement: each child starts at the stop where the fall screener stopped them. The stops are numbered like the screener (1–8, 9a, 9b, 9c, 10).'],
  ['10/15', 'Students who passed every section get a reading track instead of a phonics stop.'],
  ['10/19', 'Only "Passed all sections" counts as passed. A blank Phonics Indicator on mCLASS is Not Passed.'],
  ['10/20', 'Two passes: "make them do the entire level twice with a required 80% check every time to guarantee mastery before testing with Mr. O."'],
  ['10/21', 'Moving on: "allow them to move without me but flag me to remind to test them."'],
  ['10/21', 'Mr. Olivera\'s own test is saved: the Assessment records each test with the teacher PIN.'],
  ['10/21', 'The reading path is one course at a time, and everyone on it starts at Level 1 to earn each level.'],
  ['10/21', 'A student who joined after the screener: Mr. Olivera picks the starting stop ("start the new student at stop 2 for now").']
]
};
