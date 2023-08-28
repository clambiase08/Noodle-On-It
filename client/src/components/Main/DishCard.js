import React from "react";
import DishDetail from "./DishDetail";

export default function DishCard({ name, image, user, onClick }) {
  return (
    <div onClick={onClick}>
      <p>{image}</p>
      <p>{name}</p>
      <p>{user}</p>
    </div>
  );
}
