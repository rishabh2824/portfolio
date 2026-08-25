import { ImageResponse } from "next/og";
import { config } from "@/data/config";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = config.title;

// Generated at request/build time via Satori — no static asset to keep in
// sync with config.ts. Colors reuse the cyan/indigo accent already used for
// the project-card glow (BorderGlow in sections/projects.tsx) rather than
// inventing a separate palette just for this image.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#05070d",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 100% 100%, rgba(129,140,248,0.28), transparent 50%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "10px",
            height: "10px",
            borderRadius: "9999px",
            backgroundColor: "#22d3ee",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: "22px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#818cf8",
            fontWeight: 700,
          }}
        >
          Portfolio
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "104px",
          fontWeight: 800,
          color: "#f8fafc",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        {config.author}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "36px",
          fontWeight: 500,
          color: "#94a3b8",
          marginTop: "20px",
        }}
      >
        {config.role}
      </div>
    </div>,
    { ...size },
  );
}
