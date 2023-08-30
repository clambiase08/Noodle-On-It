import React, { useState } from "react";
import { Input } from "@chakra-ui/react";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Search for chicken tikka masala..."
      mb="5"
      focusBorderColor="orange.300"
      color="orange.500"
      _placeholder={{ color: "inherit" }}
    />
  );
}
