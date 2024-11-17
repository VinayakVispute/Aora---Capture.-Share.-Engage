import { Models, Query } from "react-native-appwrite";
import { databases } from "../appwrite";
import { PostError } from "@/constants/errorClasses";

// Environment variables type checking
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASEID;
const USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_USERS_COLLECTIONID;
const VIDEOS_COLLECTION_ID = process.env.EXPO_PUBLIC_VIDEOS_COLLECTIONID;

if (!DATABASE_ID || !USERS_COLLECTION_ID || !VIDEOS_COLLECTION_ID) {
  console.error("Environment variables not set");
  throw new Error("Required environment variables are not set");
}

export const getAllPosts = async (): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      VIDEOS_COLLECTION_ID
    );

    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new PostError("Failed to fetch posts", error);
  }
};

export const getLatestPosts = async (): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      VIDEOS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new PostError("Failed to fetch posts", error);
  }
};

export const searchPosts = async (
  query: string
): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      VIDEOS_COLLECTION_ID,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new PostError("Failed to fetch posts", error);
  }
};
