import express from 'express';
const router = express.Router();
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

router.get('/my-profile', auth(), UserController.getMyProfile);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  UserController.getUsers
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  UserController.getUserById
);
router.patch(
  '/super-admin/:id',
  validateRequest(UserValidation.updateSuperAdminUserZodSchema),
  auth(ENUM_USER_ROLE.SUPERADMIN),
  UserController.updateSuperAdminUser
);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(),
  UserController.updateUser
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
