import React, { useState } from "react";
import { Input, Box } from "@chakra-ui/react";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  //   return (
  //     <Input
  //       type="text"
  //       value={search}
  //       onChange={handleSearchChange}
  //       placeholder="Search for chicken tikka masala..."
  //       mb="5"
  //       focusBorderColor="orange.300"
  //       color="orange.500"
  //       _placeholder={{ color: "inherit" }}
  //     />
  //   );
  // }

  return (
    <Box
      position="relative"
      bgImage="url('https://hips.hearstapps.com/delish/assets/15/21/1431974262-delish-cutting-board.jpg')"
      bgSize="cover"
      bgPosition="center"
      minHeight="30vw" // Set a minimum height to cover the entire viewport
      display="flex" // Use flex display to center content vertically and horizontally
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="white" // Set the background color of the search bar
        maxWidth="1000px" // Set a maximum width for the search bar
        width="100%" // Make the search bar take up the entire width of the container
        borderRadius="md" // Add some border radius for styling
        boxShadow="md" // Add a box shadow for a lifted appearance
      >
        <Input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for chicken tikka masala..."
          focusBorderColor="orange.300"
          color="orange.500"
          _placeholder={{ color: "inherit" }}
          bg="white" // Set the background color of the input to match the container
        />
      </Box>
    </Box>
  );
}
