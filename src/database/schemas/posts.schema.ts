import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';
import { BaseModel } from './base-model.schema';
import { User } from './users.schema';

export type PostDocument = HydratedDocument<Post>;

export enum ROOM_TYPES {
  ROOM = 'Habitacion'
}

registerEnumType(ROOM_TYPES, {
  name: 'ROOM_TYPES',
  description: 'Room types',
});

@ObjectType()
@Schema({ autoIndex: true })
export class Post extends BaseModel {
  @Field(() => String)
  @Prop({ type: String, required: true, maxLength: 100 })
  title: string;
    
  @Field(() => String)
  @Prop({ type: String, required: true })
  body: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  location: string;

  @Field(() => String)
  @Prop({ type: Number, default: 0 })
  price: number;

  @Field(() => Number)
  @Prop({ type: Number, default: 0 })
  rating: number;

  @Field(() => ROOM_TYPES)
  @Prop({ type: String, enum: ROOM_TYPES, default: ROOM_TYPES.ROOM })
  room_type: ROOM_TYPES;

  @Field(() => [String])
  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: true })
  isAvailable: boolean;

  @Field(() => User)
  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User', required: true })
  user: SchemaMongoose.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);