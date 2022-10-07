import request from 'supertest';
import { HttpServer } from '../../http-server';

describe('UserController', () => {
  const setup = () => {
    return {
      app: HttpServer.getInstance().getApp(),
    };
  };

  describe('#GET /users', function () {
    it('should return all users', async () => {
      const { app } = setup();

      const response = await request(app).get('/users');

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(3);
    });
  });

  describe('#POST /users', function () {
    it('should create a new user', async () => {
      const { app } = setup();

      const user = {
        name: 'Joyce Trindade',
      };

      const response = await request(app).post('/users').send(user);

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('Joyce Trindade');
      expect(response.body.id).toEqual(4);
    });
  });
});
