import { User } from 'src/entities/user';
import UserRepository from '../repositories/user.repository';
import GetUserByEmail from './get-user-by-email.';
import { UserNotFound } from '../errors/user.error';

describe('get user by email', () => {
  const userMock: User = {
    email: 'joe@at.com',
    id: 'asd',
    name: 'sadas',
  };
  const userRepository: UserRepository = {
    ...jest.requireActual('../repositories/user.repository'),
    getUserByEmail: jest.fn().mockImplementation((email: string) => {
      return email == userMock.email ? userMock : null;
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get a user by email', async () => {
    const SUT = new GetUserByEmail(userRepository);
    const result = await SUT.perform(userMock.email);
    expect(result).toEqual(userMock);
    expect(userRepository.getUserByEmail).toHaveBeenNthCalledWith(
      1,
      userMock.email,
    );
  });
  it('should throw a expection UserNotFount', async () => {
    const SUT = new GetUserByEmail(userRepository);
    expect(SUT.perform('noexists')).rejects.toThrow(UserNotFound);
    expect(userRepository.getUserByEmail).toHaveBeenNthCalledWith(
      1,
      'noexists',
    );
  });
});
