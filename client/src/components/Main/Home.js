import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DishCard from "./DishCard";
import { useHistory } from "react-router-dom";
import { SimpleGrid, Card } from "@chakra-ui/react";

export default function Home({ dishes, loading }) {
  const history = useHistory();
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  useEffect(() => {
    setFilteredDishes(dishes);
  }, [dishes]);

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
      <Card as="main" mt="20">
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
        {loading ? <p>Loading...</p> : dishList}
      </SimpleGrid>
    </div>
  );
}
