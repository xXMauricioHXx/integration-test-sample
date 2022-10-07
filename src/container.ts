import { container, DependencyContainer } from 'tsyringe';
import { UserServiceImplementation } from './infra/service';
import { UserRepositoryImplementation } from './infra/repositories/mysql/user/user.repository';
import { dbConnection } from './infra/repositories/mysql/knex';

export class AppContainer {
  container: DependencyContainer;

  constructor() {
    this.container = container;
    this.registerConfigs();
    this.registerProviders();
  }

  private registerProviders(): void {
    this.loadProviders().forEach((provider: Function) => {
      const { name } = provider;
      container.register(name, provider as any);
    });
  }

  private registerConfigs(): void {
    const configs = this.loadConfigs();

    for (const config in configs) {
      if (config) {
        this.container.register(config, { useValue: configs[config] });
      }
    }
  }

  loadProviders(): Function[] {
    return [UserServiceImplementation, UserRepositoryImplementation];
  }

  loadConfigs(): Record<string, any> {
    return {
      dbConnection,
    };
  }
}
