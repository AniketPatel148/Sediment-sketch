import { useStore } from "../state/useStore";

export default function BrushControls() {
  const size = useStore((s) => s.brush.size);
  const color = useStore((s) => s.brush.color);
  const setSize = useStore((s) => s.setBrushSize);
  const setColor = useStore((s) => s.setBrushColor);
  const clearOutlines = useStore((s) => s.clearOutlines);

  return (
    <div className="panel w-72 p-4">
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Brush Size</div>
        <input type="range" min={1} max={50} value={size}
               onChange={(e)=> setSize(parseInt(e.target.value))}
               className="w-full"/>
      </div>
      <div className="mb-6">
        <div className="text-sm font-semibold mb-2">Brush Color</div>
        <input type="color" value={color} onChange={(e)=> setColor(e.target.value)}
               className="h-9 w-16 rounded border border-stone-400"/>
      </div>
      <button className="btn btn-danger w-full" onClick={clearOutlines}>Clear Canvas</button>
    </div>
  );
}
