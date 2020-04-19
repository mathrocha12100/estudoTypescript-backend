import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import { Request, Response } from 'express';
import connection from '../database/database';

interface SessionRequestPost extends Request {
  body: {
    email: string;
    cpf: string;
  };
}

interface User {
  id: number;
  email: string;
  cpf: string;
}

class SessionController {
  public async store(req: SessionRequestPost, res: Response): Promise<Response> {
    const { email, cpf } = req.body;

    const userExists: User[] = await connection('users')
      .select('email', 'cpf', 'id')
      .where('email', email)
      .andWhere('cpf', cpf);

    if (!userExists) {
      return res.json('Usuario não existe!');
    }

    const [ user ] = userExists;

    const id = user.id;

    return res.json({
      user,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();