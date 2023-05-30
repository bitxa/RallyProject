import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/rol.enum';

//TODO EL SCHEMA DE LOS Users
export type UsersDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role.User;
}
export const UserSchema = SchemaFactory.createForClass(User);
