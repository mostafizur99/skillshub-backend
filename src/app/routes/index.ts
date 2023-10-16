import express from 'express';
import { HealthRoutes } from '../modules/health/health.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/health',
    route: HealthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
