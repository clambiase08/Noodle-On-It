import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DishDetail from "./DishDetail";

export default function Home() {
  // const [dishes, setDishes] = React.useState(allDishes);

  // const handleSearch = (searchText) => {
  //   const filteredDishes = allDishes.filter((dish) =>
  //     dish.title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setDishes(filteredDishes);
  // };

  return (
    <div>
      {/* <SearchBar onSearch={handleSearch} />
      {dishes.map((dish) => (
        <DishDetail key={dish.id} {...dish} />
      ))} */}
      <SearchBar />
      <DishDetail />
    </div>
  );
}
