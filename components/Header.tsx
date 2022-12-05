import { Box, Flex, Link, Image } from "@chakra-ui/react";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Flex
      as={`header`}
      h={`90px`}
      maxW={`100%`}
      w={`100%`}
      alignItems={`center`}
      borderBottom={`2px solid #eeeeee`}
      flexWrap={`wrap`}
      fontFamily={`"Source Sans Pro", sans-serif`}
      justifyContent={`space-between`}
      m={`0 auto`}
      pos={`relative`}
      textAlign={[`center`, `initial`]}
    >
      <Box
        maxW={`1366px`}
        w={[`initial`, `1370px`]}
        px={`30px`}
        mx={`auto`}
        _before={{
          content: `" "`,
          display: `table`,
        }}
        _after={{
          clear: `both`,
          content: `" "`,
          display: `table`,
        }}
      >
        <Link
          display={`inline-block`}
          p={0}
          verticalAlign={`middle`}
          h={[`58px`, `68px`]}
          alignSelf={`flex-end`}
          lineHeight={`36px`}
          order={1}
          color={`#178`}
          textDecor={`none`}
          bgColor={`transparent`}
        >
          <Box
            as={`picture`}
            pos={`relative`}
            top={`16px`}
            display={`block`}
            h={`36px`}
            w={`181px`}
          >
            <Box
              as={`source`}
              srcSet={`/images/logo.svg`}
              media={`(max-width: 600px)`}
            />
            <Image
              src={`/images/logo.svg`}
              alt={`regions logo`}
              verticalAlign={`middle`}
              border={0}
            />
          </Box>
        </Link>
      </Box>
    </Flex>
  );
};
