import React, { useRef, useState } from "react";
import { Checkbox as CCheckbox, Input, Text } from "@chakra-ui/react";

interface CheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = ({}) => {
  const [check, setCheck] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Input
        type={`checkbox`}
        w={`30px`}
        h={`30px`}
        zIndex={20}
        pos={`absolute`}
        lineHeight={`normal`}
        m={`7px 0px 0px`}
        mt={0}
        p={0}
        opacity={0}
        bgImage={`none`}
        listStyleType={`inherit`}
        cursor={`pointer`}
        ref={inputRef}
        style={{
          content: `normal`,
        }}
        onBlur={() => {
          setIsInputFocus(false);
        }}
        onClick={() => {
          setCheck(!check);
          setIsInputFocus(!isInputFocus);
        }}
      />
      <Text
        as={`label`}
        pos={`relative`}
        pl={`4rem`}
        color={`#178`}
        display={`inline-block`}
        fontWeight={`bold`}
        mb={`5px`}
        maxW={`100%`}
        bgImage={`none`}
        listStyleType={`inherit`}
        cursor={`pointer`}
        onClick={() => {
          setIsInputFocus(!isInputFocus);
          if (inputRef && inputRef.current) inputRef.current.click();
        }}
        _before={{
          bg: `white`,
          border: `2px solid #ccc`,
          borderRadius: `4px`,
          content: `""`,
          h: `30px`,
          left: 0,
          pos: `absolute`,
          top: 0,
          w: `30px`,
          ...(check && isInputFocus
            ? {
                border: `2px solid #8b0`,
                outline: `thin dotted black`,
              }
            : {}),
        }}
        _after={{
          opacity: 0,
          transform: `rotate(45deg) scale(0)`,
          transition: `all 0.2s ease`,
          ...(check
            ? {
                opacity: 1,
                transform: `rotate(45deg) scale(1)`,
                border: `solid #8b0`,
                borderWidth: `0px 5px 5px 0px`,
                bgColor: `white`,
                borderRadius: 0,
                content: `""`,
                h: `20px`,
                left: `10px`,
                pos: `absolute`,
                top: `3px`,
                w: `10px`,
              }
            : {}),
        }}
        style={{
          content: `normal`,
        }}
      >
        Remember my username
      </Text>
    </>
  );
};
