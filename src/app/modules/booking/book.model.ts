import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    preExperience: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
