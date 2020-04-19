import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';

interface TokenRequest extends Request {
  userId: number;
}

export default async (req: TokenRequest, res: Response, next: NextFunction): Promise<void | Response> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'token not provided' });
  }
  const [, token] = authHeader.split(' ');

  jwt.verify(token, authConfig.secret, (err, decoded: { id: number }) => {
    if (err) {
      return res.status(401).json({ error: 'token invalid!' });
    }
    if (!decoded) {
      return res
      .status(401)
      .json({ success: false, code: 401, payload: 'Token Invalid' });
    }
    req.userId = decoded.id;
  });

  return next();
};