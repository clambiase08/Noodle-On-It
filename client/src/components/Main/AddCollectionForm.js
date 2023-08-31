import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useHistory } from "react-router";

import Input from "./Input";
import RadioGroup from "./RadioGroup";
import ImageRadio from "./ImageRadio";
import * as yup from "yup";

export default function AddCollectionForm({
  collections,
  user,
  setCollections,
}) {
  const history = useHistory();

  const AVATARS = [
    { name: "Salad", image: "images/salad-icon.png" },
    { name: "Pasta", image: "images/pasta-icon.png" },
    { name: "Steak", image: "images/steak-icon.png" },
    { name: "Pizza", image: "images/pizza-icon.png" },
  ];

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter a collection name")
      .test("not-all", "Name cannot be 'all'", (value) => value !== "all"),
    avatar: yup
      .string()
      .test(
        "required",
        "Please choose an photo for this collection",
        (value) => value !== undefined
      ),
  });

  function handlePostCollection(value) {
    const new_coll = {
      name: value["name"],
      image: value["avatar"],
      user_id: `${user.id}`,
    };
    fetch("/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_coll),
    }).then((res) => {
      if (res.ok) {
        res.json().then((collection) => {
          console.log(collection);
          const updatedCollections = [...collections, collection];
          setCollections(updatedCollections);
          history.push("/collections");
        });
      } else {
        res.json().then((error) => {
          console.log(error);
        });
      }
    });
  }

  return (
    <Box p={24}>
      <Formik
        initialValues={{ name: "", image: "" }}
        validationSchema={formSchema}
        onSubmit={handlePostCollection}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FormControl isInvalid={!!props.errors.name && props.touched.name}>
              <FormLabel htmlFor="name">Collection Name:</FormLabel>
              <Field
                as={Input}
                id="name"
                name="name"
                onChange={Formik.handleChange}
              />
              <FormErrorMessage>{props.errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!props.errors.avatar && props.touched.avatar}
            >
              <FormLabel mt="5" htmlFor="avatar">
                Choose an Icon:
              </FormLabel>
              <Field
                as={RadioGroup}
                id="avatar"
                name="avatar"
                py={2}
                display="flex"
                gridColumnGap={2}
              >
                {AVATARS.map(({ image }) => {
                  return <ImageRadio key={image} image={image} value={image} />;
                })}
              </Field>
              <FormErrorMessage>{props.errors.avatar}</FormErrorMessage>
            </FormControl>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}
