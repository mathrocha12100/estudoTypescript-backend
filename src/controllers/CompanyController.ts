import connection from '../database/database';
import { Request, Response } from 'express';

interface CompanyRequestPost extends Request {
  body: { nome: string, cnpj: string };
  userId: number;
}

class CompanyController {
  public async index(req: Request, res: Response): Promise<Response> {
    const companys = await connection('companys').select('*')

    return res.json(companys);
  }

  public async store(req: CompanyRequestPost, res: Response): Promise<Response> {
    const { cnpj, nome } = req.body;
    
    const companyExist = await connection('companys')
      .select('cnpj')
      .where('cnpj', cnpj)
      .first();

    if (companyExist) {
      return res.status(401).json({ error: 'company already exists' });
    }

    await connection('companys').insert({
      user_id: req.userId,
      nome,
      cnpj,
    });

    return res.json({ message: 'Company created!' });
  } 
}

export default new CompanyController();