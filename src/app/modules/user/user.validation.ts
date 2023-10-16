import { z } from 'zod';
import { userRole } from './user.constant';

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  }),
});
const updateSuperAdminUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
  updateSuperAdminUserZodSchema,
};
