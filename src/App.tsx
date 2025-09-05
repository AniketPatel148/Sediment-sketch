import UploadButton from "./components/UploadButton";
import ExportButton from "./components/ExportButton";
import BrushControls from "./components/BrushControls";
import CanvasStage from "./components/CanvasStage";
import { useStore } from "./state/useStore";
import Header from "./components/Header";

export default function App() {
  const image = useStore((s) => s.image);
  const selectedId = useStore((s) => s.selectedId);

  return (
    <div>
      <Header />

      <main className="mx-auto max-w-6xl px-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,18rem] gap-6">
          <CanvasStage />
          <div className="space-y-4">
            <BrushControls />
            <div className="panel p-4 text-sm">
              <div className="font-semibold mb-2">Status</div>
              <div>Image: {image ? `${image.width}×${image.height}` : "—"}</div>
              <div>Selected Outline: {selectedId || "—"}</div>
            </div>
          </div>
        </div>

        <footer className="toolbar flex flex-wrap items-center gap-3">
          <UploadButton />
          <ExportButton />
        </footer>
      </main>
    </div>
  );
}
