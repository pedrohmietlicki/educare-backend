import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/entities/user';

@Schema({ collection: 'users' })
export class UserMongo {
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  toDomain = (): User => {
    return new User({
      name: this.name,
      email: this.email,
      id: this._id,
    });
  };
}

export const UserSchema = SchemaFactory.createForClass(UserMongo);
export type UserDocument = HydratedDocument<UserMongo>;
