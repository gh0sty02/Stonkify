export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IUserData {
  name: string;
  email: string;
  password: string;
  token?: string;
  isAdmin?: boolean;
}
