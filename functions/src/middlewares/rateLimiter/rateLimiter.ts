import { NextFunction, Request, Response } from 'express';

import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';

export const rateLimiterMiddleware =
  (rateLimiter: RateLimiterRedis | RateLimiterMemory) =>
  (req: Request, res: Response, next: NextFunction): void => {
    rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send('Too Many Requests');
      });
  };
