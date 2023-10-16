import mongoose from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.interface';

const getSingleUser = async (
  id: string | mongoose.Types.ObjectId
): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

export const UserService = {
  getSingleUser,
};
