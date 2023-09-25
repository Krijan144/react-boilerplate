import { styled } from "../../../theme/stitches";
import React, { useRef, useEffect } from "react";
import AvatarDemo from "../avatar";

interface TextProps {
  message?: string;
  primary?: boolean;
  fallback?: string | undefined;
  date?: string;
  id?: string;
  setID: (e: string | undefined) => void;
}

const TextBox = ({
  message,
  primary,
  fallback,
  date,
  setID,
  id,
}: TextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Explicitly type containerRef

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setID("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledContent variant={primary && "primary"}>
      {!primary && <AvatarDemo variant="sm" fallbackText={fallback} />}
      {primary && <StyledDate variant="primary">{date}</StyledDate>}
      <StyledContainer
        ref={containerRef}
        variant={primary && "primary"}
        onClick={() => setID(id)}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
          e.stopPropagation()
        } // Explicitly type e as React.MouseEvent<HTMLDivElement>
      >
        {message}
      </StyledContainer>
      {!primary && (
        <StyledDate variant={primary && "primary"}>{date}</StyledDate>
      )}
    </StyledContent>
  );
};
export default TextBox;
const StyledDate = styled("span", {
  color: "gray",
  fontSize: "$small",
  paddingTop: 10,
  whiteSpace: "nowrap",
  display: "flex",
  flexFlow: "reverse",
  variants: {
    variant: {
      primary: {
        flexFlow: "row-reverse",
      },
    },
  },
});
const StyledContainer = styled("div", {
  padding: 10,
  backgroundColor: "$white",
  borderRadius: 5,
  marginBottom: 10,
  float: "left",
  maxWidth: 400,
  position: "relative",
  borderBottomLeftRadius: 0,
  borderTopRightRadius: 8,
  cursor: "pointer",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0",
  whiteSpace: "pre-line",
  variants: {
    variant: {
      primary: {
        background: "$primary",
        color: "$white",
        float: "right",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 8,
      },
    },
  },
});
const StyledContent = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "start",
  gap: 10,

  variants: {
    variant: {
      primary: {
        justifyContent: "end",
      },
    },
  },
});
