import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (bookInput: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(bookInput);
  return newBook;
};

const getSingleBook = async (
  id: string | mongoose.Types.ObjectId
): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }).populate('serviceId');
  return result;
};

const getServiceBooks = async (
  id: string | mongoose.Types.ObjectId,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Book.find({ serviceId: id })
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateBookStatus = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBook,
  getServiceBooks,
  getSingleBook,
  updateBookStatus,
  deleteBook,
};
