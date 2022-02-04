import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

const userList: User[] = [
  {
    id: 1,
    email: 'me@felipedaf.dev',
    name: 'Felipe de Amorim Ferrera1',
  },
];

const lastIndex = 1;

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(userList[0]),
              create: jest.fn().mockResolvedValue({
                id: lastIndex + 1,
                email: 'marcelo_amorim_ferreira@hotmail.com',
                name: 'Marcelo de Amorim Ferreira',
              }),
            },
          },
        },
      ],
    }).compile();
    prisma = module.get<PrismaService<User>>(PrismaService);
    service = module.get<UserService>(UserService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('get', () => {
    it('Should return a User promise successfully', async () => {
      const result = await service.get({ id: 1 });
      expect(result).toEqual(userList[0]);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('Should throw an exception.', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error());

      expect(
        prisma.user.findUnique({ where: { id: 1 } }),
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Should return a created user successfully', async () => {
      const input = {
        name: 'Marcelo de Amorim Ferreira',
        email: 'marcelo_amorim_ferreira@hotmail.com',
      };
      const result = await service.create(input);

      expect(result).toEqual({
        ...input,
        id: lastIndex + 1,
      });
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: input });
    });
  });
});
