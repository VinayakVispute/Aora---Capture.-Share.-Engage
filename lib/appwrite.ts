import { Client } from "react-native-appwrite";

const ENDPOINT = process.env.EXPO_PUBLIC_ENDPOINT;
const PROJECT = process.env.EXPO_PUBLIC_PROJECT;
const PLATFORM = process.env.EXPO_PUBLIC_PLATFORM;

if (!ENDPOINT || !PROJECT || !PLATFORM) {
  throw new Error("Missing required environment variables");
}

const appwriteClient = () => {
  const client = new Client();

  client
    .setEndpoint(ENDPOINT as string)
    .setProject(PROJECT as string)
    .setPlatform(PLATFORM as string);

  return client;
};

export default appwriteClient();
