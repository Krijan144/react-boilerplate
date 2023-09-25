import React from "react";
import { styled } from "../../../theme/stitches";

interface ButtonProps {
  variant?: "primary" | "secondary";
  label: string;
  onClick?: () => void;
  icon?: JSX.Element;
  customStyle?: any;
}

const StyledButton = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  backgroundColor: "$primary",
  transition: "0.2s ease-in-out",
  "&:hover": { scale: "0.9" },
  variants: {
    variant: {
      primary: {
        background: "$primary",
      },
      secondary: {
        background: "$secondary",
      },
    },
  },
});
export const Button = ({
  variant = "primary",
  label,
  icon,
  customStyle,
}: ButtonProps) => {
  return (
    <>
      <StyledButton variant={variant} css={customStyle}>
        {label}
        {icon && icon}
      </StyledButton>
    </>
  );
};
