import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class Authentication {
  @IsEmail()
  @Field(() => String, { description: 'User email' })
  email!: string;

  @Length(4, 20)
  @Field(() => String, { description: 'User password' })
  password!: string;
}