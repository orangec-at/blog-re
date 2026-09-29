import { ImageResponse } from "next/og";

// The site advertised /og/default.png, which never existed — shared links rendered
// with no preview image. Generating the card at build time keeps it in sync with
// the offer copy and leaves no binary asset to forget to update.

export const alt = "Your developer says it’s done. You have no way to check.";
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
          backgroundColor: "#fdfcfa",
          padding: "80px",
        }}
      >
        {/* The service leads where a visitor is deciding (site.ts), and colour is a
            verdict (DESIGN.md) — so the wordmark is vibeguard, in ink, no accent. */}
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: "#16130f" }}>
          vibeguard
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#16130f",
            maxWidth: "900px",
          }}
        >
          Your developer says it’s done. You have no way to check.
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#5c564e" }}>
          Launch Gate Audit · Remodeling Sprint · Founder Tech Partner
        </div>
      </div>
    ),
    size,
  );
}
