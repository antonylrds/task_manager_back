import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticaded(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token does not exists', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub: subject } = decoded as TokenPayload;

    request.user = {
      id: +subject,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
