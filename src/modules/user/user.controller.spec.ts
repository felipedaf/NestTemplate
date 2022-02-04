import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

type User = {
  id?: number;
  email: string;
  name: string;
};

const usersList: User[] = [
  {
    id: 1,
    email: 'me@felipedaf.dev',
    name: 'Felipe de Amorim Ferrera1',
  },
  {
    id: 2,
    email: 'felipeixom00@gmail.com',
    name: 'Felipe de Amorim Ferreira2',
  },
  {
    id: 3,
    email: 'felipe_amorim_ferreira@hotmail.com',
    name: 'Felipe de Amorim Ferreira3',
  },
];

const lastIndex = 3;

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            get: jest.fn().mockResolvedValue(usersList[0]),
            create: jest.fn().mockResolvedValue({
              id: lastIndex + 1,
              email: 'marcelo_amorim_ferreira@hotmail.com',
              name: 'Marcelo de Amorim Ferreira',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('Should return a list of users successfully', async () => {
      const result = await controller.get(1);

      expect(result).toEqual(usersList[0]);
      expect(service.get).toHaveBeenCalledTimes(1);
      expect(service.get).toHaveBeenCalledWith({ id: 1 });
    });

    it('Should throw an exception', () => {
      jest.spyOn(service, 'get').mockRejectedValueOnce(new Error());

      expect(controller.get(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const newUser: User = {
      name: 'Marcelo de Amorim Ferreira',
      email: 'marcelo_amorim_ferreira@hotmail.com',
    };

    it('Should create a new user and return it', async () => {
      const result = await controller.create(newUser);

      expect(result).toEqual({
        ...newUser,
        id: 4,
      });
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(newUser);
    });

    it('Should throw and exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create(newUser)).rejects.toThrowError();
    });
  });
});
