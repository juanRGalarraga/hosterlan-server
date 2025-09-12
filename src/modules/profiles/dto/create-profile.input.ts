import { CreateUserInput } from '@app/modules/user/dto/create-user.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => String, { description: 'Profile name' })
  name: string;

  @Field(() => String, { description: 'Profile last name' })
  last_name: string;

  //TODO handle picture upload
  @Field(() => String, { description: 'Profile picture', nullable: true })
  picture?: string;
}