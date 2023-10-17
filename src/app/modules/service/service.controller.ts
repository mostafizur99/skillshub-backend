import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IService } from './service.interface';
import httpStatus from 'http-status';
import { ServiceService } from './service.service';
import pick from '../../../shared/pick';
import { serviceFilterableFields } from './service.constant';
import { paginationFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';

const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServiceService.createService(req.body);

    sendResponse<IService>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Service created successfully',
      data: result,
    });
  }
);

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceService.getAllServices(
    filters,
    paginationOptions
  );

  sendResponse<IService[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ServiceService.getSingleService(id);

  sendResponse<IService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ServiceService.updateService(id, updatedData);

  sendResponse<IService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

const reviewService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unavailable user');
  }
  const updatedData = {
    reviewer: user.userId,
    ...req.body,
  };

  const result = await ServiceService.reviewService(id, updatedData);

  sendResponse<IService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviewed service successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ServiceService.deleteService(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  reviewService,
  deleteService,
};
