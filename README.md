# 🪨 SedimentSketch

SedimentSketch is a small web app where you can **upload an image of rocks**,
**trace outlines** with a brush (adjustable color & thickness), and **export coordinates** of each outline.

It includes basic authentication and protected routes so signed‑in users can access the editor.

Built with **React + Vite + TypeScript + Tailwind + Zustand + react‑konva** and **Firebase Auth**.

## ✨ Features

- 📤 Upload any image (JPG/PNG/WEBP)
- ✏️ Draw freehand outlines over the image
- 🎨 Adjustable brush size & color (right‑side panel)
- 🧾 Export coordinates (bottom toolbar)
  - **All outlines** → TXT / JSON / CSV
  - **Selected outline only** → TXT / JSON / CSV
- 🔐 Auth + protected routes (Firebase: Google and Email/Password)
- ⌨️ Keyboard shortcut: `Esc` clears selection
- 🗑️ Clear canvas (reset all outlines)
- Responsive layout with shared header typography


## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Canvas / Drawing:** [Konva](https://konvajs.org/) via [react-konva](https://github.com/konvajs/react-konva)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom sand-tone theme
- **Auth:** Firebase Authentication (Google, Email/Password)
- **Utilities:** classnames, react-use-measure
- **Optional Hosting:** Firebase Hosting


## 📂 Project Structure

```

sediment-sketch/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── firebase.json                # optional hosting config
├── .firebaserc                  # optional hosting project alias
├── src/
│   ├── main.tsx                 # router + providers
│   ├── index.css                # Tailwind + UI styles
│   ├── types.ts
│   ├── context/
│   │   └── AuthContext.tsx      # Firebase auth provider + hook
│   ├── routes/
│   │   └── Protected.tsx        # route guard
│   ├── pages/
│   │   ├── AuthPage.tsx         # sign in / sign up
│   │   ├── Landing.tsx          # upload entry
│   │   └── EditorPage.tsx       # editor shell/layout
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── CanvasStage.tsx
│   │   ├── BrushControls.tsx
│   │   ├── UploadButton.tsx
│   │   └── ExportButton.tsx
│   ├── state/
│   │   └── useStore.ts          # outlines, brush, image
│   └── lib/
│       ├── geometry.ts
│       ├── download.ts
│       └── firebase.ts          # Firebase client init

````

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/<your-username>/sediment-sketch.git
cd sediment-sketch
npm install
````

### 2. Configure Firebase (Auth)

Create a Firebase project and enable providers:
- Authentication → Sign-in method → enable Google and Email/Password

Create `.env` in the project root with your config:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Note: The file must be at the root (not under `src/`).

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run build
npm run preview
```

## 🖥️ Usage

1. Visit `/auth` (or `/`) and sign in (Google or Email/Password).
2. Go to `/start` to upload an image (or use the Upload button in the editor toolbar later).
3. You’ll be routed to `/editor`.
4. Adjust **Brush Size** and **Color** in the right panel; draw on the image.
5. Click an outline to select it; press `Esc` to clear selection.
6. Bottom toolbar → Upload and Export controls:
   - Download TXT/JSON/CSV for all outlines or the selected one.


## 📦 Export Formats

The app stores points in image space. Exports represent what’s on screen:

* **TXT (all outlines):** array of bounding boxes

  ```txt
  [{"minX":19,"maxX":405,"minY":15.08,"maxY":224.08},
   {"minX":427,"maxX":594,"minY":3.08,"maxY":190.08}]
  ```

* **JSON (all outlines):** id + color + thickness + bounds + pointCount

  ```json
  [
    {
      "id": "outline-1",
      "color": "#ff2d55",
      "thickness": 6,
      "bounds": { "minX": 19, "maxX": 405, "minY": 15.08, "maxY": 224.08 },
      "pointCount": 240
    }
  ]
  ```

* **CSV (all outlines):** rows of `outlineId,index,x,y`

  ```csv
  outlineId,index,x,y
  outline-1,0,19,15.08
  outline-1,1,20,16.2
  ...
  ```

## 🔎 Notes & Limitations

- Outlines are kept in client state (Zustand) only; no persistence yet.
- No undo/redo yet.
- The canvas fits the image to the available stage while keeping aspect ratio.

## 🔮 Roadmap

Core Editing & UX
- [ ] Undo/redo history (stroke‑level with grouping)
- [ ] Outlines panel: list, visibility toggle, rename, delete, reorder
- [ ] Edit tools: move points, open/close path, smoothing toggles
- [ ] Pen/polyline tool for straight segments; Shift to constrain angles
- [ ] Eraser tool and lasso selection
- [ ] Zoom/pan, fit to screen, reset view, and touch gestures
- [ ] Mobile layout optimization

Geometry & Analysis
- [ ] Path simplification (Ramer–Douglas–Peucker) with tolerance slider
- [ ] Curve smoothing and corner detection
- [ ] Measurements: calibrated scale, lengths/perimeters/areas
- [ ] Units (px ↔︎ mm/cm/in) with calibration overlay
- [ ] Snapping to grid/guides; angle snapping (0/45/90)
- [ ] Merge/split outlines; boolean ops on paths

Data & Export
- [ ] Export: GeoJSON, SVG, DXF, Shapefile (via shp‑write), PNG overlay
- [ ] Export image with outlines composited; thumbnail generator
- [ ] Import outlines from JSON/CSV/GeoJSON
- [ ] Batch export per‑outline files and zips

Persistence & Collaboration
- [ ] Firestore persistence for projects, images, outlines, and settings
- [ ] Realtime collaboration (presence, locks, live updates)
- [ ] Version history (named checkpoints) and outline diffs
- [ ] Project dashboard: recent, starred, collaborators/roles
- [ ] Cloud storage for images; import by URL or drag‑drop

Performance & Quality
- [ ] Workers for sampling/simplification
- [ ] Optional WASM for heavy geometry ops
- [ ] Virtualized rendering for many outlines
- [ ] Error boundaries and structured logging
- [ ] Unit tests (geometry/state) and e2e tests (Playwright)
- [ ] PWA/offline with IndexedDB cache

Ops & Deployment
- [ ] CI/CD to Firebase Hosting (GitHub Actions)
- [ ] Environments (dev/staging/prod) via project aliases
- [ ] Opt‑in telemetry for UX improvements
- [ ] Documentation site with guides and recipes

Accessibility & i18n
- [ ] Keyboard navigation, focus rings, ARIA
- [ ] High‑contrast theme + theme switcher
- [ ] Internationalization scaffolding and first locales

## ☁️ Deploy (optional: Firebase Hosting)

```
npm run build
firebase login
firebase use <your-project>
firebase deploy --only hosting
```

## 🤝 Contributing

PRs and suggestions welcome!
For major changes, please open an issue first.
