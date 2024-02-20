import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({unique:true})
  userName: string;

  @Prop()
  email: string;

  @Prop({required: false})
  password?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);