import { Router } from 'express';
import { createProxyMiddleware, loggerPlugin } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();

export function createShipmentProxyController(): Router {
  const router = Router();
  const shipmentServiceUrl = process.env.SHIPMENT_SERVICE_URL;
  console.log(shipmentServiceUrl)

  // Proxy para todas las rutas que comiencen con /api/shipments
  router.use('', createProxyMiddleware({
    target: shipmentServiceUrl,
    changeOrigin: true,
    logger: console,
    pathRewrite: { '^/shipment/': '' } // Remueve la parte de la ruta del gateway
  }));

  return router;
}
