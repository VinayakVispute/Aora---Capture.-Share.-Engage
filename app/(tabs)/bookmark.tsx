import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";

export default function Bookmark() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 justify-center items-center px-4">
        <Image
          source={images.logoSmall}
          className="w-24 h-24 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-psemibold text-white mb-4 text-center">
          Bookmarks Coming Soon
        </Text>
        <Text className="text-gray-100 text-center text-lg mb-8">
          We're working hard to bring you a great bookmarking feature. Stay
          tuned!
        </Text>
        <View className="bg-secondary rounded-full px-6 py-3">
          <Text className="text-primary font-pmedium">Feature in Progress</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
