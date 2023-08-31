import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
// import { Select } from "@chakra-ui/react";
import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  Textarea,
} from "@chakra-ui/react";
// import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function AddRecipeForm({ ingredientList }) {
  const [displayIngredients, setDisplayIngredients] = useState([]);
  //   // need to add handling that makes it so that you can't add one ingredient twice

  //   // dish id, ingredient id maybe try it after you add the dish to the db, then return the dish id
  // }
  // console.log(displayIngredients);
  // console.log(ingredientList);

  const history = useHistory();
  const measurementList = [
    "tsp",
    "tbsp",
    "C",
    "pt",
    "qt",
    "gal",
    "oz",
    "fl oz",
    "lb",
    "L",
    "g",
    "kg",
    "mL",
    "",
  ];

  // console.log(ingredientList);
  const ingDropDown = ingredientList.map((ingredient) => {
    return <option key={ingredient.id}>{ingredient.name}</option>;
  });
  const measurementDropDown = measurementList.map((measurement) => {
    return <option key={measurement}>{measurement}</option>;
  });

  const ingredientsAdded = displayIngredients.map((ingredient) => {
    return (
      <p key={ingredient.ingredient}>
        {ingredient.ingredient} | {ingredient.quantity} {ingredient.measurement}
      </p>
    );
  });
  // console.log(ingredientsAdded);

  const formSchema = yup.object().shape({
    dish_name: yup.string().required("Please enter a user name"),
    instructions: yup.string().required("Please add instructions"),
    time_to_cook: yup.number().required("Please enter a time to cook"),
    time_to_prepare: yup.number().required("Please enter a time to prepare"),
    image: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      dish_name: "",
      instructions: "",
      time_to_cook: "",
      time_to_prepare: "",
      image: "",
    },
    validationSchema: formSchema,
    onSubmit: (value) => {
      // Maybe put something in here to alert user if no ingredients added
      console.log(value);
      fetch("/dishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }).then((r) => {
        if (r.ok) {
          r.json().then((dish) => {
            console.log("good!");
            console.log(dish);
            displayIngredients.forEach((ingredient) => {
              const new_ingredient = {
                quantity: parseInt(ingredient.quantity),
                measurement: ingredient.measurement,
                dish_id: dish.id,
                ingredient_id: ingredientList.find(
                  (ingredientListItem) =>
                    ingredientListItem.name === ingredient.ingredient
                ).id,
              };
              fetch("/quantities", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(new_ingredient),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((quantity) => {
                    console.log("quantity good!");
                    console.log(quantity);
                    history.push("/");
                    window.location.reload();
                  });
                } else {
                  r.json().then((error) => {
                    console.log("no good");
                    console.log(error);
                  });
                }
              });
            });
            // have to make error handling if they don't include ingredients
            //have to add it to the dishes state
          });
        } else {
          r.json().then((error) => {
            console.log("no good");
            console.log(error);
          });
        }
      });
    },
  });

  const formSchema2 = yup.object().shape({
    quantity: yup.number().required("Please enter a time to prepare"),
    measurement: yup.string().required("Please enter a measrement"),
  });

  const formik2 = useFormik({
    initialValues: {
      ingredient: "Salt",
      quantity: "1",
      measurement: "tsp",
    },
    validationSchema: formSchema2,
    onSubmit: (value) => {
      // console.log(value);
      setDisplayIngredients([...displayIngredients, value]);
    },
  });

  //   return (
  //     <div>
  //       {/* <h2>Welcome to the add recipe</h2> */}
  //       <br />
  //       <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
  //         <label>Recipe Name</label>
  //         <input
  //           type="text"
  //           name="dish_name"
  //           value={formik.values.dish_name}
  //           onChange={formik.handleChange}
  //           style={{ margin: "30px", border: "1px solid" }}
  //         />
  //         <label>Instructions</label>
  //         <textarea
  //           type="paragraph"
  //           name="instructions"
  //           value={formik.values.instructions}
  //           onChange={formik.handleChange}
  //           style={{ border: "1px solid" }}
  //         />
  //         <label>Time to Cook</label>
  //         <input
  //           type="number"
  //           name="time_to_cook"
  //           value={formik.values.time_to_cook}
  //           onChange={formik.handleChange}
  //           style={{ margin: "30px", border: "1px solid" }}
  //         />
  //         <label>Time to Prepare</label>
  //         <input
  //           type="number"
  //           name="time_to_prepare"
  //           value={formik.values.time_to_prepare}
  //           onChange={formik.handleChange}
  //           style={{ margin: "30px", border: "1px solid" }}
  //         />
  //         <button type="submit">Add Dish</button>
  //         <label>Image</label>
  //         <input
  //           type="string"
  //           name="image"
  //           value={formik.values.image}
  //           onChange={formik.handleChange}
  //           style={{ margin: "30px", border: "1px solid" }}
  //         />
  //       </form>
  //       <form onSubmit={formik2.handleSubmit} style={{ margin: "30px" }}>
  //         <label>Ingredient List</label>
  //         <Select
  //           type="string"
  //           name="ingredient"
  //           onChange={formik2.handleChange}
  //           w={"200px"}
  //         >
  //           {ingDropDown}
  //         </Select>
  //         <label>Quantity</label>
  //         <input
  //           type="number"
  //           name="quantity"
  //           value={formik2.values.quantity}
  //           style={{ margin: "30px", border: "1px solid" }}
  //           onChange={formik2.handleChange}
  //           required
  //         />
  //         <label>Measurement</label>
  //         <Select
  //           type="string"
  //           name="measurement"
  //           onChange={formik2.handleChange}
  //           w={"200px"}
  //         >
  //           {measurementDropDown}
  //         </Select>
  //         <button type="submit">Add Ingredient</button>
  //       </form>
  //       <li>{ingredientsAdded}</li>
  //     </div>
  //   );
  // }

  // export default function SignupCard() {
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        {/* <form> */}
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Recipe!
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <FormControl id="dishName" isRequired>
                  <FormLabel>Dish Name</FormLabel>
                  <ChakraInput
                    type="text"
                    name="dish_name"
                    value={formik.values.dish_name}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Box>
              <HStack>
                <FormControl id="time_to_prepare" isRequired>
                  <FormLabel>How long to prepare?</FormLabel>
                  <ChakraInput
                    type="number"
                    value={formik.values.time_to_prepare}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl id="time_to_cook" isRequired>
                  <FormLabel>How long to cook?</FormLabel>
                  <ChakraInput
                    type="number"
                    value={formik.values.time_to_cook}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </HStack>
              <Box>
                <FormControl id="instructions" isRequired>
                  <FormLabel>Instructions for Cooking</FormLabel>
                  <Textarea
                    type="paragraph"
                    value={formik.values.instructions}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Box>
              {/* <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.500",
                  }}
                  type="submit"
                >
                  Add Dish
                </Button>
              </Stack> */}
              {/* </form> */}
              {/* <form> */}
              <div>
                <Stack align={"center"}>
                  <Box>Add Ingredients!</Box>
                  <Box>(Must add at least 1)</Box>

                  <br />
                </Stack>
                <Box>
                  <Stack spacing={4}>
                    <HStack>
                      <FormControl id="ingredientName" isRequired>
                        <FormLabel>Ingredient Name</FormLabel>
                        <Select
                          type="string"
                          name="ingredient"
                          onChange={formik2.handleChange}
                          w={"200px"}
                        >
                          {ingDropDown}
                        </Select>
                      </FormControl>
                      <FormControl id="quantity" isRequired>
                        <FormLabel>Quantity</FormLabel>
                        <ChakraInput
                          type="number"
                          name="quantity"
                          value={formik2.values.quantity}
                          onChange={formik2.handleChange}
                        />
                      </FormControl>
                      <FormControl id="measurement" isRequired>
                        <FormLabel>Measurement</FormLabel>
                        <Select
                          type="string"
                          name="measurement"
                          onChange={formik2.handleChange}
                          w={"100px"}
                        >
                          {measurementDropDown}
                        </Select>
                      </FormControl>
                    </HStack>
                    {ingredientsAdded.length >= 1 ? (
                      <Box textAlign={"center"}>{ingredientsAdded}</Box>
                    ) : null}

                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"orange.400"}
                        color={"white"}
                        _hover={{
                          bg: "orange.500",
                        }}
                        // type="submit"
                        type="button"
                        // onSubmit={formik2.handleSubmit}
                        onClick={formik2.handleSubmit}
                      >
                        Add Ingredient
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </div>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.500",
                  }}
                  type="submit"
                >
                  Add Dish
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
