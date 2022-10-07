import { UserModel } from './user.model';

export interface UserRepository {
  findAll(): Promise<UserModel[]>;
  create(name: string): Promise<UserModel>;
}
