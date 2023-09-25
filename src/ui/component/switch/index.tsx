import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { styled } from "../../../theme/stitches";
import { blackA } from "@radix-ui/colors";

interface SwitchProp {
  label?: string;
  value?: string;
  id?: string;
  onChange?: () => void;
}
const SwitchRoot = styled(Switch.Root, {
  all: "unset",
  width: 42,
  height: 25,
  cursor: "pointer",
  backgroundColor: blackA.blackA9,
  borderRadius: "9999px",
  position: "relative",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  '&[data-state="checked"]': { backgroundColor: "$primary" },
});

const SwitchThumb = styled(Switch.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  cursor: "pointer",
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: `0 2px 2px ${blackA.blackA7}`,
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': { transform: "translateX(19px)" },
});

export const Flex = styled("div", { display: "flex" });
const Label = styled("label", {
  fontSize: 15,
  lineHeight: 1,
});
export const Switchs = ({ label, onChange, id }: SwitchProp) => (
  <form>
    <Flex css={{ alignItems: "center" }}>
      <Label css={{ paddingRight: 15 }}>{label && label}</Label>
      <SwitchRoot id={id} onChange={onChange}>
        <SwitchThumb />
      </SwitchRoot>
    </Flex>
  </form>
);
