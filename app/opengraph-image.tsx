import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abdul Rafay Imran | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <span style={{ color: "#00e5ff", fontSize: "32px", fontWeight: 700 }}>&lt;</span>
          <span style={{ color: "#f0ece3", fontSize: "64px", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Abdul Rafay Imran
          </span>
          <span style={{ color: "#00e5ff", fontSize: "32px", fontWeight: 700 }}>/&gt;</span>
        </div>
        <div style={{ color: "#6b7280", fontSize: "24px", textAlign: "center", maxWidth: "700px", lineHeight: 1.4 }}>
          Software Engineer — Backend · Full-Stack · Web3 · AI/ML
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
