import React from "react";
import { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import { useField } from "formik";

const RadioGroup = ({ name, children, ...props }) => {
  const [field, , { setValue }] = useField({ name, value: props.value });

  const namedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return;

    return React.cloneElement(child, {
      name,
    });
  });

  return (
    <ChakraRadioGroup
      {...props}
      {...field}
      onChange={setValue}
      children={namedChildren}
    />
  );
};

export default RadioGroup;
