import { NextFunction, Request, Response } from 'express';
import * as Redis from 'ioredis';
import {
  IRateLimiterStoreOptions,
  RateLimiterRedis,
} from 'rate-limiter-flexible';

const redis = new Redis(process.env.REDIS_URI); // uses defaults unless given configuration object

const options: IRateLimiterStoreOptions = {
  storeClient: redis,
  keyPrefix: `middleware-${process.env.ENV ?? 'default'}`,
  points: parseInt(process.env.RATE_LIMIT_POINTS ?? '10'), // 10 requests
  duration: 1, // per 1 second by IP
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
