import { inject, injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { Controller } from '../controller';
import { get, post } from '../../decorators/http';
import { UserService } from '../../infra/service';

@injectable()
export class UserController extends Controller {
  constructor(
    @inject('UserServiceImplementation') private userService: UserService
  ) {
    super();
  }

  @get('/users')
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.list();

      return res.send(users);
    } catch (error) {
      next(error);
    }
  }

  @post('/users')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body || {};
      const users = await this.userService.create(name);

      return res.send(users);
    } catch (error) {
      next(error);
    }
  }
}
