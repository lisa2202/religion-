import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Box,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { DataContext } from "../pages/_app";
import { dataURItoBlob } from "../utils/dataURItoBlob";
import { Button } from "./Button";

interface SelfieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelfieModal: React.FC<SelfieModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: datas, setData } = useContext(DataContext);

  const { push } = useRouter();

  const [imageSrc, setImageSrc] = useState(``);
  const [timer, setTimer] = useState(4);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null) as any;

  const capture = useCallback(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setImageSrc(
            webcamRef.current ? webcamRef.current.getScreenshot() : ``
          );
          setTimer(4);
          clearInterval(interval);
        }
        return prevTimer - 1;
      });
    }, 1000);
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`selfie`, dataURItoBlob(imageSrc));
    formData.append(`form`, `SELFIE`);

    await axios.post(`/api/send-selfie`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    setLoading(false);
    setData({
      ...datas,
      selfie: imageSrc,
    });
    push(`/customerservice/confirmation`);
  };
  const cancelRef = React.useRef() as React.RefObject<any>;
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
      size={`full`}
      motionPreset={`slideInBottom`}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          p={[`20px`, `50px`]}
          pos={`relative`}
          zIndex={130}
          alignItems={`center`}
          justifyContent={`center`}
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
              Take a selfie, please provide the following required information:
            </Text>
            <Box>
              <Box w={[`100%`, `400px`]}>
                <Box
                  display={`flex`}
                  justifyContent={`center`}
                  alignItems={`center`}
                  flexDirection={`row`}
                  height={`100%`}
                  width={`100%`}
                  className={`selfie_wrapper`}
                >
                  {imageSrc ? (
                    <Image alt="selfie" src={imageSrc} />
                  ) : (
                    <Webcam
                      audio={false}
                      height={`100%`}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={`100%`}
                      videoConstraints={{
                        facingMode: `user`,
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box w={[`100%`, `33.3%`]}>
                <Text fontSize={`11px`} my={`30px`}>
                  Please make sure both ears and your all face is showing in the
                  picture. This will help ensure we can verify your identity as
                  quickly and accurately as possible.
                </Text>
                <>
                  {timer < 4 && !imageSrc ? (
                    <Box
                      display={`flex`}
                      alignItems={`center`}
                      justifyContent={`center`}
                      w={`full`}
                    >
                      <Box
                        display={`flex`}
                        width={`50px`}
                        height={`50px`}
                        borderRadius={`100%`}
                        border={`1px solid #666`}
                        fontWeight={`bold`}
                        fontSize={`24px`}
                        alignItems={`center`}
                        justifyContent={`center`}
                        color={`#666`}
                      >
                        {timer}
                      </Box>
                    </Box>
                  ) : (
                    <>
                      {imageSrc ? (
                        <Box
                          display={`flex`}
                          flexDirection={`column`}
                          width={`100%`}
                          justifyContent={`center`}
                        >
                          <Button disabled={loading} onClick={onSubmit}>
                            Continue
                          </Button>
                          <Button
                            onClick={() => setImageSrc(``)}
                            w={`100%`}
                            bgColor={`transparent`}
                            my={`10px`}
                            color={`#666`}
                            border={`none`}
                            _hover={{}}
                            _focus={{}}
                            _active={{}}
                          >
                            Retake
                          </Button>
                        </Box>
                      ) : (
                        <Button onClick={capture} w={`full`}>
                          Take selfie
                        </Button>
                      )}
                    </>
                  )}
                </>
              </Box>
            </Box>
          </Flex>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
