import React from "react";
import { Box, Image, chakra } from "@chakra-ui/react";
import { useRadio, useRadioGroupContext } from "@chakra-ui/react";
import { Formik, Field, useField } from "formik";

const ImageRadio = React.forwardRef((props, ref) => {
  const { image, name, ...radioProps } = props;
  const group = useRadioGroupContext();

  let isChecked = group.value.toString() === props.value.toString();

  const [{ checked, ...field }] = useField({
    name,
    type: "radio",
    value: radioProps.value.toString(),
    checked: isChecked,
  });

  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio({
      isChecked: isChecked,
      ...field,
    });

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({}, ref)} hidden />
      <Box
        {...getRadioProps()}
        bg={state.isChecked ? "green.200" : "transparent"}
        w={12}
        p={1}
        rounded="full"
      >
        <Image src={image} rounded="full" {...getLabelProps()} />
      </Box>
    </chakra.label>
  );
});

export default ImageRadio;
