import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user';
import UserRepository from 'src/repositories/user.repository';
import { UserDocument, UserMongo } from '../definitions/user.scheema';

export class UserRepositoryMongo implements UserRepository {
  constructor(
    @InjectModel(UserMongo.name) private userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => user.toDomain());
  }
  async getUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toDomain(user) : null;
  }
  async createUser(user: {
    name: string;
    password: string;
    email: string;
  }): Promise<User> {
    const userCreated = await this.userModel.create(user);
    return this.toDomain(userCreated);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user ? this.toDomain(user) : null;
  }
  private toDomain({ _id, email, name }: UserMongo): User {
    return new User({ id: _id, email, name });
  }
}
