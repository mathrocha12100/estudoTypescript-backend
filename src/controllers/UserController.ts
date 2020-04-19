import connection from '../database/database';
import { Response, Request } from 'express';

interface UserRequestPost extends Request {
  body: {
    idade: number;
    nome: string;
    email: string;
    cpf: string;
  };
}

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await connection('users').select('*');

    return res.json(users);
  }

  public async store(req: UserRequestPost, res: Response): Promise<Response> {
    const { email, idade, nome, cpf } = req.body;
    const userExists = await connection('users')
      .select('email')
      .where('email', email)
      .first();
    if (userExists) {
      return res.status(401).json({ error: 'Esse e-mail já esta cadastrado' });
    }

    const user = await connection('users').insert({
      nome,
      idade,
      email,
      cpf,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    
    await connection('users').where('id', id).delete()

    return res.json({ message: 'usuario deletado com sucesso!' });
  }
  
}

export default new UserController();