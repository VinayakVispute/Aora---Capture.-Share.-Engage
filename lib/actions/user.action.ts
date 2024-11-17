import { ErrorMessages } from "@/constants/errorMessages";
import appWrite from "@/lib/appwrite";
import {
  Account,
  Avatars,
  Databases,
  ID,
  Models,
  Query,
} from "react-native-appwrite";

interface createUserParams {
  username: string;
  email: string;
  password: string;
}

interface signInParams {
  email: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  avatar: URL;
  accountId: string;
}

// Environment variables type checking
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASEID;
const USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_USERS_COLLECTIONID;

if (!DATABASE_ID || !USERS_COLLECTION_ID) {
  console.error("Environment variables not set");
  throw new Error("Required environment variables are not set");
}

// Service initialization
const authService = {
  account: new Account(appWrite),
  avatars: new Avatars(appWrite),
  databases: new Databases(appWrite),
};

// Error handling utility
class AuthError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = "AuthError";
  }
}

export const createUser = async (
  params: createUserParams
): Promise<Models.Document> => {
  const { username, email, password } = params;

  try {
    console.log("Starting createUser function");
    console.log("Received params:", params);

    // Validation
    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      console.error("Validation failed: Missing fields");
      throw new AuthError(ErrorMessages.fields_required);
    }

    console.log("Creating new account...");
    const newAccount = await authService.account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log("New account created:", newAccount);

    if (!newAccount) {
      console.error("Failed to create account");
      throw new AuthError(ErrorMessages.something_went_wrong);
    }

    console.log("Fetching avatar and signing in...");
    const [avatarUrl, session] = await Promise.all([
      authService.avatars.getInitials(username),
      signIn({
        email,
        password,
      }),
    ]);

    console.log("Avatar URL:", avatarUrl);
    console.log("Session created:", session);

    const userData: User = {
      username: username,
      email: email,
      avatar: avatarUrl,
      accountId: newAccount.$id,
    };

    console.log("Creating user document in database...");
    const newUser = await authService.databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      userData
    );
    console.log("User document created:", newUser);

    return newUser;
  } catch (error: any) {
    console.log(error);

    const errorMessage =
      error.type && error.type in ErrorMessages
        ? ErrorMessages[error.type as keyof typeof ErrorMessages]
        : ErrorMessages.something_went_wrong;

    console.error("Mapped ErrorMessage:", errorMessage);
    throw new AuthError(errorMessage);
  }
};

export const signIn = async (params: signInParams): Promise<Models.Session> => {
  const { email, password } = params;

  try {
    console.log("Starting signIn function");
    console.log("Received params:", params);

    // Validation
    if (!email?.trim() || !password?.trim()) {
      console.error("Validation failed: Missing email or password");
      throw new AuthError(ErrorMessages.email_password_required);
    }

    console.log("Creating email-password session...");
    const session = await authService.account.createEmailPasswordSession(
      email,
      password
    );
    console.log("Session created:", session);

    if (!session) {
      console.error("Failed to create session");
      throw new AuthError(ErrorMessages.something_went_wrong);
    }

    return session;
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error.type && error.type in ErrorMessages
        ? ErrorMessages[error.type as keyof typeof ErrorMessages]
        : ErrorMessages.something_went_wrong;

    console.error("Mapped ErrorMessage:", errorMessage);
    throw new AuthError(errorMessage);
  }
};

export const getCurrentUser = async () => {
  try {
    console.log("Fetching current user...");
    const currentAccount = await authService.account.get();
    console.log("Current account:", currentAccount);
    if (!currentAccount) {
      console.error("Failed to fetch current account");
      throw new AuthError(ErrorMessages.user_not_found);
    }
    console.log("Current account:", currentAccount);
    const currentUser = await authService.databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      console.error("Failed to fetch user document");
      throw new AuthError(ErrorMessages.user_not_found);
    }
    console.log("Current user:", currentUser);

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error.type && error.type in ErrorMessages
        ? ErrorMessages[error.type as keyof typeof ErrorMessages]
        : ErrorMessages.something_went_wrong;

    console.error("Mapped ErrorMessage:", errorMessage);
    throw new AuthError(errorMessage);
  }
};
