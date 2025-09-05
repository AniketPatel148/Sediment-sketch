import React from "react";
import { useStore } from "../state/useStore";
import type { ImageMeta } from "../types";

export default function UploadButton() {
  const setImage = useStore((s) => s.setImage);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const meta: ImageMeta = { src, width: img.naturalWidth, height: img.naturalHeight };
        setImage(meta);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  };

  return (
    <label className="btn cursor-pointer">
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      Upload
    </label>
  );
}
