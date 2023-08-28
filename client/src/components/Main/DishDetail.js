import React from "react";
import { useParams } from "react-router-dom";

export default function DishDetail({ dishes }) {
  const { id } = useParams();
  const dish = dishes.find((dish) => dish.id === parseInt(id));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  const ingredientList = dish.quantities.map((quantity) => {
    return quantity.ingredient.name;
  });

  return (
    <div>
      <img src={dish.image} alt={dish.dish_name} />
      <p>{dish.dish_name}</p>
      <p>Instructions: {dish.instructions}</p>
      <span>Ingredients:</span>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>Cook Time: {dish.time_to_cook}</p>
      <p>Prep Time: {dish.time_to_prepare}</p>
    </div>
  );
}
