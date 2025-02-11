import { Router } from 'express';
import { createHealthController } from '../controllers/HealthController';
import { createShipmentProxyController } from '../controllers/ShipmentProxyController';
import { createDriverOperationsProxyController } from '../controllers/DriverOperationsProxyController';
import { cacheMiddleware } from '../middlewares/caching';

const router = Router();

// Health check route
router.use('/', createHealthController());
router.use('/shipment', createShipmentProxyController());
router.use('/driver', createDriverOperationsProxyController());

export default router;
