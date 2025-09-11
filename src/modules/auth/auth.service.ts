import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserSession } from './dto/user-session';
import { Authentication } from './dto/authentication.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Login
   * @param auth The credentials.
   * @returns The user session.
   */
  async login({ password, email }: Authentication): Promise<UserSession> {
    const user = await this.userService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, `${user?.password}`);

    if (user && isMatch) {
      return {
        user: user,
        accessToken: this.jwtService.sign({ id: user._id.toString(), email: user.email }),
      };
    }

    throw new UnauthorizedException();
  }

  /**
   * Refresh
   * @param user The user session.
   * @returns The jwt token.
      };
    }

    throw new UnauthorizedException();
  }

  /**
   * Refresh
   * @param user The user session.
   * @returns The jwt token.
   */
  async refresh(user: UserSession): Promise<string> {
    return this.jwtService.sign({ id: user.user._id, email: user.user.email });
  }
}