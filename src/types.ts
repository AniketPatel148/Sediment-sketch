export type Point = { x: number; y: number };

export type Outline = {
  id: string;
  color: string;
  thickness: number; // px, in IMAGE space
  closed: boolean;
  points: Point[];   // captured in IMAGE coordinates
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  createdAt: number;
  updatedAt: number;
};

export type ImageMeta = {
  src: string;       // data URL
  width: number;
  height: number;
};
