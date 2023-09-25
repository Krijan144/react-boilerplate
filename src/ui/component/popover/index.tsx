import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { styled, keyframes } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";

const PopoverDemo = ({ trigger, label, customCss }: any) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <IconButton css={customCss} aria-label="Update dimensions">
        {trigger}
      </IconButton>
    </Popover.Trigger>
    <Popover.Portal>
      <PopoverContent sideOffset={5}>
        <PopoverClose aria-label="Close">{label}</PopoverClose>
        <PopoverArrow />
      </PopoverContent>
    </Popover.Portal>
  </Popover.Root>
);

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const PopoverContent = styled(Popover.Content, {
  borderRadius: 4,
  width: 300,
  zIndex: "1000",
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${violet.violet7}`,
  },
});

const PopoverArrow = styled(Popover.Arrow, {
  fill: "white",
});

const PopoverClose = styled(Popover.Close, {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
});

const IconButton = styled("button", {
  cursor: "pointer",
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$primary",
  svg: {
    color: "$white",
    height: "1.5rem",
    width: "1.5rem",
  },
});

export default PopoverDemo;
