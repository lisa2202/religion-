import {
  Box,
  BoxProps,
  Link,
  ListItem,
  ListItemProps,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import React from "react";

export interface ProgressProps extends BoxProps {
  indicators: string[];
  highlight: number;
  listItemProps?: ListItemProps;
}

export const Progress: React.FC<ProgressProps> = ({
  indicators,
  highlight,
  listItemProps,
  ...props
}) => {
  return (
    <>
      <Box mt={[0, `30px`]} {...props}>
        <Text
          as={`h1`}
          fontFamily={`inherit`}
          fontWeight={700}
          lineHeight={1.1}
          color={`inherit`}
          fontSize={`38px`}
          m={`0 0 30px`}
          pos={`absolute`}
          w={`1px`}
          h={`1px`}
          p={0}
          overflow={`hidden`}
          border={0}
          style={{
            clip: `rect(0,0,0,0)`,
          }}
        >
          Enrollment Steps
        </Text>
        <OrderedList
          m={0}
          p={0}
          h={`88px`}
          fontSize={`18px`}
          borderBottom={[`2px solid #eee`, `none`]}
        >
          {indicators.map((indicator) => (
            <ListItem
              key={indicator}
              bgColor={
                indicators.indexOf(indicator) === highlight
                  ? [`#f9f9f9`, `#fff`]
                  : `#f9f9f9`
              }
              display={[
                `${
                  indicators.indexOf(indicator) === highlight ? `flex` : `none`
                }`,
                `flex`,
              ]}
              justifyContent={`center`}
              alignItems={`center`}
              h={`100%`}
              border={[`none`, `2px solid #eee`]}
              fontSize={`18px`}
              fontWeight={600}
              w={[`100%`, `${100 / indicators.length}%`]}
              float={`left`}
              lineHeight={1.5}
              position={`relative`}
              minH={`1px`}
              pl={`15px`}
              pr={`15px`}
              borderLeft={
                indicators.indexOf(indicator) > 0
                  ? `none !important`
                  : `2px solid #eee !important`
              }
              {...listItemProps}
            >
              <Text
                as={`span`}
                color={
                  indicators.indexOf(indicator) === highlight
                    ? `#fff`
                    : indicators.indexOf(indicator) < highlight
                    ? `#528400`
                    : `#767676`
                }
                bgColor={
                  indicators.indexOf(indicator) === highlight
                    ? `#528400`
                    : `#fff`
                }
                w={`30px`}
                h={`30px`}
                m={`0 15px 0 0`}
                p={`5px 0 0 0`}
                borderColor={`#528400`}
                borderRadius={`50% 50%`}
                borderWidth={`2px`}
                border={`1px solid currentColor`}
                flexShrink={0}
                display={`inline-block`}
                fontWeight={600}
                lineHeight={1}
                whiteSpace={`nowrap`}
                textAlign={`center`}
              >
                <Text
                  as={`span`}
                  position={`absolute`}
                  width={`1px`}
                  height={`1px`}
                  margin={`-1px`}
                  padding={0}
                  overflow={`hidden`}
                  border={0}
                  style={{
                    clip: `rect(0,0,0,0)`,
                  }}
                >
                  Step -{" "}
                </Text>
                {indicators.indexOf(indicator) + 1}
              </Text>
              {indicator}
            </ListItem>
          ))}
        </OrderedList>
      </Box>
      <Link
        borderColor={`transparent`}
        bgColor={`transparent`}
        boxShadow={`none`}
        textAlign={`center`}
        verticalAlign={`center`}
        cursor={`pointer`}
        bgImage={`none`}
        border={`1px solid transparent`}
        whiteSpace={`nowrap`}
        p={`8px 20px`}
        fontSize={`18px`}
        lineHeight={1.5}
        borderWidth={`2px`}
        color={`#178`}
        fontWeight={700}
        borderRadius={0}
        margin={`30px 0`}
        display={[`block`, `none`]}
        textDecor={`none`}
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
          Skip to
        </Box>
        Helpful Information
        <Box
          display={`inline-block`}
          width={0}
          height={0}
          marginLeft={`2px`}
          verticalAlign={`middle`}
          borderTop={`4px dashed`}
          borderRight={`4px solid transparent`}
          borderLeft={`4px solid transparent`}
          transform={`rotate(0)`}
          transition={`transform 250ms ease-out`}
        />
      </Link>
    </>
  );
};
