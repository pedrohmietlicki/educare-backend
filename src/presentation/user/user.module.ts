import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongo, UserSchema } from 'src/data/mongo/definitions/user.scheema';
import CreateUser from 'src/usecases/create-user';
import UserRepository from 'src/repositories/user.repository';
import { UserRepositoryMongo } from 'src/data/mongo/repositories/user.repository.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserMongo.name, schema: UserSchema }]),
  ],
  providers: [
    // CreateUser,
    UserRepositoryMongo,
    {
      provide: CreateUser,
      useFactory: (userRepository: UserRepository) => {
        return new CreateUser(userRepository);
      },
      inject: [UserRepositoryMongo],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
