import { User } from 'src/entities/user';
import { UserNotFound } from '../errors/user.error';
import UserRepository from 'src/repositories/user.repository';

export default class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async perform(email: string): Promise<User> {
    const user = await this.userRepository.getUserById(email);
    if (!user) throw new UserNotFound();

    return user;
  }
}
