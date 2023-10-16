import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import _ from 'lodash';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import config from '../../../config';
import { AuthService } from './auth.service';
import { IUser } from '../user/user.interface';
import {
  ILoginUseResponse,
  IRefreshTokenResponse,
  IUserCreate,
} from './auth.interface';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userInput = req.body;
    const result = await AuthService.createUser(userInput);

    const resultData = JSON.parse(JSON.stringify(result)) as IUser;
    const newResult = _.omit(resultData, ['password']);

    sendResponse<IUserCreate>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Created Successfully!',
      data: newResult,
    });
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUseResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
};
