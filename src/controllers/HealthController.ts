import { Request, Response, Router } from 'express';

export function createHealthController(): Router {
  const router = Router();
  router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'API Gateway is running' });
  });
  return router;
}
