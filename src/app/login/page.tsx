"use client";

import ClientProvider from "@/components/ClientProvider";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  FormErrorMessage,
  FormControl,
  Spinner,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginPage() {
  const router = useRouter();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [authError, setAuthError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: any) => {
    setIsFetching(true);
    setAuthError("");
    await signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((res) => {
        if (res?.status == 200) {
          router.replace("/");
        }
        if (res?.status !== 200) {
          setAuthError("Username or password incorrect");
        }
        setIsFetching(false);
      })
      .catch((err) => {
        alert("error");
      });
  };
  const avatars = [
    {
      name: "Ryan Florence",
      url: "https://bit.ly/ryan-florence",
    },
    {
      name: "Segun Adebayo",
      url: "https://bit.ly/sage-adebayo",
    },
    {
      name: "Kent Dodds",
      url: "https://bit.ly/kent-c-dodds",
    },
    {
      name: "Prosper Otemuyiwa",
      url: "https://bit.ly/prosper-baba",
    },
    {
      name: "Christian Nwamba",
      url: "https://bit.ly/code-beast",
    },
  ];
  return (
      <ChakraProvider>
        <Box position={"relative"}>
          <Container
            as={SimpleGrid}
            maxW={"7xl"}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 10, lg: 32 }}
            py={{ base: 10, sm: 20, lg: 32 }}
          >
            <Stack spacing={{ base: 10, md: 20 }}>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              >
                Berkarir di dunia IT{" "}
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, gray.400,pink.400)"
                  bgClip="text"
                >
                  Sebagai
                </Text>{" "}
                Full-Stack Developers
              </Heading>
              <Stack direction={"row"} spacing={4} align={"center"}>
                <AvatarGroup>
                  {avatars.map((avatar) => (
                    <Avatar
                      key={avatar.name}
                      name={avatar.name}
                      src={avatar.url}
                      position={"relative"}
                      zIndex={2}
                      _before={{
                        content: '""',
                        width: "full",
                        height: "full",
                        rounded: "full",
                        transform: "scale(1.125)",
                        bgGradient: "linear(to-bl, red.400,pink.400)",
                        position: "absolute",
                        zIndex: -1,
                        top: 0,
                        left: 0,
                      }}
                    />
                  ))}
                </AvatarGroup>
                <Text
                  fontFamily={"heading"}
                  fontSize={{ base: "4xl", md: "6xl" }}
                >
                  +
                </Text>
                <Flex
                  align={"center"}
                  justify={"center"}
                  fontFamily={"heading"}
                  fontSize={{ base: "sm", md: "lg" }}
                  bg={"gray.800"}
                  h={14}
                  w={14}
                  color={"white"}
                  rounded={"full"}
                  position={"relative"}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, orange.400,yellow.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                >
                  YOU
                </Flex>
              </Stack>
            </Stack>
            <Stack
              bg={"gray.50"}
              rounded={"xl"}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: "lg" }}
            >
              <Stack spacing={4}>
                <Heading
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  Sign In
                </Heading>
                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                  Silahlan isi email dan password untuk melanjutkan, dan pilih
                  materi yang kamu inginkan
                </Text>
              </Stack>
              <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl isInvalid={errors.email ? true : false}>
                    <Input
                      placeholder="Masukan Email"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                      {...register("email")}
                    />
                    <FormErrorMessage>
                      {errors?.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.password ? true : false}>
                    <Input
                      placeholder="Masukan Password"
                      type={"password"}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                      {...register("password")}
                    />
                    <FormErrorMessage>
                      {errors?.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>

                <Box mt={5} px={2}>
                  <Text fontSize={"sm"} color={"red.600"}>
                    {authError}
                  </Text>
                </Box>

                <Button
                  isDisabled={isFetching}
                  fontFamily={"heading"}
                  as={"button"}
                  type={"submit"}
                  mt={8}
                  w={"full"}
                  bgGradient="linear(to-r, gray.400,gray.500)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, gray.400,gray.500)",
                    boxShadow: "xl",
                  }}
                >
                  Submit
                  {isFetching == true && (
                    <span className="ml-2">
                      <Spinner size={"sm"} />
                    </span>
                  )}
                </Button>
              </Box>
            </Stack>
          </Container>
        </Box>
      </ChakraProvider>
  );
}
