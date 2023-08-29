import React from "react";
import AddRecipeForm from "./AddRecipeForm";

export default function AddRecipe({ ingredientList }) {
  return (
    <div>
      <h1>Add recipe</h1>
      <AddRecipeForm ingredientList={ingredientList} />
    </div>
  );
}
