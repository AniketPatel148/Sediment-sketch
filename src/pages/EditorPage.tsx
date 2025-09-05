import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BrushControls from "../components/BrushControls";
import CanvasStage from "../components/CanvasStage";
import ExportButton from "../components/ExportButton";
import UploadButton from "../components/UploadButton";
import StatusPanel from "../components/StatusPanel";
import { useStore } from "../state/useStore";
import type { ImageMeta } from "../types";

export default function EditorPage() {
  const image = useStore((s) => s.image);
  const setImage = useStore((s) => s.setImage);
  const location = useLocation() as { state?: { imageDataUrl?: string } };
  const nav = useNavigate();

  // If navigated from Landing with a dataURL, load it and set as current image
  useEffect(() => {
    const dataUrl = location.state?.imageDataUrl;
    if (!dataUrl) return;
    const img = new Image();
    img.onload = () => {
      const meta: ImageMeta = { src: dataUrl, width: img.naturalWidth, height: img.naturalHeight };
      setImage(meta);
      // clean the state so refresh/back doesn’t re-trigger
      nav("/editor", { replace: true });
    };
    img.src = dataUrl;
  }, [location.state, nav, setImage]);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">

        {/* Canvas left, brush controls right */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_18rem]">
          <section className="min-w-0">
            {!image ? (
              <div className="panel-tan flex h-[70vh] items-center justify-center p-6 text-center">
                <div>
                  <p className="mb-3 text-base">Upload an image to start tracing.</p>
                  <UploadButton />
                </div>
              </div>
            ) : (
              <CanvasStage />
            )}
          </section>
          <aside>
            <BrushControls />
            <StatusPanel />
          </aside>
        </div>

        {/* Bottom bar – Upload + Download inline */}
        <div className="toolbar mt-6 flex flex-wrap items-center justify-start gap-3">
          <UploadButton />
          <ExportButton />
        </div>
      </main>
    </div>
  );
}
