import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";

interface SearchInputProps {
  value: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  keyboardType?: "email-address" | "default" | "numeric" | "phone-pad";
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row border-2 space-x-4 ${
        isFocused ? "border-secondary" : "border-black-200"
      }`}
    >
      <TextInput
        className="text-base mt-0.5 tex-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)} // Set focus state
        onBlur={() => setIsFocused(false)} // Reset focus state
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
