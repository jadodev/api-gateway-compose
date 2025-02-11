// src/middlewares/caching.ts
import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';

export async function cacheMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Solo aplicar cache a peticiones GET.
  if (req.method !== 'GET') {
    return next();
  }
  
  const key = req.originalUrl;
  
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log(`Cache hit for key: ${key}`);
      // Se envía la respuesta cacheada y se finaliza la ejecución sin retornar un valor.
      res.json(JSON.parse(cachedData));
      return; // Devuelve void, no un valor
    }
    
    console.log(`Cache miss for key: ${key}`);
    
    // Interceptar la respuesta para cachearla
    const originalSend = res.send.bind(res);
    res.send = (body: any): any => {
      try {
        // Almacena la respuesta en caché con un TTL de 60 segundos.
        redisClient.set(key, JSON.stringify(body), { EX: 60 });
      } catch (err) {
        console.error(`Error setting cache for key ${key}:`, err);
      }
      return originalSend(body);
    };
    
    next();
  } catch (error) {
    console.error("Error in cache middleware:", error);
    next();
  }
}
