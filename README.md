# Jana's Garden

A top-down Stardew-style game. Jana wakes up, finds a note, and explores
a garden to discover 25 hidden poems. Six animals give hints.

## Deploy to GitHub Pages
1. Create a new repository (e.g. `jana-garden`)
2. Upload EVERYTHING in this folder to the repo root
   (index.html must be at the top level, not inside a subfolder)
3. Settings → Pages → Deploy from a branch → main → / (root) → Save
4. Live in ~1 min at: https://YOURNAME.github.io/jana-garden

## Edit the poems
Open `js/data.js` → edit the `POEMS` array (25 entries).
Each: { title, date, body }. Use \n for line breaks.

## Edit the note
Same file → `NOTE_PAGES` array.

## Edit animal hints
Same file → `ANIMALS` array → `hint` field.

## Controls
Arrow keys / WASD to move, E to interact.

## File structure
```
index.html          ← entry point
js/
  data.js           ← poems, note, hints (EDIT THIS)
  game.js           ← engine (don't need to touch)
assets/
  map.png           ← the rendered garden map
  sprites/          ← Jana walk cycles
  animals/          ← Phoebe, Spike, Calabar, Gilmour
  flowers/          ← flower sprites
  audio/            ← music + sound effects
```
