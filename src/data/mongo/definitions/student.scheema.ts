import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import Student from 'src/entities/student';
import { UserMongo } from './user.scheema';

@Schema({ collection: 'students' })
export class StudentMongo {
  _id: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: UserMongo.name,
  })
  user: UserMongo;
  toDomain = (): Student => {
    return new Student({ id: this._id, user: this.user.toDomain() });
  };
}

export const StudentSchema = SchemaFactory.createForClass(StudentMongo);
export type StudentDocument = HydratedDocument<StudentMongo>;
