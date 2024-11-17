import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "@/constants";

interface VideoCardProps {
  video: {
    title: string;
    thumbnail: string;
    video: string;
    creator: {
      username: string;
      avatar: string;
    };
  };
}

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      {/* Header Section */}
      <View className="flex flex-row items-start gap-3 w-full">
        <View className="flex flex-row flex-1 items-center">
          <View className="w-12 h-12 rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 ml-3">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <Image
          source={icons.menu}
          className="w-5 h-5 pt-2"
          resizeMode="contain"
        />
      </View>

      {/* Video or Thumbnail */}
      <View className="w-full h-60 mt-3">
        {play ? (
          <View style={styles.container}>
            <Video
              source={{ uri: video }}
              style={styles.video}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                // @ts-ignore
                if (status.didJustFinish) {
                  setPlay(false); // Reset play state when video finishes
                }
              }}
            />

            {/* Stop Button */}
            <TouchableOpacity
              onPress={() => setPlay(false)}
              style={styles.stopButton}
              activeOpacity={0.7}
            >
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="w-full h-full rounded-xl relative flex justify-center items-center"
          >
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    position: "relative", // To position the button inside the video container if needed
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  stopButton: {
    position: "absolute", // Position over the video
    bottom: 10,
    right: 10, // Adjust as needed
    backgroundColor: "rgba(0,0,0,0.7)", // Semi-transparent background
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  stopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default VideoCard;
