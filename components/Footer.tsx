import {
  Box,
  Link,
  ListItem,
  UnorderedList,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      as={`footer`}
      borderTop={`2px solid #eee`}
      p={`30px 0px 0px`}
      textAlign={`center`}
    >
      <Box
        w={[`initial`, `1370px`]}
        px={[`15px`, `30px`]}
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
        <UnorderedList
          listStyleType={`none`}
          m={`0px 0px 13.5px`}
          mb={`30px`}
          p={0}
          color={`#767676`}
          fontSize={`14px`}
        >
          {[
            `Contact Us`,
            `Terms and Conditions`,
            `Privacy Pledge`,
            `Security`,
            `Online Tracking and Advertising`,
            `Accessible Banking`,
            `Leave Feedback`,
          ].map((item) => {
            return (
              <ListItem
                key={item}
                display={`inline-block`}
                m={`5px 10px`}
                mb={[`15px`, `5px`]}
                lineHeight={1.5}
              >
                <Link
                  color={`#178`}
                  textDecor={`none`}
                  outline={0}
                  outlineOffset={0}
                  _focus={{
                    outline: 0,
                  }}
                  _hover={{
                    outline: 0,
                    color: `#083b44`,
                    textDecor: `underline`,
                  }}
                >
                  {item}
                </Link>
              </ListItem>
            );
          })}
        </UnorderedList>
        <Text
          color={`#767676`}
          fontSize={`14px`}
          lineHeight={1.5}
          m={`0px 0px 13.5px`}
        >
          Call{" "}
          <Link
            color={`#178`}
            textDecor={`underline`}
            _focus={{
              outline: 0,
            }}
            _hover={{
              outline: 0,
              color: `#083b44`,
              textDecor: `underline`,
            }}
          >
            1-800-REGIONS
          </Link>
        </Text>
        <Text
          color={`#767676`}
          fontSize={`14px`}
          lineHeight={1.5}
          m={`0px 0px 13.5px`}
        >
          Regions, the Regions logo, the LifeGreen color, and the LifeGreen bike
          are registered trademarks of Regions Bank.
        </Text>
        <Text
          color={`#767676`}
          fontSize={`14px`}
          lineHeight={1.5}
          m={`0px 0px 13.5px`}
        >
          © 2022 Regions Bank. All Rights Reserved.
        </Text>
        <Box display={`inline-block`}>
          <Image
            src={`/images/equal-housing-lender.svg`}
            alt={`Equal Housing Lender`}
            h={`30px`}
            m={`10px`}
            opacity={0.7}
            verticalAlign={`middle`}
            display={`initial`}
          />
          <Image
            src={`/images/member-fdic.svg`}
            alt={`Member FDIC`}
            h={`30px`}
            m={`10px`}
            opacity={0.7}
            verticalAlign={`middle`}
            display={`initial`}
          />
        </Box>
      </Box>
    </Box>
  );
};
