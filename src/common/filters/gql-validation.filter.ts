import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ValidationException } from '../exceptions/validation.exception';
import { UserInputError } from 'apollo-server-express';

@Catch(ValidationException)
export class GqlValidationFilter implements GqlExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    return new UserInputError('BAD_USER_INPUT', {
      validationErrors: exception.validationErrors,
    });
  }
}
