export interface CreateUserProps {
    existingUsernames: string[];
  }

export interface NewUser {
    username: string;
    password: string;
    confirmPassword: string;
  }