import { inject, injectable } from 'tsyringe';
import { UserService } from './user.service.interface';
import { UserRepository } from '../../repositories/mysql/user/user.repository.interface';

@injectable()
export class UserServiceImplementation implements UserService {
  constructor(
    @inject('UserRepositoryImplementation')
    private userRepository: UserRepository
  ) {}

  list(): Promise<UserService.List> {
    return this.userRepository.findAll();
  }

  async create(name: string): Promise<UserService.Create> {
    return this.userRepository.create(name);
  }
}
