import { User } from "@app/database/schemas/users.schema";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSession {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken!: string;
}