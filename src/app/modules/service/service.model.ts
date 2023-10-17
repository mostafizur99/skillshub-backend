import { Schema, model } from 'mongoose';
import { ServiceModel, IService } from './service.interface';

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'ongoing',
    },
    seat: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviews: {
      type: [
        {
          rating: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          reviewer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model<IService, ServiceModel>('Service', serviceSchema);
