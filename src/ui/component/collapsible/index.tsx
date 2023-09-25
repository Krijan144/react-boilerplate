import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { styled } from "@stitches/react";

const CollapsibleDemo = ({
  trigger,
  label,
  primary = false,
  open = false,
}: any) => {
  return (
    <CollapsibleRoot open={open}>
      <Collapsible.Trigger asChild>{trigger}</Collapsible.Trigger>

      <Collapsible.Content>
        <Repository variant={primary && "primary"}>{label}</Repository>
      </Collapsible.Content>
    </CollapsibleRoot>
  );
};

const CollapsibleRoot = styled(Collapsible.Root, {});

const IconButton = styled("div", {});

const Repository = styled("div", {
  padding: 10,
  color: "gray",
  marginTop: "-10px",
  transition: "0.3s ease-in-out",
  variants: {
    variant: {
      primary: {
        float: "right",
      },
    },
  },
});

export default CollapsibleDemo;
