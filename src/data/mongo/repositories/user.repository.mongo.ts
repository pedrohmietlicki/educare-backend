import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserCreate } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDocument, UserMongo } from '../definitions/user.scheema';

export class UserRepositoryMongo implements UserRepository {
  constructor(
    @InjectModel(UserMongo.name) private userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => user.toDomain());
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user.toDomain();
  }
  async createUser(user: UserCreate): Promise<User> {
    const userCreated = await this.userModel.create(user);
    return userCreated.toDomain();
  }
}
