# 《善財童子 × 普賢十願》Adventure Game — PROJECT MASTER

**Version:** v1.1  
**Version timestamp:** 2026-09-25 15:00 MYT (UTC+08:00)  
**Status:** Authoritative project specification  
**Master language:** Chinese  
**Purpose:** Preserve approved project decisions across ChatGPT chats and prevent cross-project memory contamination.

---

## 0. READ THIS FIRST — RULES FOR CHATGPT

This file is the **authoritative source of truth** for the 《善財童子 × 普賢十願》 Adventure Game.

1. Read this file before proposing, generating, refactoring, or modifying game code.
2. Do **not** import features, mechanics, scoring systems, terminology, navigation rules, or design decisions from the user's other projects or from ChatGPT memory unless this file explicitly confirms them.
3. If ChatGPT memory, an older conversation, or an assumption conflicts with this file, **this file wins**.
4. The user's explicit current instruction overrides this file when the user intentionally changes a requirement.
5. If an important point is not specified here, **ask the user rather than infer it from another project**.
6. Do not silently turn proposals into approved requirements. New major decisions should be proposed to the user and added here only after approval.
7. The current source code is authoritative for implementation details already present in the build. This file is authoritative for approved design intent. If code and this file appear to conflict, flag the conflict before making a destructive change.
8. Preserve working code unless the requested task requires changing it. Do not rewrite large working sections merely to make them cleaner.
9. This project is a long-term, multi-stage coding project. Work on the smallest relevant set of files/sections possible and avoid unnecessary changes elsewhere.
10. Do not treat discussion in a project-management chat as approval of a new game mechanic.

### Related but separate projects — DO NOT MIX THEIR MECHANICS

- LearningGames01
- LearningGames02
- 善財童子53參 interactive webpage/index
- `samantabhadra_vows` main hub
- Other 華嚴經 multimedia/video projects

These may eventually link to this Adventure Game, but their mechanics are not automatically part of it.

---

## 1. PROJECT IDENTITY

**Chinese working title:** 善財童子 × 普賢十願 / 善財童子・普賢十願大冒險  
**English opening title currently proposed:** *Sudhana's Ten Great Vows Adventure*

This should **not** feel like a Buddhist educational website with game buttons.

It should feel like a **joyful illustrated adventure** in which the player travels with 善財童子, discovers the Ten Great Vows through experience, and only afterward discovers the Dharma meaning behind what happened.

### Emotional targets

Cute · Vibrant · Happy · Curious · Exciting · Encouraging · Warm · Respectful

The game may borrow broad qualities of classic family adventures—bold adventure typography, inviting colours, expressive characters, discovery, anticipation—without copying protected characters or artwork.

The Dharma remains serious and faithful. Respect does **not** require every moment of the journey to look solemn.

---

## 2. MASTER EXPERIENCE RULE

The approved experience sequence is:

**SEE → WONDER → TRY → REACT → DISCOVER → UNDERSTAND → CHOOSE → CONTINUE**

This replaces:

**Read instructions → click → read explanation → Next**

For every screen, ask:

> Can the player understand what is interesting before reading?

If not, redesign the visual/interaction rather than solving the problem with more introductory text.

---

## 3. THREE EXPERIENCE LAYERS

### Layer A — Adventure / Exploration

This is where 善財 travels.

Possible environments include colourful skies, forests, flowers, temples, rivers, mountains, villages, towns, homes, and imaginative Huayan worlds.

The world should feel alive:
- characters move;
- things sparkle where meaningful;
- birds may fly;
- leaves/environment may move;
- objects respond;
- 善財 looks, points, wonders, reacts;
- sound creates anticipation;
- text remains minimal.

Emotional message:

> “Come and see what's over there!”

### Layer B — Discovery

Once the player notices or interacts with something:
- the visual world focuses;
- unnecessary movement quietens;
- the discovery may glow;
- a short discovery sentence may appear, often beginning with `原來……`.

This is where understanding begins.

### Layer C — Dharma Revelation / Understanding

When sutra teaching appears:
- tempo becomes gentler;
- music lowers;
- a clear bell may sound;
- warm light enters;
- scripture must be highly readable.

Emotional message:

> “What you just experienced is pointing to something deeper.”

Where appropriate, this layer may include a **real photograph of 宣化上人**.

He must:
- not be cartoonised;
- not be used as a game mascot;
- not participate in comic reactions or playful reward animations.

His appearance signifies that the player has discovered the idea and may now hear the teaching.

---

## 4. DOCTRINAL BRIDGE — MANDATORY

Adventure mechanics are **bridges**, not definitions of the vows.

Every vow must ultimately reconnect:

**experience → discovery → sutra → meaning**

Examples of what must be avoided:
- 第一願・禮敬諸佛 must not be reduced to merely “be polite.”
- 第九願・恆順眾生 must not become “give everybody whatever they want.”

The playable experience must lead faithfully toward the Dharma point.

---

## 5. VISUAL MASTER STYLE

Move away from an almost-everything cream-and-gold visual treatment.

### Base adventure palette

- sky blue
- leaf green
- sunshine yellow
- lotus pink
- warm orange
- cloud white
- Dharma gold

### Meaning of gold

Ordinary vibrant colours belong to the adventure world.

Gold is reserved to regain significance, especially for:
- Dharma revelation;
- Buddha imagery;
- petals;
- seals;
- spiritually significant light.

### Landscape depth

Scenes should normally contain:
1. foreground — 善財 and/or interactive object;
2. middle ground — path, temple, village, etc.;
3. distance — mountains, clouds, destination, mystery.

The scene should feel like a world the player wants to enter rather than a flat panel.

---

## 6. TYPOGRAPHY SYSTEMS

Use **two distinct typography systems**.

### A. Adventure typography

For short celebratory/adventure text such as:
- 善財童子 × 普賢十願
- 第一願！
- 新發現！
- 獲得行願法印！
- 下一站！

Desired qualities:
- bold;
- playful;
- dimensional;
- thick face;
- outline;
- drop shadow/extrusion;
- slight curve/angle;
- bright gradient.

Chinese must receive the same visual importance as English.

The title style may use a golden-yellow face, orange lower gradient, cream highlight, warm dark-red outline, and dimensional shadow, but must remain an original Huayan Adventure identity rather than imitate another franchise logo.

### B. Reading typography

For:
- sutra;
- explanations;
- choices;
- longer Dharma content.

Keep it clean and highly readable. Never use decorative adventure typography for paragraphs.

---

## 7. 善財童子 — GAME COMPANION

善財 is a real adventure companion, not a static decoration.

Build/use an expression and pose library over time, potentially including:

neutral · walking · running · pointing · curious · thinking · surprised · delighted · worried · listening · palms together · bowing · looking upward · celebrating · holding Dharma petal · examining seal · inviting player forward

His **eyes and body direction** are part of the interaction system.

If something is interactive, 善財 may look toward it.

If the player hesitates:
**善財 looks → turns → points**

Prefer body language over explicit instructions such as “Click the Buddha.”

---

## 8. VISUAL INTERACTION LANGUAGE

Use a consistent vocabulary across all ten vows:

- **Soft pulse** — something here may be interesting.
- **Ripple** — tap/click here.
- **Animated pointing hand** — player has not discovered the interaction.
- **Dotted moving arrow** — drag.
- **Sparkle trail** — follow/explore.
- **Glowing edge** — discovered but not completed.
- **✓ / transformed visual** — explored/completed.
- **Lotus particles** — Dharma insight.
- **Golden light + bell** — sutra revelation.

### Progressive hint rule

Do not immediately instruct.

- **0–3 sec:** natural scene.
- **3–6 sec:** interactive object subtly moves/glows.
- **6–10 sec:** ripple.
- **10+ sec:** animated hand demonstrates.

Beginners should not get stuck; experienced players should not be treated as though they need constant instructions.

---

## 9. TEXT & READING DEPTH

**Show first. Explain second.**

Do not lead with a paragraph explaining what the player is about to see.

Preferred pattern:

1. show the behaviour visually;
2. allow discovery;
3. show a short insight;
4. make deeper explanation available where appropriate.

Three reading depths:

- **Level 1 — Visual:** understand through the scene.
- **Level 2 — Discovery sentence:** approximately 5–15 words.
- **Level 3 — Dharma explanation:** sutra/commentary.

The game should remain enjoyable without reading everything, while curiosity naturally opens deeper learning.

---

## 10. CHOICE PHILOSOPHY

Every vow needs **at least one interaction where the player's decision changes what happens next on screen**.

This does not require conventional winning/losing.

Preferred structure:

**Choice → consequence → reflection → another attempt / another path**

Do not use giant punitive messages such as:

`WRONG!`

Prefer:
- visible consequence;
- gentle reaction;
- `看看發生了什麼……`;
- an opportunity to try again.

A poor/unhelpful choice should produce an interesting, understandable consequence rather than an exam-style penalty.

---

## 11. REWARD SYSTEM — NO CONVENTIONAL POINTS

### IMPORTANT

This Adventure Game does **not** use a conventional numerical points/score system.

Do not import points from LearningGames01, LearningGames02, the main hub, or another project.

Approved reward concepts:

### Small discoveries
**行願花瓣**

Suggested collection animation:
- petal emerges from scene;
- arcs through the air;
- enters the player's travel book/map.

### Completed vow
**行願法印**

Suggested completion:
- three petals circle;
- light gathers;
- petals combine into 法印;
- completion/map state changes.

Possible sound:
`ting → ting → ting → DING + short flourish`

The intended feeling is accomplishment and discovery, **not gambling/casino reward**.

### Replay/progress expression

Prefer something like:

`本願發現 5/7`

rather than:

`Score 70%`

This encourages exploration rather than exam behaviour.

---

## 12. SOUND MASTER SYSTEM

Sound communicates game state; it is not mere decoration.

### Adventure ambience

Keep subtle:
- birds;
- breeze;
- leaves;
- distant water;
- temple ambience;
- footsteps.

### Interaction sounds

- tap: pop / wooden tick;
- hover/focus: very subtle sparkle;
- discovery: light `ting`;
- surprise: context-appropriate whimsical flourish;
- unhelpful decision: gentle descending “uh-oh” notes, never punishment buzzer;
- good insight: short ascending musical phrase.

### Dharma sounds

When scripture appears:
- one resonant bell;
- background activity quietens.

When an insight connects:
- soft luminous chime.

### Rewards

Petal:
- light multi-`ting` sound.

Seal:
- short celebratory orchestral/Dharma flourish.

Never make reward audio feel like a casino.

### New destination

Use a short adventurous musical sting conveying:

> “We're going somewhere!”

---

## 13. PERSISTENT GAME CONTROLS & SAVING

A top-corner menu (`☰`) is planned.

The guide specifies a persistent control concept including:
- `繼續旅程`
- leaving the game with reassurance such as:
  - `旅程已保存。`
  - `下次回來，善財會在這裡等你。`
- `離開遊戲`

**Implementation details for saving are not defined by this master file.** Do not invent a storage architecture without checking the current code and/or asking the user.

---

## 14. TEN-VOW ADVENTURE MAP

The Ten-Vow Adventure Map should become a signature visual.

Concept:
- large colourful illustrated Huayan landscape;
- winding journey/path;
- completed destinations glow;
- current destination gently pulses;
- future worlds remain visible but partly mysterious.

Journey order:

1. 禮敬諸佛
2. 稱讚如來
3. 廣修供養
4. 懺悔業障
5. 隨喜功德
6. 請轉法輪
7. 請佛住世
8. 常隨佛學
9. 恆順眾生
10. 普皆回向

The map should create the feeling:

> “I want to see what's over there.”

---

## 15. TEN WORLDS — CURRENT DESIGN DIRECTION

These are approved **design directions**, not permission to oversimplify the doctrine.

| Vow | Adventure world | Dominant feeling | Main interaction concept | Sound personality |
|---|---|---|---|---|
| 1 禮敬諸佛 | Sunrise temple garden | Curiosity → reverence | Observe / distinguish / choose | Birds, temple ambience, bell |
| 2 稱讚如來 | Singing valley / echoing mountains | Joy | Sound / expression / recognition | Echoes, birdsong, musical phrases |
| 3 廣修供養 | Abundant flower-and-jewel market/garden | Generosity | Choose / give / discover what matters | Cheerful market, sparkle |
| 4 懺悔業障 | Storm clearing → sky | Courage / relief | Repair / clean / make amends | Rain clearing → ambience |
| 5 隨喜功德 | Festival / blooming village | Shared happiness | React to others' success | Laughter, celebration, petals |
| 6 請轉法輪 | Quiet village needing a lamp/path | Initiative | Help Dharma reach others | Bell, wheel/chime motifs |
| 7 請佛住世 | Fading light / precious teacher departing | Appreciation | Recognise / request / cherish | Tender, warm, restrained |
| 8 常隨佛學 | Mountain trail / footprints | Perseverance | Follow / navigate / practice | Footsteps, wind, travelling music |
| 9 恆順眾生 | Diverse bustling world | Empathy / adaptability | Different characters need different responses | Varied lively ambience |
| 10 普皆回向 | Rivers joining cosmic ocean | Vastness / connection | Gather → release/share | Expanding orchestral + water |

---

## 16. 宣化上人 INTEGRATION

Use the **actual photograph** of 宣化上人 respectfully.

Controlled uses proposed/approved in the guide:

1. **Completion rest stops** after vows.
2. **Video thumbnails**, large and clickable rather than tiny text links.
3. **Optional Master's Corner** after a difficult concept:
   - `想再深入一點？`
   - photo;
   - short introduction;
   - link to teaching.
4. **Final Ten-Vow completion**, where his photograph may carry particular emotional meaning.

Never:
- cartoonise him;
- turn him into a game mascot;
- use his photograph in comic reactions;
- attach playful reward effects to him.

---

## 17. RESOURCE CARDS / 行願休息站

Resources should feel like destinations inside the world rather than a bibliography.

Use a visual **行願休息站** such as a colourful wooden pavilion/signboard.

Possible contents:
- relevant video thumbnail;
- 《行願十日》;
- 宣化上人 teaching thumbnail / `恩師開示`;
- appropriate deeper-learning resource.

Prefer large visual thumbnails/cards to plain `▶ Link` text.

---

## 18. FAILURE / UNHELPFUL CHOICE DESIGN

Failure should be interesting.

Example pattern from the guide:
- player makes an unhelpful choice;
- scene visibly shows the consequence;
- another character reacts;
- a gentle comic musical cue may play;
- 善財 reacts;
- short reflection appears;
- `↻ 再試一次`.

Never reduce this to `答錯！`.

The player should understand *why* the action was unhelpful by seeing what happened.

---

## 19. AGE PHILOSOPHY

Do **not** design merely “for children.”

Design:

> **easy to understand visually, enjoyable at any age**

Targets:
- a 10-year-old can understand it;
- an older adult can enjoy discovering it;
- an experienced Buddhist can still find the teaching faithful.

Avoid:
- baby language;
- over-cute treatment of Dharma.

Aim for:
- **family adventure**.

---

## 20. ANIMATION PRINCIPLE

Movement must direct attention.

Do not make everything wiggle.

At a given moment, prefer:
- **one primary motion**;
- subtle ambient environmental movement;
- character breathing/blinking.

Example:
- 善財 blinks;
- the important interactive object begins glowing;
- everything else remains calm.

The player's eye should naturally move toward what matters.

---

## 21. ACCESSIBILITY

Preserve these requirements:

- no low-contrast brown-on-grey or brown-on-gold paragraphs;
- reading surfaces: cream / ivory / very pale warm yellow;
- text: near-black / very dark brown;
- text large enough to read comfortably;
- buttons/targets large enough;
- no interaction dependent only on colour;
- every meaningful sound cue has a visual equivalent;
- animations can be reduced;
- all important screens remain usable at **100% browser zoom**.

---

## 22. MOBILE INTERACTION

The game should eventually work well on phones.

Requirements:
- large clickable/tappable targets;
- no essential hover-only interaction;
- hand/ripple hints must work for mouse and touch;
- drag mechanics must tolerate imprecise fingers;
- text cards must not cover the entire screen before the player has seen the scene.

---

## 23. OPENING PHILOSOPHY

Current planned direction:

- bright illustrated Huayan world;
- 善財 in foreground, potentially with backpack;
- path winding toward distant glowing worlds;
- birds cross the sky;
- leaves move;
- adventure title appears:

`善財童子`  
`普賢十願大冒險`

small English:
`Sudhana's Ten Great Vows Adventure`

Then:
- music;
- 善財 turns toward player;
- `你來了！一起出發吧！`
- large `出發！` button.

Do **not** open with a paragraph explaining the game.

---

## 24. FIRST-TIME PLAYER RULE

No manual.  
No separate tutorial page.

Teach interaction **inside play**:

- first clickable object teaches ripple;
- first drag teaches animated hand;
- first decision demonstrates consequence;
- first reward teaches petals;
- first seal introduces the map.

By 第二願, the player should already understand the game's visual interaction language.

---

## 25. MASTER GUIDE QUALITY TEST

Before approving any future scene, ask:

1. **If the player doesn't read, do they know where to look?**
2. **Is there something to discover/do rather than merely Next?**
3. **Does their action produce visible/audible feedback?**
4. **Does the experience accurately lead toward the Dharma point?**
5. **Is there a reason to wonder what happens next?**

Interpretation:
- fail 1–3 → not yet enough of a game;
- fail 4 → not faithful enough to the project;
- fail 5 → adventure momentum is weak.

---

## 26. CURRENT DEVELOPMENT STAGE

The supplied Master Guide says **do not yet transform all screens or begin building all ten vows**.

The next design/prototyping stage is:

### Prototype A — Opening

Tests:
- colour;
- typography;
- 善財;
- world;
- excitement;
- sound concept.

### Prototype B — Four Worshippers

Tests:
- visual storytelling;
- animation cues;
- progressive hints;
- surprise;
- short explanation.

The player should naturally want to investigate the four worshippers without first reading instructions.

### Prototype C — 第一願 Completion / Screen 14

Tests:
- celebration;
- 法印;
- map;
- next adventure;
- 宣化上人 photograph/video thumbnail;
- Dharma Rest Stop.

### Gate before 第二願

Only after A, B and C feel like parts of the **same animated adventure** should development systematically transform Screens 01–14, prepare the sound asset plan, and then proceed toward 第二願・稱讚如來.

---

## 27. FIRST VOW / EXISTING CODE — PROTECTION RULE

第一願 already exists as a substantial implementation and may contain a large amount of code.

When continuing development:

1. Do not assume the current file should be rewritten from scratch.
2. Inspect existing code before recommending architectural changes.
3. Preserve functioning behaviour unless the user approves a change.
4. Separate **content/design changes** from **technical refactoring**.
5. If refactoring becomes necessary for the ten-vow project, propose a migration plan first.
6. Test changes incrementally.
7. Do not copy 第一願 wholesale ten times before reviewing whether common systems can safely be shared.
8. Do not invent new mechanics merely because they would make the architecture cleaner.

The exact file/module architecture is **not yet defined in this master specification**.

---

## 28. LANGUAGE / TRANSLATION WORKFLOW

**Chinese is the master/source language for the game.**

Complete and approve Chinese game content first.

Only after the Chinese content is finalized should it be translated into Vietnamese.

Do not let translation work change the approved Chinese source content.

Any English text already appearing in design concepts is secondary unless the user explicitly approves it as game content.

---

## 29. EXPLICITLY NOT PART OF THIS GAME

Unless the user later changes this master specification:

- **No conventional points system.**
- No `850 POINTS!`-style scoring.
- Do not import total-points mechanics from other learning games or the main hub.
- Do not treat the game as an exam/quiz merely because choices exist.
- Do not make `答錯！` / `WRONG!` the central feedback mechanism.
- Do not require reading a tutorial/manual before play.
- Do not make essential interactions hover-only.
- Do not use sound without a visual equivalent.
- Do not cartoonise 宣化上人.
- Do not use 宣化上人 as a game mascot.
- Do not reduce a vow's doctrinal meaning to its adventure metaphor.
- Do not automatically add mechanics remembered from other chats.
- Do not assume an unspecified feature is approved.

---

## 30. SOURCE HIERARCHY FOR FUTURE CHATGPT SESSIONS

When continuing this project, use this hierarchy:

1. **User's explicit current instruction**
2. **This approved `PROJECT_MASTER.md`**
3. **Current uploaded/source code**
4. **Other project-specific files explicitly supplied for the task**
5. **Old conversation history / ChatGPT memory**

If levels 2 and 3 appear inconsistent, stop and identify the conflict before making a destructive change.

---

## 31. SAFE NEW-CHAT STARTER

The user can paste this after uploading this file and the relevant current code:

> We are continuing my 《善財童子 × 普賢十願》 Adventure Game. Read `PROJECT_MASTER.md` first. It is the authoritative project specification. Do not import game mechanics or assumptions from my other ChatGPT chats/projects. If memory conflicts with the master file, follow the master file. If something important is not specified, ask me instead of assuming. Read the current code before proposing changes, preserve working behaviour, and make only changes relevant to the task I give you.

---

## 32. CHANGE CONTROL

When a major new design decision is made:

1. ChatGPT states the proposed Master-file change clearly.
2. User approves/corrects it.
3. Only then is `PROJECT_MASTER.md` updated.
4. Record the date/version if the change materially affects the game architecture or experience.

Do not silently promote brainstorming into permanent requirements.

---

## 33. OPEN / NOT-YET-DEFINED ITEMS

The supplied Master Guide does **not** fully define the following. Future ChatGPT sessions must not invent them without checking the current code or asking the user:

- final technical file/module architecture;
- exact persistence/storage implementation;
- exact implementation of cross-vow state;
- exact number of discoveries/petals in every vow;
- final assets for all ten worlds;
- final detailed gameplay of Vows 2–10;
- final sound files/music assets;
- final mobile implementation details;
- final multilingual technical architecture;
- deployment/publishing workflow for the completed Adventure Game.

---

## 34. MASTER PRINCIPLE

The project succeeds when the player feels:

> **I saw something → I became curious → I tried something → the world reacted → I discovered something → I understood why it mattered → I want to continue.**

The game experience serves the Dharma teaching; it does not replace or trivialize it.

---


## 35. APPROVED TECHNICAL ARCHITECTURE — v1.1

**Approved:** 2026-09-25  
**Version timestamp:** 2026-09-25 15:00 MYT (UTC+08:00)

### Architecture principle

Use **one shared game engine + reusable shared components + one self-contained content/interaction module per vow**.

Do not build all ten vows into one giant `index.html`. The root `index.html` should become a small application shell.

### Approved target structure

```text
puxian-adventure/
├── index.html
├── PROJECT_MASTER.md
├── README.md
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── core/
│   │   ├── game.js
│   │   ├── navigation.js
│   │   ├── interaction.js
│   │   ├── progress.js
│   │   ├── audio.js
│   │   └── storage.js
│   ├── components/
│   │   ├── dialogue.js
│   │   ├── discovery.js
│   │   ├── choice.js
│   │   ├── hints.js
│   │   ├── rewards.js
│   │   ├── dharma-reveal.js
│   │   ├── rest-stop.js
│   │   └── adventure-map.js
│   ├── vows/
│   │   ├── vow01/
│   │   │   ├── vow01.js
│   │   │   ├── scenes.js
│   │   │   ├── interactions.js
│   │   │   └── content.js
│   │   ├── vow02/
│   │   │   ├── vow02.js
│   │   │   ├── scenes.js
│   │   │   ├── interactions.js
│   │   │   └── content.js
│   │   ├── vow03/
│   │   ├── vow04/
│   │   ├── vow05/
│   │   ├── vow06/
│   │   ├── vow07/
│   │   ├── vow08/
│   │   ├── vow09/
│   │   └── vow10/
│   ├── data/
│   │   ├── vows.js
│   │   └── language.js
│   └── main.js
└── assets/
    ├── shared/
    │   ├── characters/
    │   ├── ui/
    │   ├── rewards/
    │   ├── audio/
    │   └── fonts/
    └── vows/
        ├── vow01/
        │   ├── backgrounds/
        │   ├── objects/
        │   ├── audio/
        │   └── images/
        ├── vow02/
        ├── vow03/
        ├── vow04/
        ├── vow05/
        ├── vow06/
        ├── vow07/
        ├── vow08/
        ├── vow09/
        └── vow10/
```

### Responsibilities

- `index.html`: small application shell only.
- `js/core/`: shared systems across the whole Adventure Game.
- `js/components/`: reusable dialogue, discovery, choice, hint, reward, Dharma-reveal, rest-stop and map systems.
- `js/vows/vowXX/`: everything specific to one vow.
  - `vowXX.js`: vow sequencing/control.
  - `scenes.js`: scene/screen definitions.
  - `interactions.js`: interactions unique to that vow.
  - `content.js`: discovery text, choices, Dharma explanations, sutra-related text and labels.
- `js/data/`: small shared data/configuration; never another giant catch-all file.
- `assets/shared/`: genuinely reusable assets.
- `assets/vows/vowXX/`: assets unique to one vow.

### CSS responsibilities

The existing `game.css` should ultimately separate into `base.css`, `layout.css`, `components.css`, `animations.css`, and `responsive.css`. Do not duplicate rules merely to split files.

### Migration rule — critical

This is the approved **target architecture**, not permission for a destructive rewrite.

第一願 must migrate incrementally:

**current working 第一願 → identify boundaries → extract shared systems → extract vow-specific content/interactions → test → continue**

At every stage preserve a working copy, move one coherent responsibility at a time, test, and fix migration regressions before continuing. Do not alter game design merely because code is being reorganized.

Do **not** rewrite 第一願 from scratch unless the user explicitly approves it.

### Before 第二願

Do not create 第二願 by copying the entire 第一願 implementation. First establish enough shared engine/component architecture for 第二願 to reuse it.

### ChatGPT rule for long code

Future sessions should work with only the files relevant to the current task whenever possible. A local change to one vow should normally require that vow's folder plus only the shared components/core files it actually uses.

### Architecture change control

This architecture is now approved. Future ChatGPT sessions must not collapse the project back into giant files, introduce a framework, or substantially reorganize this structure without explaining the reason and obtaining user approval.

---

## 36. VERSION HISTORY

### v1.1 — 2026-09-25 15:00 MYT (UTC+08:00)
- Approved modular architecture for the ten-vow Adventure Game.
- Established a small `index.html` application shell.
- Separated core systems, reusable components, vow-specific modules, shared data and assets.
- Established the four-file pattern for each vow.
- Added incremental migration/protection rules for existing 第一願.
- Prohibited copying the giant 第一願 implementation wholesale for Vows 2–10.
- Added timestamped version control.

### v1.0 — 2026-09-25
- Initial master created from the supplied Visual + Interaction + Sound Master Guide v1.0.
- Added source-of-truth/project-isolation rules.

**End of PROJECT_MASTER.md — Current authoritative version: v1.1.**
