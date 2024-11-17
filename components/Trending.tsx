import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";

import { icons } from "@/constants";

const zoomIn: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

interface TrendingItemProps {
  activeItem: Post;
  item: {
    $id: string;
    thumbnail: string;
    video: string;
  };
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: item.video }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
          {/* Stop Button */}
          <TouchableOpacity
            style={styles.stopButton}
            onPress={() => setPlay(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface Post {
  $id: string;
  thumbnail: string;
}

interface TrendingProps {
  posts: Post[];
}

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = (info: {
    viewableItems: Array<{ key: string }>;
  }) => {
    if (info.viewableItems.length > 0) {
      const activePost = posts.find(
        (post) => post.$id === info.viewableItems[0].key
      );
      if (activePost) {
        setActiveItem(activePost);
      }
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: 208,
    height: 288,
    borderRadius: 35,
    marginTop: 12,
    overflow: "hidden",
    position: "relative", // To position the stop button inside
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  stopButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "white", // Semi-transparent background for visibility
    padding: 8,
    borderRadius: 50, // Circular button
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  stopButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Trending;
