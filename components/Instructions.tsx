import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface InstructionsProps {
  children: React.ReactNode;
}

export const Instructions: React.FC<InstructionsProps> = ({ children }) => {
  return (
    <Box
      borderTop={`none`}
      mt={0}
      display={`block`}
      bg={`#f9f9f9`}
      color={`#333`}
      fontSize={`16px`}
      mb={0}
      p={`10px 15px`}
    >
      <Text
        as={`span`}
        mt={0}
        // position={`absolute`}
        // width={`1px`}
        // height={`1px`}
        margin={`-1px`}
        padding={0}
        overflow={`hidden`}
        border={0}
        style={{
          clip: `rect(0,0,0,0)`,
        }}
      >
        {children}
      </Text>
    </Box>
  );
};
