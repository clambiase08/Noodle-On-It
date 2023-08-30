import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IngredientList from "./IngredientList";

export default function ShoppingList({ collections }) {
  // const [collection, setCollection] = useState({});
  // console.log(collections);
  const { id } = useParams();
  console.log(collections);
  const collection = collections.find(
    (collection) => collection.id === parseInt(id)
  );
  // collections.forEach((collection) => console.log(collection.notes));

  if (!collection) {
    return <div>Shopping list not found!</div>;
  }
  try {
    const ingredientList = collection.notes.flatMap((note) =>
      note.dish.quantities.map(
        (ingredient) => ingredient.ingredient.name
        //   {
        //   // id: ingredient.id,
        //   // name: ingredient.ingredient.name,
        //   // quantity: ingredient.quantity,
        //   // measurement: ingredient.measurement,
        // }
      )
    );
    const uniqueIngredientList = [...new Set(ingredientList)];
    const ingredientJSX = uniqueIngredientList.map((ingredient) => {
      return <div key={ingredient}>{ingredient}</div>;
    });
    return <div>{ingredientJSX}</div>;
  } catch {
    return <div>Shopping list not found!</div>;
  }
}
