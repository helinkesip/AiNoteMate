import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    if (!email || !pass) {
      return null;
    }
    const user = await this.usersService.findOne(email);
    if (!user || !user.password) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const existingUser = await this.usersService.findOne(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await this.usersService.create({
      email: user.email,
      password: hashedPassword,
      role: 'user',
    });

    const payload = { sub: createdUser.id, email: createdUser.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
