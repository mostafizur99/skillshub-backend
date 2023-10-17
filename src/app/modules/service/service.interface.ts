import { Model, Types } from 'mongoose';

export type IService = {
  title: string;
  status: string;
  seat: string;
  startDate: string;
  price: string;
  isFeatured: boolean;
  reviews: [
    {
      rating: string;
      comment: string;
      reviewer: Types.ObjectId;
    }
  ];
};

export type ServiceModel = Model<IService>;

export type IServiceStatus = 'ongoing' | 'running' | 'upcoming';

export type IServiceFilters = {
  startDate?: string;
  searchTerm?: string;
};

export type IServiceReview = {
  rating: string;
  comment: string;
  reviewer: Types.ObjectId;
};
