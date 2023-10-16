/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  password: string;
  email: string;
  role: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type IUseResponse = {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// };
export type IUserRole = 'user' | 'admin' | 'super-admin';
