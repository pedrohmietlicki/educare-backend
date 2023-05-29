import { User } from 'src/entities/user';
import UserRepository from 'src/repositories/user.repository';

export class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  async perform(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }
}
