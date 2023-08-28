import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DishDetail from "./DishDetail";
import DishCard from "./DishCard";

export default function Home({ dishes, setDishes }) {
  // const handleSearch = (searchText) => {
  //   const filteredDishes = dishes.filter((dish) =>
  //     dish.title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setDishes(filteredDishes);
  // };

  const dishList = dishes.map((dish) => {
    return (
      <DishCard
        key={dish.id}
        image={dish.image}
        name={dish.dish_name}
        user={dish.user.username}
      />
    );
  });
  // {dishes.map((dish) => (
  //   <DishDetail key={dish.id} {...dish} />
  // ))}

  return (
    <div>
      {/* <SearchBar onSearch={handleSearch} /> */}
      {dishList}
    </div>
  );
}
