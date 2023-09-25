import React from "react";

import { setValue } from "@/store/input/slice";

import { useDispatch } from "react-redux";

import * as Label from "@radix-ui/react-label";
import { styled } from "../../../theme/stitches";
import { blackA } from "@radix-ui/colors";

interface InputProps {
  label?: string;
  onChange?: () => void;
  customStyle?: any;
  value?: any;
  id?: string;
  type?: string;
  placeholder?: string;
  name?: string;
}

const Flex = styled("div", { display: "flex" });

export const Input = ({
  id,
  label = "",
  value,
  name = "",
  onChange,
  customStyle,
  placeholder = "Aa",
  type = "text",
}: InputProps) => {
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    dispatch(setValue({ inputName, inputValue }));
  };
  return (
    <Flex
      css={{
        padding: "0 10px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
        marginBottom: 14,
      }}
    >
      <LabelRoot htmlFor="firstName">{label}</LabelRoot>
      <StyledInput
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue=""
        id={id}
        value={value}
        onChange={handleChange}
        css={customStyle}
      />
    </Flex>
  );
};
const LabelRoot = styled(Label.Root, {
  fontSize: 15,
  lineHeight: "35px",
});

const StyledInput = styled("input", {
  all: "unset",
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  backgroundColor: blackA.blackA5,
  "&:focus": { boxShadow: `rgba(0,123,255,0.2) 0px 4px 12px` },
});
