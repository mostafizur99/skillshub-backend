import { Model, Types } from 'mongoose';

export type IBook = {
  status: string;
  serviceId: Types.ObjectId;
  user: Types.ObjectId;
  preExperience: string;
};

export type BookModel = Model<IBook>;

export type IBookStatus = 'pending' | 'accepted' | 'rejected';
