import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { styled } from "../../../theme/stitches";
import { violet, blackA } from "@radix-ui/colors";
import { AiOutlineCheck } from "react-icons/ai";

interface CheckBoxProps {
  label?: string;
  onChange?: () => void;
  customStyle?: any;
  value?: any;
  id: string;
}

const CheckboxRoot = styled(Checkbox.Root, {
  all: "unset",
  backgroundColor: "white",
  width: 25,
  height: 25,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  cursor: "pointer",
  "&:hover": { backgroundColor: violet.violet3 },
});

const CheckboxIndicator = styled(Checkbox.Indicator, {
  paddingTop: "5px",
  color: violet.violet11,
});

const Label = styled("label", {
  fontSize: 15,
  lineHeight: 1,
  paddingLeft: "10px",
});

const Flex = styled("div", { display: "flex", alignItems: "center" });

export const CheckBox = ({
  id,
  label = "",
  value,
  onChange,
  customStyle,
}: CheckBoxProps) => (
  <Flex>
    <CheckboxRoot
      id={id}
      value={value}
      onCheckedChange={onChange}
      css={customStyle}
    >
      <CheckboxIndicator>
        <AiOutlineCheck />
      </CheckboxIndicator>
    </CheckboxRoot>
    <Label htmlFor="c1">{label}</Label>
  </Flex>
);
