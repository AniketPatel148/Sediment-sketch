import React from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";
import useMeasure from "react-use-measure";
import { useStore } from "../state/useStore";
import type { Point } from "../types";

function useImage(src?: string) {
  const [img, setImg] = React.useState<HTMLImageElement | null>(null);
  React.useEffect(() => {
    if (!src) return setImg(null);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = src;
  }, [src]);
  return img;
}

export default function CanvasStage() {
  const image = useStore((s) => s.image);
  const outlines = useStore((s) => s.outlines);
  const draft = useStore((s) => s.draft);
  const selectOutline = useStore((s) => s.selectOutline);
  const start = useStore((s) => s.startStroke);
  const add = useStore((s) => s.addPoint);
  const end = useStore((s) => s.endStroke);
  const brush = useStore((s) => s.brush);
  const [ref, bounds] = useMeasure(); // container size
  const imgEl = useImage(image?.src || undefined);

  const stageW = Math.max(300, bounds.width);
  const stageH = Math.max(300, Math.min(700, (bounds.height || 600)));

  // fit image into stage
  const scale = image
    ? Math.min(stageW / image.width, stageH / image.height)
    : 1;
  const imgW = image ? image.width * scale : 0;
  const imgH = image ? image.height * scale : 0;
  const offsetX = (stageW - imgW) / 2;
  const offsetY = (stageH - imgH) / 2;

  const toImagePt = (x: number, y: number): Point => {
    return { x: (x - offsetX) / scale, y: (y - offsetY) / scale };
  };
  const withinImage = (p: Point) =>
    image ? p.x >= 0 && p.y >= 0 && p.x <= image.width && p.y <= image.height : false;

  return (
    <div ref={ref} className="canvas-shell">
      <Stage
        width={stageW}
        height={stageH}
        onMouseDown={(e) => {
          if (!image) return;
          const stage = e.target.getStage()!;
          const pos = stage.getPointerPosition();
          if (!pos) return;

          // if click hits the Stage (not a Line/Image), clear selection
          if (e.target === stage) {
            selectOutline(undefined);
          }

          const p = toImagePt(pos.x, pos.y);
          if (withinImage(p)) start(p);
        }}
        onMouseMove={(e) => {
          if (!image) return;
          const pos = e.target.getStage()!.getPointerPosition();
          if (!pos) return;
          const p = toImagePt(pos.x, pos.y);
          if (withinImage(p)) add(p);
        }}
        onMouseUp={() => end()}
      >
        <Layer>
          {imgEl && (
            <>
              <KonvaImage
                image={imgEl}
                x={offsetX}
                y={offsetY}
                width={imgW}
                height={imgH}
                listening={false}
              />
            </>
          )}

          {/* existing outlines */}
          {outlines.map((o) => (
            <Line
              key={o.id}
              x={offsetX} y={offsetY}
              points={o.points.flatMap((p) => [p.x * scale, p.y * scale])}
              stroke={o.color}
              strokeWidth={o.thickness * scale}
              lineCap="round"
              lineJoin="round"
              closed={o.closed}
              onClick={() => selectOutline(o.id)}
              shadowColor="#000"
              shadowBlur={2}
              tension={0}
            />
          ))}

          {/* draft stroke during drawing */}
          {draft && draft.length > 1 && (
            <Line
              x={offsetX} y={offsetY}
              points={draft.flatMap((p) => [p.x * scale, p.y * scale])}
              stroke={brush.color}
              strokeWidth={brush.size * scale}
              lineCap="round"
              lineJoin="round"
              closed={false}
              listening={false}
              opacity={0.9}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
