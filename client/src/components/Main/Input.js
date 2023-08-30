import React from "react";
import { Input as ChakraInput } from "@chakra-ui/react";
import { useField } from "formik";

const Input = ({ name, ...props }) => {
  const [field] = useField(name);
  return <ChakraInput {...props} {...field} />;
};

export default Input;
