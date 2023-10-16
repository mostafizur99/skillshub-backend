import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import ApiError from '../../../errors/ApiError';
import _ from 'lodash';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unavailable user');
  }
  const id = user.userId;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUsers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  // default user role ensured
  const otherPayloads = _.omit(payload, ['role']);

  const result = await UserService.updateUser(id, otherPayloads);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updateSuperAdminUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await UserService.updateUser(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  getMyProfile,
  getUserById,
  getUsers,
  updateUser,
  updateSuperAdminUser,
  deleteUser,
};
