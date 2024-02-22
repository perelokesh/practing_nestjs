import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {hash} from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({unique:true})
  userName: string;

  @Prop()
  email: string;

  @Prop({required: true})
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function(next:Function){
  this.password = await hash(this.password, 10);
  next()
})

//so here iam using pre method as it will be called before saving the document to database
//and we are assigning a value for password by hashing the plain text password