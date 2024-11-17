// Error handling utility
export class AuthError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = "AuthError";
  }
}

export class PostError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = "PostError";
  }
}
