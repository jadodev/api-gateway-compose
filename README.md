# api-gateway-compose

```plaintext
\---src
    |   index.ts
    |   
    +---config
    |       redis.ts
    |       
    +---controllers
    |       DriverOperationsProxyController.ts
    |       HealthController.ts
    |       ShipmentProxyController.ts
    |       
    +---middlewares
    |       authentication.ts
    |       caching.ts
    |       errorHandler.ts
    |       
    \---routes
            health.ts
            index.ts
