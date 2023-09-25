import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { styled } from "../../../theme/stitches";
import { violet, blackA } from "@radix-ui/colors";

interface ItemProp {
  id: string;
  name: string;
  value: string;
}
interface RadioProp {
  data?: Array<ItemProp>;
  onChange?: () => void;
}

const Radio = ({ data, onChange }: RadioProp) => (
  <form>
    <RadioGroupRoot
      defaultValue="default"
      aria-label="View density"
      onChange={onChange}
    >
      {data?.map((item: ItemProp, index) => (
        <React.Fragment key={index}>
          <Flex css={{ alignItems: "center" }}>
            <RadioGroupItem value={item?.value} id={item?.id}>
              <RadioGroupIndicator />
            </RadioGroupItem>
            <Label htmlFor={item?.id}>{item?.name}</Label>
          </Flex>
        </React.Fragment>
      ))}
    </RadioGroupRoot>
  </form>
);

const RadioGroupRoot = styled(RadioGroup.Root, {
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const RadioGroupItem = styled(RadioGroup.Item, {
  all: "unset",
  backgroundColor: "white",
  cursor: "pointer",
  width: 25,
  height: 25,
  borderRadius: "100%",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: violet.violet3 },
});

const RadioGroupIndicator = styled(RadioGroup.Indicator, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "$primary",
  },
});

const Flex = styled("div", { display: "flex" });

const Label = styled("label", {
  fontSize: 15,
  lineHeight: 1,
  paddingLeft: 15,
});

export default Radio;
