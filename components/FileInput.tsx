import { Box, Input as CInput, Image } from "@chakra-ui/react";
import React, { useRef } from "react";
import { UseFormRegister, FieldValues, UseFormWatch } from "react-hook-form";
import { Input } from "./Input";
import { Instructions } from "./Instructions";

interface FileInputProps {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: {
    [x: string]: any;
  };
  name: string;
  label: string;
  instruction?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  register,
  watch,
  errors,
  name,
  label,
  instruction,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(name);

  return (
    <Box>
      {watch(name) && watch(name).length ? (
        <Image
          alt={name}
          src={URL.createObjectURL(watch(name)[0])}
          h={`auto`}
          w={`50%`}
          mb={`30px`}
          objectFit={`contain`}
        />
      ) : null}
      <Box pos={`relative`}>
        <CInput
          type={`file`}
          accept={`image/*`}
          pos={`absolute`}
          w={`full`}
          h={`full`}
          maxH={`60px`}
          zIndex={99}
          opacity={0}
          cursor={`pointer`}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        <CInput
          type={`button`}
          value={watch(name) && watch(name).length ? `Change` : `Select`}
          bgColor={`white`}
          border={0}
          boxShadow={`none`}
          h={`auto`}
          zIndex={100}
          display={`block`}
          pos={`absolute`}
          w={`70px`}
          color={`#178`}
          fontWeight={700}
          fontSize={`17px`}
          maxH={`55px`}
          p={`14px 50px 10px 11px`}
          right={`5px`}
          top={`2px`}
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
          onClick={() => {
            inputRef.current?.click();
          }}
        />

        <Input
          name={name}
          error={errors[name] && errors[name].message}
          label={label}
          instructions={<Instructions>{instruction}</Instructions>}
          defaultValue={
            watch(name) && watch(name).length ? watch(name)[0].name : ``
          }
          showExcl
        />
      </Box>
    </Box>
  );
};
