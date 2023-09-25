"use-client";
import { createStitches } from "@stitches/react";

export const { styled, getCssText, keyframes, globalCss } = createStitches({
  media: {
    xs: "(min-width: 320px)",
    sm: "(min-width: 375px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1200px)",
  },
  theme: {
    colors: {
      primary: "#007bff",
      secondary: "#eb501e",
      gray: "#e1e1e1",
      white: "#ffffff",
    },
    fontSizes: {
      small: "14px",
      normal: "1.1rem",
      large: "1.3rem",
    },
  },
});
const injectGlobalStyles = globalCss({});

injectGlobalStyles();
