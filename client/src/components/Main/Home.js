import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DishCard from "./DishCard";
import { useHistory } from "react-router-dom";
import { SimpleGrid, Card, Box, Text } from "@chakra-ui/react";

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
      <Card key={dish.id}>
        <DishCard
          key={dish.id}
          image={dish.image}
          name={dish.dish_name}
          user={dish.user.username}
          onClick={handleClick}
          displayUser={true}
        />
      </Card>
    );
  });

  return (
    <Box as="main" mt="20">
      <SearchBar onSearch={handleSearch} />
      <Text
        lineHeight="1.2"
        fontWeight="bold"
        fontSize="56px"
        color="Color . Gray 1"
        maxWidth="100%"
        mb="20"
        textAlign={"center"}
        mt="10"
      >
        Explore Recipes
      </Text>
      <SimpleGrid px={"40"} columns={4} spacing={4}>
        {loading ? <p>Loading...</p> : dishList}
      </SimpleGrid>
    </Box>
  );
}
