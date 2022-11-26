import { css } from "@emotion/css";

export const WrapperDiv = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
});

export const UpvoteCount = css({
  fontSize: "1.2rem",
  margin: "0.6rem 0 0.6rem 0"
});

export function HoverArrow(color: string) {
  return css({
    ":hover": {
      cursor: "pointer",
      color,
      backgroundColor: "rgba(255, 255, 255, 0.16)",
    },
    ":active": {
      backgroundColor: "rgba(255, 255, 255, 0.24)",
    },
  });
}
