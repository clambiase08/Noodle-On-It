import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Search for chicken tikka masala..."
    />
  );
}
