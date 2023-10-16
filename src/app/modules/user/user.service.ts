import mongoose from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.interface';

const getSingleUser = async (
  id: string | mongoose.Types.ObjectId
): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

const getUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  getSingleUser,
  getUsers,
  updateUser,
  deleteUser,
};
