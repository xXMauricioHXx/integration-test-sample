import { UserModel } from '.../../infra/repositories/mysql/user/user.model';

export namespace UserService {
  export type List = UserModel[];
  export type Create = UserModel;
}

export interface UserService {
  list(): Promise<UserService.List>;
  create(name: string): Promise<UserModel>;
}
