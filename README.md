# SGH Wheelchair Route Navigator — Presentation Prototype

This is a static web prototype for wheelchair-accessible navigation around SGH. It is designed to be shown directly in a browser or deployed as a static site.

## What changed in this version

- The start and endpoint dropdowns use only these choices: OCH, Emergency, Block 3, Block 4, Block 5, Block 6, Block 7, MRT Exit 6, MRT Exit 7, NCCS, Academia, SNEC, and NHS.
- The map is visible immediately and remains visible while changing start/end points.
- The route overlay is hidden until the user presses **Route Now**.
- Dropdown changes, map-node clicks, swap, demo shortcuts, or preference changes clear the previous route overlay until **Route Now** is pressed again.
- The routing engine only searches edges tagged as wheelchair-accessible in `app.js`.
- Shuttle links are only considered when the chosen route starts or ends at MRT Exit 6.

## Files

- `index.html` — app shell and presentation copy
- `styles.css` — responsive visual styling
- `app.js` — route graph, Dijkstra route search, map drawing, and UI behavior
- `manifest.webmanifest` and `icon.svg` — optional PWA metadata
- `.nojekyll` — helps GitHub Pages serve the files without Jekyll processing

## How to run locally

Open `index.html` in a browser.

For a local web server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` from this folder.

## How to put it live

### Netlify Drop

1. Go to Netlify Drop.
2. Drag the entire folder onto the upload area.
3. Use the generated public URL for your presentation.

### GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder.
3. Go to repository settings, then Pages.
4. Publish from the main branch and root folder.

## Important caveat

This is a presentation prototype. The map is schematic and the route distances, times, turns, lift assumptions, shuttle assumptions, construction closures, and exact accessible paths must be validated by SGH facilities or operations teams before real use.
