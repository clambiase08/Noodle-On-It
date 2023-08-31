import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import DishCard from "./DishCard";
import { Card, SimpleGrid, Text, Center, Button } from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

export default function CollectionDetail({ collections }) {
  const history = useHistory();

  const { id } = useParams();
  const collection = collections.find(
    (collection) => collection.id === parseInt(id)
  );

  if (!collection) {
    return <div>Collection not found</div>;
  }

  const collectionDishes = collection.notes.map((note) => {
    const handleClick = () => {
      history.push(`/dish-details/${note.dish.id}`);
    };
    return (
      <DishCard
        key={note.id}
        name={note.dish.dish_name}
        image={note.dish.image}
        onClick={handleClick}
        displayUser={false}
      />
    );
  });

  const handleClickAddRecipe = () => {
    history.push("/");
  };

  return (
    <Card>
      <Text
        lineHeight="1.2"
        fontWeight="bold"
        fontSize="56px"
        color="Color . Gray 1"
        maxWidth="100%"
        mt="20"
        textAlign={"center"}
      >
        Recipes in {collection.name}
      </Text>
      <SimpleGrid columns={4} spacing={4} mt="10">
        {collectionDishes}
      </SimpleGrid>
      <Center>
        <Button
          alignItems={"center"}
          colorScheme="orange"
          mt="10"
          variant="outline"
          onClick={handleClickAddRecipe}
        >
          Add A Recipe To Collection
        </Button>
      </Center>
    </Card>
  );
}
