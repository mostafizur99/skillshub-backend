import express from 'express';
const router = express.Router();
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

router.get('/my-profile', auth(), UserController.getMyProfile);

export const UserRoutes = router;
