import { Router } from 'express';

const routes = Router();

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/UserController';
import CompanyController from './controllers/CompanyController';
import SessionController from './controllers/SessionController';

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.delete('/users', UserController.delete);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/companys', CompanyController.index);
routes.post('/companys', CompanyController.store);

export default routes;
