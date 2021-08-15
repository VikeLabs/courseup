import { NextFunction, Request, Response } from 'express';
import * as Redis from 'ioredis';
import {
  IRateLimiterStoreOptions,
  RateLimiterRedis,
} from 'rate-limiter-flexible';

const redis = new Redis(); // uses defaults unless given configuration object

const options: IRateLimiterStoreOptions = {
  storeClient: redis,
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 60, // per 1 second by IP
};

const rateLimiter = new RateLimiterRedis(options);

export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};
