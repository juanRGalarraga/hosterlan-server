import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';
import { BaseModel } from './base-model.schema';

export type ProfileDocument = HydratedDocument<Profile>;

@ObjectType()
@Schema({ autoIndex: true })
export class Profile extends BaseModel {
  @Field(() => String)
  @Prop({ type: String, required: true, maxLength: 100 })
  name: string;

  @Field(() => String)
  @Prop({ type: String, required: true, maxLength: 100 })
  last_name: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  birth_date: Date;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false })
  picture?: string;

  @Field(() => ID)
  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User', required: true })
  user: SchemaMongoose.Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
