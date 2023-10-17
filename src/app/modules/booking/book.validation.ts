import { z } from 'zod';
import { bookStatus } from './book.constant';

const createBookZodSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'Service id is required ',
    }),
    preExperience: z.string({
      required_error: 'Pre experience is required ',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    status: z.enum([...bookStatus] as [string, ...string[]]).optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
