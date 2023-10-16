import express from 'express';
import { HealthController } from './health.controller';

const router = express.Router();

router.get('/', HealthController.healthCheck);

export const HealthRoutes = router;
