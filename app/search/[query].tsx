import { images } from "@/constants";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";

import EmptyState from "@/components/EmptyState";
import { useEffect, useState } from "react";
import { searchPosts } from "@/lib/actions/post.action";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";
const Seach = () => {
  const { query } = useLocalSearchParams();

  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppwrite(() =>
    searchPosts(Array.isArray(query) ? query.join(" ") : query || "")
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={{
              title: item.title || "",
              thumbnail: item.thumbnail || "",
              video: item.video || "",
              creator: {
                username: item.creator?.username || "",
                avatar: item.creator?.avatar || "",
              },
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className=" font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput
                placeholder="Search for your video topic"
                initialQuery={query}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No Videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Seach;
