import {
  Box,
  BoxProps,
  Link,
  ListItem,
  ListItemProps,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Progress } from "./Progress";

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  showTitle?: boolean;
  progress?: string[];
  highlight?: number;
  showSide?: boolean;
  listItemProps?: ListItemProps
}

export const Container: React.FC<ContainerProps> = ({
  children,
  showTitle,
  progress,
  highlight,
  showSide,
  listItemProps,
  ...props
}) => {
  return (
    <>
      {showTitle ? (
        <Box as={`header`} p={`15px 0`} bg={`#528400`} color={`#fff`}>
          <Box
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
            <Box>
              <Box as={`section`} m={0} display={`block`}>
                <Text
                  as={`h1`}
                  fontSize={[`18px`, `31px`]}
                  m={0}
                  fontWeight={700}
                  lineHeight={1.1}
                >
                  Verify Your Information.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}

      <Box>
        <Box bg={`#f9f9f9`} minH={`300px`}>
          <Box
            w={[`initial`, `1370px`]}
            px={[0, `30px`]}
            mx={`auto`}
            mt={[0, `initial`]}
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
            {progress && typeof highlight === `number` ? (
              <Progress
                // px={`60px`}
                indicators={progress}
                highlight={highlight}
                listItemProps={listItemProps}
              />
            ) : null}
            <Box
              display={`block`}
              bgColor={`white`}
              border={`2px solid #eee`}
              borderLeft={[0, `2px solid #eee`]}
              borderRight={[0, `2px solid #eee`]}
              borderRadius={`2px`}
              boxShadow={[`none`, `0 4px 10px rgb(0 0 0 / 3%)`]}
              alignItems={`center`}
              justifyContent={`space-between`}
              m={[`30px auto`, `50px auto`]}
              maxW={`1200px`}
              p={[`30px 15px 0px`, `60px 90px`]}
              w={[`initial`, `1370px`]}
              _before={{
                content: `" "`,
                display: `table`,
              }}
              _after={{
                clear: `both`,
                content: `" "`,
                display: `table`,
              }}
              {...props}
            >
              {children}
              {showSide ? (
                <Box
                  as={`aside`}
                  flex={`0 0 360px`}
                  p={`30px`}
                  bg={`#f9f9f9`}
                  display={`block`}
                  alignSelf={`flex-start`}
                  flexGrow={[1, `initial`]}
                  flexShrink={[1, `initial`]}
                >
                  <Text
                    as={`h2`}
                    mt={0}
                    fontFamily={`inherit`}
                    fontWeight={700}
                    lineHeight={1.1}
                    color={`inherit`}
                    mb={`13.5px`}
                    fontSize={`18px`}
                  >
                    Need Help?
                  </Text>
                  <Text
                    as={`p`}
                    m={`0 0 13.5px`}
                    mb={`30px`}
                    lineHeight={1.5}
                    fontSize={`18px`}
                  >
                    {`Call `}
                    <Link>1-800-240-7887</Link>
                    {` with questions or to open an account.`}
                  </Text>
                  <Text
                    as={`h3`}
                    mt={`27px`}
                    fontFamily={`inherit`}
                    fontWeight={700}
                    lineHeight={1.1}
                    color={`inherit`}
                    mb={`13.5px`}
                    fontSize={`18px`}
                  >
                    FAQs
                  </Text>
                  <UnorderedList
                    fontSize={`18px`}
                    margin={`0 0 13.5px`}
                    pl={[0, `1em`]}
                  >
                    {[
                      `What information do I need to enroll?`,
                      `Is Regions Online Banking secure?`,
                      `When is the Online Banking system available?`,
                      `View all FAQs`,
                    ].map((item) => (
                      <ListItem
                        key={item}
                        listStyleType={`none`}
                        m={`0 0 13.5px`}
                        lineHeight={1.5}
                      >
                        <Link
                          color={`#178`}
                          textDecor={`none`}
                          _active={{
                            outline: `none`,
                          }}
                          _focus={{
                            outline: `thin dotted #000`,
                            outlineOffset: `2px`,
                            color: `#083b44`,
                            textDecor: `underline`,
                          }}
                          _hover={{
                            color: `#083b44`,
                            textDecor: `underline`,
                          }}
                        >
                          {item}
                        </Link>
                      </ListItem>
                    ))}
                  </UnorderedList>
                  <Link
                    href={`#top`}
                    color={`#178`}
                    bgColor={`white`}
                    borderColor={`#eee`}
                    transition={`all 150ms ease`}
                    textDecor={`none`}
                    m={`30px 0 0`}
                    boxShadow={`none`}
                    textAlign={`center`}
                    verticalAlign={`middle`}
                    cursor={`pointer`}
                    bgImage={`none`}
                    border={`1px solid transparent`}
                    whiteSpace={`nowrap`}
                    p={`8px 20px`}
                    fontSize={`18px`}
                    lineHeight={1.5}
                    borderWidth={`2px`}
                    fontWeight={700}
                    borderRadius={0}
                    display={`none`}
                    style={{
                      touchAction: `manipulation`,
                      userSelect: `none`,
                    }}
                  >
                    Back to Top
                  </Link>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
