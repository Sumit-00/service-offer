"use client";
import React from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setQuery(e.target.value);
    if (value.trim() !== "") {
      onSearch(value);
    } else {
      onSearch("");
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Search by brand name"
        />
      </div>
    </div>
  );
};

export default SearchBar;
