import { z } from 'zod';
import { serviceStatus } from './service.constant';

const createServiceZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required ',
    }),
    status: z.enum([...serviceStatus] as [string, ...string[]]),
    seat: z.string({
      required_error: 'Seat is required ',
    }),
    startDate: z.string({
      required_error: 'Start date is required ',
    }),
    isFeatured: z
      .boolean({
        required_error: 'isFeatured is required ',
      })
      .optional(),
    price: z.string({
      required_error: 'Price is required ',
    }),
  }),
});

const updateServiceZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required ',
      })
      .optional(),
    status: z.enum([...serviceStatus] as [string, ...string[]]).optional(),
    seat: z
      .string({
        required_error: 'Seat is required ',
      })
      .optional(),
    startDate: z
      .string({
        required_error: 'Start date is required ',
      })
      .optional(),
    isFeatured: z
      .boolean({
        required_error: 'isFeatured is required ',
      })
      .optional(),
    price: z
      .string({
        required_error: 'Price is required ',
      })
      .optional(),
  }),
});

const reviewServiceZodSchema = z.object({
  body: z.object({
    rating: z.string({
      required_error: 'Rating is required ',
    }),
    comment: z.string({
      required_error: 'Comment is required ',
    }),
  }),
});

export const ServiceValidation = {
  createServiceZodSchema,
  updateServiceZodSchema,
  reviewServiceZodSchema,
};
