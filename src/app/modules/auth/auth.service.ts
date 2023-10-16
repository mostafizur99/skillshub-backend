import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  ILoginUseResponse,
  ILoginUser,
  IRefreshTokenResponse,
  IUserExist,
} from './auth.interface';

const createUser = async (userInput: IUser): Promise<IUser | null> => {
  // default password
  if (!userInput.password) {
    userInput.password = config.default_user_pass as string;
  }

  // default user role ensured
  userInput.role = 'user';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([userInput], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return newUserAllData;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUseResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { _id: userId, email: userEmail } = isUserExist as IUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, email: userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, email: userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  // checking deleted user's refresh token
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token
  const { _id: ID, email: userEmail } = isUserExist as IUserExist;
  const newAccessToken = jwtHelpers.createToken(
    {
      id: ID,
      email: userEmail,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
