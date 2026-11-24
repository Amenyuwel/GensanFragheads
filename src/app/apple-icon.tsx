import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Satori can't use the SVG file, so the bottle from icon.svg is redrawn on its 32-unit grid at 180px (x 5.625).
const unit = 180 / 32;

function Block({ x, y, w, h, color, radius = 0 }: { x: number; y: number; w: number; h: number; color: string; radius?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x * unit,
        top: y * unit,
        width: w * unit,
        height: h * unit,
        background: color,
        borderRadius: radius * unit,
      }}
    />
  );
}

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#231a2e" }}>
        <Block x={12} y={4} w={8} h={7} color="#f2a93b" />
        <Block x={13.5} y={11} w={5} h={2} color="#e9e3d8" />
        <Block x={7} y={13} w={18} h={15} color="#f3f1ec" radius={1.5} />
        <Block x={9} y={15} w={14} h={11} color="#e79a86" radius={0.5} />
      </div>
    ),
    size,
  );
}
