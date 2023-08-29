import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DishCard from "./DishCard";
import { useHistory } from "react-router-dom";
import { SimpleGrid, Card } from "@chakra-ui/react";

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
      <Card>
        <DishCard
          key={dish.id}
          image={dish.image}
          name={dish.dish_name}
          user={dish.user.username}
          onClick={handleClick}
        />
      </Card>
    );
  });

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SimpleGrid columns={3} spacing={4}>
        {dishList}
      </SimpleGrid>
    </div>
  );
}
