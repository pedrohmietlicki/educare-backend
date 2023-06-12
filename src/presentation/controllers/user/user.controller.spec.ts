import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import CreateUser from '../../../usecases/create-user';
import { User } from 'src/entities/user';
import { UserExists } from '../../../errors/user.error';

describe('UserController', () => {
  let userController: UserController;
  const mockUser: User = {
    email: 'joaoniguem@mail.com',
    id: '1',
    name: 'Joao Ninguem',
  };
  const createUserMock = {
    perform: jest.fn().mockResolvedValue(mockUser),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUser,
          useValue: createUserMock,
        },
      ],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
  });

  it('should create a user', async () => {
    const createdUser = await userController.create({
      email: mockUser.email,
      name: mockUser.name,
      password: 'senha',
    });

    expect(createdUser).toEqual(mockUser);
    expect(createUserMock.perform).toHaveBeenNthCalledWith(1, {
      email: mockUser.email,
      name: mockUser.name,
      password: 'senha',
    });
  });
  it("shouldn't create a user", async () => {
    createUserMock.perform.mockRejectedValue(new UserExists());
    try {
      await userController.create({
        email: mockUser.email,
        name: mockUser.name,
        password: 'senha',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UserExists);
      expect(createUserMock.perform).toHaveBeenNthCalledWith(1, {
        email: mockUser.email,
        name: mockUser.name,
        password: 'senha',
      });
    }
  });
});
