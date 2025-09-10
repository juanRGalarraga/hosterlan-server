import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { USER_CONSTANTS } from '../constants';
import { ROLES } from '@app/database/schemas/users.schema';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'User password' })
  @IsStrongPassword(USER_CONSTANTS.PASSWORD_LEVEL_OPTIONS, {
    message: 'Password must be strong (uppercase, lowercase, number, symbol, 8+ chars)',
  })
  password: string;

  @Field(() => ROLES, { description: 'User role', defaultValue: ROLES.GUEST })
  role: ROLES;
}