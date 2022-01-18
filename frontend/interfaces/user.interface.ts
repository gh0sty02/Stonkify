export default interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  token: string;
}
