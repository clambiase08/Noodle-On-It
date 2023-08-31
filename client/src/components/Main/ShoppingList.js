import React from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Text,
  Center,
  Box,
  Flex,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ShoppingList({ collections }) {
  const { id } = useParams();
  console.log(collections);
  const collection = collections.find(
    (collection) => collection.id === parseInt(id)
  );

  const bg = useColorModeValue("gray.50", "gray.800");

  if (!collection) {
    return <div>Shopping list not found!</div>;
  }
  // try {
  const ingredientList = collection.notes.flatMap((note) =>
    note.dish.quantities.map((ingredient) => ingredient.ingredient.name)
  );
  const uniqueIngredientList = [...new Set(ingredientList)];

  const ingredientJSX = uniqueIngredientList.map((ingredient) => {
    return <div key={ingredient}>{ingredient}</div>;
  });

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bg}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        {/* <form> */}
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Shopping List
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={bg} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Box>
              <Text
                lineHeight="1.5"
                fontWeight="medium"
                fontSize="20px"
                color="Color . Gray 3"
                width="357px"
                maxWidth="100%"
                align={"center"}
              >
                {ingredientJSX}
              </Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
  // } catch {
  //   return <div>Shopping list not found!</div>;
  // }
}
