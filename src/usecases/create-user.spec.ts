import { User } from 'src/entities/user';
import { UserCreate } from 'src/models/user.model';
import UserRepository from 'src/repositories/user.repository';
import CreateUser from './create-user';
import { UserExists } from '../errors/user.error';
import * as bcrypt from 'bcrypt';
describe('createUser', () => {
  jest.mock('../errors/user.error', () => {
    return {
      UserExists: new Error(),
    };
  });
  const hashMock = 'criptografado';
  const hashFnMock = jest
    .spyOn(bcrypt, 'hash')
    .mockImplementation((pass, salt) => Promise.resolve(hashMock));
  const userMock: User = {
    email: 'joe@at.com',
    id: 'asd',
    name: 'sadas',
  };
  const userToCreate: UserCreate = {
    email: 'joe@at.com',
    name: 'sadas',
    password: 'senha',
  };
  const userRepository: UserRepository = {
    createUser: jest.fn().mockResolvedValue(userMock),
    getUserById: jest.fn().mockResolvedValue(userMock),
    getUsers: jest.fn().mockResolvedValue([userMock]),
    getUserByEmail: jest.fn().mockImplementation((email: string) => {
      return email == 'email@duplicado' ? {} : null;
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('shoud create a user and use all functions', async () => {
    const SUT = new CreateUser(userRepository);

    await SUT.perform(userToCreate);

    expect(userRepository.getUserByEmail).toHaveBeenNthCalledWith(
      1,
      userToCreate.email,
    );
    expect(hashFnMock).toHaveBeenNthCalledWith(1, userToCreate.password, 10);
    expect(userRepository.createUser).toHaveBeenNthCalledWith(1, {
      ...userToCreate,
      password: hashMock,
    });
  });
  it('should throw excpetion UserExists', async () => {
    const SUT = new CreateUser(userRepository);
    expect(
      SUT.perform({ ...userToCreate, email: 'email@duplicado' }),
    ).rejects.toThrow(UserExists);
  });
});
