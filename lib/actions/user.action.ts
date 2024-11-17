import { AuthError } from "@/constants/errorClasses";
import { ErrorMessages } from "@/constants/errorMessages";
import { appwriteService } from "@/lib/appwrite";
import { ID, Models, Query } from "react-native-appwrite";

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

export const createUser = async (
  params: createUserParams
): Promise<Models.Document> => {
  const { username, email, password } = params;

  try {
    // Validation
    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      console.error("Validation failed: Missing fields");
      throw new AuthError(ErrorMessages.fields_required);
    }

    const newAccount = await appwriteService.account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      console.error("Failed to create account");
      throw new AuthError(ErrorMessages.something_went_wrong);
    }

    const [avatarUrl, session] = await Promise.all([
      appwriteService.avatars.getInitials(username),
      signIn({
        email,
        password,
      }),
    ]);

    const userData: User = {
      username: username,
      email: email,
      avatar: avatarUrl,
      accountId: newAccount.$id,
    };

    const newUser = await appwriteService.databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      userData
    );

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
    // Validation
    if (!email?.trim() || !password?.trim()) {
      console.error("Validation failed: Missing email or password");
      throw new AuthError(ErrorMessages.email_password_required);
    }

    const session = await appwriteService.account.createEmailPasswordSession(
      email,
      password
    );

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

export const getCurrentUser = async (): Promise<Models.Document> => {
  try {
    const currentAccount = await appwriteService.account.get();
    if (!currentAccount) {
      console.error("Failed to fetch current account");
      throw new AuthError(ErrorMessages.user_not_found);
    }
    const currentUser = await appwriteService.databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      console.error("Failed to fetch user document");
      throw new AuthError(ErrorMessages.user_not_found);
    }

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

export const signOut = async () => {
  try {
    const session = await appwriteService.account.deleteSession("current");

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
