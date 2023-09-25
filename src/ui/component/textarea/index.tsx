import React, { useCallback } from "react";

import { setValue } from "@/store/input/slice";
import { setSubmitValue } from "@/store/submit/slice";

import { useDispatch } from "react-redux";

import * as Label from "@radix-ui/react-label";
import { styled } from "../../../theme/stitches";
import { BsFillSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
interface TextareaProps {
  label?: string;
  onChange?: () => void;
  customStyle?: any;
  value?: any;
  id?: string;
  button?: Boolean;
  onSubmit?: any;
  name?: string;
}
const LabelRoot = styled(Label.Root, {
  fontSize: 15,
  lineHeight: "35px",
});

const StyledTextarea = styled("textarea", {
  padding: "1rem",
  transition: "0.5s",
  "&:focus": {
    outline: "none",
  },
  borderRadius: "20px",
  background: "#F0F2F5",
  border: "none",
  resize: "none",
});
const Flex = styled("div", {
  display: "flex",
  position: "relative",
  width: "inherit",
});
const Icon = styled("div", {
  position: "absolute",
  right: 20,
  transition: "0.3s",
  "&:hover": {
    opacity: "0.8",
  },
});
export const Textarea = ({
  id,
  label = "",
  value,
  name,
  onSubmit,
  customStyle,
  button = false,
}: TextareaProps) => {
  const dispatch = useDispatch();
  const handleChange = useCallback(
    (e: any) => {
      const inputValue = e.target.value;
      const inputName = e.target.name;
      dispatch(setValue({ inputName, inputValue }));
    },
    [dispatch]
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (e.shiftKey) {
      const inputValue = `${e.target.value + "\n"}`;
      const inputName = e.target.name;
      dispatch(setValue({ inputName, inputValue }));
    } else {
      const submitValue = true;
      const submitName = "text";
      dispatch(setSubmitValue({ submitName, submitValue }));
    }
  };
  return (
    <Flex>
      {label && <LabelRoot htmlFor={label}>{label}</LabelRoot>}
      <StyledTextarea
        defaultValue=""
        placeholder="Aa"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={(evt) => evt.key === "Enter" && handleSubmit(evt)}
        css={customStyle}
      ></StyledTextarea>
      {/* <EmojiPicker
        onEmojiClick={(e) => {
          dispatch(
            setValue({ inputName: "text", inputValue: value + e.emoji })
          );
        }}
      /> */}

      {button && (
        <Icon onClick={handleSubmit}>
          <BsFillSendFill />
        </Icon>
      )}
    </Flex>
  );
};
