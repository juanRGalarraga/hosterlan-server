import { CreateUserInput } from '@app/modules/user/dto/create-user.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => String, { description: 'Profile name' })
  name: string;

  @Field(() => String, { description: 'Profile last name' })
  last_name: string;

  @Field(() => Date, { description: 'Profile birth date' })
  birth_date: Date;

  //TODO handle picture upload
  // @Field(() => Picture, { description: 'Profile picture', nullable: true })
  // picture?: Picture;

  @Field(() => CreateUserInput)
  user: CreateUserInput;
}