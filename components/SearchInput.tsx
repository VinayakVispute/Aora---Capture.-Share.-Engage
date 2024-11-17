import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { usePathname } from "expo-router";
import { Alert } from "react-native";
import { router } from "expo-router";

interface SearchInputProps {
  placeholder?: string;
  initialQuery?: string | string[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  initialQuery,
}) => {
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [query, setQuery] = useState(
    Array.isArray(initialQuery) ? initialQuery.join(" ") : initialQuery || ""
  );

  const handleSearch = () => {
    if (!query.trim()) {
      Alert.alert("Missing query", "Please enter a search query", [
        { text: "OK" },
      ]);
      return;
    }

    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row border-2 space-x-4 ${
        isFocused ? "border-secondary" : "border-black-200"
      }`}
    >
      <TextInput
        className="text-base mt-0.5 tex-white flex-1 font-pregular text-white w-full"
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onFocus={() => setIsFocused(true)} // Set focus state
        onBlur={() => setIsFocused(false)} // Reset focus state
        value={query}
        onChangeText={(e) => setQuery(e)}
        onSubmitEditing={handleSearch} // Triggers search on "Enter" key press
        returnKeyType="search" // Displays "Search" on the keyboard instead of "Enter
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
