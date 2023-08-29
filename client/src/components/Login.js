import React, { useEffect, useState } from "react";
// import { Box, Button } from "@chakra-ui/react";
// import { Input as ChakraInput } from "@chakra-ui/react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// import { Formik, FormikProps } from "formik";
// import * as yup from "yup";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import Input from "./Main/Input.js";

export default function Login({
  user,
  setUser,
  collections,
  setCollections,
  fetchUser,
}) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const history = useHistory();

  function handleSignUp(e) {
    history.push("/signup");
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        // setCollections()
        fetchUser(user);

        history.push("/");
      }
    });
  }

  // return (
  //   <Box p={40} mt="20">
  //     <form onSubmit={(e) => handleSubmit(e)}>
  //       <ChakraInput
  //         htmlSize={15}
  //         width="auto"
  //         type="text"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //       {/* <Input
  //         // type="text"
  //         // value={username}
  //         username="username"
  //         onChange={(e) => setUsername(e.target.value)}
  //       /> */}
  //       <br />
  //       <ChakraInput
  //         htmlSize={15}
  //         width="auto"
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <Button type="submit">Login</Button>
  //     </form>
  //   </Box>
  // );
  // //   return (
  // //     <Box p={24} mt="20">
  // //       <Formik
  // //         initialValues={{ username: "", email: "", password: "" }}
  // //         validationSchema={formSchema}
  // //         onSubmit={handleSubmit}
  // //       >
  // //         {(props) => (
  // //           <form>
  // //             <Input
  // //               name="username"
  // //               value={username}
  // //               onChange={Formik.handleChange}
  // //             />
  // //             <Input
  // //               type="password"
  // //               value={password}
  // //               name="password"
  // //               onChange={Formik.handleChange}
  // //             />
  // //             <button type="submit">Login</button>
  // //           </form>
  // //         )}
  // //       </Formik>
  // //     </Box>
  // //   );
  // }

  // 'use client'

  // import {
  //   Flex,
  //   Box,
  //   FormControl,
  //   FormLabel,
  //   Input,
  //   Checkbox,
  //   Stack,
  //   Button,
  //   Heading,
  //   Text,
  //   useColorModeValue,
  // } from '@chakra-ui/react'

  // export default function SimpleCard() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <ChakraInput
                  htmlSize={35}
                  width="auto"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <ChakraInput
                  htmlSize={35}
                  width="auto"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <Checkbox>Remember me</Checkbox> */}
                  <Text
                    color={"blue.400"}
                    _hover={{
                      color: "blue.600",
                    }}
                    onClick={handleSignUp}
                  >
                    Not a member? Sign up now!
                  </Text>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
{
  /* <form onSubmit={(e) => handleSubmit(e)}>
  <ChakraInput
    htmlSize={15}
    width="auto"
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />

  <br />
  <ChakraInput
    htmlSize={15}
    width="auto"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <Button type="submit">Login</Button>
</form>; */
}
