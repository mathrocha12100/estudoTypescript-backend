import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  
  private middlewares() {
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(routes);
  }
}

export default new App().server;