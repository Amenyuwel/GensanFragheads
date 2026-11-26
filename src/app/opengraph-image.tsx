import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Satori can't read CSS variables or next/font, so the brand ink (--ink in globals.css)
// is repeated here and Jost is fetched as a TTF at build time.
const brandInk = "#231a2e";

async function loadJost(weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Jost:wght@${weight}`)
  ).text();
  const fontUrl = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!fontUrl) throw new Error(`Jost ${weight} TTF url not found`);
  return (await fetch(fontUrl)).arrayBuffer();
}

export default async function Image() {
  const [medium, regular] = await Promise.all([loadJost(500), loadJost(400)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: brandInk,
          color: "#ffffff",
          fontFamily: "Jost",
        }}
      >
        <div style={{ width: 96, height: 8, borderRadius: 4, background: "#f2a93b", marginBottom: 40 }} />
        <div style={{ fontSize: 108, fontWeight: 500, lineHeight: 1.1 }}>{site.name}</div>
        <div style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.4, marginTop: 32 }}>
          {site.description}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jost", data: medium, weight: 500, style: "normal" },
        { name: "Jost", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
