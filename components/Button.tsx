import React from "react";
import {
  Button as CButton,
  ButtonProps as CButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends CButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <CButton
      w={[`100%`, `initial`]}
      border={`1px solid transparent`}
      borderRadius={`2px`}
      borderWidth={`2px`}
      fontSize={`23px`}
      lineHeight={1.3333333}
      p={`10px 20px`}
      bgColor={`#528400`}
      borderColor={`#528400`}
      color={`#fff`}
      transition={`all 150ms ease`}
      textTransform={`none`}
      overflow={`visible`}
      mb={0}
      m={[`10% 0 10% 0`, 0]}
      bgImage={`none`}
      cursor={`pointer`}
      display={`inline-block`}
      fontWeight={700}
      textAlign={`center`}
      verticalAlign={`middle`}
      whiteSpace={`nowrap`}
      h={`auto`}
      _active={{
        bgImage: `none`,
        bgColor: `#325100`,
        borderColor: `#325100`,
        color: `#fff`,
        outline: `none`,
      }}
      _hover={{
        bgColor: `#325100`,
        borderColor: `#325100`,
        color: `#fff`,
      }}
      _focus={{
        bgImage: `none`,
        bgColor: `#325100`,
        borderColor: `#325100`,
        color: `#fff`,
        outline: `thin dotted black`,
        outlineOffset: `2px`,
      }}
      _disabled={{
        cursor: `not-allowed`,
        bgColor: `white`,
        borderColor: `#eee`,
        color: `#767676`,
        transition: `all 150ms ease`,
        _hover: {
          cursor: `not-allowed`,
          bgColor: `white`,
          borderColor: `#eee`,
          color: `#767676`,
          transition: `all 150ms ease`,
        },
      }}
      style={{
        touchAction: `manipulation`,
        userSelect: `none`,
        WebkitAppearance: `button`,
      }}
      {...props}
    >
      {children}
    </CButton>
  );
};
