import { DependencyContainer, InjectionToken } from 'tsyringe';
import express, { Express, Router } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import env from './env';
import { UserController, Controller, RouteConfig } from './controllers';
import { Server } from 'http';

export class HttpServer {
  private container: DependencyContainer;
  private static instance: HttpServer;
  private app: Express;
  private server: Server;

  private constructor() {}

  public static getInstance(container?: DependencyContainer): HttpServer {
    if (!HttpServer.instance) {
      HttpServer.instance = new HttpServer();
    }

    if (container) {
      HttpServer.instance.container = container;
    }

    return HttpServer.instance;
  }

  public getApp(): Express {
    return this.app;
  }

  public getServer(): Server {
    return this.server;
  }

  private loadControllers(): Function[] {
    return [UserController];
  }

  private buildRoutes(router: Router): Router {
    this.loadControllers().forEach((controller: Function) => {
      const controllerInstance = this.container.resolve(
        controller as InjectionToken<Controller>
      );

      if (!controllerInstance.routeConfigs) {
        return;
      }

      const { routeConfigs } = controllerInstance;

      routeConfigs?.forEach((routeConfig: RouteConfig) => {
        const { handle, method, middlewares, path } = routeConfig;
        const bindedHandle = handle.bind(controllerInstance);

        const jobs: any = middlewares.length
          ? [...middlewares, bindedHandle]
          : [bindedHandle];

        switch (method) {
          case 'get':
            router.get(path, jobs);
            break;
          case 'post':
            router.post(path, jobs);
            break;
          case 'put':
            router.put(path, jobs);
            break;
          case 'patch':
            router.patch(path, jobs);
            break;
          case 'delete':
            router.delete(path, jobs);
            break;
          default:
            break;
        }
      });
    });
    return router;
  }

  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const buildedRoutes = this.buildRoutes(router);
    app.use(buildedRoutes);

    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res
          .status(404)
          .send({ code: 'PAGE_NOT_FOUND', message: 'Page not found' });
      }
    );

    this.app = app;
    this.server = app.listen(env.port, () => {
      console.log(`HTTP server running on http://localhost:${env.port}`);
    });
  }
}
