import { Flex } from "@chakra-ui/react";
import React from "react";
import { Button } from "./Button";

interface AltButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  children: React.ReactNode;
}

export const AltButton: React.FC<AltButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <Flex
      pos={[`sticky`, `relative`]}
      bottom={[0, `initial`]}
      zIndex={120}
      w={[`auto`, `100%`]}
      m={`15px 0 0`}
      bg={`#fff`}
      p={[`15px`, `initial`]}
      mx={[`-15px`]}
      alignItems={`center`}
      flexDir={`row-reverse`}
      _before={{
        content: `""`,
        h: `2px`,
        bg: `#eee`,
        pos: `absolute`,
        top: `-2px`,
        left: 0,
        right: 0,
      }}
    >
      <Button
        mt={0}
        m={0}
        flex={`0 0 auto`}
        color={`#fff`}
        bgColor={`#cc4e00`}
        borderColor={`#cc4e00`}
        transition={`all 150ms ease`}
        order={-1}
        whiteSpace={`normal`}
        _active={{
          bgImage: `none`,
          bgColor: `#993b00`,
          borderColor: `#993b00`,
        }}
        _hover={{
          color: `#fff`,
          bgColor: `#993b00`,
          borderColor: `#993b00`,
        }}
        _focus={{
          color: `#fff`,
          bgColor: `#993b00`,
          borderColor: `#000`,
          outline: `#1d8795 solid 2px`,
          outlineOffset: `2px`,
          textDecor: `none`,
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </Flex>
  );
};
