/* BUILT by tools/build-catalog.js from the QPS hub's own files (practice-data.js, practice.js, comp-data.js,
   maze-data.js, maze2-data.js, comp.js, maze.js, index.html). Do not edit by hand — run the tool again.
   No student data and none of the Assessment's test words are in this file. */
window.BTQ_CATALOG = {
 "rules": {
  "pass": 80,
  "passes": 2,
  "checkN": 10,
  "mastery": 80,
  "checkMix": {
   "big": {
    "first": 5,
    "a": "Chop",
    "b": "Build"
   },
   "made": {
    "first": 6,
    "a": "Read",
    "b": "Spell"
   }
  },
  "words": {
   "test": 176,
   "practice": 441,
   "same": 0
  },
  "comp": {
   "practiceN": 8,
   "checkN": 5,
   "checkPass": 8,
   "passes": 2,
   "maxLevel": 4,
   "startLevel": 1,
   "version": 2
  },
  "maze": {
   "minutes": 3
  }
 },
 "stops": [
  {
   "id": "1",
   "num": "1",
   "order": 1,
   "name": "Letter sounds",
   "sayName": "",
   "example": "a b c",
   "learn": [
    "Every letter makes a sound.",
    "Tap a letter to hear its sound. Then say the sound out loud."
   ],
   "examples": [
    "a",
    "m",
    "s",
    "t",
    "f",
    "qu"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "letterRead",
     "name": "Read",
     "items": null
    },
    {
     "key": "letterHear",
     "name": "Listen",
     "items": null
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "letters",
   "words": {
    "letters": 26,
    "real": 0,
    "made": 0,
    "sentences": 0
   },
   "sampleReal": [],
   "sampleMade": [],
   "sampleSentence": "",
   "sampleLetters": [
    "m",
    "s",
    "t",
    "a",
    "p",
    "i",
    "n",
    "d",
    "o",
    "g"
   ],
   "tasks": [
    {
     "id": "1a",
     "name": "Task 1(a): Letters Set 1",
     "items": 18,
     "sentences": false
    },
    {
     "id": "1b",
     "name": "Task 1(b): Letters Set 2",
     "items": 8,
     "sentences": false
    }
   ]
  },
  {
   "id": "2",
   "num": "2",
   "order": 2,
   "name": "Short vowels",
   "sayName": "",
   "example": "cat",
   "learn": [
    "The vowels are {a}, {e}, {i}, {o} and {u}.",
    "In a short word like cat, the vowel makes its short sound: {a} says /a/, {e} says /e/, {i} says /i/, {o} says /o/, {u} says /u/.",
    "Tap each word. Listen for the vowel in the middle."
   ],
   "examples": [
    "cat",
    "bed",
    "pig",
    "hot",
    "sun"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "sort",
     "name": "Listen",
     "items": 8
    },
    {
     "key": "chains",
     "name": "Change",
     "items": 6
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "decode",
     "name": "Read",
     "items": 6
    },
    {
     "key": "spell",
     "name": "Spell",
     "items": 5
    },
    {
     "key": "sentences",
     "name": "Sentences",
     "items": 4
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "made",
   "words": {
    "letters": 0,
    "real": 16,
    "made": 32,
    "sentences": 6
   },
   "sampleReal": [
    "cap",
    "bed",
    "fix",
    "hot",
    "sun",
    "rip"
   ],
   "sampleMade": [
    "pag",
    "gok",
    "vup",
    "zat",
    "mep",
    "lom"
   ],
   "sampleSentence": "The pig sat in the mud.",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "2a",
     "name": "Task 2(a): CVC Nonsense",
     "items": 10,
     "sentences": false
    },
    {
     "id": "2b",
     "name": "Task 2(b): CVC Sentences",
     "items": 4,
     "sentences": true
    }
   ]
  },
  {
   "id": "3",
   "num": "3",
   "order": 3,
   "name": "sh ch th",
   "sayName": "letter pairs",
   "example": "ship",
   "learn": [
    "Some letters work in pairs. Two letters make ONE sound.",
    "{s} and {h} say /sh/. {c} and {h} say /ch/. {t} and {h} say /th/.",
    "{w} and {h} say /wh/. {c} and {k} say /ck/. {n} and {g} say /ng/."
   ],
   "examples": [
    "ship",
    "chop",
    "thin",
    "when",
    "duck",
    "sing"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "sort",
     "name": "Listen",
     "items": 8
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "decode",
     "name": "Read",
     "items": 6
    },
    {
     "key": "spell",
     "name": "Spell",
     "items": 5
    },
    {
     "key": "sentences",
     "name": "Sentences",
     "items": 4
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "made",
   "words": {
    "letters": 0,
    "real": 16,
    "made": 32,
    "sentences": 6
   },
   "sampleReal": [
    "ship",
    "chop",
    "thin",
    "when",
    "duck",
    "sing"
   ],
   "sampleMade": [
    "dath",
    "chog",
    "thup",
    "whid",
    "fush",
    "zeth"
   ],
   "sampleSentence": "The ship is in the dock.",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "3a",
     "name": "Task 3(a): Digraph Nonsense",
     "items": 10,
     "sentences": false
    },
    {
     "id": "3b",
     "name": "Task 3(b): Digraph Sentences",
     "items": 4,
     "sentences": true
    }
   ]
  },
  {
   "id": "4",
   "num": "4",
   "order": 4,
   "name": "Blends",
   "sayName": "",
   "example": "frog",
   "learn": [
    "A blend is two letters side by side. You hear BOTH sounds, said fast.",
    "In frog you hear /f/ and /r/ together: /f/ /r/ /o/ /g/.",
    "Do not skip a sound!"
   ],
   "examples": [
    "frog",
    "stop",
    "crab",
    "jump",
    "milk"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "chains",
     "name": "Change",
     "items": 6
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "decode",
     "name": "Read",
     "items": 6
    },
    {
     "key": "spell",
     "name": "Spell",
     "items": 5
    },
    {
     "key": "sentences",
     "name": "Sentences",
     "items": 4
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "made",
   "words": {
    "letters": 0,
    "real": 16,
    "made": 32,
    "sentences": 6
   },
   "sampleReal": [
    "stop",
    "clap",
    "crab",
    "plum",
    "swim",
    "frog"
   ],
   "sampleMade": [
    "blim",
    "crad",
    "flep",
    "snop",
    "plag",
    "plin"
   ],
   "sampleSentence": "The frog can jump in the pond.",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "4a",
     "name": "Task 4(a): Blends Nonsense",
     "items": 10,
     "sentences": false
    },
    {
     "id": "4b",
     "name": "Task 4(b): Blends Sentences",
     "items": 2,
     "sentences": true
    }
   ]
  },
  {
   "id": "5",
   "num": "5",
   "order": 5,
   "name": "Silent e",
   "sayName": "",
   "example": "cake",
   "learn": [
    "An e at the end of a word is quiet. You do not hear it.",
    "The quiet e makes the vowel say its name: {a} says A, {i} says I, {o} says O.",
    "cap has no e, so the {a} says /a/. Add e and it turns into cape."
   ],
   "examples": [
    "mat>mate",
    "pin>pine",
    "not>note"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "sort",
     "name": "Listen",
     "items": 8
    },
    {
     "key": "chains",
     "name": "Change",
     "items": 6
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "decode",
     "name": "Read",
     "items": 6
    },
    {
     "key": "spell",
     "name": "Spell",
     "items": 5
    },
    {
     "key": "sentences",
     "name": "Sentences",
     "items": 4
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "made",
   "words": {
    "letters": 0,
    "real": 21,
    "made": 32,
    "sentences": 8
   },
   "sampleReal": [
    "gate",
    "late",
    "skate",
    "plate",
    "shade",
    "grade"
   ],
   "sampleMade": [
    "zade",
    "tade",
    "hane",
    "jine",
    "zile",
    "bice"
   ],
   "sampleSentence": "The cat ate a bite of cake.",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "5a",
     "name": "Task 5(a): Silent e Nonsense",
     "items": 10,
     "sentences": false
    },
    {
     "id": "5b",
     "name": "Task 5(b): Silent e Sentences",
     "items": 2,
     "sentences": true
    }
   ]
  },
  {
   "id": "6",
   "num": "6",
   "order": 6,
   "name": "Bossy R",
   "sayName": "",
   "example": "car",
   "learn": [
    "When {r} comes right after a vowel, the {r} is the boss.",
    "The vowel and the {r} make a new sound together.",
    "{ar} says /ar/, like car. {or} says /or/, like for. {er}, {ir} and {ur} all say /er/, like her, bird and turn."
   ],
   "examples": [
    "car",
    "fork",
    "her",
    "bird",
    "turn"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "sort",
     "name": "Listen",
     "items": 8
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "decode",
     "name": "Read",
     "items": 6
    },
    {
     "key": "spell",
     "name": "Spell",
     "items": 5
    },
    {
     "key": "sentences",
     "name": "Sentences",
     "items": 4
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "made",
   "words": {
    "letters": 0,
    "real": 16,
    "made": 32,
    "sentences": 6
   },
   "sampleReal": [
    "car",
    "farm",
    "star",
    "term",
    "fern",
    "bird"
   ],
   "sampleMade": [
    "tark",
    "berp",
    "nirk",
    "lorp",
    "korm",
    "sarn"
   ],
   "sampleSentence": "The bird sat on the fork.",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "6a",
     "name": "Task 6(a): R-Controlled Nonsense",
     "items": 10,
     "sentences": false
    },
    {
     "id": "6b",
     "name": "Task 6(b): R-Controlled Sentences",
     "items": 2,
     "sentences": true
    }
   ]
  },
  {
   "id": "7",
   "num": "7",
   "order": 7,
   "name": "Tricky letters",
   "sayName": "",
   "example": "knot",
   "learn": [
    "Some letter groups play tricks.",
    "{tch} says /tch/, like catch. {dge} says /dge/, like badge. {qu} says /qu/, like quit. {x} says /x/, like fox.",
    "Some letters are silent. In {kn} the {k} is quiet, so {kn} says /kn/, like knot. In {wr} the {w} is quiet, so {wr} says /wr/, like wrap. In {gn} the {g} is quiet, so {gn} says /gn/, like gnat."
   ],
   "examples": [
    "catch",
    "badge",
    "knot",
    "wrap",
    "gnat",
    "quit",
    "fox"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "decode",
     "name": "Read",
     "items": 6
    },
    {
     "key": "spell",
     "name": "Spell",
     "items": 5
    },
    {
     "key": "sentences",
     "name": "Sentences",
     "items": 4
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "made",
   "words": {
    "letters": 0,
    "real": 16,
    "made": 32,
    "sentences": 6
   },
   "sampleReal": [
    "catch",
    "match",
    "ditch",
    "badge",
    "fudge",
    "bridge"
   ],
   "sampleMade": [
    "zatch",
    "ritch",
    "fodge",
    "lidge",
    "knop",
    "knug"
   ],
   "sampleSentence": "The quick fox ran to the ditch.",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "7a",
     "name": "Task 7(a): Adv Consonants Nonsense",
     "items": 10,
     "sentences": false
    },
    {
     "id": "7b",
     "name": "Task 7(b): Adv Consonants Sentences",
     "items": 4,
     "sentences": true
    }
   ]
  },
  {
   "id": "8",
   "num": "8",
   "order": 8,
   "name": "Vowel teams",
   "sayName": "",
   "example": "boat",
   "learn": [
    "In a vowel team, two letters work together to make ONE vowel sound.",
    "{ai} and {ay} say /ai/, like rain and day. {oa} and {oe} say /oa/, like boat and toe. {ea} says /ea/, like seat. {igh} says /igh/, like night.",
    "{oo} says /oo/, like moon. {ew} says /ew/, like new. {ou} says /ou/, like out. {oi} and {oy} say /oi/, like coin and toy. {au} and {aw} say /au/, like haul and saw."
   ],
   "examples": [
    "rain",
    "day",
    "boat",
    "seat",
    "night",
    "moon",
    "out",
    "coin",
    "saw"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "sort",
     "name": "Listen",
     "items": 8
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "decode",
     "name": "Read",
     "items": 6
    },
    {
     "key": "spell",
     "name": "Spell",
     "items": 5
    },
    {
     "key": "sentences",
     "name": "Sentences",
     "items": 4
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "made",
   "words": {
    "letters": 0,
    "real": 22,
    "made": 32,
    "sentences": 6
   },
   "sampleReal": [
    "rain",
    "tail",
    "play",
    "day",
    "seat",
    "team"
   ],
   "sampleMade": [
    "zait",
    "vay",
    "deap",
    "koam",
    "zoot",
    "mout"
   ],
   "sampleSentence": "The boat sails in the rain.",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "8",
     "name": "Task 8: Vowel Teams (Mixed)",
     "items": 30,
     "sentences": false
    }
   ]
  },
  {
   "id": "9a",
   "num": "9a",
   "order": 9,
   "name": "Two-part words",
   "sayName": "",
   "example": "en·joy",
   "learn": [
    "Big words are made of parts called syllables. Each part has one vowel sound.",
    "Read one part at a time. Then put the parts together.",
    "/con/ + /tent/ = content."
   ],
   "examples": [
    "con·tent",
    "en·joy",
    "mo·tor"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "chop",
     "name": "Chop",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "big",
   "words": {
    "letters": 0,
    "real": 24,
    "made": 0,
    "sentences": 0
   },
   "sampleReal": [
    "con·tent",
    "com·pare",
    "en·joy",
    "hon·est",
    "mo·tor",
    "par·ade"
   ],
   "sampleMade": [],
   "sampleSentence": "",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "9a",
     "name": "Task 9(a): Two-Syllable",
     "items": 10,
     "sentences": false
    }
   ]
  },
  {
   "id": "9b",
   "num": "9b",
   "order": 10,
   "name": "Three-part words",
   "sayName": "",
   "example": "com·pu·ter",
   "learn": [
    "These big words have three parts. Each part has one vowel sound.",
    "Read one part at a time. Then put the parts together.",
    "/com/ + /pu/ + /ter/ = computer."
   ],
   "examples": [
    "com·pu·ter",
    "in·ven·tion",
    "his·to·ry"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "chop",
     "name": "Chop",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "big",
   "words": {
    "letters": 0,
    "real": 27,
    "made": 0,
    "sentences": 0
   },
   "sampleReal": [
    "com·pu·ter",
    "his·to·ry",
    "gen·er·ous",
    "en·or·mous",
    "in·ven·tion",
    "con·tain·er"
   ],
   "sampleMade": [],
   "sampleSentence": "",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "9b",
     "name": "Task 9(b): Three-Syllable",
     "items": 10,
     "sentences": false
    }
   ]
  },
  {
   "id": "9c",
   "num": "9c",
   "order": 11,
   "name": "Four-part words",
   "sayName": "",
   "example": "in·fi·ni·ty",
   "learn": [
    "These big words have four parts. Each part has one vowel sound.",
    "Go slow. Read one part at a time, then put them together.",
    "/in/ + /fi/ + /ni/ + /ty/ = infinity."
   ],
   "examples": [
    "in·fi·ni·ty",
    "com·pe·ti·tion",
    "his·to·ri·cal"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "chop",
     "name": "Chop",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "big",
   "words": {
    "letters": 0,
    "real": 14,
    "made": 0,
    "sentences": 0
   },
   "sampleReal": [
    "com·pe·ti·tion",
    "his·to·ri·cal",
    "in·fi·ni·ty",
    "in·com·pe·tent",
    "in·com·par·able",
    "in·ter·ven·tion"
   ],
   "sampleMade": [],
   "sampleSentence": "",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "9c",
     "name": "Task 9(c): Four-Syllable",
     "items": 10,
     "sentences": false
    }
   ]
  },
  {
   "id": "10",
   "num": "10",
   "order": 12,
   "name": "Word parts",
   "sayName": "",
   "example": "un·lock",
   "learn": [
    "A prefix is a part at the START of a word. /un/ means not. /re/ means again. /pre/ means before. /dis/ and /non/ mean not.",
    "A suffix is a part at the END. /ful/ means full of. /less/ means without. /ness/ means being. /est/ means the most. /able/ means can be.",
    "Find the parts. Read each part. Then read the whole word: /un/ + lock = unlock."
   ],
   "examples": [
    "un·lock",
    "re·tell",
    "help·ful",
    "end·less"
   ],
   "steps": [
    {
     "key": "learn",
     "name": "Learn",
     "items": null
    },
    {
     "key": "chop",
     "name": "Chop",
     "items": null
    },
    {
     "key": "blend",
     "name": "Blend",
     "items": 5
    },
    {
     "key": "build",
     "name": "Build",
     "items": 5
    },
    {
     "key": "check",
     "name": "Check",
     "items": 10
    }
   ],
   "check": "big",
   "words": {
    "letters": 0,
    "real": 29,
    "made": 0,
    "sentences": 0
   },
   "sampleReal": [
    "un·lock",
    "un·fit",
    "re·tell",
    "pre·heat",
    "dis·trust",
    "non·fat"
   ],
   "sampleMade": [],
   "sampleSentence": "",
   "sampleLetters": [],
   "tasks": [
    {
     "id": "10",
     "name": "Task 10: Prefixes & Suffixes",
     "items": 30,
     "sentences": false
    }
   ]
  }
 ],
 "courses": [
  {
   "id": "maze",
   "order": 1,
   "name": "Maze",
   "icon": "🧩",
   "kind": "maze",
   "learn": [
    "In a Maze story, some words are missing. Each box has 3 words.",
    "Only one of the 3 words makes sense in the sentence. Pick that word.",
    "Read the whole sentence, before and after the box. Then pick.",
    "Try it: The dog wagged its tail, desk, or moon. Tail makes sense. A dog cannot wag a desk or a moon.",
    "On the Check, you read silently. You have 3 minutes. Each right word is 1 point. A wrong word takes away half a point.",
    "So read carefully, and do not skip boxes. Make your best choice in every box."
   ],
   "levels": [
    {
     "level": 1,
     "note": "Short stories, easy words. Goal: 8 points in 3 minutes.",
     "goal": 8,
     "practice": 4,
     "check": 8
    },
    {
     "level": 2,
     "note": "Longer stories. Goal: 11 points in 3 minutes.",
     "goal": 11,
     "practice": 4,
     "check": 8
    },
    {
     "level": 3,
     "note": "Near grade-level stories. Goal: 14½ points in 3 minutes.",
     "goal": 14.5,
     "practice": 4,
     "check": 8
    },
    {
     "level": 4,
     "note": "Grade 4 stories, like DIBELS. Goal: 16½ points in 3 minutes.",
     "goal": 16.5,
     "practice": 4,
     "check": 8
    }
   ],
   "sample": {
    "title": "Pip Hides",
    "text": "Mia has a little gray kitten named Pip. Pip likes to play with his {toys|clouds|rain} all day long. He chases balls {of|is|we} yarn across the kitchen floor. He {jumps|rains|melts} up on the bed and rolls {over|blue|kind} on his back."
   }
  },
  {
   "id": "context",
   "order": 2,
   "name": "Words in context",
   "icon": "🔎",
   "kind": "context",
   "learn": [
    "Good readers do not skip a hard word. They look at the words around it.",
    "The words around a hard word are called context clues. Context clues help you figure out what the word means.",
    "Sometimes the meaning is right there, after a word like \"or\" or \"which means.\"",
    "Sometimes an example shows what the word means.",
    "Sometimes the opposite shows it. Look for \"but,\" \"unlike,\" or \"not.\"",
    "Try it: The cave was gloomy, but outside the sun was bright. \"Gloomy\" must mean dark, because it is the opposite of bright."
   ],
   "levels": [
    {
     "level": 1,
     "note": "The meaning is right next to the word.",
     "goal": null,
     "practice": 16,
     "check": 15
    },
    {
     "level": 2,
     "note": "An example or a nearby sentence shows the meaning.",
     "goal": null,
     "practice": 16,
     "check": 15
    },
    {
     "level": 3,
     "note": "An opposite shows it, or the clue is in another sentence.",
     "goal": null,
     "practice": 16,
     "check": 15
    },
    {
     "level": 4,
     "note": "Words with two meanings, harder words, longer passages.",
     "goal": null,
     "practice": 16,
     "check": 15
    }
   ],
   "sample": {
    "passage": "The baby owl was *drowsy*, or very sleepy, after staying up all night. It tucked its head under its wing.",
    "choices": [
     "very sleepy",
     "very hungry",
     "very loud",
     "very cold"
    ],
    "answer": "very sleepy",
    "clues": [
     "or very sleepy",
     "The baby owl",
     "under its wing"
    ],
    "clue": "or very sleepy"
   }
  },
  {
   "id": "maze2",
   "order": 3,
   "name": "Maze Round 2",
   "icon": "🧩",
   "kind": "maze",
   "learn": [
    "Welcome to Maze Round 2! You will read new stories, and the goals are a little higher.",
    "It works the same way. Each box has 3 words. Only one makes sense in the sentence.",
    "Read the whole sentence, before and after the box. Then pick.",
    "On the Check, you read silently. You have 3 minutes. Each right word is 1 point. A wrong word takes away half a point.",
    "So read carefully, and do not skip boxes. Make your best choice in every box."
   ],
   "levels": [
    {
     "level": 1,
     "note": "Round 2: short stories, easy words. Goal: 9 points in 3 minutes.",
     "goal": 9,
     "practice": 4,
     "check": 8
    },
    {
     "level": 2,
     "note": "Round 2: longer stories. Goal: 12 points in 3 minutes.",
     "goal": 12,
     "practice": 4,
     "check": 8
    },
    {
     "level": 3,
     "note": "Round 2: near grade-level stories. Goal: 15 points in 3 minutes.",
     "goal": 15,
     "practice": 4,
     "check": 8
    },
    {
     "level": 4,
     "note": "Round 2: grade 4 stories, like DIBELS. Goal: 17 points in 3 minutes.",
     "goal": 17,
     "practice": 4,
     "check": 8
    }
   ],
   "sample": {
    "title": "Ducks at the Pond",
    "text": "Lily and her mom walked down to the pond on Sunday. They brought a small bag of {oats|desks|hats} for the ducks. The ducks saw {them|cup|ran} coming and swam over fast. A {big|ran|sit} mother duck led the way across {the|cup|sit} water."
   }
  }
 ]
};
