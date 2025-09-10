import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';
import { BaseModel } from './base-model.schema';


export type UserDocument = HydratedDocument<User>;

export enum ROLES {
  DEV = 'dev',
  OWNER = 'owner',
  GUEST = 'guest'
}

registerEnumType(ROLES, {
  name: 'ROLES',
  description: 'User roles',
});
@ObjectType()
@Schema({ autoIndex: true })
export class User extends BaseModel {
  @Field(() => String)
  @Prop({ type: String, required: true })
  email: string;

  @Field(() => String)
  @Prop({ type: String, required: true, maxLength: 80 })
  password: string;

  @Field(() => ROLES)
  @Prop({ type: String, enum: ROLES, default: ROLES.GUEST })
  role: ROLES;

  @Field(() => ID, { nullable: true })
  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Profile' })
  profile?: SchemaMongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);