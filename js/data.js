// ═══════════════════════════════════════════════════════════════
//  GAME DATA — edit poems, note, and dialogue here
// ═══════════════════════════════════════════════════════════════

const SCALE = 3;
const TS = 16;

// Map info (pixels, tiles)
const OUTSIDE = { px:544, py:544, cols:34, rows:34, minx:9, miny:11 };
const INSIDE  = { px:480, py:512, cols:30, rows:32 };

// Spawn points (tile coords in the JSON coordinate system)
// Inside: by the bed, top-left area
const SPAWN_INSIDE  = { x:6,  y:10 };
const DOOR_INSIDE   = { x:15, y:31 };
// Outside: bottom of the map near the path entry
const SPAWN_OUTSIDE = { x:10, y:31 };
// Cabin door position on exterior (top-left cabin)
const CABIN_ENTRANCE_OUTSIDE = { x:4, y:8 };

// ── INTRO ──────────────────────────────────────────────────────
const INTRO_LINES = [
  "June 18th.",
  "She wakes up and the house is quiet.",
  "The bed beside her is empty.",
  "But on the table, there is a note.",
];

// ── NOTE (3 pages) ─────────────────────────────────────────────
const NOTE_PAGES = [
  { title:"June 18th", text:"Jana,\n\nI woke before you, as I sometimes do.\nThe light was just coming through the curtains,\nand I watched you sleep for a moment.\n\nI could not stay. Not today." },
  { title:"What I left behind", text:"I have hidden poems across our garden.\nTucked inside flowers that bloom only for you.\n\nEach one is something I could not say out loud.\nFind them slowly, in your own time.\n\nThe animals know where they are.\nAsk every one of them." },
  { title:"Find them all", text:"They are not poems, really.\nThey are just the truest things\nI know how to say.\n\nWalk slowly. The garden is yours today.\n\nAll my love,\nEevie  \u2665" },
];

// ── POEMS ──────────────────────────────────────────────────────
const POEMS = [
  { id:1,  title:"Poem 1",  body:"\u0625\u0630\u0627 \u0643\u0646\u062a\u0650 \u0628\u0626\u0631\u0627\n\u0641\u0627\u0639\u0644\u0645\u064a \u0623\u0646\u0643 \u0627\u0644\u0645\u064a\u0627\u0647\n\n\u0625\u0646 \u0643\u0646\u062a \u0627\u0644\u0623\u0631\u0636\n\u0641\u0645\u0627 \u0644\u0642\u0628 \u0644\u0643 \u0633\u0648\u0649 \u0627\u0644\u0634\u0645\u0633\n\n\u0648\u0625\u0630\u0627 \u0643\u0646\u062a\u0650 \u0643\u062a\u0627\u0628\u0627\u064b\n\u0641\u0627\u0639\u0644\u0645\u064a \u0627\u0646\u0643 \u0627\u0644\u0643\u0644\u0645\u0627\u062a" },
  { id:2,  title:"Poem 2",  body:"There are a myriad of words I can use\nBut none will encompass what your eyes\nLeave me pondering when they lock into mine\nSeldom do I find a muse\nStrong enough to change my writing\nInto songs of affection and longing" },
  { id:3,  title:"Poem 3",  body:"\u062c\u0644\u0633\u062a \u0648\u0637\u0644\u0628\u062a \u0623\u0646 \u0623\u0646\u0639\u0645\n\u0628\u062c\u0641\u0627\u0641 \u0644\u0627 \u064a\u0631\u0648\u0649 \u0633\u0648\u0649 \u0628\u0639\u064a\u0648\u0646\n\n\u0648 \u0623\u062a\u0627\u0646\u064a \u0627\u0644\u0643\u0648\u0646 \u0628\u0639\u064a\u0646\u0627\u0643\n\u0648\u0648\u062f\u0639\u0646\u064a \u0623\u0645\u0627\u0645 \u0627\u0644\u062d\u0628 \u0645\u062f\u064a\u0648\u0646\n\n\u0637\u0627\u0644\u062a \u0644\u064a \u064a\u062f\u0627\u064b \u062d\u0633\u0628\u062a\u0646\u064a \u0633\u062c\u064a\u0646\u0627\u064b\n\u0648\u0642\u0639\u062a\u0646\u064a \u0639\u0644\u0649 \u0645\u0627 \u0644\u0645 \u0623\u0642\u0631\u0623\u0647\n\n\u0639\u0644\u0649 \u0648\u0631\u0642\u0629 \u0648\u062c\u062f\u062a \u0646\u0641\u0633\u064a \u0645\u0624\u0628\u062f\u0627\u064b\n\u0648 \u0641\u064a \u0642\u0644\u0628\u0643 \u0648\u062c\u062f\u062a \u0646\u0641\u0633\u064a \u0633\u0627\u0626\u062d\u0627\u064b" },
  { id:4,  title:"Poem 4",  body:"I used to think green was my favourite colour\nUntil I saw your brown eyes looking at me\n\nI used to think rock was my favourite sound\nUntil I heard you call my name\n\nI used to think I prefer being alone\nUntil your tenderness touched me in a way I did not anticipate\n\nI used to hate making coffee\nUntil the boiling point reminded me of your eyes\n\nI used to think my sweater was my favourite thing to hold\nUntil our fingers locked for the very first time" },
  { id:5,  title:"Poem 5",  body:"\u0648 \u062c\u0644\u0633\u0629 \u0645\u062e\u0645\u0631\u0627\u064b \u0623\u0645\u0627\u0645\u0643\n\u0639\u0644\u0649 \u0637\u0627\u0648\u0644\u0629\u064b \u0648\u0636\u0639\u062a \u0628\u064a\u0646\u0646\u0627 \u0645\u0633\u0627\u0641\u0629\n\u0648 \u0623\u0646\u0627 \u0623\u0634\u0627\u0647\u062f \u0634\u0639\u0631\u0643 \u064a\u0644\u0639\u0628 \u0628\u064a\u0646 \u0645\u0627\u0646\u0645\u0644\u0643\n\u0641\u0643\u0645 \u0645\u0646 \u0623\u0646 \u0637\u0644\u0628\u062a \u0623\u0646 \u062a\u0646\u062a\u0632\u0639 \u0647\u0630\u0647 \u0627\u0644\u0637\u0627\u0648\u0644\u0629\n\u0643\u064a \u0627\u0646\u0636\u0645 \u0625\u0644\u0649 \u064a\u062f\u064a\u0643" },
  { id:6,  title:"Poem 6",  body:"\u0633\u0644\u0645\u062a \u0646\u0641\u0633\u064a \u0623\u0645\u0627\u0645 \u0627\u0644\u062d\u064a\u0627\u0629 \u0644\u0639\u064a\u0648\u0646\u0643\n\u0648 \u0647\u0645\u0627 \u064a\u062c\u0644\u0633\u0627\u0646 \u0639\u0644\u0649 \u0648\u062c\u0647\u0643\n\u064a\u0646\u0638\u0631\u0627\u0646 \u0625\u0644\u0649 \u0631\u0648\u062d\u064a \u0648 \u062d\u0642\u064a\u0642\u062a\u064a \u0648 \u062c\u0648\u0647\u0631\u064a\n\n\u0641\u0642\u062f \u0648\u062c\u062f\u062a \u0646\u0641\u0633\u064a \u0623\u062d\u0636\u0631 \u0631\u0643\u0648\u0629 \u0642\u0647\u0648\u0629\n\u0641\u0642\u0637 \u0644\u0623\u0646\u0647\u0627 \u062a\u0630\u0643\u0631\u0646\u064a \u0628\u0639\u064a\u0648\u0646\u0643\n\n\u0645\u0639 \u0643\u0644 \u063a\u0644\u064a\u0627\u0646\u0647\u0627 \u0648 \u0627\u0631\u062a\u0641\u0627\u0639\u0647\u0627\n\u0623\u062c\u062f \u0646\u0641\u0633\u064a \u0623\u062d\u0646 \u0625\u0644\u0649 \u0639\u064a\u0646\u064a\u0643" },
  { id:7,  title:"Poem 7",  body:"Seldom have I faced such eyes that have held me captive\n\nSeldom have I kissed such lips\nThat have engulfed my soul in their tenderness\n\nI have watched as a heart I called my own\nBe occupied by the likes of yourself" },
  { id:8,  title:"Poem 8",  body:"\u0627\u0644\u062d\u0646\u064a\u0646 \u0623\u062a\u0649 \u0648 \u0645\u062f\u0649\n\u0648\u0633\u062d \u0641\u064a \u0642\u0644\u0628\u064a\n\u0648\u0645\u0646 \u0623\u062d\u062c\u0627\u0631\u0647 \u0628\u0646\u0649\n\n\u0648\u0645\u0646 \u0645\u0627 \u0628\u0646\u0649 \u062d\u0641\u0631\n\u0639\u0644\u0649 \u062d\u064a\u0637\u0647 \u0643\u062a\u0628\n\u062d\u062a\u0649 \u0623\u0646 \u0642\u0627\u0644\u062a \u0627\u0644\u0623\u062d\u0631\u0641\n\u0625\u0633\u0645 \u0645\u0646 \u0625\u0633\u062a\u0648\u0644\u0649\n\n\u0648 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0623\u062d\u0631\u0641 \u0628\u0646\u064a\u062a \u0625\u0633\u0645\u0627\u064b\n\u0633\u0643\u0646 \u0642\u0644\u0628\u064a \u0648\u0625\u0633\u062a\u0648\u0644\u0649 \u0639\u0644\u0649 \u0639\u0642\u0644\u064a\n\u0643\u062a\u0628 \u0643\u0644\u0645\u0627\u062a\u064a \u0648\u063a\u064a\u0631 \u062d\u064a\u0627\u062a\u064a\n\n\u0648 \u0645\u0627 \u0639\u0644\u0645\u062a \u0628\u0647\u0630\u0627 \u0627\u0644\u0627\u0633\u0645\n\u062d\u062a\u0649 \u0623\u0646 \u0623\u062a\u064a\u062a\n\u0648 \u0648\u0636\u0639\u062a \u064a\u062f\u064a\u0643\n\u0628\u064a\u0646 \u064a\u062f\u064a" },
  { id:9,  title:"Poem 9",  body:"I know you like the slowburn\nI know you want to watch the resin rise into the night\nAs the fire slowly burns into the woods of my heart\nI know how the idleness of these situations makes you feel\nI know\nAnd I have surrendered myself to them\nAs they engulf me whole\n\nI have witnessed the charring of these feelings\nBuild up in my own heart\n\nI have seen your eyes\nStare deep into my soul\nAs I stood there\nBarren of all barriers\nI watched you look into me\n\nI have forgotten how to yearn\nI have forgotten how to be displeased\nI have found myself\n\nIn the coldness of the night\nI am kept up by your warmth\n\nI have seen your words\nDefeat my urge to sleep\nYour eyes defeat my urge to wander\nYour voice defeat my need for music\nFor I have found concord in your existence\n\nMy words do not rhyme\nFor there is no structure\nIn the world you have put me\n\nYet it is not tranquility by definition\nFor inside me erupts\nA plethora of emotions\nI can hardly control a heart\nI can barely call my own" },
  { id:10, title:"Poem 10", body:"\u0648 \u0644\u0643 \u0645\u0646\u062d\u062a \u0642\u0644\u0628\u064a \u0623\u0646 \u064a\u0623\u0645\u0644\n\u0628\u062d\u064a\u0627\u0629\u064d \u0644\u0627 \u0645\u0646 \u063a\u064a\u0631\u0643 \u0628\u0647\u0627\n\n\u0648 \u0644\u0643 \u0645\u0646\u062d\u062a \u0639\u0642\u0644\u064a \u0625\u0646 \u064a\u062a\u062e\u064a\u0644\n\u0628\u0645\u0633\u062a\u0642\u0628\u0644\u064d \u0628\u0639\u064a\u062f \u0639\u0646 \u0645\u0627 \u0645\u0636\u0649\n\n\u0648 \u0645\u0646\u0643 \u0623\u062a\u0649 \u0642\u0644\u0628 \u062a\u0642\u0628\u0644 \u0625\u0646 \u064a\u0646\u062d\u0628\n\u0648 \u062c\u0633\u0645\u0627\u064b \u062a\u0642\u0628\u0644 \u0627\u0644\u0644\u0645\u0633\n\u0648 \u0639\u0642\u0644 \u062a\u0642\u0628\u0644 \u0627\u0644\u0631\u0627\u062d\u0629" },
  { id:11, title:"Poem 11", body:"I have told the moon about you\n\nAs she sat in the sky\nAnd heard me declare my love to you\n\nAs I rambled on about your eyes\nAnd the smile that has held me hostage\nIn a cell I wish not to leave\nBut to grow\n\nI have told her of your warmth\nThat has left me loved on cold nights\n\nI have told her of my dedication\nTo watch you\nCaress you\nAnd hold you\n\nI have told the moon about you\nAnd the moon smiled back" },
  { id:12, title:"Poem 12", body:"\u0627\u0631\u0645 \u0639\u0644\u064a \u0643\u0644 \u0645\u0627 \u062b\u0642\u064a\u0644 \u0639\u0644\u064a\u0643\n\u0648 \u062f\u0639\u064a\u0646\u064a \u0623\u062d\u0645\u0644\u0647 \u0639\u0644\u0649 \u0639\u0627\u062a\u0642\u064a\n\n\u0627\u0639\u0637\u0646\u064a \u0643\u0644 \u0645\u0627 \u0623\u0644\u0645\u0643\n\u0648 \u062f\u0639\u064a\u0646\u064a \u0623\u0642\u0628\u0644 \u062c\u0631\u0648\u062d\u0643\n\n\u0648 \u062f\u0639\u064a\u0646\u064a \u0623\u0641\u062a\u062d \u0644\u0643 \u0628\u0627\u0628 \u0642\u0644\u0628\u064a\n\u0648\u0627\u062c\u0639\u0644\u064a \u0645\u0646 \u0642\u0644\u0628\u064a \u0645\u0644\u062c\u0623\u064b \u0644\u0643\n\n\u0623\u0639\u0628\u062f\u0643 \u0628\u0637\u0631\u064a\u0642\u0629 \u062a\u062d\u0633\u062f\u0647\u0627 \u0627\u0644\u0623\u0644\u0647\u0629\n\u0623\u062d\u0628\u0643 \u0628\u0637\u0631\u064a\u0642\u0629 \u064a\u062d\u0631\u0645\u0647 \u0627\u0644\u062f\u064a\u0646" },
  { id:13, title:"Poem 13", body:"I have gazed upon stars, skies, sunsets\nMountains and valleys\nThat have brought me to tears\nAs I stared into their ethereal beauty\n\nI have touched skin and grass\nHeld twigs and flowers\nAnd felt their tenderness on my skin\n\nBut even with all that I have experienced\nAll was forgotten when you came to be\nMy skin knew no touch\nMy eyes no sight\nMy ears no music\n\nBecause nothing on God's green earth\nWas as intricate as you are\nYou are a work of art\nAnd how I want to stare at you all day\nYou are\nThe art\nAnd\nThe muse" },
  { id:14, title:"Poem 14", body:"\u0648 \u0623\u0643\u062b\u0631 \u0645\u0646 \u0648\u062c\u0648\u062f\u064a\u060c \u0623\u0646\u062a \u062f\u064a\u0646\u064a\n\n\u0648 \u0643\u0644 \u0645\u0627 \u062a\u0631\u0633\u062e \u0641\u064a \u0639\u0642\u0644\u064a \u0639\u0646 \u0627\u0644\u062d\u0628\n\u0623\u062a\u0649 \u0645\u0646\u0643\n\n\u0648 \u0643\u0644 \u0645\u0627 \u0639\u0644\u0645\u0647 \u0642\u0644\u0628\u064a \u0639\u0646 \u0627\u0644\u062d\u0628\n\u0634\u0639\u0631\u0647 \u0645\u0646\u0643\n\n\u0648\u0643\u0644 \u0645\u0627 \u0647\u0648 \u0644\u064a\n\u0623\u0643\u0631\u0633\u0647 \u0644\u0643\n\n\u0648 \u0643\u0644 \u0645\u0627 \u0623\u0639\u0637\u064a\u062a\u0646\u064a \u0625\u064a\u0627\u0647\n\u0645\u0642\u062f\u0633 \u0648 \u0633\u0648\u0641 \u064a\u0632\u0627\u0644 \u0643\u0630\u0644\u0643\n\n\u062d\u062a\u0649 \u0622\u062e\u0631 \u0627\u0644\u0632\u0645\u0646" },
  { id:15, title:"Poem 15", body:"If only the stars shined as bright as your eyes\nWe would have abandoned the earth\nAnd left the cosmos\n\nBut your eyes shine brighter\nAnd I make a religion out of them\nForever to praise and to worship\n\nThe churches fall silent\nThe mosques empty\nFor in your eyes there is truth, serenity, and safety\n\nAnd if they all forget\nYou will find me at your shrine\nFixed not with regrets\nBut an eternal promise to worship you\n\nYou, my love, my eternity, my princess, my goddess\nI devote all I am to you\nAnd no one else" },
  { id:16, title:"Poem 16", body:"And if I've been blessed with your love\nIn this lifetime\nThere is no need for paradise after it\nFor I've experienced heaven on this earth\nAnd I regret it not\nNot in the tiniest bit" },
  { id:17, title:"Poem 17", body:"There is a chance that I may be called\nStupid\nReckless\nIgnorant\nA fool running into waters\nHe may not know how to swim in\n\nMaybe this relationship was built on a fool's dream\n\nBut it was your love that was at stake\nAnd I would rather be called a fool in a million languages\nThan to ever think of a life without you" },
  { id:18, title:"Poem 18", body:"I have yet to know\nWhat true loss means\nFor it is a feeling I can only describe\nOn my darkest days\n\nAnd even in those mellow moments\nI cannot fathom what it would mean\nIf the loss came from you" },
  { id:19, title:"Poem 19", body:"You are my answered prayer\nAnd not the one I wish upon a star\nA prayer of devotion\nAnd complete surrender to the one above\n\nA prayer of deep desire and longing\nA prayer I would sit on the mantle for\n\nI longed for you before I even met you\nAnd the gods answered by directing me to you\n\nYou are my answered prayer\nAnd to you I devote myself" },
  { id:20, title:"Poem 20", body:"\u0648 \u0644\u0643 \u0648\u062c\u0648\u062f\u0627\u064b \u0623\u0639\u062f \u0627\u0644\u0644\u0633\u0627\u0646 \u0644\u0644\u0627\u062e\u0631\u0633\n\u0643\u0649 \u064a\u0633\u0641\u0643 \u0644\u0644\u0623\u0639\u0645\u0649\n\n\u0648 \u0644\u0643 \u0648\u062c\u0648\u062f\u0627\u064b \u0623\u0639\u062f \u0627\u0644\u0642\u0645\u0631 \u0636\u0648\u0621\u064b\u0627\n\u0643\u064a \u062a\u0631\u0627\u0643 \u0627\u0644\u0646\u062c\u0648\u0645 \u0644\u064a\u0644\u0627\u064b" },
  { id:21, title:"Poem 21", body:"If I were to learn every language\nLive with every tribe\nTaste every food\nAnd set foot in every continent\n\nI would not come close to telling the world\nThe love that I have for you\n\nIn all the words of the spoken tongue\nNot one civilisation came close to creating a word\nthat could encompass the power your smile holds over my heart\n\nAnd if the time passes\nAnd my body withers\nI fear my writings will not grant you justice\nFor I am a mere poet\nSmitten by your presence" },
  { id:22, title:"Poem 22", body:"\u0648 \u0625\u0646 \u0644\u0645 \u0623\u0633\u0643\u0646 \u0647\u0630\u0647 \u0627\u0644\u0623\u0631\u0636\n\u0644\u0633\u0627\u0641\u0631\u062a \u0627\u0644\u0643\u0648\u0646\n\u0643\u064a \u0623\u0645\u0634\u064a \u0639\u0644\u0649 \u0627\u0644\u062a\u0631\u0627\u0628\n\u0627\u0644\u062a\u064a \u0623\u0646\u0639\u0645\u062a\u0647\u0627 \u0642\u062f\u0645\u064a\u0643" },
  { id:23, title:"Poem 23", body:"\u0648 \u062d\u064a\u0646 \u064a\u0623\u062a\u064a \u0627\u0644\u064a\u0648\u0645 \u062d\u064a\u062b \u0623\u0648\u0631\u0649 \u0628\u064a\u0646 \u0627\u0644\u062a\u0631\u0627\u0628\n\u0641\u0644\u0627 \u0623\u0628\u063a\u0649 \u0636\u0631\u064a\u062d\u0627\u064b\u060c \u062f\u0639 \u062c\u0633\u062f\u064a \u0644\u0644\u063a\u0631\u0628\n\n\u0648 \u0644\u0643\u0646 \u0636\u0639 \u0635\u0648\u0631\u062a\u0647\u0627 \u0645\u0643\u0627\u0646\u0627\u064b\u060c \u0628\u064a\u0646 \u0642\u0644\u0628\u064a \u0648\u0627\u0644\u0643\u062a\u0628\n\n\u0644\u0623\u062e\u0628\u0631 \u0627\u0644\u062c\u0646\u0629 \u0623\u0646\u0646\u064a \u0631\u0623\u064a\u062a \u0627\u0644\u062c\u0646\u0629 \u0641\u064a \u0631\u0628\u0627\u0628\n\u0648 \u0645\u0627 \u0632\u0644\u062a \u0628\u0630\u0643\u0631\u0647\u0627 \u0639\u0644\u0649 \u0642\u064a\u062f \u0627\u0644\u0634\u0628\u0627\u0628" },
  { id:24, title:"Poem 24", body:"\u0633\u064e\u064a\u0652\u0637\u064e\u0631\u0652\u062a\u0650 \u0639\u064e\u0644\u064e\u0649 \u0645\u064e\u0645\u0652\u0644\u064e\u0643\u064e\u062a\u0650\u064a \u0645\u0650\u0646\u0652 \u063a\u064e\u064a\u0652\u0631\u0650 \u0633\u064e\u064a\u0652\u0641\u064e\u0627\n\u0623\u064e\u062e\u064e\u0630\u0652\u062a\u0650 \u0625\u064e\u0639\u064e\u0627\u0642\u064e\u062a\u0650\u064a \u0648\u064e\u0643\u064e\u0633\u064e\u0651\u0631\u0652\u062a\u0650 \u0623\u064e\u0635\u0652\u0641\u064e\u0627\u062f\u064e\u0627\n\u0648\u064e\u0623\u064e\u0639\u0652\u0637\u064e\u064a\u0652\u062a\u0650\u0646\u0650\u064a \u062d\u064e\u064a\u064e\u0627\u0629\u064b \u0643\u064e\u0625\u0650\u0644\u064e\u0647\u064d \u0623\u064e\u0639\u0652\u0637\u064e\u0649 \u0646\u064e\u0627\u0631\u064e\u0627\n\n\u0643\u064e\u0645\u064e\u0627 \u0627\u062a\u0651\u064e\u062e\u064e\u0630\u064e \u0627\u0644\u0652\u0639\u064e\u0631\u064e\u0628\u064f \u0627\u0644\u0652\u0642\u064e\u0645\u064e\u0631\u064e \u062d\u064e\u0628\u0650\u064a\u0628\u064e\u0629\u064b \u0644\u064e\u0647\u064f\u0645\u0652\n\u0627\u062a\u0651\u064e\u062e\u064e\u0630\u0652\u062a\u064f\u0643\u0650 \u0623\u064e\u0646\u0652\u062a\u0650 \u062d\u064e\u0628\u0650\u064a\u0628\u064e\u0629\u064b \u0645\u0650\u0646\u0652 \u0628\u064e\u064a\u0652\u0646\u0650\u0647\u064f\u0645\u0652\n\n\u0648\u064e\u0625\u0646\u0652 \u0639\u064e\u0631\u064e\u0641\u064f\u0648\u0643\u0650 \u064a\u064e\u0648\u0652\u0645\u064b\u0627 \u062a\u064e\u0631\u064e\u0643\u064f\u0648\u0627 \u0642\u064e\u0645\u064e\u0631\u064e\u0647\u064f\u0645\u0652\n\u0648\u064e\u062e\u064e\u0644\u0651\u064e\u0641\u064f\u0648\u0647\u064f \u0648\u064e\u062d\u0650\u064a\u062f\u064b\u0627 \u064a\u064e\u0628\u0652\u0643\u0650\u064a \u0639\u064e\u0644\u064e\u0649 \u0641\u064e\u0642\u0652\u062f\u0650\u0647\u0650\u0645\u0652" },
];

// ── FLOWER SPRITES ─────────────────────────────────────────────
const FLOWER_SPRITES = ['RoseRed','Pink','Purple','1Blue','1Yellow','2Orange','3Red','3Orange','2Blue','RoseBlack'];

// ── FLOWER POSITIONS (tile coords matching the exterior JSON coord system) ──
const FLOWER_TILES = [
  {x:2,y:2,p:0},
  {x:25,y:2,p:1},
  {x:2,y:4,p:2},
  {x:20,y:5,p:3},
  {x:25,y:6,p:4},
  {x:20,y:7,p:5},
  {x:22,y:8,p:6},
  {x:13,y:9,p:7},
  {x:30,y:11,p:8},
  {x:7,y:13,p:9},
  {x:13,y:14,p:10},
  {x:15,y:16,p:11},
  {x:13,y:18,p:12},
  {x:10,y:20,p:13},
  {x:29,y:20,p:14},
  {x:28,y:22,p:15},
  {x:19,y:23,p:16},
  {x:25,y:24,p:17},
  {x:7,y:26,p:18},
  {x:7,y:27,p:19},
  {x:23,y:27,p:20},
  {x:2,y:30,p:21},
  {x:12,y:30,p:22},
  {x:28,y:30,p:23},
];

// ── ANIMALS ────────────────────────────────────────────────────
const ANIMALS = [
  {x:8,y:12,key:'phoebe', name:'Phoebe',  hint:"Woof! He started up near the top paths — look around the cabin and upper garden first!"},
  {x:24,y:10,key:'spike',  name:'Spike',   hint:"*yawns* The right side. He wandered the eastern paths, muttering about your eyes."},
  {x:10,y:26,key:'calabar',name:'Calabar', hint:"*blinks* West and middle. He sat by the pond writing for a long time."},
  {x:28,y:28,key:'gilmour',name:'Gilmour', hint:"WOOF! The bottom of the garden! South paths, near the water! I followed him everywhere!"},
];
