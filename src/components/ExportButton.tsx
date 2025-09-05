import React from "react";
import { useStore } from "../state/useStore";
import { downloadTextFile } from "../lib/download";

type Fmt = "txt" | "json" | "csv";

export default function ExportButton() {
  const outlines = useStore((s) => s.outlines);
  const selectedId = useStore((s) => s.selectedId);

  const makePayload = (list: typeof outlines, fmt: Fmt) => {
    if (fmt === "txt") {
      // array of bounding boxes only
      return JSON.stringify(list.map(o => o.bounds));
    }
    if (fmt === "json") {
      // light JSON payload (ids + bounds + meta counts)
      return JSON.stringify(
        list.map(o => ({
          id: o.id,
          color: o.color,
          thickness: o.thickness,
          bounds: o.bounds,
          pointCount: o.points.length,
        })),
        null,
        2
      );
    }
    // csv: outlineId,index,x,y
    const rows = ["outlineId,index,x,y"];
    list.forEach(o => o.points.forEach((p, i) => rows.push(`${o.id},${i},${p.x},${p.y}`)));
    return rows.join("\n");
  };

  const exportAll = (fmt: Fmt) => {
    if (outlines.length === 0) return alert("No outlines to export.");
    const filename = fmt === "txt" ? "coordinates.txt" : `coordinates-all.${fmt}`;
    downloadTextFile(filename, makePayload(outlines, fmt));
  };

  const exportSelected = (fmt: Fmt) => {
    if (!selectedId) return alert("No outline selected.");
    const list = outlines.filter(o => o.id === selectedId);
    const filename = fmt === "txt" ? "coordinates-selected.txt" : `coordinates-selected.${fmt}`;
    downloadTextFile(filename, makePayload(list, fmt));
  };

  // --- dropdown state & a11y ---
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2 bg-transparent">
      {/* Primary: Download Coordinates (All, TXT) */}
      <button
        className="btn btn-primary"
        onClick={() => exportAll("txt")}
        title="Download bounding boxes for all outlines as TXT"
      >
        Download Co-ordinates
      </button>

      {/* Secondary: Download Coordinates (Selected, TXT) */}
      <button
        className="btn btn-secondary"
        onClick={() => exportSelected("txt")}
        title="Download bounding box for the selected outline as TXT"
      >
        Download Co-ordinates (Selected)
      </button>

      {/* Split dropdown: More formats */}
      <div className="relative" ref={menuRef}>
        <button
          className="btn btn-secondary"
          onClick={() => setOpen(v => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          title="More formats"
        >
          More formats
          <svg width="16" height="16" viewBox="0 0 24 24" className="ml-1">
            <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
          </svg>
        </button>

        {open && (
          <div className="menu z-20" role="menu">
            <div className="px-2 pt-2 pb-1 text-[11px] uppercase tracking-wide text-stone-500">
              All outlines
            </div>
            <button className="menu-item" role="menuitem" onClick={() => { exportAll("json"); setOpen(false); }}>
              Download JSON (All)
            </button>
            <button className="menu-item" role="menuitem" onClick={() => { exportAll("csv"); setOpen(false); }}>
              Download CSV (All)
            </button>

            <div className="px-2 pt-2 pb-1 mt-1 text-[11px] uppercase tracking-wide text-stone-500 border-t border-stone-200">
              Selected outline
            </div>
            <button className="menu-item" role="menuitem" onClick={() => { exportSelected("json"); setOpen(false); }}>
              Download JSON (Selected)
            </button>
            <button className="menu-item" role="menuitem" onClick={() => { exportSelected("csv"); setOpen(false); }}>
              Download CSV (Selected)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
