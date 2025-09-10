import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSession {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  accessToken!: string;
}