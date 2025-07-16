import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ){}


    async validateUser(email: string, pass:  string): Promise<any>{
        const user = await this.userService.findOne(email);
        if( user && user.password === pass){
            const {password, ...result} = user;
            return result;
    }
    return null;
  }

  async login(user: any){
    const payload = {sub : user.id};
    return{
        access_token: this.jwtService.sign({sub: user.id, email: user.email}),
    };
  }


  async register(user: any){
    const existingUser = await this.userService.findOne(user.email);
    if(existingUser){
        throw new ConflictException('User already exists');
    }
    const hashed
    






















}
