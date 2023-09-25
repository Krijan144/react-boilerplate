import React from "react";
import * as StyledTooltip from "@radix-ui/react-tooltip";
import { styled, keyframes } from "../../../theme/stitches";
import { violet, blackA } from "@radix-ui/colors";
import { PlusIcon } from "@radix-ui/react-icons";

interface TooltipProps {
  content?: any;
  label?: any;
}
const Tooltip = ({ content, label }: TooltipProps) => {
  return (
    <StyledTooltip.Provider delayDuration={200}>
      <StyledTooltip.Root>
        <StyledTooltip.Trigger asChild>
          {content || <PlusIcon />}
        </StyledTooltip.Trigger>
        <StyledTooltip.Portal>
          <TooltipContent sideOffset={5} data-side="right">
            {label}
            <TooltipArrow />
          </TooltipContent>
        </StyledTooltip.Portal>
      </StyledTooltip.Root>
    </StyledTooltip.Provider>
  );
};

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

const TooltipContent = styled(StyledTooltip.Content, {
  borderRadius: 4,
  padding: "10px 15px",
  fontSize: 15,
  lineHeight: 1,
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  userSelect: "none",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  // overflowY: "auto",
  // maxHeight: 200,
  // "&::-webkit-scrollbar-track": {
  //   boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
  //   borderRadius: 10,
  //   backgroundColor: "#f5f5f5",
  // },
  // "&::-webkit-scrollbar": {
  //   width: 5,
  //   height: 5,
  //   backgroundColor: "#f5f5f5",
  // },
  // "&::-webkit-scrollbar-thumb": {
  //   borderRadius: 10,
  //   boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
  //   backgroundColor: "rgba(209,210,211,0.45)",
  // },
  // '&[data-state="delayed-open"]': {
  //   '&[data-side="top"]': { animationName: slideDownAndFade },
  //   '&[data-side="right"]': { animationName: slideLeftAndFade },
  //   '&[data-side="bottom"]': { animationName: slideUpAndFade },
  //   '&[data-side="left"]': { animationName: slideRightAndFade },
  // },
});

const TooltipArrow = styled(StyledTooltip.Arrow, {
  fill: "white",
});

export default Tooltip;
