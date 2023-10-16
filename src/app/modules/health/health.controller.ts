import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const healthCheck: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ok',
      data: null,
    });
  }
);

export const HealthController = {
  healthCheck,
};
