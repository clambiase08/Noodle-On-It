import React from "react";

export default function DishCard({ name, image, user }) {
  return (
    <div>
      <p>{image}</p>
      <p>{name}</p>
      <p>{user}</p>
    </div>
  );
}
