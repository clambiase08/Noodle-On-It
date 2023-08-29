import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Image,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import IngredientList from "./IngredientList";

export default function DishDetail({ dishes }) {
  const { id } = useParams();
  const dish = dishes.find((dish) => dish.id === parseInt(id));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  const ingredientList = dish.quantities.map((quantity) => {
    return (
      <IngredientList
        key={quantity.id}
        ingredient={quantity.ingredient.name}
        quantity={quantity.quantity}
        measurement={quantity.measurement}
      />
    );
  });

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} background="#FCF8F3">
      <GridItem colSpan={1}>
        <Card>
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt={dish.dish_name}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{dish.dish_name}</Heading>
              <Text>
                <p>Prep Time: {dish.time_to_prepare}min</p>
                <p>Cook Time: {dish.time_to_cook}min</p>
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={2}>
        <Text
          lineHeight="1.2"
          fontWeight="bold"
          fontSize="56px"
          color="Color . Gray 1"
          width="374px"
          maxWidth="100%"
        >
          Ingredients
        </Text>
        {ingredientList}
      </GridItem>
      <GridItem colSpan={2}>
        <Text
          lineHeight="1.2"
          fontWeight="bold"
          fontSize="56px"
          color="Color . Gray 1"
          width="374px"
          maxWidth="100%"
        >
          Instructions
        </Text>
        <Text
          lineHeight="1.5"
          fontWeight="medium"
          fontSize="20px"
          color="Color . Gray 3"
          width="357px"
          maxWidth="100%"
        >
          {dish.instructions}
        </Text>
      </GridItem>
    </Grid>
  );
}
