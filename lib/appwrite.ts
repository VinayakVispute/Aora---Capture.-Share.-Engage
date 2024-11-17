import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

const ENDPOINT = process.env.EXPO_PUBLIC_ENDPOINT;
const PROJECT = process.env.EXPO_PUBLIC_PROJECT;
const PLATFORM = process.env.EXPO_PUBLIC_PLATFORM;

if (!ENDPOINT || !PROJECT || !PLATFORM) {
  throw new Error("Missing required environment variables");
}

interface AppwriteConfig {
  endpoint: string;
  project: string;
  platform: string;
}

// Validate and get environment variables

const getAppwriteConfig = (): AppwriteConfig => {
  const config = {
    endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
    project: process.env.EXPO_PUBLIC_PROJECT,
    platform: process.env.EXPO_PUBLIC_PLATFORM,
  };

  // Validate all required env vars are present
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      throw new Error(
        `Missing required environment variable: EXPO_PUBLIC_${key.toUpperCase()}`
      );
    }
  });

  return config as AppwriteConfig;
};

const createAppwriteClient = () => {
  const client = new Client();
  const config = getAppwriteConfig();

  client
    .setEndpoint(config.endpoint)
    .setProject(config.project)
    .setPlatform(config.platform);

  return client;
};

const appwriteClient = createAppwriteClient();

export const appwriteService = {
  client: appwriteClient,
  account: new Account(appwriteClient),
  avatars: new Avatars(appwriteClient),
  databases: new Databases(appwriteClient),
  storage: new Storage(appwriteClient),
} as const;

// Export individual services for convenience
export const { account, avatars, databases, storage } = appwriteService;

// Export default client for legacy support
export default appwriteClient;
