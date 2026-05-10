import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#faf8f5",
          color: "#1c2520",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          <span>{site.shortName}</span>
          <span style={{ color: "#1f4632" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: "1040px",
              gap: "0 18px",
            }}
          >
            <span>Commercial cleaning that</span>
            <span style={{ color: "#1f4632", fontStyle: "italic" }}>
              proves itself,
            </span>
            <span>every visit.</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "32px",
              fontSize: 22,
              color: "#525a55",
              fontFamily: "Helvetica, sans-serif",
            }}
          >
            <span>Photo verification</span>
            <span>·</span>
            <span>Monthly reports</span>
            <span>·</span>
            <span>1-hour response</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
