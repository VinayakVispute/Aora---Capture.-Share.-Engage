import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View style={styles.container}>
      <Text>Hello Click here 👇</Text>
      <StatusBar style="auto" />
      <Link
        href="/profile"
        style={{
          color: "blue",
        }}
      >
        <Text>Profile</Text>
      </Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
