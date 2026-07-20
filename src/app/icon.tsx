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
          backgroundColor: "#2E2435",
          borderRadius: 8,
          fontFamily: "Georgia, serif",
          fontSize: 18,
          fontWeight: 400,
          color: "#FAF7F4",
          letterSpacing: "-0.04em",
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
