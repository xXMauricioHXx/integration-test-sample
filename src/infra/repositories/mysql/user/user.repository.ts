import { Knex } from 'knex';
import { inject, injectable } from 'tsyringe';
import { UserModel } from './user.model';
import { UserRepository } from './user.repository.interface';

@injectable()
export class UserRepositoryImplementation implements UserRepository {
  constructor(@inject('dbConnection') protected database: Knex) {}

  private get table() {
    return this.database<any, UserModel[]>('users');
  }

  async findAll(): Promise<UserModel[]> {
    return await this.table;
  }

  async findById(id: number): Promise<UserModel | null> {
    const result = await this.table.where('id', id).first();

    if (!result) {
      return null;
    }

    return result;
  }

  async create(name: string): Promise<UserModel> {
    const [id] = await this.table.insert({ name });

    const result = await this.findById(id);
    return result!;
  }
}
