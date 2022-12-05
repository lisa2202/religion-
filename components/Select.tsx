import React, { useState } from "react";
import {
  BoxProps,
  Select as CSelect,
  Text,
  SelectProps as CSelectProps,
  Box,
} from "@chakra-ui/react";
import {
  UseFormRegister,
  FieldValues,
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface SelectProps extends CSelectProps {
  label: string;
  name: string;
  options: string[];
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

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  wapperProps,
  instructions,
  showExcl = true,
  register = (name: string) => ({}),
  name,
  registerOptions,
  options,
  ...props
}) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [input, setInput] = useState(props.defaultValue || ``);
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
      <CSelect
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
        {...register(name, {
          onBlur: (e) => {
            setInput(e.target.value);
            setIsInputFocus(false);
          },
          ...registerOptions,
        })}
        iconColor={`#ccc`}
        iconSize={`20px`}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </CSelect>
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
          right={`10px`}
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
