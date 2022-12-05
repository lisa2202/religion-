import { Box, BoxProps, Button } from "@chakra-ui/react";
import React from "react";

interface ErrorProps extends BoxProps {
  message: string | undefined;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Error: React.FC<ErrorProps> = ({
  message,
  setShowError,
  ...props
}) => {
  return (
    <>
      {message ? (
        <Box
          w={`100%`}
          float={`left`}
          position={`relative`}
          minH={`1px`}
          pl={`15px`}
          pr={`15px`}
          {...props}
        >
          <Box
            display={`block`}
            bgColor={`#cc2233`}
            borderColor={`#a01b28`}
            color={`white`}
            border={`2px solid transparent`}
            borderRadius={`2px`}
            boxShadow={`0 2px 30px rgb(0 0 0 / 10%)`}
            marginBottom={`27px`}
            p={`15px`}
          >
            <Box
              position={`absolute`}
              width={`1px`}
              height={`1px`}
              margin={`-1px`}
              padding={0}
              overflow={`hidden`}
              border={0}
              style={{
                clip: `rect(0, 0, 0, 0)`,
              }}
            >
              Login error status:
            </Box>
            <Box>{message}</Box>
            <Button
              variant={`unstyled`}
              color={`#FFFFFF`}
              top={`1%`}
              right={`2%`}
              position={`absolute`}
              float={`right`}
              bg={`0`}
              border={0}
              fontSize={`15px`}
              display={`block`}
              cursor={`pointer`}
              fontWeight={`bold`}
              fontFamily={`inherit`}
              m={0}
              overflow={`visible`}
              textTransform={`none`}
              lineHeight={`inherit`}
              onClick={() => setShowError(false)}
              _hover={{}}
              _focus={{}}
              _active={{}}
              style={{
                WebkitAppearance: `button`,
              }}
            >
              X
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
};
