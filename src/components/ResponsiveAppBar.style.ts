import { SxProps, Theme } from "@mui/material";
import { fontFamily } from "./Global.style";

export const TypographyStyle: SxProps<Theme> = {
    mr: 2,
    fontFamily: fontFamily,
    fontWeight: 700,
    fontSize: "2.25rem",
    color: "inherit",
    textDecoration: "none",
};