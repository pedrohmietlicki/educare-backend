import { User } from 'src/entities/user';
import UserRepository from '../repositories/user.repository';
import GetUserById from './get-user-by-id';
import { UserNotFound } from '../errors/user.error';

describe('get user by id', () => {
  const userMock: User = {
    email: 'joe@at.com',
    id: 'asd',
    name: 'sadas',
  };
  const userRepository: UserRepository = {
    ...jest.requireActual('../repositories/user.repository'),
    getUserById: jest.fn().mockImplementation((id: string) => {
      return id == userMock.id ? userMock : null;
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get a user by id', async () => {
    const SUT = new GetUserById(userRepository);
    const result = await SUT.perform(userMock.id);
    expect(result).toEqual(userMock);
    expect(userRepository.getUserById).toHaveBeenNthCalledWith(1, userMock.id);
  });
  it('should throw a expection UserNotFount', async () => {
    const SUT = new GetUserById(userRepository);
    expect(SUT.perform('noexists')).rejects.toThrow(UserNotFound);
    expect(userRepository.getUserById).toHaveBeenNthCalledWith(1, 'noexists');
  });
});
