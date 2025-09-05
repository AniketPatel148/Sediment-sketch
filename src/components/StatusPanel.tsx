import { useStore } from "../state/useStore";

export default function StatusPanel() {
  const image = useStore((s) => s.image);
  const outlines = useStore((s) => s.outlines);
  const selectedId = useStore((s) => s.selectedId);
  const selectOutline = useStore((s) => s.selectOutline);

  return (
    <div className="panel w-72 p-4 mt-3">
      <div className="text-sm font-semibold mb-3">Status</div>
      <dl className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-white/80">Image</dt>
          <dd className="ml-2 tabular-nums">
            {image ? `${image.width}×${image.height}` : "—"}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-white/80">Outlines</dt>
          <dd className="ml-2 tabular-nums">{outlines.length}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-white/80">Selected</dt>
          <dd className="ml-2 truncate max-w-[9rem]" title={selectedId || undefined}>
            {selectedId ?? "—"}
          </dd>
        </div>
      </dl>

      <button
        className="mt-3 w-full btn btn-secondary"
        onClick={() => selectOutline(undefined)}
        disabled={!selectedId}
      >
        Clear Selection
      </button>
    </div>
  );
}

