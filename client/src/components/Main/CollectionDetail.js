import React from "react";
import { useParams, useHistory } from "react-router-dom";
import DishCard from "./DishCard";
import { Card } from "@chakra-ui/react";

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
      />
    );
  });

  return <Card>{collectionDishes}</Card>;
}
