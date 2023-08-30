import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, useFormik } from "formik";
import { Select } from "@chakra-ui/react";

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

export default function DishDetail({ dishes, collections }) {
  const [toggleNote, setToggleNote] = useState(false);

  function handleToggleNote(e) {
    setToggleNote(!toggleNote);
  }

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

  const collectionsDropdown = collections.map((collection) => {
    return (
      <option key={collection.id} value={collection.id}>
        {collection.id}. {collection.name}
      </option>
    );
  });
  console.log(collectionsDropdown);

  const noteForm = (
    <Formik
      initialValues={{ notes: "", collection: `` }}
      onSubmit={(value) => console.log(value)}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <textarea
            type="paragraph"
            // type="text"
            onChange={props.handleChange}
            value={props.values.notes}
            name="notes"
            style={{ border: "1px solid" }}
            required
          ></textarea>
          <Select
            type="string"
            name="collection"
            onChange={props.handleChange}
            w={"200px"}
          >
            {collectionsDropdown}
          </Select>
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} background="#FCF8F3">
      <GridItem colSpan={1}>
        <Card>
          <CardBody>
            <Image src={dish.image} alt={dish.dish_name} borderRadius="lg" />
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
      <div>
        <button type="submit" onClick={handleToggleNote}>
          Add Note
        </button>
        {toggleNote ? noteForm : null}
      </div>
    </Grid>
  );
}
