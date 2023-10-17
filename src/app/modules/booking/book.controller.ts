import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unavailable user');
    }

    const bookInput = {
      user: user.userId,
      ...req.body,
    };

    const result = await BookService.createBook(bookInput);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking is confirmed',
      data: result,
    });
  }
);

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booked information retrieved successfully',
    data: result,
  });
});

const getServiceBooks = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getServiceBooks(id, paginationOptions);

  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service Bookings retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateBookStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = { status: req.body.status };

  const result = await BookService.updateBookStatus(id, updatedData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking status updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking canceled successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getServiceBooks,
  getSingleBook,
  updateBookStatus,
  deleteBook,
};
