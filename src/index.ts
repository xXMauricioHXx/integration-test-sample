import 'reflect-metadata';
import { HttpServer } from './http-server';
import { AppContainer } from './container';

setImmediate(() => {
  const container = new AppContainer().container;
  const httpServer = HttpServer.getInstance(container);
  httpServer.start();
});
