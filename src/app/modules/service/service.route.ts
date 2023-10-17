import express from 'express';
import auth from '../../middlewares/auth';
import { ServiceValidation } from './service.validation';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

// create a service route (admin, super-admin)
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  validateRequest(ServiceValidation.createServiceZodSchema),
  ServiceController.createService
);

// get all service route
router.get('/', ServiceController.getAllServices);

// get a service by id route
router.get('/:id', ServiceController.getSingleService);

// update a service by id route (admin, super-admin)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  validateRequest(ServiceValidation.updateServiceZodSchema),
  ServiceController.updateService
);

// review a service route (private)
router.patch(
  '/review/:id',
  auth(),
  validateRequest(ServiceValidation.reviewServiceZodSchema),
  ServiceController.reviewService
);

// delete a service by id route (admin, super-admin)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  ServiceController.deleteService
);

export const ServiceRoutes = router;
