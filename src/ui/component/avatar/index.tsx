import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { styled } from "../../../theme/stitches";
import { violet, blackA } from "@radix-ui/colors";
import { shortName } from "@/utils";
import Tooltip from "../tooltip";

interface AvatarProp {
  id?: string;
  image?: string;
  fallbackText?: string;
  variant?: "sm" | "md";
  fallbackStyle?: object;
  number?: boolean;
  allUsers?: any[];
}
const AvatarDemo = ({
  id,
  allUsers = [],
  number = false,
  image,
  fallbackText,
  variant = "md",
  fallbackStyle,
}: AvatarProp) => {
  const name = fallbackText && shortName(fallbackText);
  return (
    <>
      <Flex css={{ gap: 20 }}>
        <Tooltip
          content={
            <AvatarRoot variant={variant}>
              <AvatarImage src={image} alt="" />
              <AvatarFallback
                style={fallbackStyle}
                variant={variant}
                delayMs={200}
              >
                {number ? fallbackText : name}
              </AvatarFallback>
            </AvatarRoot>
          }
          label={
            allUsers.length
              ? allUsers.map((item: any) => {
                  return <p>{item}</p>;
                })
              : fallbackText
          }
        />
      </Flex>
    </>
  );
};

const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 45,
  height: 45,
  borderRadius: "100%",
  backgroundColor: blackA.blackA3,
  border: "1px solid $white",
  position: "relative", // Add this line to make the tooltip positioning relative
  cursor: "pointer",
  variants: {
    variant: {
      sm: {
        width: 30,
        height: 30,
      },
      md: {
        width: 45,
        height: 45,
      },
    },
  },
});

const AvatarImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$primary",
  color: "$white",
  fontSize: 15,
  lineHeight: 1,

  variants: {
    variant: {
      sm: {
        fontSize: 13,
        fontWeight: 300,
        lineHeight: 10,
      },
      md: {
        fontSize: 15,
      },
    },
  },
});

const Flex = styled("div", { display: "flex" });

export default AvatarDemo;
