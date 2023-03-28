import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import Teacher from 'src/entities/teacher';
import { UserMongo } from './user.scheema';

@Schema({ collection: 'teachers' })
export class TeacherMongo {
  _id: string;
  @Prop({ required: true })
  subjects: string[];
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: UserMongo.name,
  })
  user: UserMongo;
  toDomain = (): Teacher => {
    return new Teacher({
      id: this._id,
      user: this.user.toDomain(),
      subjects: this.subjects,
    });
  };
}

export const TeacherSchema = SchemaFactory.createForClass(TeacherMongo);
export type TeacherDocument = HydratedDocument<TeacherMongo>;
