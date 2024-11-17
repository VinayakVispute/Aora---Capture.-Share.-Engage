import { ID, Models, Query, ImageGravity } from "react-native-appwrite";
import { databases, storage } from "../appwrite";
import { PostError } from "@/constants/errorClasses";

// Environment variables type checking
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASEID;
const USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_USERS_COLLECTIONID;
const VIDEOS_COLLECTION_ID = process.env.EXPO_PUBLIC_VIDEOS_COLLECTIONID;
const STORAGE_BUCKET = process.env.EXPO_PUBLIC_STORAGEID;

if (
  !DATABASE_ID ||
  !USERS_COLLECTION_ID ||
  !VIDEOS_COLLECTION_ID ||
  !STORAGE_BUCKET
) {
  console.error("Environment variables not set");
  throw new Error("Required environment variables are not set");
}

export const getAllPosts = async (): Promise<Models.Document[]> => {
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

export const getUserPosts = async (
  userId: string
): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      VIDEOS_COLLECTION_ID,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new PostError("Failed to fetch posts", error);
  }
};

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;
  try {
    if (type === "image") {
      fileUrl = await storage.getFilePreview(
        STORAGE_BUCKET,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else if (type === "video") {
      fileUrl = await storage.getFileView(STORAGE_BUCKET, fileId);
    } else {
      throw new PostError("Invalid file type");
    }

    if (!fileUrl) {
      throw new PostError("Failed to fetch file preview");
    }

    return fileUrl;
  } catch (error) {
    console.error(error);
    throw new PostError("Failed to fetch file preview", error);
  }
};

export const uploadFile = async (file: any, type: string) => {
  if (!file) {
    throw new PostError("No file provided");
  }

  const { mimeType, ...rest } = file;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      STORAGE_BUCKET,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    console.error(error);
    throw new PostError("Failed to upload file", error);
  }
};

export const createVideoPost = async (formData: any) => {
  try {
    const [thumbnail, video] = await Promise.all([
      uploadFile(formData.thumbnail, "image"),
      uploadFile(formData.video, "video"),
    ]);
    console.log({
      title: formData.title,
      video: video,
      thumbnail: thumbnail,
      creator: formData.userId,
      prompt: formData.prompt,
    });
    const newPost = await databases.createDocument(
      DATABASE_ID,
      VIDEOS_COLLECTION_ID,
      ID.unique(),
      {
        title: formData.title,
        video: video,
        thumbnail: thumbnail,
        creator: formData.userId,
        prompt: formData.prompt,
      }
    );
    return newPost;
  } catch (error) {
    console.error(error);
    throw new PostError("Failed to create post", error);
  }
};
