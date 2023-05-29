import { User } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user.repository';
import { UserNotFound } from '../errors/user.error';
export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new UserNotFound();
    return user;
  }
  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new UserNotFound();
    return user;
  }
}
