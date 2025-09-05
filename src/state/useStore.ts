import { create } from "zustand";
import type { ImageMeta, Outline, Point } from "../types";
import { computeBounds, dist } from "../lib/geometry";

type State = {
  image?: ImageMeta;
  outlines: Outline[];
  selectedId?: string;
  brush: { size: number; color: string };
  draft: Point[] | null;
};

type Actions = {
  setImage: (image?: ImageMeta) => void;
  setBrushSize: (size: number) => void;
  setBrushColor: (color: string) => void;
  clearOutlines: () => void;
  selectOutline: (id?: string) => void;

  startStroke: (p: Point) => void;
  addPoint: (p: Point) => void;
  endStroke: () => void;
};

const MIN_SAMPLE_DIST = 2; // px in IMAGE space

export const useStore = create<State & Actions>((set, get) => ({
  image: undefined,
  outlines: [],
  selectedId: undefined,
  brush: { size: 6, color: "#ff2d55" },
  draft: null,

  setImage: (image) => set({ image, outlines: [], selectedId: undefined, draft: null }),
  setBrushSize: (size) => set((s) => ({ brush: { ...s.brush, size } })),
  setBrushColor: (color) => set((s) => ({ brush: { ...s.brush, color } })),
  clearOutlines: () => set({ outlines: [], selectedId: undefined }),
  selectOutline: (id) => set({ selectedId: id }),

  startStroke: (p) => set({ draft: [p] }),
  addPoint: (p) => {
    const d = get().draft;
    if (!d || d.length === 0) return;
    if (dist(d[d.length - 1], p) >= MIN_SAMPLE_DIST) {
      set({ draft: [...d, p] });
    }
  },
  endStroke: () => {
    const { draft, brush, outlines } = get();
    if (!draft || draft.length < 2) { set({ draft: null }); return; }
    const bounds = computeBounds(draft);
    const outline: Outline = {
      id: crypto.randomUUID(),
      color: brush.color,
      thickness: brush.size,
      closed: true,
      points: draft,
      bounds,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set({ outlines: [...outlines, outline], draft: null, selectedId: outline.id });
  },
}));
