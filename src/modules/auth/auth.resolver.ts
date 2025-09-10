import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Authentication } from './dto/authentication.input';
import { UserSession } from './dto/user-session';
import { Public } from '@app/common/decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Query(() => UserSession)
  async login(@Args('auth') auth: Authentication) : Promise<UserSession> {
    return await this.authService.login(auth);
  }
}