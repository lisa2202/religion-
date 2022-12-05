import {
  Box,
  Text,
  Input as CInput,
  InputProps as CInputProps,
  BoxProps,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface InputProps extends CInputProps {
  label: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined;
  wapperProps?: BoxProps;
  instructions?: React.ReactNode;
  showExcl?: boolean;
  registerOptions?: any;
  mask?: string;
  maskChar?: string;
  alwaysShowMask?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  wapperProps,
  instructions,
  showExcl = true,
  register = (name: string) => ({}),
  name,
  registerOptions,
  ...props
}) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [input, setInput] = useState(props.defaultValue || ``);
  const [showText, setShowText] = useState(true);
  return (
    <Box
      border={
        isInputFocus && !input && !error
          ? `2px solid #8b0`
          : error
          ? `2px solid #cc2233`
          : `2px solid #ccc`
      }
      outline={isInputFocus && !input ? `thin dotted black` : `none`}
      outlineOffset={isInputFocus ? `2px` : 0}
      borderRadius={`2px`}
      color={`#767676`}
      display={`block`}
      minH={`40px`}
      pos={`relative`}
      m={`0px auto 30px`}
      bgImage={`none`}
      listStyleType={`inherit`}
      cursor={`auto`}
      style={{
        content: `normal`,
      }}
      {...wapperProps}
    >
      <Text
        as={`label`}
        fontWeight={`normal`}
        color={error ? `#cc2233` : `#767676`}
        left={`15px`}
        m={0}
        pr={`30px`}
        pos={`absolute`}
        top={`-7px`}
        transform={
          isInputFocus || input
            ? `translate3d(0, 0.5em, 0) scale3d(0.8, 0.8, 1)`
            : `perspective(30em) translate3d(0, 1.1em, 0)`
        }
        transformOrigin={`left center`}
        transition={`transform 200ms ease-out`}
        display={`inline-block`}
        _after={{
          bgColor: error ? `#cc2233` : `#8b0`,
          borderRadius: `50% 50%`,
          content: `""`,
          display: `inline-block`,
          h: `5px`,
          w: `5px`,
          pos: `relative`,
          right: `-0.5em`,
          top: `-0.5em`,
        }}
      >
        {label}
      </Text>
      <CInput
        maxH={`67px`}
        p={`22px 15px 3px`}
        pt={`27px`}
        bgColor={`transparent`}
        border={0}
        boxShadow={`none`}
        h={`auto`}
        w={`100%`}
        zIndex={10}
        borderRadius={`2px`}
        color={`#333`}
        display={`block`}
        fontSize={`18px`}
        lineHeight={1.5}
        transition={`border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s`}
        fontFamily={`inherit`}
        m={0}
        bgImage={`none`}
        listStyleType={`inherit`}
        cursor={`auto`}
        _focus={{
          boxShadow: `none`,
          outline: `none`,
        }}
        style={{
          WebkitAppearance: `none`,
          content: `normal`,
        }}
        onFocus={() => {
          setInput(``);
          setIsInputFocus(true);
        }}
        {...props}
        type={!showText ? `text` : props.type}
        {...register(name, {
          onBlur: (e) => {
            setInput(e.target.value);
            setIsInputFocus(false);
          },
          ...registerOptions,
        })}
      />
      {props.type === `password` ? (
        <CInput
          type={`button`}
          value={showText ? `Show` : `Hide`}
          bgColor={`white`}
          border={0}
          boxShadow={`none`}
          h={`auto`}
          zIndex={10}
          display={`block`}
          pos={`absolute`}
          w={`20px`}
          color={`#178`}
          fontWeight={700}
          fontSize={`17px`}
          maxH={`55px`}
          p={`14px 50px 10px 11px`}
          right={`1px`}
          top={`1px`}
          bgImage={`none`}
          listStyleType={`inherit`}
          cursor={`auto`}
          borderRadius={0}
          minH={`initial`}
          style={{
            content: `normal`,
          }}
          _hover={{}}
          _active={{}}
          _focus={{
            boxShadow: `none`,
            outlineOffset: `2px`,
            outline: `black dotted thin`,
            border: `2px solid #117788`,
          }}
          onClick={() => setShowText(!showText)}
        />
      ) : null}
      {error && (
        <Box
          display={`flex`}
          alignItems={`center`}
          w={`100%`}
          bg={`#cc2233`}
          bgImage={`none`}
          listStyleType={`inherit`}
          cursor={`auto`}
          style={{
            content: `normal`,
          }}
        >
          <Text
            color={`white`}
            flex={`1 1 auto`}
            m={0}
            p={`10px 15px`}
            display={`block`}
            fontSize={`18px`}
            lineHeight={1.5}
          >
            {error as unknown as string}
          </Text>
        </Box>
      )}
      {instructions && error ? instructions : null}
      {showExcl && error ? (
        <Box
          as={`span`}
          color={`#c23`}
          pos={`absolute`}
          top={`5px`}
          right={0}
          zIndex={5}
          display={`block`}
          w={`45px`}
          h={`45px`}
          lineHeight={`45px`}
          textAlign={`center`}
          pointerEvents={`none`}
          fontFamily={`'Glyphicons Halflings'`}
          fontStyle={`normal`}
          fontWeight={400}
          _before={{
            content: `"\\e101"`,
          }}
          style={{
            WebkitFontSmoothing: `antialiased`,
            WebkitTapHighlightColor: `transparent`,
          }}
        ></Box>
      ) : null}
    </Box>
  );
};
