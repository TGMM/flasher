import { css } from "@emotion/css";

export const fontSizeControlClass = "fontSizeControl";
const childSelector = `& > .${fontSizeControlClass}`;

export const WrapperDiv = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
  [childSelector]: {
    fontSize: "1.2rem",
  },
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
