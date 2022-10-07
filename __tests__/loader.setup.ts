import { AppContainer } from '../src/container';
import { HttpServer } from '../src/http-server';
import { dbConnection } from '../src/infra/repositories/mysql/knex';

beforeAll((done) => {
  const container = new AppContainer().container;
  const httpServer = HttpServer.getInstance(container);

  httpServer.start();
  done();
});

afterAll((done) => {
  const server = HttpServer.getInstance().getServer();
  dbConnection.destroy();
  server.close();
  done();
});
