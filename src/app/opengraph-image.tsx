import { ImageResponse } from "next/og";

// The site advertised /og/default.png, which never existed — shared links rendered
// with no preview image. Generating the card at build time keeps it in sync with
// the offer copy and leaves no binary asset to forget to update.

export const alt = "Launch-readiness engineering for software built with AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbfcff",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: "#061b31" }}>
          wakey<span style={{ color: "#533afd" }}>moment</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#061b31",
            maxWidth: "900px",
          }}
        >
          Launch-readiness engineering for software built with AI.
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#64748d" }}>
          Launch Readiness Review · Technical Debt Audit · Founder Tech Partner
        </div>
      </div>
    ),
    size,
  );
}
