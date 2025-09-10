import { ROOM_TYPES } from '@app/database/schemas/posts.schema';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Post title' })
  title: string;

  @Field(() => String, { description: 'User ID' })
  user: string;

  @Field(() => String, { description: 'Post body' })
  body: string;

  @Field(() => String, { description: 'Post location' })
  location: string;

  @Field(() => String, { description: 'Post price' })
  price?: number;

  @Field(() => Number, { description: 'Post rating' })
  rating?: number;

  @Field(() => ROOM_TYPES, { description: 'Room type' })
  room_type: ROOM_TYPES;

  @Field(() => [String], { description: 'Post amenities' })
  amenities?: string[];

  @Field(() => Boolean, { description: 'Post availability' })
  isAvailable?: boolean;
}