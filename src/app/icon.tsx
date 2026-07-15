import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          borderRadius: 6,
          fontFamily: "Georgia, serif",
          fontSize: 18,
          fontWeight: 400,
          color: "#fafafa",
          letterSpacing: "-0.04em",
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
