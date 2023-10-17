import express from 'express';
import auth from '../../middlewares/auth';
import { BookValidation } from './book.validation';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

// create a book route (private)
router.post(
  '/',
  auth(),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

// get all booking of a service route (admin, super-admin)
router.get(
  '/service/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  BookController.getServiceBooks
);

// update a  booking status route (admin, super-admin)
router.patch(
  '/status/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBookStatus
);

// get a book by id route
router.get('/:id', auth(), BookController.getSingleBook);

// update a book by id route (private)
router.delete('/:id', auth(), BookController.deleteBook);

export const BookingRoutes = router;
