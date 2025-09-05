# 🪨 SedimentSketch

SedimentSketch is a small full-stack demo web app where you can **upload an image of rocks**,  
**trace outlines** with a brush (adjustable color & thickness), and **export coordinates** of each outline.

Built with **React + Vite + TypeScript + Tailwind + Zustand + Konva**.  
Backend integration (Firebase / Express + Firestore) can be added later.

## ✨ Features

- 📤 Upload any image (JPG/PNG)
- ✏️ Draw freehand outlines over rocks
- 🎨 Adjustable brush size & color
- 🧾 Export coordinates
  - **All outlines** → TXT / JSON / CSV
  - **Selected outline only** → TXT / JSON / CSV
- ⌨️ Keyboard shortcuts
  - `Esc` → clear outline selection
- 🗑️ Clear canvas (reset all outlines)
- Responsive layout with styled header, sidebar controls, and footer toolbar


## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Canvas / Drawing:** [Konva](https://konvajs.org/) via [react-konva](https://github.com/konvajs/react-konva)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom sand-tone theme
- **Utilities:** classnames, react-use-measure
- **Planned Backend:** Firebase (Auth, Firestore, Storage, Functions with Express)


## 📂 Project Structure

```

sediment-sketch/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types.ts
│   ├── lib/
│   │   ├── geometry.ts
│   │   └── download.ts
│   ├── state/
│   │   └── useStore.ts
│   └── components/
│       ├── Header.tsx
│       ├── CanvasStage.tsx
│       ├── BrushControls.tsx
│       ├── UploadButton.tsx
│       └── ExportButton.tsx

````

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/<your-username>/sediment-sketch.git
cd sediment-sketch
npm install
````

### 2. Run dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 3. Build for production

```bash
npm run build
npm run preview
```

## 🖥️ Usage

1. Click **Upload** to add a rock image.
2. Adjust **Brush Size** and **Color** in the sidebar.
3. Draw outlines directly on the image.
4. Select outlines (click them).
5. Export:

   * **Download Coordinates** → All outlines, TXT
   * **Download Coordinates (Selected)** → The selected outline, TXT
   * **More formats** → JSON / CSV


## 📦 Export Formats

* **TXT (all outlines):**

  ```txt
  [{"minX":19,"maxX":405,"minY":15.08,"maxY":224.08},
   {"minX":427,"maxX":594,"minY":3.08,"maxY":190.08}]
  ```

* **JSON (all outlines):**

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

* **CSV (all outlines):**

  ```csv
  outlineId,index,x,y
  outline-1,0,19,15.08
  outline-1,1,20,16.2
  ...
  ```

## 🔮 Roadmap

* [ ] Undo / Redo stack
* [ ] Outlines panel (list, rename, toggle visibility)
* [ ] Firebase backend (store projects, outlines, and images)
* [ ] Multi-user project sharing
* [ ] Auto-trace (edge detection + simplification)

## 🤝 Contributing

PRs and suggestions welcome!
For major changes, please open an issue first.
