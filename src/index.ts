import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'; 
import cors from 'cors';

dotenv.config();

import { errorHandler } from './middlewares/errorHandler';
import { authenticationMiddleware } from './middlewares/authentication';
import { cacheMiddleware } from './middlewares/caching';
import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use(routes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
