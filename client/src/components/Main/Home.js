import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DishCard from "./DishCard";
import { useHistory } from "react-router-dom";

export default function Home({ dishes }) {
  const history = useHistory();

  const [filteredDishes, setFilteredDishes] = useState(dishes);

  const handleSearch = (searchText) => {
    const filtered = dishes.filter((dish) =>
      dish.dish_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDishes(filtered);
  };

  const dishList = filteredDishes.map((dish) => {
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

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {dishList}
    </div>
  );
}
