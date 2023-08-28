import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DishCard from "./DishCard";
import { useHistory } from "react-router-dom";

export default function Home({ dishes, setDishes }) {
  const history = useHistory();

  // const handleSearch = (searchText) => {
  //   const filteredDishes = dishes.filter((dish) =>
  //     dish.title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setDishes(filteredDishes);
  // };

  const dishList = dishes.map((dish) => {
    const handleClick = () => {
      history.push(`/dish-details/${dish.id}`);
    };
    return (
      <DishCard
        key={dish.id}
        image={dish.image}
        name={dish.dish_name}
        user={dish.user.username}
        onClick={handleClick}
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
