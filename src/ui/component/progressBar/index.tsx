import React from "react";
import * as Progress from "@radix-ui/react-progress";
import { styled } from "../../../theme/stitches";
import { blackA } from "@radix-ui/colors";

const ProgressRoot = styled(Progress.Root, {
  position: "relative",
  overflow: "hidden",
  background: blackA.blackA9,
  borderRadius: "99999px",
  width: 300,
  height: 25,

  // Fix overflow clipping in Safari
  // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
  transform: "translateZ(0)",
});

const ProgressIndicator = styled(Progress.Indicator, {
  backgroundColor: "$primary",
  width: "100%",
  height: "100%",
  transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
});
const ProgressDemo = ({ progress }: ProgressProps) => {
  return (
    <ProgressRoot value={progress}>
      <ProgressIndicator
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressRoot>
  );
};
interface ProgressProps {
  progress: number;
}

export default ProgressDemo;
