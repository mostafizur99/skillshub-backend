import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { serviceSearchableFields } from './service.constant';
import { IService, IServiceFilters, IServiceReview } from './service.interface';
import { Service } from './service.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createService = async (
  serviceInput: IService
): Promise<IService | null> => {
  const result = await Service.create(serviceInput);
  return result;
};

const getAllServices = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IService[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Service.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleService = async (
  id: string | mongoose.Types.ObjectId
): Promise<IService | null> => {
  const result = await Service.findOne({ _id: id }).populate(
    'reviews.reviewer',
    'name email _id'
  );
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const isExist = await Service.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const result = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const reviewService = async (
  id: string,
  payload: IServiceReview
): Promise<IService | null> => {
  const { rating, comment, reviewer } = payload;

  const service = await Service.findById(id);

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  service.reviews.push({ rating, comment, reviewer });
  const result = await service.save();

  return result;
};

const deleteService = async (id: string): Promise<IService | null> => {
  const result = await Service.findByIdAndDelete(id);
  return result;
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  reviewService,
  deleteService,
};
