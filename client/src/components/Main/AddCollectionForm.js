import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";

import Input from "./Input";
import RadioGroup from "./RadioGroup";
import ImageRadio from "./ImageRadio";
import * as yup from "yup";

export default function AddCollectionForm() {
  const AVATARS = [
    { name: "Salad", image: "images/salad-icon.png" },
    { name: "Pasta", image: "images/pasta-icon.png" },
    { name: "Steak", image: "images/steak-icon.png" },
    { name: "Pizza", image: "images/pizza-icon.png" },
  ];

  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
    avatar: yup.string().required("Required"),
  });

  return (
    <Box p={24}>
      <h1>Collection Name:</h1>
      <Formik
        initialValues={{ name: "", image: AVATARS[0].name }}
        validationSchema={formSchema}
        onSubmit={console.log}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Input name="name" />
            <RadioGroup name="avatar" py={2} display="flex" gridColumnGap={2}>
              {AVATARS.map(({ name, image }) => {
                return <ImageRadio key={image} image={image} value={name} />;
              })}
            </RadioGroup>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}
