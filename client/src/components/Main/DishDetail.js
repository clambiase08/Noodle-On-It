import React from "react";
import { useParams } from "react-router-dom";

export default function DishDetail({ dishes }) {
  const { id } = useParams();
  const dish = dishes.find((dish) => dish.id === parseInt(id));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  return (
    <div>
      <img src={dish.image} alt={dish.dish_name} />
      <p>{dish.dish_name}</p>
      <p>{dish.instructions}</p>
      <p>{dish.time_to_cook}</p>
      <p>{dish.time_to_prepare}</p>
    </div>
  );
}
