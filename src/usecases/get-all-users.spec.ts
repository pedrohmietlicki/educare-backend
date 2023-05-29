import UserRepository from '../repositories/user.repository';
import { GetAllUsers } from './get-all-users';
describe('get all users', () => {
  const mockUsers = [
    {
      email: 'joe@at.com',
      id: 'asd',
      name: 'sadas',
    },
    {
      email: 'foo@at.com',
      id: 'sd',
      name: 'sadas',
    },
  ];

  const userRepository: UserRepository = {
    ...jest.requireActual('../repositories/user.repository'),
    getUsers: jest.fn().mockResolvedValue(mockUsers),
  };

  it('should get all users', async () => {
    const SUT = new GetAllUsers(userRepository);
    const result = await SUT.perform();
    expect(result).toHaveLength(2);
    expect(result).toEqual(mockUsers);
    expect(userRepository.getUsers).toHaveBeenNthCalledWith(1);
  });
});
