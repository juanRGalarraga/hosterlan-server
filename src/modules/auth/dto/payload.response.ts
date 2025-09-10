import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Payload {
  @Field(() => String)
  access_token: string;
}